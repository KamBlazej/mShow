var assign = require('object-assign');
var types = require('../constants/ActionTypes');
var createStore = require('redux').createStore;
var update  = require('immutability-helper');
var Functions = require('../functions/Functions');
var _ = require('lodash');
var $ =require('jquery');

var initialState = {
    route:{r:"CONT_LIST"},
    contractors:[],
    contsAll:[],
    login:{s:true,login:"admin123",token:"MZNImKgmJIZno0l3ctCX",id:4,level:3,rank:3},
    alerts:{s:false,t:null,color:null},
    pageContList:0,
    orderc:{s:false,type_temp:null,cont:false,temp_order:[],temp_edit:[],editID:null, orders:[],arrive:{t:null,d:null}},
    soEdit:null,
    prods:[],
    prodsCancel:[],
    toPrint:null,
    catID:null,
    prodID:null,
    ordersDate:"TODAY",
    contEditID:null,
    filterCont:"",
    filterContSelect:"all",
    prodCats:["Wieprzowina","Wołowina","Cielęcina","Kurczak","Indyk","Kaczka","Gęś","Inne"],
    assortTab:"EDIT",
    orderuiPos:{x:null,y:150,w:300,h:350},
    chartSet:{days:"all",type:"cats"},
    disabled:false

        
    
};

	

