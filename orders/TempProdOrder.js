var React = require('react');
var NumberInputO = require("../components/NumberInputO");
var NumberInputCO = require("../components/NumberInputCO");
var TextInputA = require("../components/TextInputA");
var Functions = require("../functions/Functions");
var _ = require('lodash');
var ActionButton = require("../components/ActionButton");
var TextArea = require("../components/TextArea");
import Flexbox from 'flexbox-react';

var TempProdOrder = React.createClass({
    getInitialState:function(){
        var order
        if(this.props.type=="cells")
        {
            order=this.props.order;
        }
        else{
            order={amount:0,comm:null}
        }
        return {
             edit:{a:false, c:false},
             value:{a:order.amount,c:order.comm}
        }  
    },
      componentWillReceiveProps:function(p)
  {

    //if(p.order.amount!=this.state.value.a || p.order.type!=this.state.value.t)
    //{
        if(p.type!=="top")
        {
        var order=p.order;
         var copy=_.cloneDeep(this.state.value);
         if(copy.a!==order.amount || copy.c!=order.comm)
         {
         copy.a=order.amount;
         copy.c=order.comm;
         this.setState({value:copy});
         }
        
        }
       
    //}
  },
     changeComm:function(value){
          var sv=value.toString();
        if(sv.length>150)
        {

        }
        else
        {
          var copy=_.cloneDeep(this.state.value);
          copy.c=value;
          this.setState({value:copy});
        }
       
    },
    setProperAmount:function(am)
    {
        var _this=this;
        var a=am;
        var prod=this.props.prod;
         if(parseInt(a)<0)
        {
            a=0;
        }
        //var orderc=this.props.orderc;
        //var nam=Functions.cpAmount(orderc.temp_order,prod);
        /*if(parseInt(a)>parseInt(nam))
        {
            a=nam;
        }*/
        if(_this.props.max)
        {
            if(parseInt(a)>_this.props.max)
            {
            a=_this.props.max;
             } 
        }
        else
        {
            if(parseInt(a)>prod.amount)
            {
            a=prod.amount;
            }
        }
        
        var price=prod.price;
        //var pr=nam*price;

        //pr=Functions.priceFormat(pr);


        //var copy=_.cloneDeep(this.state.value);
       // copy.a=nam;
        //copy.p=pr;
       // var obj={cat:prod.cat,prod:prod.prod,amount:nam,price:price,type:"temp"}
         var order=this.props.order;
        var copy=_.cloneDeep(order);
        copy.amount=a;
        copy.price=this.props.prod.price;
        this.props.action(this.props.index,copy);
       // this.setState({value:copy});
    },
    changeAmount:function(amount){
        /*var copy=_.cloneDeep(this.state.value);
        if(amount<1)
        {
            amount=1;
        }
        copy.a=amount;
        this.setState({value:copy});*/
        this.setProperAmount(amount);
    },
    editComm:function(){
        var copy=_.cloneDeep(this.state.edit);
        copy.c=!copy.c;
        this.setState({edit:copy});
    },
    editAmount:function()
    {
        //console.log("clicked fck");
         var copy=_.cloneDeep(this.state.edit);
        copy.a=!copy.a;
        this.setState({edit:copy});
    },
    editAmountS:function()
    {
        var copy=_.cloneDeep(this.state.edit);
        copy.a=true;
        this.setState({edit:copy});
    },
   saveComm:function(text)
    {
        var order=this.props.order;
        var copy=_.cloneDeep(order);
        copy.comm=text;
        this.props.action(this.props.index,copy);
        /////
        var copys=_.cloneDeep(this.state.edit);
        copys.c=false;
        this.setState({edit:copys});
        
    },
    fixAmount:function(a){
        if(a<1 || a==undefined || a===null || a==false)
        {
            a=1;
        }
        a=+a;
        return a;
    },
    saveAmount:function(amount)
    {
        var order=this.props.order;
        var copy=_.cloneDeep(order);
        var a=this.state.value.a;
        a=this.fixAmount(a);
        copy.amount=a;
        copy.price=this.props.prod.price;
        this.props.action(this.props.index,copy);
        /////
        var copys=_.cloneDeep(this.state.edit);
        copys.a=false;
        this.setState({edit:copys});
        
    },
  
    blurAmount:function()
    {
        var order=this.props.order;
        var copy=_.cloneDeep(order);
        var a=this.state.value.a;
        a=this.fixAmount(a);
        copy.amount=a;
        copy.price=this.props.prod.price;
        this.props.action(this.props.index,copy);
        /////
        var copys=_.cloneDeep(this.state.edit);
        copys.a=false;
        this.setState({edit:copys});
        
    },
    delOrder:function(){
        this.props.del(this.props.index);
    },
    renderAmount:function(r){
        var _this=this;
        if(this.state.edit.a)
        {
            return   <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div style={{width:"50px"}}><NumberInputCO text={_this.state.value.a} focus={false} blur={_this.blurAmount} save={_this.saveAmount} width={"50px"} handleChange={_this.changeAmount}/></div></Flexbox> 
            
        }
        else
        {
             return   <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div onClick={_this.editAmountS} style={{width:"50px"}}>{_this.state.value.a} {r}</div></Flexbox>  
        }
    },
    renderCommButton:function(){
        var _this=this;
        if(this.state.edit.c)
        {
            return  <ActionButton html={"Komentarz"} clas={"commButton commButtonA"}/>       
        }
        else
        {
             return  <ActionButton html={"Komentarz"} action={_this.editComm} clas={"commButton commButtonN"}/>
        }
    },
    renderComm:function(){
        var _this=this;
        if(this.state.edit.c)
        {
            return  <div style={{width:"360px", display:"block"}}><TextArea height={5} width={"361px"} submit={true} blur={true} focus={true} clas={"areaCool"} text={_this.state.value.c} save={_this.saveComm} handleChange={_this.changeComm} nores={true}/></div>       
            ////<TextInputA text={_this.state.value.c} save={_this.saveComm} width={"361px"} focus={true} handleChange={_this.changeComm}/> 
        }
        else
        {
            if(_this.state.value.c!==null && _this.state.value.c.length>0)
            {
            return  <div className={"commDescOrder"} onClick={_this.editComm}>{_this.state.value.c}</div>
            }
             
        }
    },
    renderCloseImg:function(){
        var _this=this;
        return <img onClick={_this.delOrder} style={{width:"20px",cursor:"pointer"}}  src={"img/close.png"}/>
    },
    renderCells:function(){
        var _this=this;
        if(this.props.type=="top")
        {
               return (<div style={{fontWeight:"bold",borderBottom:"5px groove #4286f4"}}>
                        <div  className={"inline"}><div style={{width:"80px"}}>KATEGORIA</div></div>    
                        <div  className={"inline"}><div style={{width:"80px"}}>PRODUKT</div></div>  
                        <div  className={"inline"}><div style={{width:"50px"}}>ILOŚĆ</div></div>
                        <div  className={"inline"}><div style={{width:"40px"}}>CENA</div></div>
                        <div  className={"inline"}><div style={{width:"107px"}}></div></div> 
                </div>)
        }
        else if(this.props.type=="cells")
        {
            var rodzaj;
            var order=_this.props.order;
            var o=order.amount;
            if(o<0 || o===null || o==undefined || o==false)
            {
                o=0;
            }
            var price=o*order.price;
            price=Functions.priceFormat(price);
            var color;
            if(this.props.color==0)
            {
            color="#eff4fc";
            }
            else  if(this.props.color==1)
            {
            color="white";
            }
            
                     rodzaj="kg";
                 
           
            return (<div style={{background:color}}>
                        
                        <Flexbox element="div" width="100%" display="flex" flexWrap="wrap" >    
                             <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div style={{width:"80px"}}>{order.category}</div></Flexbox>    
                            <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div style={{width:"80px"}}>{order.product}</div></Flexbox>  
                        {_this.renderAmount(rodzaj)}
                             <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div style={{width:"41px"}}>{price}</div></Flexbox>  
                             <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div style={{width:"86px"}}>{_this.renderCommButton()}</div></Flexbox>  
                             <Flexbox element="div" display="flex" alignItems="center" justifyContent="center" style={{borderRight:"1px solid black"}}><div>{_this.renderCloseImg()}</div> </Flexbox> 
                          </Flexbox> 
                         
                         
                          {_this.renderComm()}
                    </div>)
        }
    },
    render: function(){
        var _this=this;
        var cont=this.props.cont;
        return (  <div style={{width:"364px", fontSize:"12px"}}>
                    {_this.renderCells()}              
                </div>)
    }
});
module.exports = TempProdOrder;