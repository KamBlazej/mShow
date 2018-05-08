var React = require('react');
var ReactDOM = require('react-dom');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Alerts = require('../functions/Alerts');
var Functions = require('../functions/Functions');

var ActionButton = require('../components/ActionButton');
var NumberInputO = require('../components/NumberInputO');
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

        }  
    },
 
   
    refresh:function(prods,dels){
        store.dispatch(Actions.setBundle({prods:prods,prodsCancel:dels}));
    },
    restoreProd:function(){
        AjaxAssort.setV(this.props.row.id,"a","status",this.props.login,this.refresh);
    },

    render: function(){
        var _this=this;
        var row=this.props.row;
        var clas;
        var cp="rowProdAssortProd";
        var orderc=this.props.orderc;
        var nam=Functions.cpAmount(orderc.temp_order,row);
        if(_this.props.color==0)
        {
            clas="rowProdAssort1";
        }
        else{
            clas="rowProdAssort2";
        }
       // <div className={cp} >{row.cat}</div>

        return (<div className={clas}><div className={cp} style={{marginLeft:"30px",width:"150px"}}><b>{row.prod}</b></div><div className={"rowProdAssortProd"} style={{width:"100px"}}>{row.price} zł/Kg</div>
        <div className={"rowProdAssortProd"} style={{width:"100px"}}>{nam} Kg</div><div className={cp} style={{padding:"8px",paddingTop:"4px",paddingBottom:"3px",verticalAlign:"top"}}><ActionButton action={_this.restoreProd} html={"Przywróć do Sprzedaży"} clas={"AButtonProdR"} /></div></div>)
    }
});
module.exports = ProdRow;