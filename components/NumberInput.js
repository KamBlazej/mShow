var React = require('react');
var PropTypes = React.PropTypes;


var NumberInput = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.number,
  },

  handleChange:function(e){
    var ne=e.target.value;
    this.props.handleChange(ne);
  },

  render: function() {
    var clas="";
     if(this.props.clas)
    {
      clas=this.props.clas;
    }

    return (
      <input 
             type='number'
             step="1"
             className={clas}
             value={this.props.text} 
             onChange={this.handleChange}/>
    );
  }
});

module.exports = NumberInput;
