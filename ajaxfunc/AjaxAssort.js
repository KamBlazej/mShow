var $ =require('jquery');
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var AjaxAssort = require('../ajaxfunc/AjaxAssort');
var store = require('../stores/stateApp');

var AjaxAssort = {
           addProd:function(login,prod,callback,callDis,callExist)
            {
            $.ajax({
                url: "ajax_addProd.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {login:login.login,token:login.token,cat:prod.cat,prod:prod.prod,price:prod.price,amount:prod.amount}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       //callback(login,route,datar);
                       //console.log(datar);
                       if(datar.result=="succes")
                       {
                        callback(datar.prods,datar.dels);
                       }
                       else if(datar.result=="exist")
                       {
                           callExist();
                       }
                       
                },
                error: function(xhr, status, err) {
                    callDis();
                     console.log(xhr.responseText);

                    }
                });
            },
            getr:function(login,callback){
                $.ajax({
                url: "ajax_getProd.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: login, 
                    //contentType: 'application/json',
                success: function(datar) {
                       //callback(login,route,datar);
                       //console.log(datar);
                       if(datar.result=="succes")
                       {
                        callback(datar.prods,datar.dels);
                       }
                       
                },
                error: function(xhr, status, err) {
                    callerr();
                     console.log(xhr.responseText);

                    }
                });
            },
             setV:function(id,value,type,login,callback){
                $.ajax({
                url: "ajax_setProdVal.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {id:id,value:value,type:type,login:login.login,token:login.token}, 
                    //contentType: 'application/json',
                success: function(datar) {
                       //callback(login,route,datar);
                
                       if(datar.result=="succes")
                       {
                        callback(datar.prods,datar.dels);
                       }
                       
                },
                error: function(xhr, status, err) {
                     console.log(xhr.responseText);

                    }
                });
            }
    
 

};
module.exports = AjaxAssort;