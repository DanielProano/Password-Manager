import { useState, useEffect } from 'react';
import { use_auth } from '../Contexts/AuthContext';
import { encrypt, decrypt } from '../Contexts/Encrypt';

function Vault() {	
	const { derived_key, set_derived_key } = use_auth();
	const [output, set_output] = useState('');
	const [showPopup, setShowPopup] = useState(false);
	const [display, setDisplay] = useState([]);

	const [service, setService] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [notes, setNotes] = useState('');

	async function GetInfo() {
		try {
			if (derived_key) {
				const { key, token } = derived_key;

		 		const response = await fetch('/api/vault/get', {
        				method: 'GET',
        				headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`},
      				});

				if (response.ok) {
					const data = await response.json();
					set_output('Access Your Passwords');

					const decryptedEntries = [];

					for (const entry of data.vault) {
						const service_enc = JSON.parse(entry.service);
						const login_enc = JSON.parse(entry.login);
						const pass_enc = JSON.parse(entry.password);
						const notes_enc = JSON.parse(entry.notes || '{}');
	
						const service_decoded = await decrypt(key, service_enc.iv, service_enc.data);	
						const login_decoded = await decrypt(key, login_enc.iv, login_enc.data);
						const pass_decoded = await decrypt(key, pass_enc.iv, pass_enc.data);
						const notes_decoded = await decrypt(key, notes_enc.iv, notes_enc.data);
						decryptedEntries.push({service_decoded, login_decoded, pass_decoded, notes_decoded});
					}
					setDisplay(decryptedEntries);
				} else {
					set_output('Failed to get Passwords');
					console.log('Failed to get Passwords');
				}
			} else {
				set_output('Unauthorized');
			}
		} catch (error) {
			console.log('Error:', error);
			set_output(error);
		}
	}

	async function AddInfo() {
		try {
			if (derived_key) {
				console.log(service, login, password, notes);
				const { key, token } = derived_key;

				const { iv: service_iv, data: service_data } = await encrypt(key, service);
				const { iv: login_iv, data: login_data } = await encrypt(key, login);
				const {iv: pass_iv, data: pass_data } = await encrypt(key, password);
				const {iv: notes_iv, data: notes_data } = await encrypt(key, notes);

				const response = await fetch('/api/vault/store', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`},
					body: JSON.stringify({
						service: { iv: service_iv, data: service_data },
						login: { iv: login_iv, data: login_data },
						password: { iv: pass_iv, data: pass_data },
						notes: { iv: notes_iv, data: notes_data }
					})
				});

				if (response.ok) {
					const data = await response.json();
					console.log('Added info');
					GetInfo();
				} else {
					console.log('Failed to add info');
				}
			}
		} catch (error) {
			console.log("Error", error);
		}
	} 


	useEffect(() => {
		GetInfo();
	}, [derived_key]);

  	return (
    	  <div id="Layout">
      	    <h1>Vault</h1>
	    <p>{output}</p>
	    <div class="Horizontal-Line"></div>
	    <div id="Vault-Search">
	      <input placeholder='Search' /><br /><br />
	    </div>
	    <button>Search></button>

	    <div class="Vault-Add-Button">
	      <button onClick={() => setShowPopup(true)}>Add</button>
	    </div>

	    {showPopup && (
	      <div className="popup-setup">
	        <div className="popup">
	          <h2>Add New Password</h2>
	          <button onClick={() => setShowPopup(false)}>X</button>
	          <input placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} /><br />
	          <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} /><br />
	          <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
	          <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea><br />
	          <button onClick={async () => { setShowPopup(false); await AddInfo(); }}>Done</button>
	        </div>
	      </div>
	    )}
	    <div>
	      {display.map((entry, index) => (
	        <div key={index}>
	          <p>Service: {entry.service_decoded}</p>
	          <p>Login: {entry.login_decoded}</p>	          
	          <p>Password: {entry.pass_decoded}</p>	          
	          <p>Notes: {entry.notes_decoded}</p>
	          <hr />
	        </div>
	      ))}          
   	    </div>
	  </div>
	);
};

export default Vault;
