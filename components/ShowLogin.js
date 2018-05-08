var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var Alerts = require('../functions/Alerts');
var ActionButton = require('./ActionButton');

var ShowLogin = React.createClass({
    markup:function(html){
      return { __html: html };
   },
   logout:function(){
         store.dispatch(Actions.changeRoute("LOGREG"));
        store.dispatch(Actions.setLogin({s:false, login:"", token:""}));
        Alerts.setAlert(true, "Zostałeś pomyślnie wylogowany", "succes", 15000);
   },
    render: function(){
        var _this=this;
        var text="Witaj <b>"+this.props.login+"</b> ";
        ///<ActionButton action={_this.logout} html={"WYLOGUJ"} />
        return (<div><div className={"inline"} dangerouslySetInnerHTML={_this.markup(text)}/></div>)
    }
});
module.exports = ShowLogin;