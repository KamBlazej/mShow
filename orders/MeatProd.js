var React = require('react');


var MeatProd = React.createClass({

    handleClick:function(){
        this.props.handleClick(this.props.id);
    },
    render: function(){
        var _this=this;
        var color,background;
        if(this.props.color==0)
        {
            background="#f4ebec";
            color="#6b6465";
        }
        else  if(this.props.color==1)
        {
            background="#6b6465";
            color="#f4ebec";
        }
          else  if(this.props.color==2)
        {
            background="#f4ebec";
            color="#6b6465";
        }
        return (<div className={"meatProdButton"} style={{cursor:"pointer", border:"solid 1px black", borderRadius:"8px", background:background, color:color}}  onClick={_this.handleClick}>{_this.props.name}</div>)
    }
});
module.exports = MeatProd;