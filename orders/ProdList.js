var React = require('react');
var ReactDOM = require('react-dom');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Functions = require('../functions/Functions');

var ProdTopBar = require('./ProdTopBar');
var MeatProd = require('./MeatProd');



var ProdList = React.createClass({

    handleClick:function(id){
        store.dispatch(Actions.setBundle({route:{r:"ORDER_CALC"},prodID:id,catID:this.props.id}));
    },
     parentWidth:function(){
            var parent=this.props.parent;
            return ReactDOM.findDOMNode(parent).offsetWidth;
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var catp=Functions.searchArr(state.prods,"id",_this.props.id);
        var wid=_this.parentWidth();
        var divide;
        if(wid>500)
        {
            divide=2;
        }
        else if(wid<501)
        {
            divide=3;
        }

        return (<div>
            <ProdTopBar state={state} route={{r:"MAIN_MEAT_ORDER"}}/>
           {catp.prods.map(function(row,index) {
               var color=index%divide;
                        return <MeatProd name={row.name} color={color} id={row.id} handleClick={_this.handleClick}/>;
            })}
                     </div>)
    }
});
module.exports = ProdList;