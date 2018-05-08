var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('lodash');
var ActionButton = require('./ActionButton');






var CellAction=React.createClass({
     propTypes: {
    },

      getInitialState: function() {
    return {
    };
  },
  onEdit:function()
  {
    this.props.action(this.props.idc);
  },

    render:function(){
        var _this=this;
        return(
            <div>
                <ActionButton styler={{cell:"small"}} action={_this.onEdit} html={_this.props.html}/>
            </div>

        )
    }



})
module.exports = CellAction;