var React = require('react');
var ColorButton= require('./ColorButton');
var actions = require('../actions/TodoActions');
var store = require('../stores/todos');
var enhanceWithClickOutside = require('react-click-outside');

var PriorityColorBox = React.createClass({
  propTypes: {
  },
  handleColor:function(id,color){
      store.dispatch(actions.priorityColor(id,color));
  },

 handleClickOutside() {
    this.props.hide();
  },
  render: function() {
    var _this=this;
    return (
            <div style={{display:_this.props.colorP.show}}>
              {this.props.todos.colors.map(function(color,index) {
              return <ColorButton key={index} handle={_this.handleColor} getid={_this.props.item.level} color={color} getcolor={_this.props.item.color}/>;
              })}
            </div>
       
    );
  }
});
module.exports = enhanceWithClickOutside(PriorityColorBox);
//module.exports = PriorityColorBox;