var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var ContList= require('../components/ContList');
var ContForm = require('../components/ContForm');
var Login = require('../components/Login');
var ShowLogin = require('../components/ShowLogin');
var AjaxCont = require('../ajaxfunc/AjaxCont');
var AjaxLog = require('../ajaxfunc/AjaxLog');
var ActionButton = require('../components/ActionButton');
var NavMainButton = require('../components/NavMainButton');
var NavButton = require('../components/NavButton');
var Functions = require('../functions/Functions');
var Loged = require('../functions/Loged');
var ThreeT = require('../functions/ThreeT');
var ReactDOM = require('react-dom');

var ArrowLeft = require('../components/ArrowLeft');
var Alert = require('../alerts/Alert');
/////
var Charts = require('../charts/Charts');

/////
var MainMeatCategory = require('../orders/MainMeatCategory');
var LoadProducts = require('../orders/LoadProducts');
var ProdList = require('../orders/ProdList');
var OrderCalc = require('../orders/OrderCalc');
var OrderWarn = require('../orders/OrderWarn');
var OrderList = require('../orders/OrderList');
var WeeklyOrders = require('../orders/WeeklyOrders');

/////////////////////

var Assort=require('../assort/Assort');
var AddProd=require('../assort/AddProd');

var MainPrint = require('../print/MainPrint');

var $ =require('jquery');




