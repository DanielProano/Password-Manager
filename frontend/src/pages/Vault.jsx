import { useState } from 'react';
import { use_auth } from '../Contexts/AuthContexts';

function Vault() {	
	const { derived_key, set_derived_key } = use_auth();
	const [output, set_output] = useState('');

	if (derived_key) {
		const { key, token } = derived_key;
	} else {
		set_output('Key does not exist');
	}

  	html = (
    	  <div id="header">
      	    <h1>Vault</h1>
	    <p>{output}</p>
   	  </div>
  	);

	return html;
};

export default Vault;
