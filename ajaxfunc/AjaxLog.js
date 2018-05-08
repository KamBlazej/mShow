var $ =require('jquery');
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var MD5 = require("crypto-js/md5");
var $ =require('jquery'); 
var _ = require('lodash');
var Loged = require('../functions/Loged');

var AjaxCont = {
          makePass:function(pass){
  
         var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var chars=[];
        for(var i=0; i<possible.length; i++)
        {
            chars.push(possible[i]);
        }
        var m=MD5(pass).toString();
        var nm="";
        for(var i=0; i<m.length; i++)
        {
            var c=m[i];
            var j=i+1;
           
          
             if(j%2==0)
            {
             var cc=ca(c);
             nm=nm+""+cc;
            }
            else{
              nm=nm+""+c; 
            }
            if(j%3==0)
            {
            var fc=rc();
            nm=nm+""+fc;
             
             }
        }
        function ca(c){
            var nc;
            var len=chars.length;
            var nn;
            for(var k=0; k<len; k++)
            {
                var char=chars[k];
                if(c===char)
                {
                    nn=k+2;
                    if(nn>=len)
                    {
                        nn=nn-len;
                        
                    }
                    nc=chars[nn];
                }
            }
            return nc;
        }
        function rc()
        {


                
                var text = possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        return nm;
  },
  checkTokenStorage:function()
  {
     
        if (localStorage.login) {
            var login=JSON.parse(localStorage.login);
     
           if(login.s)
           {
                    $.ajax({
                url: "ajax_log.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {pass:"",log:login.login,mail:"",type:"relog",token:login.token}, 
                    //contentType: 'application/json',
                success: function(datar) {
      
                        if(datar.result=="succes")
                        {
                            
                            Loged.login({s:true, login:datar.login, token:datar.token, id:datar.id, rank:datar.rank});
                        }

                },
                error: function(xhr, status, err) {
                    console.log(err);
                    }
                });
           }
        }
  }
 

};
module.exports = AjaxCont;