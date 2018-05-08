var React = require('react');
var PropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var NavButton = React.createClass({
  propTypes: {
    html: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired
  },


    handleClick: function() {
        store.dispatch(Actions.changeRouteAttr(this.props.action));
  },

  render: function() {
    var color;
    if(this.props.color)
    {
      color=this.props.color;
    }
    else{
      color="white";
    }
    return (
          <div style={{marginLeft: 10 + 'px', display:"inline-block", background:color, border:"1px solid black", cursor:"pointer"}}>
                <div onClick={this.handleClick}>{this.props.html}</div>
          </div>
    );
  }
});

module.exports = NavButton;