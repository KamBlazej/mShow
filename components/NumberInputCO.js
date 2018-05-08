var React = require('react');
var PropTypes = React.PropTypes;
var enhanceWithClickOutside = require('react-click-outside');

var NumberInputCO = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.number,
  },

  handleChange:function(e){
    var text = e.target.value.trim();
    var ne=text;
    this.props.handleChange(ne);
    //this.props.handleChange(text);
  },
   handleSubmit: function(e) {
    var text = e.target.value.trim();
    if (e.which === 13) {
      this.props.save(text);
    }
  },

  handleClickOutside:function() {
    //console.log("clicked outside");
    this.props.blur();
  },

  render: function() {
    var clas="";
    var focus=true;
    if(this.props.clas)
    {
      clas=this.props.clas;
    }
    if(this.props.focus)
    {
      focus=this.props.focus;
    }
    return (
      <input className={clas}
              style={{width:this.props.width}}
             type='number'
             autoFocus={focus}
             value={this.props.text} 
             onChange={this.handleChange}
             step="1"
             onKeyDown={this.handleSubmit} />
    );
  }
});

module.exports = enhanceWithClickOutside(NumberInputCO);
