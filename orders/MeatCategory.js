var React = require('react');


var MeatCategory = React.createClass({

    handleClick:function(){
        this.props.handleClick(this.props.id);
    },
    render: function(){
        var _this=this;
        return (<div style={{cursor:"pointer", border:"solid 2px black", borderRadius:"12px",padding:"15px"}} className={"inline"} onClick={_this.handleClick}>{_this.props.name}</div>)
    }
});
module.exports = MeatCategory;