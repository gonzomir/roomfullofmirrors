function parseURL(url) {
  var a =  document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':',''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function(){
      var ret = {},
        seg = a.search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
    hash: a.hash.replace('#',''),
    path: a.pathname.replace(/^([^\/])/,'/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
    segments: a.pathname.replace(/^\//,'').split('/')
  };
}

var rfom = {

	baseURL: 'http://local/rfom/',

	u: parseURL(this.baseURL),

	i: null,

	setURL : function(){
		this.callQuery('do=setURL&url=' + escape(document.location.href) + '&t=' + (new Date()).getTime());
	},

	getURL : function(){
		this.callQuery('do=getURL&t=' + (new Date()).getTime());
	},

	callQuery : function (q) {
		var httpRequest = this.prepareRequest();
		httpRequest.open("GET", this.baseURL + 'rfom.php?' + q, true);
		httpRequest.send(null);
	},


	prepareRequest : function () {

		var xhr = new XMLHttpRequest();
		if(document.location.hostname != this.u.host){
			if ("withCredentials" in xhr) {
				// Check if the XMLxhr object has a "withCredentials" property.
				// "withCredentials" only exists on XMLxhr2 objects.
			} else if (typeof XDomainRequest != "undefined") {
				// Otherwise, check if XDomainRequest.
				// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
				xhr = new XDomainRequest();
			} else {
				// Otherwise, CORS is not supported by the browser.
				throw("CORS is not supported by the browser.");
			}
		}

		xhr.onload = function(){
			var res = xhr.responseText;
			if (res !='' && document.location.href != res){
				if (rfom.i) {
					window.clearInterval(rfom.i);
				}
				document.location.href = res;
			}
		};
		return xhr;

	}

}

rfom.setURL();

rfom.i = window.setInterval(function(){
	rfom.getURL();
}, 1000);

