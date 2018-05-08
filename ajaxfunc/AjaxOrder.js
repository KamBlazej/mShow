var $ =require('jquery');
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var AjaxOrder = {
          save:function(order,callback,callErr){
        // var datar=JSON.stringify(data);
            $.ajax({
                url: "ajax_saveOrder.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: order, 
                    //contentType: 'application/json',
                success: function(datar) {

                       callback(datar);
                },
                error: function(xhr, status, err) {
                    callErr();
                      console.log(xhr.responseText);

                    }
                });
  },
      saveEdit:function(order,id,callback,callErr){
        // var datar=JSON.stringify(data);
                order.id=id;
            $.ajax({
                url: "ajax_saveOrderEdit.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: order, 
                    //contentType: 'application/json',
                success: function(datar) {

                       callback(datar);
                },
                error: function(xhr, status, err) {
                     callErr();
                      console.log(xhr.responseText);

                    }
                });
    },
     get:function(log){
        // var datar=JSON.stringify(data);
  
            $.ajax({
                url: "ajax_getOrder.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {login:log.login,token:log.token,id:log.id,type:"all"}, 
                    //contentType: 'application/json',
                success: function(datar) {
                    store.dispatch(Actions.setOrder({action:"allOrders",orders:datar}));
                },
                error: function(xhr, status, err) {
                      console.log(xhr.responseText);

                    }
                });
  },
   getr:function(callback,route,log){
        // var datar=JSON.stringify(data);
  
            $.ajax({
                url: "ajax_getOrder.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {login:log.login,token:log.token,id:log.id,type:"all"}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       callback(route,datar);
                },
                error: function(xhr, status, err) {
                      console.log(xhr.responseText);

                    }
                });
  },
  delete:function(login,id)
  {
     $.ajax({
                url: "ajax_delCont.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {id:id,login:login.login,token:login.token}, 
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
  }
 

};
module.exports = AjaxOrder;