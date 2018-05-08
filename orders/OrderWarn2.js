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
        return (<div style={{marginTop:"20px", marginBottom:"20px", padding:"5px", borderBottom:"2px solid black" , borderTop:"2px solid black",cursor:"pointer"}} onClick={_this.goToOrder}>Zamówienie Klienta <b> {cont.name} {cont.surname} </b> nie zostało ukończone, kliknij tutaj aby je dokończyć</div>)
    }
});
module.exports = OrderWarn;