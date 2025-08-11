async function derive_key(master_password, salt) {
	const enc = new TextEncoder();
	const password_bytes = enc.encode(master_password);
	const salt_bytes = enc.encode(salt);

	const key_prep = await crypto.subtle.importKey(
		'raw',
		password_bytes,
		'PBKDF2',
		false,
		['deriveKey']
	);

	const key = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: salt_bytes,
			iterations: 100000,
			hash: 'SHA-256',
		},
		key_prep,
		{ name: 'AES-GCM', length: 256 },
		false,
		['encrypt', 'decrypt']
	);

	return key;
}

async function encrypt(key, text) {
	const enc = new TextEncoder();
	const text_bytes = enc.encode(text);

	const iv = crypto.getRandomValues(new Uint8Array(12));
	
	const cipher_text = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv
		},
		key,
		text_bytes
	);

	return {
		iv: Array.from(iv),
		data: Array.from(new Uint8Array(cipher_text))
	};
}

async function decrypt(key, iv_array, cipher) {
	const iv = new Uint8Array(iv_array);
	const cipher_bytes = new Uint8Array(cipher);

	const text_bytes = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: iv
		},
		key,
		cipher_bytes
	);

	const dec = new TextDecoder();
	return dec.decode(text_bytes);
}
	
export { derive_key, encrypt, decrypt };
