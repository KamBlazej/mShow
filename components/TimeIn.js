var React = require('react');
var PropTypes = React.PropTypes;
var enhanceWithClickOutside = require('react-click-outside');
import TimeInput from 'react-time-input';

var TimeIn = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
  },

  handleChange:function(e){

    this.props.handleChange(e);
    //this.props.handleChange(text);
  },

  handleClickOutside:function() {
    //console.log("clicked outside");
    this.props.blur();
  },

  render: function() {
    var time=this.props.time;
    return (
                    <TimeInput
                        initTime={time}
                        ref="TimeInputWrapper"
                        className='inputCool'
                        onTimeChange={_handleChange}
   		                />
    );
  }
});

module.exports = enhanceWithClickOutside(TimeIn);
