var React = require('react');
var ReactDOM = require('react-dom');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Alerts = require('../functions/Alerts');
var Functions = require('../functions/Functions');

var ActionButton = require('../components/ActionButton');
var NumberInputO = require('../components/NumberInputO');
var NumberInputCO = require('../components/NumberInputCO');
var TextInputA = require('../components/TextInputA');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');
var AjaxAssort = require('../ajaxfunc/AjaxAssort');
import CurrencyInput from 'react-currency-input';

var PropTypes = React.PropTypes;






var ProdRow = React.createClass({
          
          
    propTypes: {
    },
     getInitialState:function(){
        return {
            edit:{p:false,a:false},
            values:{p:this.props.row.price,a:""}
        }  
    },
    amountAct:"n",
    componentDidUpdate:function(){
        if(this.state.edit.p)
        {
            var formp= ReactDOM.findDOMNode(this.refs.formprice);
            formp.elements[0].focus();
            //this.refs.price.focus();
        }
         
    },
    refresh:function(prods,dels){
        store.dispatch(Actions.setBundle({prods:prods,prodsCancel:dels}));
    },
    sAddAmount:function()
    {
         var vl=_.cloneDeep(this.state.values);        
        vl.a="";
        this.setState({values:vl});
        this.amountAct="a";
        this.editAmount();
    },
    sDelAmount:function()
    {
         var vl=_.cloneDeep(this.state.values);        
        vl.a="";
        this.setState({values:vl});
        this.amountAct="d";
        this.editAmount();
    },
    sSetAmount:function()
    {
         var vl=_.cloneDeep(this.state.values);  
        var orderc=this.props.orderc;
        var nam=Functions.cpAmount(orderc.temp_order,this.props.row);      
        vl.a=nam;
        this.setState({values:vl});
        this.amountAct="s";
        this.editAmount();
    },
     editAmount:function(){
        var ed=_.cloneDeep(this.state.edit);
        ed.a=!ed.a;
        this.setState({edit:ed});
    },
    saveAmount:function(){
        var nval;
        var row=this.props.row;
        var orderc=this.props.orderc;
       var a=this.state.values.a;
       if(a<0 || a===null || a==undefined || a==false)
       {
           a=0;
       }
       a=+a;

        if(this.amountAct=="a")
        {
            nval=parseInt(row.amount)+parseInt(a);
        }
        else if(this.amountAct=="d")
        {
            nval=parseInt(row.amount)-parseInt(a);
        }
         else if(this.amountAct=="s")
        {
             var nam=Functions.cpAmount(orderc.temp_order,this.props.row,"add",a); 
            nval=nam;
        }
                
                AjaxAssort.setV(row.id,nval,"amount",this.props.login,this.refresh);
                this.editAmount();
            
    },
     changeAmount:function(e){
        var vl=_.cloneDeep(this.state.values);
        var orderc=this.props.orderc;
        if(e<0)
        {
            e=0;
        }
        
        if(this.amountAct=="d")
        {
            var del=e;
            var nam=Functions.cpAmount(orderc.temp_order,this.props.row);
            if(e>nam)
            {
                e=nam;
            }
        }

        var sv=e.toString();
        if(sv.length>5)
        {

        }
        else
        {
        vl.a=e;
        this.setState({values:vl});
        }
       
    },
    removeProd:function(){
        AjaxAssort.setV(this.props.row.id,"d","status",this.props.login,this.refresh);
    },
     savePrice:function(event){
 
                event.preventDefault();
                var row=this.props.row;
                var p=this.state.values.p;
                if(p==0.00)
                {
                    p="0.10";
                }
                //console.log(this.refs.price.getMaskedValue());
                AjaxAssort.setV(row.id,p,"price",this.props.login,this.refresh);
                ///////////
                  var vl=_.cloneDeep(this.state.values);
                     vl.p=p;
                 var ed=_.cloneDeep(this.state.edit);
                    ed.p=!ed.p;
                this.setState({values:vl,edit:ed});
                this.editPrice();
            
    },
    changePrice:function(e){
        var vl=_.cloneDeep(this.state.values);
        vl.p=e;
        this.setState({values:vl});
    },
    editPrice:function(){
        var ed=_.cloneDeep(this.state.edit);
        ed.p=!ed.p;
        this.setState({edit:ed});
    },
    renderPrice:function(price){
        var _this=this;
        if(this.state.edit.p)
        {
            return  ( <div className={"rowProdAssortProd inputChildPrice"} style={{verticalAlign:"top"}}>
                            <form className={"noFormStyle"} ref={"formprice"} onSubmit={_this.savePrice} onBlur={_this.savePrice}>
                                <CurrencyInput ref={"price"} value={price} onChange={_this.changePrice}/>  
                            </form>
                        </div>)
        }
        else{
        return <div onClick={_this.editPrice} className={"rowProdAssortProd"} style={{width:"100px",verticalAlign:"top"}}>{price} zł/Kg</div>
        }
    },
    renderAmount:function(amount)
    {
        var _this=this;
        var char,val;
        if(_this.amountAct=="a")
        {
            char="+";
        }
        else if(_this.amountAct=="d")
        {
            char="-";
        }
        else if(_this.amountAct=="s")
        {
            char="nowa wartość";
        }
        if(this.state.edit.a)
        {
            return  ( <div className={"rowProdAssortProd"} style={{padding:"0px 8px",verticalAlign:"top",width:"280px"}}>
                         <div className="inline" style={{paddingTop:"8px",marginRight:"5px"}}> {amount} {char} </div><NumberInputCO width="100px" clas="formInput" text={_this.state.values.a} blur={_this.saveAmount} save={_this.saveAmount} handleChange={_this.changeAmount}/>
                        </div>)
        }
        else{
        return <div style={{padding:"8px",paddingTop:"4px",paddingBottom:"3px",width:"280px",verticalAlign:"top"}} className={"rowProdAssortProd"}><div className="inline" style={{width:"70px"}}> {amount} KG</div><ActionButton action={_this.sAddAmount} html={"Dodaj"} clas={"AButtonProd"} />
        <ActionButton action={_this.sDelAmount} html={"Odejmnij"} clas={"AButtonProd"} /><ActionButton action={_this.sSetAmount} html={"Ustaw"} clas={"AButtonProd"} /></div>
        }
    },
    render: function(){
        var _this=this;
        var row=this.props.row;
        var values=this.state.values;
        var clas;
        var cp="rowProdAssortProd";
        var orderc=this.props.orderc;
        var nam=Functions.cpAmount(orderc.temp_order,row);
        var font="black";
        var sclas="";
        if(_this.props.color==0)
        {
            clas="rowProdAssort1";
        }
        else{
            clas="rowProdAssort2";
        }
        if(nam==0)
        {
            clas=clas+" rowProdAssortRed";
            font="red";
        }
       // <div className={cp} >{row.cat}</div>

        return (<div className={clas}><div className={cp} style={{marginLeft:"30px",width:"150px"}}><b>{row.prod}</b></div>{_this.renderPrice(values.p)}
        <span style={{color:font}}>{_this.renderAmount(nam)}</span><div className={cp} style={{padding:"8px",paddingTop:"4px",paddingBottom:"3px",verticalAlign:"top"}}>
        <ActionButton action={_this.removeProd} html={"Wycofaj ze sprzedaży"} clas={"AButtonProdD"} /></div>
        </div>)
    }
});
module.exports = ProdRow;