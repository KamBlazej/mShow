var React = require('react');
var PropTypes = React.PropTypes;


var TextInputA = React.createClass({
  propTypes: {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
  },

  getInitialState: function() {
    return {
      text: this.props.text || ''
    };
  },

  handleSubmit: function(e) {
    var text = e.target.value.trim();
    if (e.which === 13) {
      this.props.save(text);
    }
  },
  handleChange:function(e){
    var text = e.target.value.trim();
    this.props.handleChange( e.target.value);
  },
  handleBlur:function(e){
    var text = e.target.value.trim();
    this.props.save(text);
  },


  render: function() {
    var type, border, width, focus;
    this.props.type ? type=this.props.type : type="text";
    this.props.border ? border=this.props.border : border="none";
    this.props.width ? width=this.props.width : width="150px";
    this.props.focus ? focus=this.props.focus : focus=false;
   /* if(this.props.type)
    {
      type=this.props.type;
    }
    else{
      type="text";
    }*/
    return (
      <div style={{border:border, width:width}}>
      <input style={{width:width}}
             type={type}
             autoFocus={focus}
             value={this.props.text}
             onKeyDown={this.handleSubmit} 
             onBlur={this.handleBlur}
             onChange={this.handleChange}/>
             
      </div>
    );
  }
});

module.exports = TextInputA;
