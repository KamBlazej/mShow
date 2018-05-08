var React = require('react');
var PropTypes = React.PropTypes;


var TextInputC = React.createClass({
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
      this.props.onSend(text);
    }
  },
  handleChange:function(e){
    this.props.handleChange( e.target.value,this.props.typer );
  },


  render: function() {
    var type, border;
    this.props.type ? type=this.props.type : type="text";
    var autoFocus=false;
    var clas="";
    if(this.props.autoFocus)
    {
      autoFocus=true;
    }
      if(this.props.clas)
    {
      clas=this.props.clas;
    }
   /* if(this.props.type)
    {
      type=this.props.type;
    }
    else{
      type="text";
    }*/
    return (
      <div className={clas} style={{width:"180px"}}>
      <input style={{width:"180px"}}
             type={type}
             autoFocus={autoFocus}
             value={this.props.text}
             onKeyDown={this.handleSubmit} 
             onChange={this.handleChange}/>
      </div>
    );
  }
});

module.exports = TextInputC;
