var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var Functions = require('../functions/Functions');

var moment = require('moment');





var DayOrder = React.createClass({
          
          
     getInitialState:function(){
        return {
     
        }  
    },
    handleClick:function(){
        this.props.handleClick(this.props.day.d);
    },
  
    render: function(){
        var _this=this;
        var day=this.props.day;
        var orders=this.props.orders;
        var color,border,mainclas;
        var amount=day.a;
        var ordersDate=this.props.ordersDate;
        var text=false;
        var textDiv;
        var zam;
        if(day.n<0)
        {
            text="Wczoraj";
            color="red";
        }
        else if(day.n==0)
        {
            text="Dziś";
            color="gold";
        }
        else if(day.n>0 && amount>0)
        {
            color="green";
        }
        else if(day.n>0 && amount==0)
        {
            color="silver";
        }
        
        border="3px solid "+color;
        /////////
        var zam=<div style={{fontSize:"14px",fontWeight:"bold"}}><span className={"dayOrderSpan"}>Zamówień: </span>{amount}</div>;
        /////
        if(day.n==1)
        {
            text="Jutro";
        }
        if(text)
        {
            textDiv=<div style={{marginTop:"0px",marginBottom:"0px"}}><p style={{fontSize:"8px",marginTop:"0px",marginBottom:"0px", color:"black"}}>({text})</p>{zam}</div>;
        }
        else
        {
            textDiv=<div style={{marginTop:"0px",marginBottom:"0px"}}>{zam}<div style={{fontSize:"8px",marginTop:"0px",marginBottom:"0px",height:"8px",width:"8px"}}></div></div>;
        }
        /////////
        if(ordersDate=="TODAY")
        {
            var d=Functions.getDate();
            var today = d.d+'-'+d.m+'-'+d.y;
            ordersDate=today;
        }
        ordersDate==day.d ? mainclas="contOrderCalendar contOrderCalendarC" : mainclas="contOrderCalendar";

        //////////
        return (<div className={mainclas}><div onClick={_this.handleClick} className={"calendarOrder"}><div className={"dayOrder"} style={{color:color}} ><div style={{fontSize:"12px"}}>{day.d} {textDiv}</div>
                </div></div>
                </div>)
    }
});
module.exports = DayOrder;