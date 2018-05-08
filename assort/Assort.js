var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Alerts = require('../functions/Alerts');
var Functions = require('../functions/Functions');

var ActionButton = require('../components/ActionButton');
var TextInputA = require('../components/TextInputA');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');

var PropTypes = React.PropTypes;

var ProdRow = require('./ProdRow');
var EditProd = require('./EditProd');
var AddProd = require('./AddProd');
var RestoreProd = require('./RestoreProd');




var Assort = React.createClass({
          
          
    propTypes: {
        state: PropTypes.object.isRequired,
    },
     getInitialState:function(){
        return {
            
        }  
    },
    sEdit:function(){
        this.changeRoute("EDIT");
    },
     sAdd:function(){
        this.changeRoute("ADD");
    },
     sRestore:function(){
        this.changeRoute("RESTORE");
    },
    changeRoute:function(r)
    {
        store.dispatch(Actions.setBundle({assortTab:r}));
    },
    renderTop:function(){
        var assortTab=this.props.state.assortTab;
        var arr=[{name:"EDIT",link:this.sEdit,text:"Lista Produktów"},{name:"RESTORE",link:this.sRestore,text:"Wycofane Produkty"},{name:"ADD",link:this.sAdd,text:"Dodaj Produkt"}];
        var narr=[];
        for(var i=0; i<arr.length; i++)
        {
            var item=arr[i];
            if(assortTab!==item.name)
            {
                item.clas="ActionButtonSel ActionButtonNonS";
            }
            else
            {
                item.clas="ActionButtonSel ActionButtonSelS";
            }
            narr.push(item);
        }
        return(<div style={{marginTop:"8px"}}>
            {
                 narr.map(function(row,index) {                  
                    return <ActionButton action={row.link} clas={row.clas} html={row.text}/>;
                })
            }
        
        </div>);
    },
    renderPage:function(){
        var _this=this;
        var route=this.props.state.assortTab;
                switch (route) {
                case "EDIT":
                return ( <EditProd state={_this.props.state} type={"edit"}/> );
                case "ADD":
                return ( <AddProd state={_this.props.state} /> );
                case "RESTORE":
                return ( <EditProd state={_this.props.state} type={"restore"} /> );
            }
    },
    render: function(){
        var _this=this;
        return (<div> {_this.renderTop()}{_this.renderPage()} </div>)
    }
});
module.exports = Assort;