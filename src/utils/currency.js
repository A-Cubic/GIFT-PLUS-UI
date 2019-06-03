
 export default{
    GetToken : function() {
      let _token = localStorage.getItem("acbc-token");
      if(_token == null) {
        return 'NoToken';
      } else{
        return JSON.parse(localStorage.getItem("acbc-token")).token;
      }
     
    },

    GetApiUrl : function() {
      return process.env.NODE_ENV === 'development' ? 'http://192.168.191.1:53943' : ''; 
    },
 }
