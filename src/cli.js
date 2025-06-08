
	const index = require('./index.js')

	let params = process.argv;	
	params.splice(0, /\/node/.test(params[0]) ? 2 : 1);
	
	if (params.length !== 1) {
		console.log("usage: domainiac <domain>: returns JSON\n"+
			" - split domain into its parts.")
	} else {
		console.log(index.extract(params[0]));
	}
