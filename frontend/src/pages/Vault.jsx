import { useState, useEffect } from 'react';
import { use_auth } from '../Contexts/AuthContext';
import { encrypt, decrypt } from '../Contexts/Encrypt';

import './Vault.css';

function Vault() {	
	const { derived_key, set_derived_key } = use_auth();
	const [output, set_output] = useState('');
	const [showPopup, setShowPopup] = useState(false);
	const [showDetailsPopup, setShowDetailsPopup] = useState(false);
	const [display, setDisplay] = useState([]);
	const [currentEntry, setCurrentEntry] = useState(null);

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
					set_output('Access Granted');

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
						decryptedEntries.push({id: entry.id, service_decoded, login_decoded, pass_decoded, notes_decoded});
					}
					setDisplay(decryptedEntries);
				} else {
					set_output('Failed to get Passwords');
					console.log('Failed to get Passwords');
				}
			} else {
				set_output('Unauthorized User');
			}
		} catch (error) {
			console.log('Error:', error);
			set_output(error);
		}
	}

	async function AddInfo() {
		try {
			if (derived_key) {
				if (!service || !login || !password) {
					console.log("Not enough info");
					return;
				}

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

	async function deleteInfo(id) {
		try {
			if (derived_key) {
				const { key, token } = derived_key;

				const response = await fetch(`/api/vault/delete/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});
				
				if (response.ok) {
					console.log('Deleted a entry successfully');
					GetInfo();
				} else {
					console.log("Couldn't delete an entry");
				}
			}
		} catch (error) {
			console.log("Error:", error);
		}
	}

	useEffect(() => {
		GetInfo();
	}, [derived_key]);

  	return (
    	  <div id="Layout">
	    <div id="Vault-Header">
      	      <h1>Vault</h1>
	      <p>{output}</p>
	      <div id="Vault-Search">
	        <input placeholder='Search' /><br /><br />
	        <button>Search</button>
	      </div>
	    </div>
	    <hr />

	    <div className="vault-add-button">
	      <button onClick={(e) => setShowPopup(true)}>+</button>
	    </div>

	    {showPopup && (
	      <div className="popup-setup">
	        <div className="popup">
	          <div id="Add-Popup-Title">
	            <h2>Add New Password</h2>
	            <button onClick={() => setShowPopup(false)}>X</button>
	          </div>
	          <div id="Popup-Content">
	            <div className="form-row">
		      <h2>Service:</h2>
	              <input placeholder="Ex. Google" value={service} onChange={(e) => setService(e.target.value)} /><br />
	            </div>
	            <div className="form-row">
	              <h2>Login:</h2>
	              <input placeholder="Ex. Email" value={login} onChange={(e) => setLogin(e.target.value)} /><br />
		    </div>
		    <div className="form-row">
	              <h2>Password:</h2>
	              <input placeholder="Ex. 123" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
		    </div>
		    <div className="form-row">
	              <h2>Notes:</h2>
	              <textarea placeholder="Text" value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea><br />
		    </div>
	            <button onClick={async () => { setShowPopup(false); await AddInfo(); }}>Done</button>
	          </div>
	        </div>
	      </div>
	    )}

	    <div>
	      {display.map((entry, index) => (
	        <div 
		  key={entry.id}
		  className="vault-entry"
		  onClick={() => {
		    setCurrentEntry(entry);
		    setShowDetailsPopup(true);
		  }}
		>
	          <p>{entry.service_decoded}</p>
		  <button onClick={(e) => { e.stopPropagation(); deleteInfo(entry.id); }}>
		  X</button>
	        </div>
	      ))}          
   	    </div>


	    {showDetailsPopup && currentEntry && (
	      <div className="popup-setup">
	        <div className="popup">
	          <button onClick={() => setShowDetailsPopup(false)}>X</button>
		  <div className="Add-Popup-Title">
	            <h2>{currentEntry.service_decoded}</h2>
		  </div>
	          <p><b>Login:</b> {currentEntry.login_decoded}</p>
	          <p><b>Password:</b> {currentEntry.pass_decoded}</p>
	          <p><b>Notes:</b> {currentEntry.notes_decoded}</p>
	        </div>
	      </div>
	    )}
	  </div>
	);
};

export default Vault;
