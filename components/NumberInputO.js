var React = require('react');
var PropTypes = React.PropTypes;


var NumberInputO = React.createClass({
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

  handleBlur: function(e) {
    var text = e.target.value.trim();
      this.props.save(text);
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
             step="1"
             autoFocus={focus}
             value={this.props.text} 
             onChange={this.handleChange}
               onBlur={this.handleBlur}

             onKeyDown={this.handleSubmit} />
    );
  }
});

module.exports = NumberInputO;
