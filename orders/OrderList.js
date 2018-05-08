var React = require('react');
var $ =require('jquery');
var Alerts = require('../functions/Alerts');
var _ = require('lodash');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');

var MeatCategory = require('./MeatCategory');
var TempProdOrder = require('./TempProdOrder');
var OrderInfo = require('./OrderInfo');
var WeeklyOrders = require('./WeeklyOrders');

var ActionButton = require('../components/ActionButton');
var TextInputA = require('../components/TextInputA');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');
var Functions = require('../functions/Functions');

var DatePicker = require('react-datepicker');
var moment = require('moment');


var OrderList = React.createClass({
          
     result:null,     
     getInitialState:function(){
        return {
         date:this.props.state.ordersDate,
        }  
    },
    componentWillReceiveProps:function(p){
        if(p.state.ordersDate!=this.state.date)
        {
            this.setState({date:p.state.ordersDate});
        }
    },
    filterOrders:function(){
        var _this=this;
        var state=this.props.state;
        var orders=state.orderc.orders;
        var result,resultDate;
            result=orders;
        if(this.state.date=="TODAY")
        {
            resultDate=[];
            var date=Functions.getDate();
            var today = date.d+'-'+date.m+'-'+date.y;
        }
        else{
            resultDate=[];
            today=_this.state.date;
          
        }
        if(state.login.rank==1)
        {
            var cont=Functions.searchArr(state.contractors,"nick",state.login.login);
            var date=Functions.getDate();
            var today = date.d+''+date.m+''+date.y;
            today=parseInt(today);

            for(var i=0; i<result.length; i++)
            {
                var item=result[i];
                var idt=item.info.arriveD;
                idt=idt.split("-");
                idt=idt[0]+""+idt[1]+""+idt[2];
                idt=parseInt(idt);
                if(cont.id==item.info.contID && idt>=today)
                {
                    resultDate.push(item);
                }
            }
        }
        else if(state.login.rank>1)
        {
            for(var i=0; i<result.length; i++)
            {
                var item=result[i];
                if(today==item.info.arriveD)
                {
                    resultDate.push(item);
                }
            }
            _this.result=resultDate;
        }
         
        return resultDate;
    },
    changeSearch:function(text){

        var time = moment(text).format("DD-MM-YYYY");

        this.setState({date:time});
        store.dispatch(Actions.setBundle({ordersDate:time}));
    },
     saveSearch:function(text){
        this.setState({date:text});
    },
    print:function(){
        store.dispatch(Actions.setBundle({route:{r:"PRINT"},toPrint:this.result}));
    },
    editOrder:function(id){
        store.dispatch(Actions.setOrder({action:"startEdit",id:id}));
    },
    showDays:function(){
        store.dispatch(Actions.changeRoute("WEEKLY_ORDERS"));
    },
      excel:function(){
        var _this=this;
        var orderss=this.filterOrders();
        var orders=_.cloneDeep(orderss);
        var contractors=this.props.state.contractors;
        var today;
        if(this.state.date=="TODAY")
        {
            var date=Functions.getDate();
            today = date.y+'-'+date.m+'-'+date.d;
        }
        else{
            today=_this.state.date;  
        }

         
        for(var i=0; i<orders.length; i++)
        {
            var order=orders[i];
            var cont=Functions.searchArr(contractors,"id",order.info.contID);
            var ords=order.orders;
            for(var j=0; j<ords.length; j++)
            {
                var ord=ords[j];
                var pricer=parseInt(ord.amount)*parseFloat(ord.price);
                pricer=Functions.priceFormat(pricer);
                ord.pricer=pricer;
            }
            order.cont=cont;
            order.today=today;
        }
        if(orders.length>0)
        {
                 $.ajax({
					type:'POST',
					url:"/excel/00dl.php",
					data: {orders:orders},
					dataType:'json',
					  success: function(data) {
					console.log(data);
                    var name="meat"+today+".xlsx";
					var $a = $("<a>");
					$a.attr("href",data.file);
					$("body").append($a);
					$a.attr("download",name);
					$a[0].click();
					$a.remove();
                       

                },
                error: function(xhr, status, err) {
                    console.log(xhr.responseText);
                    }
				})
        }
        else{
            Alerts.setAlert(true,'Brak zamówień do wyeksportowania',"error",10000);
        }
        
    },
    renderForRanks:function(){
        var _this=this;
        var state=this.props.state;
        var orders=this.filterOrders();
        var date;
         if(_this.state.date=="TODAY")
        {
            var d=Functions.getDate();
            var today = d.d+'-'+d.m+'-'+d.y;
            date=today;
        }
        else{
            date=_this.state.date;
        }
        if(state.login.rank==1)
        {

        }
        else if(state.login.rank>1)
        {
           var day=moment(date, "DD-MM-YYYY");
            return ( <div><ActionButton action={_this.print} html={"DRUKUJ"}/><ActionButton action={_this.excel} html={"Exportuj do Excela"}/><WeeklyOrders state={state}/>
            <div> <div className={"inlinet"} style={{marginBottom:"10px", paddingTop:"7px"}}>Wyświetl zamówienia z datą dostawy na dzień: </div><div className={"inlinet"} style={{marginLeft:"10px"}}>
                                            <DatePicker
                                                selected={day}
                                                onChange={_this.changeSearch}
                                                dateFormat="DD-MM-YYYY"
                                                className='inputCool'
                                            /></div></div></div>)
        }
    },
    renderOrders:function(){
        var _this=this;
        var state=this.props.state;
        var orders=this.filterOrders();
        if(orders.length>0)
        {
            return  (<div>{orders.map(function(row,index) {
               var cont=Functions.searchArr(state.contractors,"id",row.info.contID);
                        return <OrderInfo info={row.info} orders={row.orders} editOrder={_this.editOrder} login={state.login} cont={cont} />;
                    })}
                </div>)
        }
        else
        {
            return <div style={{fontSize:"18px",fontFamily:"arial",marginTop:"15px",marginLeft:"15px",color:"#42070b"}}>Nie ma żadnych zamówień dla danego dnia.</div>
        }
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var orders=this.filterOrders();

        
    
        
       
        return (<div>
           {_this.renderForRanks()}
           {_this.renderOrders()}
            
         
                     </div>)
    }
});
module.exports = OrderList;