var MeatApp = React.createClass({

      componentDidMount: function() {
        var cont=ReactDOM.findDOMNode(this.refs.ThreeT);
       ThreeT.threeTextStart2(cont);
        //AjaxLog.checkTokenStorage();
        Loged.autoLog(this.props.stateApp.login);
        //var load=LoadProducts.get();
        //store.dispatch(Actions.setBundle({prods:load}));
        window.onpopstate = function(event) {
         store.dispatch(Actions.changeRouteNoHist({r:window.event.state.page,a:window.event.state.attr}));
        }
    },

 

   route:function(){
     var _this=this;
     var state=this.props.stateApp;
      switch (state.route.r) {
        case "CONT_LIST":
        return ( <ContList state={state} parent={_this} /> );
        case "ADD_CONTRACTOR":
        return (<ContForm values={{nick:"",company:"",name:"",surname:"",city:"",mail:"",tel:""}} state={state}  type={"add"}/> );
         case "EDIT_CONTRACTOR":
          var econt=Functions.searchArr(state.contractors,"id",state.contEditID);
        return (<ContForm values={{company:econt.company,name:econt.name,surname:econt.surname,city:econt.city,mail:econt.mail,tel:econt.tel}} state={state} nick={econt.nick} idc={econt.id} type={"edit"}/> );
        case "LOGREG":
        return ( <div><div className={"floatl margr"}><Login typer={"login"} ref={"login"}/><div><ActionButton action={_this.setLog} html={"Zaloguj"}/></div></div>
        <div className={"floatl "}><Login typer={"reg"} ref={"reg"}/><div><ActionButton action={_this.setReg} html={"Zarejestruj"}/></div></div>
        </div>)
        case "MAIN_MEAT_ORDER":
        return ( <MainMeatCategory state={state}/>);
         case "PROD_LIST":
        return ( <ProdList state={state} parent={_this} id={state.catID}/>);
         case "ORDER_CALC":
        return ( <OrderCalc state={state} id={state.prodID} idc={state.catID}/>);
         case "ORDER_LIST":
        return ( <OrderList state={state} />);
         case "PRINT":
        return ( <MainPrint contractors={state.contractors} orders={state.toPrint} />);
          case "WEEKLY_ORDERS":
        return ( <WeeklyOrders state={state}/>);
          case "ASSORT":
        return ( <Assort state={state}/>);
        case "ADD_PROD":
        return ( <AddProd state={state}/>);
        case "CHARTS":
        return ( <Charts state={state}/>);
        
      }
   },
   navBar:function(){
     var _this=this;
     var state=this.props.stateApp;
     var arr;
     /////////////////////////
     if(state.login.rank==1)
     {
       var zam;
        if(state.orderc.type_temp=="EDIT")
        {
          zam={name:"Edtyuj Zamówienie", route:"MAIN_MEAT_ORDER",cancelEdit:false};
        }
        else
        {
          zam={name:"Dodaj Zamówienie", route:"MAIN_MEAT_ORDER",cancelEdit:false}
        }
      arr=[zam,{name:"Twoje Zamówienia", route:"ORDER_LIST",cancelEdit:false}];
     }
     else if(state.login.rank>1)
     {
      arr=[{name:"Lista Klientów", route:"CONT_LIST",cancelEdit:true},{name:"Lista Zamówień", route:"ORDER_LIST",cancelEdit:false},{name:"Asortyment", route:"ASSORT",cancelEdit:false},{name:"Wykresy", route:"CHARTS",cancelEdit:false}];
     }
     ////////////////////////////
     function navBarBack()
     {
       var r=state.route.r;
          switch (r) {
        case "CONT_LIST":
        return {r1:false,r2:false,r3:false};
        case "ADD_CONTRACTOR":
        return {r1:false,r2:"CONT_LIST",r3:"CONT_LIST"};
         case "EDIT_CONTRACTOR":
         return {r1:false,r2:"CONT_LIST",r3:"CONT_LIST"};
        case "MAIN_MEAT_ORDER":
        return {r1:false,r2:"CONT_LIST",r3:"CONT_LIST"};
         case "PROD_LIST":
        return {r1:"MAIN_MEAT_ORDER",r2:"MAIN_MEAT_ORDER",r3:"MAIN_MEAT_ORDER"};
         case "ORDER_CALC":
        return {r1:"PROD_LIST",r2:"PROD_LIST",r3:"PROD_LIST"};
         case "ORDER_LIST":
        return {r1:false,r2:false,r3:false};
         case "PRINT":
        return {r1:false,r2:"ORDER_LIST",r3:"ORDER_LIST"};
        case "WEEKLY_ORDERS":
        return {r1:false,r2:"ORDER_LIST",r3:"ORDER_LIST"};
        case "ASSORT":
        return {r1:false,r2:false,r3:false};
         case "ADD_PROD":
        return {r1:false,r2:"ASSORT",r3:"ASSORT"};
         case "CHARTS":
        return {r1:false,r2:false,r3:false};
        }
     }
      function renderBackButton(obj)
     {
       var rank=state.login.rank;
       var rk="r"+rank;
        if(obj[rk])
        {
          return (<ArrowLeft action={{r:obj[rk]}} status={true} />);
        }
        else
        {
          return(<ArrowLeft action={{r:obj[rk]}} />)
        }
     }
     var objBack=navBarBack();
    
     /////////////////////////////
      if(state.route.r!="LOGREG")
      {
          return( <div className={"mainNav"}>{renderBackButton(objBack)}{ arr.map(function(row,index) {
          var sel;
          row.route==state.route.r ? sel=true : sel=false;
                        return <NavMainButton html={row.name}  action={{r:row.route}} orderEdit={state.orderc.type_temp} cancelEdit={row.cancelEdit} selected={sel}/>;
                })}
                </div>
             )
      }
       
   },
   setNo:function(){

   },
   setReg:function(){
      this.refs.reg.onSend();
   },
   goToOrder:function(cont)
   {
      store.dispatch(Actions.setOrder({action:"loadCont",cont:cont}));
   },
   orderWarning:function()
   {
     var _this=this;
     var state=this.props.stateApp;
     if(state.orderc.temp_order.length>0 && state.contractors.length>0 && state.route.r=="CONT_LIST" && state.login.rank>1)
     {
       var contID=state.orderc.temp_order[0].contID;
       var cont=Functions.searchArr(state.contractors,"id",contID);
       //store.dispatch(Actions.loadOrderCont(cont));
       return (<OrderWarn cont={cont} action={_this.goToOrder}/>);
     }
      
   },
   orderWarn:function(){
       var _this=this;
     var state=this.props.stateApp;
     if(state.orderc.temp_order.length>0 && state.contractors.length>0 && state.route.r!="MAIN_MEAT_ORDER" && state.login.rank>1)
     {
       var contID=state.orderc.temp_order[0].contID;
       var cont=Functions.searchArr(state.contractors,"id",contID);
       //store.dispatch(Actions.loadOrderCont(cont));
       return <OrderWarn cont={cont} action={_this.goToOrder}/>
     }
   },
   setLog:function(){
      //store.dispatch(Actions.setLogLor("LOGIN"));
      this.refs.login.onSend();
   },
   logStatus:function(){
     var _this=this;
      var state=this.props.stateApp;
      if(state.login.s)
      {
      return  (<div className={"logStatus"}><ShowLogin login={state.login.login} token={state.login.token}/><div style={{fontFamily:"arial", fontSize:"13px"}}>Aplikacja wykonana w React JS (Redux) do przyjmowania zamówień produktów mięsnych. Proszę edytować/dodawać dane bez ograniczeń, jest to tylko aplikacja "Pokazowa".</div><div> E-mail: kamblazej@gmail.com </div></div>)
      }
   },
   markup:function(html){
      return { __html: html };
   },
    showAlert:function(){
      var _this=this;
      var state=this.props.stateApp;
    if(state.alerts.s)
      {
        var cl=state.alerts.color;
        var bg;
        var clas;
        if(cl=="error")
        {
          bg="#f71818";
          clas="showAlert alerts errorAlert";
        }
        else if(cl=="succes")
        {
          bg="#28d811";
          clas="showAlert alerts succesAlert";
        }
        else if(cl=="confirmed")
        {
          bg="#127ced";
           clas="showAlert alerts confirmedAlert";
        }
        else
        {
          bg="#28d811";
        }
        //////state.alerts.t
        //////////// var html=_this.markup(state.alerts.t);
        //return  <div className={"showAlert"} style={{minHeight:"30px"}}>
          //          <div className={clas} dangerouslySetInnerHTML={_this.markup(state.alerts.t)}  />
           //   </div>
           return <Alert clas={clas} text={state.alerts.t} show={true}/>
       
      }
      else{
        return <Alert show={false}/>
       // return <div className={"showAlert"} style={{width:"100%", height:"30px"}}></div>
      }
    },

  render: function() {
    var _this=this;
    var state=this.props.stateApp;
    var dispatch=this.props.dispatch;
    var stateApp=this.props.stateApp;
    var actions = bindActionCreators(Actions, dispatch);

    // {_this.orderWarning()}
    return (
      <div id={"wrapper"}>
        <div id="ThreeT" ref="ThreeT"></div>
        
        <div>
          {_this.logStatus()}
          {_this.orderWarn()}
        </div>
        
        {_this.navBar()}
        {_this.showAlert()}
       
        {_this.route()}
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    stateApp: state
  };
}

module.exports = connect(mapStateToProps)(MeatApp);
