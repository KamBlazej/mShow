var React = require('react');
var ReactDOM = require('react-dom');

var OptionComp = React.createClass({
  render: function()  {
    var item = this.props.item;

    return (
      <div style={{background:item.color}}>
      
        {item.label }
      </div>);
  }
})

module.exports = OptionComp;