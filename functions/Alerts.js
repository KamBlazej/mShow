var React = require('react');
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var Alerts = {
    timeout:0,
    state:{s:null, t:null, color:null},    
   /*setAlert:function(s,t,color,time,callback){
      clearTimeout(this.timeout);
      var _this=this;
      var copy=_.cloneDeep(_this.state);
      copy.s=s;
      copy.t=t;
      copy.color=color;
      //this.setState({alerts:copy});
      callback(copy);
        this.timeout = setTimeout(function(){
          var copy=_.cloneDeep(_this.state);
          copy.s=false;
          copy.t=null;
          copy.color=null;
           //_this.setState({alerts:copy});
           callback(copy);
       }, time);
    },
    */
     setAlert:function(s,t,color,time){
      clearTimeout(this.timeout);
      var _this=this;
      var copy=_.cloneDeep(_this.state);
      copy.s=s;
      copy.t=t;
      copy.color=color;
      //this.setState({alerts:copy});
      //callback(copy);
      store.dispatch(Actions.setAlert(copy));
        this.timeout = setTimeout(function(){
          var copy=_.cloneDeep(_this.state);
          copy.s=false;
          copy.t=null;
          copy.color=null;
           //_this.setState({alerts:copy});
          // callback(copy);
          store.dispatch(Actions.setAlert(copy));
       }, time);
    },
    markup: function(html) {
    return { __html: html };
    },
    show:function(alerts){
      var html=this.markup(alerts.t);
    if(alerts.s)
      {
        return <div style={{background:alerts.color}}  
        //dangerouslySetInnerHTML={{__html: html}} 
        ><p>dupa</p></div>
      }
    }
    

};

module.exports = Alerts;