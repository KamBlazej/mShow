    
var React = require('react');
var AlertAnim = require('./AlertAnim');
var Velocity = require('velocity-animate');
var TransitionGroup = require('react-addons-transition-group');
var VelocityTransitionGroup = require('velocity-transition-group');

var Alert = React.createClass({
    getInitialState:function(){
        return {
            show:this.props.show
        }  
    },
    componentWillReceiveProps:function(p){
        if(p.show!=this.state.show)
        {
            this.setState({show:p.show});
        }
    },
    render: function(){
        var _this=this;
        var show=this.state.show;
        var clas=this.props.clas;
        var text=this.props.text;
        /*  */
        return (<div className={"showAlert"} style={{minHeight:"30px", width:"100%"}}>
                     <TransitionGroup>
                         { this.state.show ? <AlertAnim clas={this.props.clas} text={this.props.text} /> : null }
                     </TransitionGroup>
                </div>)
    }
})
module.exports = Alert;