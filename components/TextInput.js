var React = require('react');
var PropTypes = React.PropTypes;


var TextInput = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
  },

 /* getInitialState: function() {
    return {
      text: this.props.text || ''
    };
  },*/


  handleChange:function(e){
    this.props.handleChange(this.props.name ,e.target.value );
  },

  render: function() {
    var width="auto";
    var clas="";
    if(this.props.width)
    {
      width=this.props.width;
    }
      if(this.props.clas)
    {
      clas=this.props.clas;
    }
    return (
      <input style={{width:width}}
             type='text'
             className={clas}
             value={this.props.text} 
             onChange={this.handleChange}/>
    );
  }
});

module.exports = TextInput;
