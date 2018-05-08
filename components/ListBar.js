var React = require('react');
var CellAction = require('./CellAction');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var ListBar = React.createClass({
    propTypes: {
    },
    contOrder:function(){
        this.props.contOrder(this.props.contID)
    },
    render: function() {
        var _this=this;
                    return <div onClick={_this.contOrder} style={{width:"100%", display:"table", cursor:"pointer"}}>
                            {_this.props.children}
                    </div>
    }
});

module.exports = ListBar;

