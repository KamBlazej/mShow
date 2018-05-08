var React = require('react');
var PropTypes = React.PropTypes;


var TextArea = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
  },

 /* getInitialState: function() {
    return {
      text: this.props.text || ''
    };
  },*/


  handleSubmit: function(e) {
    var text = e.target.value.trim();
    if (e.which === 13) {
        if(this.props.submit)
        {
          this.props.save(text);
        }
      
    }
  },
   handleChange:function(e){
    var text = e.target.value.trim();
    this.props.handleChange( e.target.value);
  },
  handleBlur:function(e){
    var text = e.target.value.trim();
     if(this.props.blur)
        {
          this.props.save(text);
        }
  },

  render: function() {
    var width="auto";
    var clas="";
    var rows=4;
    if(this.props.width)
    {
      width=this.props.width;
    }
      if(this.props.clas)
    {
      clas=this.props.clas;
    }
    this.props.nores ? clas=clas+" nonRes" : clas=clas;
    this.props.focus ? focus=this.props.focus : focus=false;
    this.props.rows ? rows=this.props.rows : rows=rows;
    return (
       <textarea
          style={{width:width}}
             className={clas}
             autoFocus={focus}
             rows={rows}
             value={this.props.text} 
             onChange={this.handleChange}
            onKeyDown={this.handleSubmit} 
             onBlur={this.handleBlur}
             />
      );
  }
});

module.exports = TextArea;
