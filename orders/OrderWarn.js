var React = require('react');

var OrderWarn = React.createClass({
    getInitialState:function(){
        return {
        }  
    },
    goToOrder:function(){
        this.props.action(this.props.cont);
    },
    render: function(){
        var _this=this;
        var cont=this.props.cont;
        return (<div onClick={_this.goToOrder} className={"orderWarn"}> <span style={{color:"red",fontWeight:"bold"}}>!!!</span> Zamówienie Klienta <b> {cont.name} {cont.surname} </b> nie zostało ukończone, kliknij tutaj aby je ukończyć <span style={{color:"red",fontWeight:"bold"}}>!!!</span></div>);
    }
});
module.exports = OrderWarn;