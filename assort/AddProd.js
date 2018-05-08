var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Alerts = require('../functions/Alerts');
var Functions = require('../functions/Functions');

var ActionButton = require('../components/ActionButton');
var TextInputA = require('../components/TextInputA');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');
var AjaxAssort = require('../ajaxfunc/AjaxAssort');

var DropdownList = require('react-widgets').DropdownList
require('react-widgets/dist/css/react-widgets.css');

import CurrencyInput from 'react-currency-input';

var PropTypes = React.PropTypes;






var AddProd = React.createClass({
          
          
    propTypes: {
        state: PropTypes.object.isRequired,
    },
     getInitialState:function(){
        return {
           cat:this.props.state.prodCats[0],
           prod:"",
           amount:0,
           price:"0.00"
        }  
    },
    changeCat:function(val)
    {
        this.setState({cat:val});
    },
     changeName:function(e)
    {
        var a=e.target.value;
        
        if(a<0)
        {
            a=0;
        }
          var sv=a.toString();
          sv = sv.replace(/\s\s+/g, ' ');
             
          
        if(sv.length>30)
        {

        }
        else
        {
             while(a.charAt(0) == ' ')
            {
            a = a.substr(1);
            }
            var uc=a.substring(0,1);
            a = a.replace(/\s\s+/g, ' ');
              a = a.substr(1);
            uc=uc.toUpperCase();
            a=uc+""+a;

        this.setState({prod:a});
        }
        //this.setState({prod:e.target.value});
    },
      changePrice:function(e)
    {
        
        this.setState({price:e});
    },
        changeAmount:function(e)
    {
        var a=e.target.value;
        if(a<0)
        {
            a=0;
        }
          var sv=a.toString();
        if(sv.length>5)
        {

        }
        else
        {
        this.setState({amount:a});
        }
        
    },
    fixAmount:function(){
        var a=this.state.amount;
        if(a<0 || a===null || a==undefined || a==false)
        {
            a=0;
        }
        a=+a;
        this.setState({amount:a});
    },
    sendForm:function()
    {
        var login=this.props.state.login;
        var pr=this.state.prod;
         while(pr.charAt(0) == ' ')
          {
          pr = pr.substr(1);
         }
       
         pr=pr.trim();
        var prod={prod:pr,cat:this.state.cat,amount:this.state.amount,price:this.state.price};
        store.dispatch(Actions.setBundle({disabled:true}));
        AjaxAssort.addProd(login,prod,this.getProds,this.callDis,this.callExist);
    },
    callExist:function(){
        store.dispatch(Actions.setBundle({disabled:false}));
        Alerts.setAlert(true,"Podany produkt już istnieje", "error",10000);
    },
    callDis:function(){
         store.dispatch(Actions.setBundle({disabled:false}));
    },
    getProds:function(prods,dels)
    {
        Alerts.setAlert(true,"Dodano produkt  "+this.state.prod+"  do asortymentu", "confirmed",10000);
        store.dispatch(Actions.setBundle({prods:prods,prodsCancel:dels,disabled:false}));
        this.setState({prod:"",amount:0,proce:"0.00"});
    },
    checkForm:function(){
        var alert="";
        var check=true;
        var exist=false;
        var prods=this.props.state.prods;
        var prodsCancel=this.props.state.prodsCancel;
        var arr= prods.concat(prodsCancel);

        for(var i=0; i<arr.length; i++)
        {
            var prod=arr[i];
            if(prod.cat==this.state.cat && prod.prod==this.state.prod)
            {
                exist=true;
                break;
            }
        }
        if(exist)
        {
            check=false;
            alert=alert+" Podany produkt już istnieje";
        }
        else if(this.state.prod.length>30)
        {
            check=false;
            alert=alert+" Nazwa produktu nie może być dłuższa niż 30 znaków";
        }
        else if(this.state.prod.length<3)
        {
             check=false;
            alert=alert+" Nazwa produktu musi zawierać conajmniej 3 znaki";
        }
         if(this.state.price==0 || this.state.price=="0.00" || this.state.price=="0")
        {
             check=false;
            alert=alert+" Cena produktu nie może być równa zeru";
        }
        if(check)
        {
            if(!this.props.state.disabled)
            {
            this.sendForm();
            }
            
        }
        else{
            Alerts.setAlert(true,alert, "error", 10000);
        }

    },
    addProd:function(id){
        store.dispatch(Actions.setBundle({route:{r:"ADD_PROD"}}));
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var cats=state.prodCats;
          var widget =(
            <DropdownList data={cats}
            //textField='text'
            //valueField='value'
            onChange={_this.changeCat}
            defaultValue={_this.state.cat}
            />
        )
        return (
        <div>
            <div style={{width:"300px"}}>
                    <div>Kategoria: {widget} </div> 
                    <div>
                        Nazwa Produktu
                        <div>
                        <input className={"inputCool"}
                        type='text'
                        value={_this.state.prod} 
                        onChange={_this.changeName}/>
                        </div>
                    </div>
                    <div>
                        Cena Produktu
                        <div className={"inputCoolChild"}>
                            <CurrencyInput value={_this.state.price} onChange={_this.changePrice}/>  
                        </div>
                    </div>
                    <div>
                        Dostępność produktu w kilogramach
                        <div>
                            <input className={"inputCool"}
                            type='number'
                            value={_this.state.amount} 
                            onChange={_this.changeAmount}
                            onBlur={_this.fixAmount}/>
                            
                        </div>
                    </div>
                    <ActionButton html={"Dodaj Produkt"} action={_this.checkForm}/>

            </div>
    
         
        </div>)
    }
});
module.exports = AddProd;