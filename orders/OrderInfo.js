var React = require('react');
var Functions = require('../functions/Functions');
var ActionButton = require('../components/ActionButton');
import Flexbox from 'flexbox-react';


var OrderInfo = React.createClass({

    handleClick:function(){
        this.props.handleClick(this.props.id);
    },
    editOrder:function(){
       var id=this.props.info.id;
        this.props.editOrder(id);
    },
    countOrderPrice:function(){
        var _this=this;
       var orders=this.props.orders;
       var price=0;
       for(var i=0; i<orders.length; i++)
       {
           var order=orders[i];
           var pr=_this.countPrice(order);
           price=price+pr;
       } 
       price=Functions.priceFormat(price);
       return price;
    },
    countPrice:function(order){
       var pr=parseFloat(order.price)*parseInt(order.amount);
       return pr;
    },
    render: function(){
        var _this=this;
        var color,background,arriver;
        var cont=this.props.cont;
        var info=this.props.info;
        var orders=this.props.orders;
        var arriveD=info.arriveD;
        var arriveT=info.arriveT;
        var datem=info.datem;
        arriveD=Functions.reverseDate(arriveD);
        datem=Functions.reverseDate(datem);
  
            arriver="Proponowana data dostawy: "+arriveD+" "+arriveT+"";
            var cli,prz,przw;
            if(this.props.login.rank==1)
            {
                cli="";
            }
            else if(this.props.login.rank>1)
            {
                cli="Klient: ";
            }
        var price=_this.countOrderPrice();
        /*if(this.props.color==0)
        {
            background="#f4ebec";
            color="#6b6465";
        }
        else  if(this.props.color==1)
        {
            background="#6b6465";
            color="#f4ebec";
        }*/
        return (<div className={"mainOrderInfo"} >
                    <div className={"orderInfo"}>{cli} <b>{cont.name} {cont.surname} </b> 
                        Proponowana data dostawy: <b> {arriveD}</b> <i>{arriveT}</i><span style={{color:"#c1221b",fontWeight:"bold"}}> WARTOŚĆ </span> {price} zł <ActionButton action={_this.editOrder} clas={"actionButtonTop"} html={"Edytuj"}/></div>
                            {orders.map(function(row,index) {
                                var rodzaj,clas;
                                index%2==0 ? clas="orderOrders orderOrders2" : clas="orderOrders orderOrders1";
                            
                                var pr=_this.countPrice(row);
                                pr=Functions.priceFormat(pr);
                
                                    return <div className={clas}>
                                                <Flexbox element="div" width="100%" display="flex" flexWrap="wrap" > 
                                                    <Flexbox element="div" display="flex" alignItems="center" style={{width:"120px"}}>
                                                        <div style={{fontSize:"13px",textTransform:"uppercase",fontFamily:"Arial",fontWeight:"bold",color:"#06080a",display:"inline-block",padding:"0px",margin:"0px"}}>{row.category}</div> 
                                                    </Flexbox>
                                                    <Flexbox element="div" display="flex" alignItems="center" style={{width:"120px"}}>
                                                    <span style={{color:"#d6440a",fontFamily:"Arial",fontWeight:"bold"}}> {row.product} </span>
                                                    </Flexbox>
                                                    <Flexbox element="div" display="flex" alignItems="center" style={{width:"50px"}}>
                                                    {row.amount} Kg
                                                    </Flexbox>
                                                    <Flexbox element="div" display="flex" alignItems="center" style={{width:"60px"}}>
                                                    {pr} zł
                                                    </Flexbox>
                                                    <Flexbox element="div" display="flex" alignItems="center" style={{width:"500px"}}>
                                                        <div style={{padding:"0px 5px",margin:"0px",display:"inline-block",borderLeft:"3px solid #421c0d",borderRight:"3px solid #421c0d",fontStyle:"italic"}}>{row.comm}</div>
                                                    </Flexbox>
                                                </Flexbox>
                                        
                                        
                                        
                                        
                                    </div>;
                                })}
        </div>)
    }
});
module.exports = OrderInfo;