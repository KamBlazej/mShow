var React = require('react');

var Functions = require('../functions/Functions');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');




var PrintChild = React.createClass({
    getInitialState:function(){
        return {
        }  
    },
    componentDidMount:function(){
        if(this.props.checked)
        {
            this.props.checked();
        }
    },
    render: function(){
        var _this=this;
        var child=this.props.info;
        var contractors=this.props.contractors;
        var cont=Functions.searchArr(contractors,"id",child.info.contID);
       
       
        return (<div className={"printChild"}>
            <div><b>{cont.name} {cont.surname}</b></div>
            {child.orders.map(function(order,index){
                var rodzaj;
                    rodzaj="kg.";
                
                    return (<div className={"printRowProd"}>
                        <div className={"printCell"} style={{width:"4.5cm"}}>{order.product}</div><div className={"printCell"} style={{width:"1.5cm",borderRight:"1px solid black"}}> {order.amount} {rodzaj}</div>
                       <div className={"printCell"} style={{width:"1.5cm"}}></div>
                    </div>)
                })
            }

        </div>)
    }
    
});
module.exports = PrintChild;