function stateApp(state, action) {
  
  function hist(r){
   window.history.pushState(
            { page: r },
            r,
            '/'
            );
  }
  function mergo(arr)
  {
      var arr=_.cloneDeep(arr);
      var narr=[];
    for(var i=0; i<arr.length; i++)
    {
        var item=arr[i];
        if(i==0)
        {
            narr.push(item);
        }
        else
        {
            narr=checkMerge(item,narr);
        }  
    }
    return narr;
  }
  function checkMerge(item,arr)
  {
      var dop=true;
    for(var i=0; i<arr.length; i++)
    {
        var ar=arr[i];

        if(item.product===ar.product && item.category===ar.category)
        {
            ar.amount=parseInt(ar.amount)+parseInt(item.amount);
            dop=false;
        }

    }
    if(dop)
    {
        arr.push(item);
    }
    return arr;
  }

  state = state || initialState
  switch (action.type) {
     //// ustaw rzeczy zwiazane z orderc
    case "SET_ORDER":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
        if(obj.action=="newCont")
        {
        copy.orderc.temp_order=[];
        copy.orderc.s=true;
        copy.orderc.cont=obj.cont;
        copy.orderc.temp_type="ADD";
        copy.route.r="MAIN_MEAT_ORDER";
            hist("MAIN_MEAT_ORDER");
        }
        else if(obj.action=="loadCont")
        {
        copy.orderc.s=true;
        copy.orderc.cont=obj.cont;
        copy.route.r="MAIN_MEAT_ORDER";
            hist("MAIN_MEAT_ORDER");
        }
        else if(obj.action=="delCont")
        {
            var orders=[];
        copy.orderc.s=false;
        copy.orderc.cont=null;
        copy.orderc.temp_order=orders;
        localStorage.order=JSON.stringify(orders);
        }
      else if(obj.action=="delOrders")
        {
            var orders=[];
            var at=null;
            var ad=null;
            var arr={d:ad, t:at};
        copy.orderc.temp_order=orders;
        copy.orderc.arrive.t=at;
        copy.orderc.arrive.d=ad;
        localStorage.order=JSON.stringify(orders);
        localStorage.arrive=JSON.stringify(arr);
        }
        else if(obj.action=="delOrdersE")
        {
            var orders=[];
            var at=null;
            var ad=null;
            var arrive;
            if(localStorage.arrive)
            {
                arrive=JSON.parse(localStorage.arrive);
                at=arrive.t;
                ad=arrive.d;
            }

            var arr={d:ad, t:at};
        copy.orderc.temp_edit=orders;
        copy.orderc.arrive.t=at;
        copy.orderc.arrive.d=ad;
        copy.orderc.type_temp="ADD";
        copy.route.r="ORDER_LIST";
        }
        else if(obj.action=="allOrders")
        {
        copy.orderc.orders=obj.orders;
         }
      else if(obj.action=="startEdit")
        {
            var order;
            for(var i=0; i<copy.orderc.orders.length; i++)
            {
                var or=copy.orderc.orders[i];
                if(or.info.id==obj.id)
                {
                    order=or;
                }
            }
        var cont=Functions.searchArr(copy.contractors,"id", order.info.contID);
        copy.orderc.type_temp="EDIT";
        copy.orderc.editID=obj.id;
        copy.orderc.arrive={t:order.info.arriveT,d:order.info.arriveD};
        copy.orderc.temp_edit=order.orders;
        var ord=_.cloneDeep(order.orders);
        copy.soEdit=ord;
        copy.orderc.cont=cont;
         copy.route.r="MAIN_MEAT_ORDER";
            hist("MAIN_MEAT_ORDER");
        }
    
    
    
    return copy;
    //// ustaw produkty
         case "SET_PRODS":
    var copy=_.cloneDeep(state);
    var arr=action.arr;
     copy.prods=[];
        for(var i=0; i<arr.length; i++)
        {
            copy.prods.push(arr[i]);
        }
    return copy;
       //// ustaw produkty wycofane
         case "SET_PRODS_CANCEL":
    var copy=_.cloneDeep(state);
    var arr=action.arr;
     copy.prodsCancel=[];
        for(var i=0; i<arr.length; i++)
        {
            copy.prodsCancel.push(arr[i]);
        }
    return copy;
    //// wstaw z bazy danych
    case "ADD_CONTRACTOR":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
    for(var i=0; i<obj.length; i++)
    {
        var item=obj[i];
        copy.contractors.push({name:item.name,city:item.city});
    }
    
    return copy;
     //// DODAJ NOWY PRODUKT DO ZAMÓWIENIA
    case "ADD_ORDER":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
    var order;
    if(obj.type=="EDIT")
    {
        order=obj.order;
         copy.orderc.temp_edit.push(order);
         copy.orderc.temp_edit=mergo(copy.orderc.temp_edit);
            copy.route.r="MAIN_MEAT_ORDER";
        hist("MAIN_MEAT_ORDER");
    }
    else
    {
        order=obj.order;
        copy.orderc.temp_order.push(order);
        copy.orderc.temp_order=mergo(copy.orderc.temp_order);
        copy.route.r="MAIN_MEAT_ORDER";
        hist("MAIN_MEAT_ORDER");
        if(localStorage.order)
        {
            var orderLoc=JSON.parse(localStorage.order);
            if(orderLoc.length>0)
            {
                if(orderLoc[orderLoc.length-1].contID!=obj.order.contID)
                {
                    orderLoc=[];
                }
            }
            orderLoc=copy.orderc.temp_order;
            localStorage.order=JSON.stringify(orderLoc);
        }
        else{
            var orderLoc=copy.orderc.temp_order;
            localStorage.order=JSON.stringify(orderLoc);
        }
    }
    
 
    
    return copy;
       //// podmień tymczasowe zamówienia
         case "UPDATE_TEMP_ORDER":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
    

        if(obj.type=="EDIT")
        {
            copy.orderc.temp_edit=[];
            for(var i=0; i<obj.orders.length; i++)
                {
                    copy.orderc.temp_edit.push(obj.orders[i]);
                }
                copy.orderc.temp_edit=mergo(copy.orderc.temp_edit);
        }
        else{
             copy.orderc.temp_order=[];
            for(var i=0; i<obj.orders.length; i++)
                {
                    copy.orderc.temp_order.push(obj.orders[i]);
                }
                copy.orderc.temp_order=mergo(copy.orderc.temp_order);
        localStorage.order=JSON.stringify(copy.orderc.temp_order);
        }
        
    return copy;
     //// wczytaj tymczasowe zamówienia
         case "LOAD_ORDERS":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
     copy.orderc.temp_order=[];
        for(var i=0; i<obj.orders.length; i++)
        {
            copy.orderc.temp_order.push(obj.orders[i]);
        }
        copy.orderc.cont=obj.cont;
        copy.orderc.s=true;
    
    return copy;

       //// ustawienie strony w contractor list
         case "SET_CONT_LIST_PAGE":
    var copy=_.cloneDeep(state);
    var page=action.page;
    copy.pageContList=page;
    
    return copy;
      //// ustawienie arrive w orders
         case "SET_ARRIVE":
    var copy=_.cloneDeep(state);
    var set=action.set;
    if(set.type=="both")
    {
      copy.orderc.arrive=set.t;   
    }
    else{
        copy.orderc.arrive[set.type]=set.t;
    }
    
    if(set.ls)
    {
    }
    else{
    localStorage.arrive=JSON.stringify(copy.orderc.arrive);
    }
    
    return copy;
       //// ustawienie kilku obiektów jednocześnie
    case "SET_BUNDLE":
    var copy=_.cloneDeep(state);

    var obj=action.obj;
     Object.keys(obj).map(function(key,index) {
        var value=obj[key];
        if(key=="orders")
        {
         copy.orderc.orders=value;
        }
        else if(key=="contractors")
        {
            copy.contractors=[];
            copy.contsAll=[];
            for(var i=0; i<value.length; i++)
            {
                var item=value[i];
                if(item.status=="a")
                {
                    copy.contractors.push(item);
                }
                copy.contsAll.push(item);
            }
        }
        else
        {
        copy[key]=value;
        }
        
        if(key=="login")
        {
            localStorage.login=JSON.stringify(value);
        }
        if(key=="route")
        {
           hist(value.r);
        }
    })
    return copy;
       //// wstaw z bazy danych wszystkich kontrahentów
    case "GET_CONTRACTORS":
    var copy=_.cloneDeep(state);
    copy.contsAll=[];
    copy.contractors=[];
    var obj=action.obj;
    for(var i=0; i<obj.length; i++)
    {
        var item=obj[i];
        item.dragged=false;
        if(item.status=="a")
        {
          copy.contractors.push(item);  
        }
        copy.contsAll.push(item);
    }
    
    return copy;
       //// zmień logowanie/rejestracje
    case "SET_LOG_LOR":
    var copy=_.cloneDeep(state);
    copy.login.lor=action.set;
    
    return copy;
         //// ustaw alerty
    case "SET_ALERT":
    var copy=_.cloneDeep(state);
    copy.alerts=action.set;
    
    return copy;
    //// ustaw login
    case "SET_LOGIN":
    var copy=_.cloneDeep(state);
    copy.login=action.set;
    localStorage.login=JSON.stringify(action.set);
    //JSON.stringify(action.set);
    
    return copy;
    ///////////// zmień routing
     case "CHANGE_ROUTE":
    var copy=_.cloneDeep(state);
    var route=action.route;
    copy.route.r=route;
        hist(route);
    
    return copy;
     ///////////// zmień routing i attrybuty
     case "CHANGE_ROUTE_ATTR":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
    copy.route=obj;
        hist(obj.r);
    
    return copy;
       ///////////// zmień routing i attrybuty i usuń edit order
     case "CHANGE_ROUTE_CE":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
    copy.route=obj;
      var orders=[];
            var at=null;
            var ad=null;
            var arrive;
            if(localStorage.arrive)
            {
                arrive=JSON.parse(localStorage.arrive);
                at=arrive.t;
                ad=arrive.d;
            }

            var arr={d:ad, t:at};
        copy.orderc.temp_edit=orders;
        copy.orderc.arrive.t=at;
        copy.orderc.arrive.d=ad;
        copy.orderc.type_temp="ADD";
        hist(obj.r);
    
    return copy;
      ///////////// zmień routing i attrybuty bez wpisu do histori
     case "CHANGE_ROUTE_NO_HIST":
    var copy=_.cloneDeep(state);
    var obj=action.obj;
    copy.route=obj;
    
    return copy;
   

  default:
    return state;
  }
}

module.exports = createStore(stateApp, initialState);
