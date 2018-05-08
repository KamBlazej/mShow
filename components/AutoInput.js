var React = require('react');
var PropTypes = React.PropTypes;
import Autosuggest from 'react-autosuggest';
import Autocomplete from 'react-autocomplete';



var AutoInput = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
  },
  getInitialState: function() {
    return {
        value: this.props.text,
      sug: this.props.sug
    };
  },
  componentWillReceiveProps:function(p){
    if(p.text!=this.state.text || p.sug!=this.state.sug)
    {
  this.setState({value:p.text,sug:p.sug})
    }
    
  },
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
    this.props.handleChange(e.target.value);
  },
    handleSelect:function(value){
    this.props.handleChange(value);
  },
  handleBlur:function(e){
    var text = e.target.value.trim();
     if(this.props.blur)
        {
          this.props.save(text);
        }
  },
  match:function(state,value){
    var n=state.name.trim();
    var v=value.trim(); 
       return (
      n.toLowerCase().indexOf(v.toLowerCase()) !== -1 && value.length>1
       )
  },
  render: function() {
    var width="auto";
    var clas="";
    var _this=this;
    var styles = {
        item: {
          padding: '2px 6px',
          cursor: 'default'
        },

        highlightedItem: {
          color: 'white',
          background: 'hsl(200, 50%, 50%)',
          padding: '2px 6px',
          cursor: 'default'
        },

        menu: {
          border: 'solid 1px #ccc'
        }
      }
    //const { value, sug } = this.state;
    //console.log(this.state.value);

      if(this.props.clas)
    {
      clas=this.props.clas;
    }
    
    return (
     <Autocomplete
          value={this.state.value}
          inputProps={{ className:clas }}
          items={this.state.sug}
          getItemValue={(item) => item.name}
          shouldItemRender={_this.match}
          onChange={_this.handleChange}
          onSelect={_this.handleSelect}
          renderItem={(item, isHighlighted) => (
            <div
             style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.name}
            >{item.name}</div>
          )}
        />
    );
  }
});

module.exports = AutoInput;
