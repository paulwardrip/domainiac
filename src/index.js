{
	const co = require("./iso-3166-1-alpha-2.json");

	function country(tld) {
		if (tld.length == 2 && (co[tld] || ["eu","ac","uk"].includes(tld))) {
			return tld;
		} else {
			return "us";
		}
	}

	let API = module.exports = {
		extractDomain(hostname){
			if (!hostname) return
			let parts = hostname.toLowerCase().trim().split(".");
			let tld = parts[parts.length-1];
			let sld = parts[parts.length-2];
			if (parts.length > 2 && tld.length === 2 && co[tld]) {
				if ((sld.length <= 4 && sld.length >= 2) || tld === "fr") {
					return [parts[parts.length-3],sld,tld].join(".");
				}
			}
			return [sld,tld].join(".")
		},
		
		extract(hostname) {
			if (!hostname) return
			let parts = hostname.toLowerCase().trim().split(".");
			let tld = parts[parts.length-1];
			let sld = parts[parts.length-2];
			let c = country(tld);
			let domain, subs;
			if (c !== "us") {
				if (["co", "com", "edu", "gov", "ne", "net", "or", "org"].includes(sld)){
					tld = `${sld}.${tld}`
					domain = parts[parts.length-3];
					subs = parts.splice(0,parts.length-3)
				} else {
					domain = sld
					subs = parts.splice(0,parts.length-2)
				}
			} else {
				domain = sld
				subs = parts.splice(0,parts.length-2)
			}
			
			return {
				tld,
				domain: `${domain}.${tld}`,
				name: domain,
				subdomains: subs,
				country: c
			}
		},

		cookieMatchURL(url, cookieDomain, cookiePath) {
			return url.includes(cookieDomain + cookiePath);
		}

		cookieDomain(domain){
			if (domain)	return API.extractDomain(domain.startsWith(".") ? domain.substr(1) : domain);
		},

		country(hostname){
			let parts = hostname.toLowerCase().trim().split(".");
			let tld = parts[parts.length-1];
			return country(tld);
		}
	}
}