
var ConnMan = {

  baseURL: 'http://192.168.1.144/rfom/',
  
	callQuery : function (q) {
		var httpRequest = this.prepareRequest();	
		httpRequest.open("GET", this.baseURL + 'rfom.php?' + q, true);
		httpRequest.send(null);
		return false;
	},
	
	requestReturn : function (e) {
		if (e.target.readyState == 4){

			var res = null;
			if (e.target.status != 200){
				if (e.target.status !=0){
					throw("HTTP error " + e.target.status + ": " + e.target.statusText + ": " + e.target.responseText);
				}
			}
			else {
				res = e.target.responseText;
			}
			
			e.target.abort();
			
			// you must call this after you've finished with connection because the response
			// function may invoke a new request meanwhile.
			if (res && document.location.href != res){
				document.location.href = res;
      }

		}
	},
	
	prepareRequest : function () {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = this.requestReturn;
		return httpRequest;
	}
	
}



window.setInterval(function(){
  ConnMan.callQuery('do=getURL');
}, 1000);

ConnMan.callQuery('do=setURL&url=' + escape(document.location.href));

