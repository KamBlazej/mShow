var React = require('react');
var PropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var NavMainButton = React.createClass({
  propTypes: {
    html: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired
  },


    handleClick: function() {
      var edit=this.props.orderEdit;
      if(edit=="EDIT" && this.props.cancelEdit)
      {
        store.dispatch(Actions.changeRouteCE(this.props.action));
      }
      else
      {
        store.dispatch(Actions.changeRouteAttr(this.props.action));
      }    
  },

  render: function() {
    var clas;
    var _this=this;
    if(_this.props.selected)
    {
      clas="mainNavSel"
    }
    else{
       clas="mainNavNon"
    }
    return (
          <div className={clas}>
                <div onClick={this.handleClick}>{this.props.html}</div>
          </div>
    );
  }
});

module.exports = NavMainButton;