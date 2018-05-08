var $ =require('jquery');
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var AjaxCont = {
          get:function(){
        // var datar=JSON.stringify(data);
  
            $.ajax({
                url: "ajax_get.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {type:"get"}, 
                    //contentType: 'application/json',
                success: function(datar) {

                       store.dispatch(Actions.getContractor(datar));
                },
                error: function(xhr, status, err) {
                     console.log(xhr.responseText);

                    }
                });
  },
    getr:function(callback,callbackOrder,route,login){
        // var datar=JSON.stringify(data);
  
            $.ajax({
                url: "ajax_get.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {type:"get"}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       callback(login,route,datar,callbackOrder);
                },
                error: function(xhr, status, err) {
                     console.log(xhr.responseText);

                    }
                });
  },
      orderq:function(login,arr){
        // var datar=JSON.stringify(data);
            var narr=[];
            for(var i=0; i<arr.length; i++)
            {
                var item=arr[i];
                narr.push({id:item.id,orderq:item.orderq});
            }
  
            $.ajax({
                url: "ajax_contOrderq.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {arr:narr,login:login.login,token:login.token}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       //callback(login,route,datar);
                       store.dispatch(Actions.getContractor(datar));
                },
                error: function(xhr, status, err) {
                     console.log(xhr.responseText);

                    }
                });
  },
  delete:function(login,id,nick)
  {
     $.ajax({
                url: "ajax_delCont.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {id:id,login:login.login,token:login.token,nick:nick}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       //callback(login,route,datar);
                       //console.log(datar);
                       store.dispatch(Actions.getContractor(datar));
                },
                error: function(xhr, status, err) {
                     console.log(xhr.responseText);

                    }
                });
  },
   sendPass:function(login,nick,callback)
  {
     $.ajax({
                url: "ajax_sendPassCont.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {login:login.login,token:login.token,nick:nick}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       //callback(login,route,datar);
                       //console.log(datar);
                       if(datar)
                       {
                        callback("succes");
                       }
                       
                },
                error: function(xhr, status, err) {
                     console.log(xhr.responseText);

                    }
                });
  }
 

};
module.exports = AjaxCont;