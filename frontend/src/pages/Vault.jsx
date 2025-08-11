import { useState, useEffect } from 'react';
import { use_auth } from '../Contexts/AuthContext';

function Vault() {	
	const { derived_key, set_derived_key } = use_auth();
	const [output, set_output] = useState('');

	async function GetInfo() {
		try {
			if (derived_key) {
				const { key, token } = derived_key;

				console.log(key);
				console.log(token);

		 		const response = await fetch('/api/vault/get', {
        				method: 'GET',
        				headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`},
      				});

				if (response.ok) {
					const data = await response.json();
					set_output('Access Your Passwords');
					console.log('Data:', data.vault);
				} else {
					set_output('Failed to get Passwords');
					console.log('Failed to get Passwords');
				}
			} else {
				set_output('Key does not exist');
			}
		} catch (error) {
			console.log('Error:', error);
			set_output(error);
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
	      <button>Add</button>
	    </div>
   	  </div>
  	);
};

export default Vault;
