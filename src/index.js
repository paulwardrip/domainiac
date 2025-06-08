{
	const co = require("./iso-3166-1-alpha-2.json");
	const sldata = require("./slds.json");
	const zaschool = require("./za-school.json");

	function country(tld) {
		if ((tld.length == 2 && co[tld]) || ["eu","ac","uk", "africa"].includes(tld)) {
			return tld;
		} else {
			return "us";
		}
	}

	let API = module.exports = {
		extract(hostname) {
			if (!hostname) return
			let parts = hostname.toLowerCase().trim().split(".");
			let tld = parts[parts.length-1];
			let sld = parts[parts.length-2];
			let c = country(tld);
			let domain, subs, showsld;
			
			let slmatch = sldata[tld];
			if (tld === 'za' && zaschool.includes(sld)){
				sld = `school.${sld}`
				domain = parts[parts.length-4];
				subs = parts.splice(0,parts.length-4)
				showsld = {
					suffix: `${sld}.${tld}`,
					tld,
					sld
				}
			} else if (slmatch && slmatch.includes(sld)){
				domain = parts[parts.length-3];
				subs = parts.splice(0,parts.length-3)
				showsld = {
					suffix: `${sld}.${tld}`,
					tld,
					sld
				}
			} else {
				domain = sld
				subs = parts.splice(0,parts.length-2)
				showsld = {
					suffix: tld,
					tld
				}
			}
			
			return {
				...showsld,

				domain: `${domain}.${showsld.suffix}`,
				name: domain,
				subdomains: subs,
				country: c
			}
		},

		cookieMatchURL(url, cookieDomain, cookiePath) {
			return url.includes(cookieDomain + cookiePath);
		},

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