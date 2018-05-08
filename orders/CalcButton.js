var React = require('react');
var CalcButton = require('./CalcButton');


var CalcButton = React.createClass({

    handleClick:function(){
        this.props.handleClick(this.props.id);
    },
    action:function(){
        this.props.action(this.props.number);
    },
    render: function(){
        var _this=this;
        return (<div className={"calcButton"} onClick={_this.action}>{_this.props.number} </div>)
    }
});
module.exports = CalcButton;