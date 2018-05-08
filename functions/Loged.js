var $ =require('jquery');
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var MD5 = require("crypto-js/md5");
var $ =require('jquery'); 
var _ = require('lodash');
var AjaxCont = require('../ajaxfunc/AjaxCont');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');
var AjaxAssort = require('../ajaxfunc/AjaxAssort');
var Functions = require('../functions/Functions');

var Loged = {
    login:function(log){
      //console.log(log);
        // store.dispatch(Actions.changeRoute("CONT_LIST"));
        //store.dispatch(Actions.setLogin({s:log.s, login:log.login, token:log.token}));
        var route;
        if(log.rank==1)
        {
            route={r:"MAIN_MEAT_ORDER",a:null};
         
        }
        else if(log.rank>1)
        {
          route={r:"CONT_LIST",a:null};
        }
        AjaxCont.getr(this.succes,this.succesOrder,route,log);
        AjaxAssort.getr(log,this.succesProd);
  },
  succesProd:function(prod,dels){
    store.dispatch(Actions.setBundle({prods:prod,prodsCancel:dels}));
  },
  succes:function(log,route,conts,callbackOrder)
  {
     var tempOrder;
        if(localStorage.order)
        {
          tempOrder=JSON.parse(localStorage.order);
          if(tempOrder.length>0)
          {
            var contID=tempOrder[0].contID;
            var cont=Functions.searchArr(conts,"id",contID);
             store.dispatch(Actions.loadOrders({orders:tempOrder,cont:cont}));
          }
          
        }
      var arrive;
        if(localStorage.arrive)
        {
          arrive=JSON.parse(localStorage.arrive);
             store.dispatch(Actions.setArrive({type:"both",t:arrive}));
          
        }
        if(log.rank==1)
        {

          //var cont=Functions.searchArr(conts,"nick",log.login);
          var cont;
          for(var i=0; i<conts.length; i++)
          {
            var item=conts[i];
            var nick = item.nick.toLowerCase();
            var logg=log.login.toLowerCase();
            if(nick==logg)
            {
              cont=item;
            }
          }
        store.dispatch(Actions.setBundle({contractors:conts,login:log}));
        store.dispatch(Actions.setOrder({action:"loadCont",cont:cont}));
        }
        else if(log.rank>1)
        {
        store.dispatch(Actions.setBundle({route:route,contractors:conts,login:log}));
        }
   
    AjaxOrder.getr(callbackOrder,route,log);
  },
  succesOrder:function(route,orders){
     store.dispatch(Actions.setOrder({action:"allOrders",orders:orders}));
  },
  autoLog:function(log){
    var route={r:"CONT_LIST",a:null};
    AjaxCont.getr(this.succesAuto,this.succesOrder,route,log);
      AjaxAssort.getr(log,this.succesProd);
  },
  succesAuto:function(log,route,conts,callbackOrder)
  {
     var tempOrder;
        if(localStorage.order)
        {
          tempOrder=JSON.parse(localStorage.order);
          if(tempOrder.length>0)
          {
            var contID=tempOrder[0].contID;
            var cont=Functions.searchArr(conts,"id",contID);
             store.dispatch(Actions.loadOrders({orders:tempOrder,cont:cont}));
          }
          
        }
      var arrive;
        if(localStorage.arrive)
        {
          arrive=JSON.parse(localStorage.arrive);
             store.dispatch(Actions.setArrive({type:"both",t:arrive}));
          
        }
        if(log.rank==1)
        {

          //var cont=Functions.searchArr(conts,"nick",log.login);
          var cont;
          for(var i=0; i<conts.length; i++)
          {
            var item=conts[i];
            var nick = item.nick.toLowerCase();
            var logg=log.login.toLowerCase();
            if(nick==logg)
            {
              cont=item;
            }
          }
        store.dispatch(Actions.setBundle({contractors:conts}));
        store.dispatch(Actions.setOrder({action:"loadCont",cont:cont}));
        }
        else if(log.rank>1)
        {
        store.dispatch(Actions.setBundle({contractors:conts}));
        }
   
    AjaxOrder.getr(callbackOrder,route,log);
  },
 

};
module.exports = Loged;