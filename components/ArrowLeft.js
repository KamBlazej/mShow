var React = require('react');
var PropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var ArrowLeft = React.createClass({
  propTypes: {
    action: PropTypes.func.isRequired
  },


    handleClick: function() {
      var _this=this;
        if(_this.props.status)
      {
        store.dispatch(Actions.changeRouteAttr(_this.props.action));
      }
        
    },

  render: function() {
    var color;
    var _this=this;
    var clas="";
    var src="img/al.jpg";
    var opacity="0.2";
    var cursor="default";
    if(_this.props.status)
    {
      opacity="1.0";
      cursor="pointer";
    }

    return (
          <div className={clas} style={{marginLeft: 10 + 'px', display:"inline-block"}}>
              
                <img onClick={this.handleClick} style={{width:"40px",verticalAlign:"top",opacity:opacity,cursor:cursor}}  src={src}/>
     
          </div>
    );
  }
});

module.exports = ArrowLeft;