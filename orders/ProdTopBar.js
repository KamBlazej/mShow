var React = require('react');

var NavButton = require('../components/NavButton');




var ProdTopList = React.createClass({

    renderNavButton:function()
    {
     if(this.props.route)
     {
         return <NavButton action={this.props.route} html={"Powrót"}/>
     }
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var route=this.props.route;

        return (<div>
                    <div style={{padding:"12px", borderRadius:"12px",background:"#7c7677", color:"white",border:"2px solid black", marginBottom:"20px"}}>
                       <i>"{state.orderc.cont.nick}" </i> <b>{state.orderc.cont.name} {state.orderc.cont.surname}</b> {state.orderc.cont.company} {state.orderc.cont.city} E-mail: {state.orderc.cont.mail} TEL: {state.orderc.cont.tel}</div>

                </div>)
    }
});
module.exports = ProdTopList;