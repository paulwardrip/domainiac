	
	const domainiac = require('./src/index');

	let data = domainiac.extract("flamenco.plala.or.jp")
	console.log(data)
	console.log(domainiac.extract("google.com"))
	console.log(domainiac.extract("flamenco.mail.plala.or.jp"))
