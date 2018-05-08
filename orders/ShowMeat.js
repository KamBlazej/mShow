var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ShowMeatAnim = require('./ShowMeatAnim');
var Velocity = require('velocity-animate');
var TransitionGroup = require('react-addons-transition-group');
var VelocityTransitionGroup = require('velocity-transition-group');

var ShowMeat = React.createClass({
    getInitialState:function(){
        return {
            show:this.props.show
        }  
    },
    componentWillReceiveProps:function(p)
    {
        if(p.show!=this.state.show)
        {
            this.setState({show:p.show});
        }
    },
    handleClick:function(){
        this.props.handleClick(this.props.row.cat);
    },
    orderUI:function(action,prod){
        var p=null;
        if(prod)
        {
            p=prod;
        }
        this.props.orderui(action,p);
    },
    renderArrow:function(){
        var _this=this;
        var show=this.state.show;
        var src;
        if(show)
        {
            src="img/downr.png";
        }
        else{
           src="img/ar.png";
        }
        return <div className="inlinet"><img style={{width:"20px",cursor:"pointer",marginLeft:"5px"}}  src={src}/></div>
    },
    render: function(){
        var _this=this;
        var show=this.state.show;
        /*  */
        return (<div style={{cursor:"pointer", border:"solid 2px black", borderRadius:"12px",padding:"15px",width:"340px"}} onClick={_this.handleClick}>
                    <div className={"inlinet"}>{_this.props.row.cat}</div>{_this.renderArrow()}
                     <TransitionGroup>
                         { this.state.show ? <ShowMeatAnim orderProd={_this.props.orderProd} editer={_this.props.editer} soEdit={_this.props.soEdit} prods={_this.props.row.prods} orderc={this.props.orderc} orderui={_this.orderUI}/> : null }
                     </TransitionGroup>
                </div>)
    }
});
module.exports = ShowMeat;