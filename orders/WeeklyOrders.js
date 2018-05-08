var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var Functions = require('../functions/Functions');

var DayOrder = require('./DayOrder');




var WeeklyOrders = React.createClass({
          
          
     getInitialState:function(){
        return {
     
        }  
    },
    handleClick:function(d){
        store.dispatch(Actions.setBundle({ordersDate:d}));
    },
    countAmount:function(d){
        var orders=this.props.state.orderc.orders;
        var count=0;
        for(var j=0; j<orders.length; j++)
        {
            
            var order=orders[j];
            var date=order.info.arriveD.trim();
            var dd=d.trim();
            //console.log(date);
           // console.log(dd);
             //console.log("next");
            if(date==dd)
            {
                count++;
                
            }

        }
        return count;
    },
    createList:function()
    {
        var _this=this;
        var list=[];
        for(var i=-1; i<13; i++)
        {
            var type,n;
            
            var d=Functions.getDateD(i);
            d=d.d+"-"+d.m+"-"+d.y;
            n=i;
            var a=_this.countAmount(d);
            list.push({d:d,n:n,a:a});
        }
        return list;
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var list=_this.createList();
        var ordersDate=state.ordersDate;
        return (<div>
           {list.map(function(d,index) {
                        return <DayOrder ordersDate={ordersDate}  day={d} handleClick={_this.handleClick}/>;
            })}
            
         
                     </div>)
    }
});
module.exports = WeeklyOrders;