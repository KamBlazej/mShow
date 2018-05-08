var React = require('react');
var PrioritySet = require('./PrioritySet');

var PriorityBar = React.createClass({
  propTypes: {
  },
  


  render: function() {
    var _this=this;
    return (
            <div style={{position:"fixed",left:"0px",zIndex:999}}>
              {_this.props.todos.priority.map(function(item) {
              return <PrioritySet todos={_this.props.todos} key={item.level} item={item}/>
              })}
            </div>
       
    );
  }
});

module.exports = PriorityBar;