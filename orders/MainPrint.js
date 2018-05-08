var React = require('react');
var Functions = require('../functions/Functions');
var NumberInput = require('../components/NumberInput');
var ActionButton = require('../components/ActionButton');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var PrintPage = require('./PrintPage');


var MainPrint = React.createClass({
    getInitialState:function(){
        return {
            pages:[{rows:[{childs:[]}]}],
            row:0,
            childs:this.props.orders,
            remaining:this.props.orders
        }  
    },
 

    render: function(){
        var _this=this;
        var state=this.props.state;
       
        return (<div>
                {pages.map(function(page,index){
                        return <PrintPage rows={_this.state.pages[index].rows} key={index} remaining={_this.state.remaining}/>
                    })
                }
        </div>)
    }
});
module.exports = MainPrint;