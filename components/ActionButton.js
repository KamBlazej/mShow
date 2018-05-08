var React = require('react');
var PropTypes = React.PropTypes;


var ActionButton = React.createClass({
  propTypes: {
    html: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  },


    handleClick: function() {
        this.props.action();
  },

  render: function() {
    var color;
    var _this=this;
    var clas="actionButton";
    if(this.props.color)
    {
      color=this.props.color;
    }
    else{
      color="white";
    }
    if(_this.props.styler)
    {
      if(_this.props.styler.cell)
      {
        if(_this.props.styler.cell=="small")
        {
          clas="actionButtonCell"
        }
      }

    }
    if(_this.props.clas)
    {
      clas=_this.props.clas;
    }
    return (
          <div className={clas} style={{marginLeft: 10 + 'px', display:"inline-block"}}>
                <div onClick={this.handleClick}>{this.props.html}</div>
          </div>
    );
  }
});

module.exports = ActionButton;