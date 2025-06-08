# domainiac

utility for parsing domains

country (domain) {
	returns the 2 character ISO-3166-1 alpha-2 country code for the specified domain.
}

extract (domain) {
	name (personlized part)
	tld (top level domain)
	country (alpha-2)
	domain
	subdomains[]

	example ("mail.google.com"): {
		tld: "com",
  		suffix: "com",
		name: "google",
		domain: "google.com",
		country: "us",
		subdomains: ["mail"]
	}

	example ("flamenco.mail.plala.or.jp"): {
		tld: "jp",
  		sld: "or",
    		suffix: "or.jp",
		name: "plala",
		domain: "plala.or.jp",
		country: "jp",
		subdomains: ["flamenco","mail"]
	}
}
