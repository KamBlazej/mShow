var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Alerts = require('../functions/Alerts');
var Functions = require('../functions/Functions');
var CountPos = require('../functions/CountPos');

var MeatCategory = require('./MeatCategory');
var ShowMeat = require('./ShowMeat');
var ProdTopBar = require('./ProdTopBar');
var TempProdOrder = require('./TempProdOrder');
var OrderCalc = require('./OrderCalc');

var TimeIn = require('../components/TimeIn');
var ActionButton = require('../components/ActionButton');
var TextInputA = require('../components/TextInputA');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');

var DatePicker = require('react-datepicker');
var moment = require('moment');
var $ =require('jquery');

import TimeInput from 'react-time-input';
var Inputmask = require('inputmask');
var MaskedInput = require('react-maskedinput')
//var TimeInput = require('time-input')

require('react-datepicker/dist/react-datepicker.css');



var DnDF = require('../functions/DnDF');


var MainMeatCategory = React.createClass({
          
          
     getInitialState:function(){
                    return {
         arrive:{d:this.props.state.orderc.arrive.d,t:this.props.state.orderc.arrive.t},
         showc:null,
         orderui:false,
         orderProd:null,
         
        }  
    },
    tempTime:null,
    timerListener:function(t){
        var _this=this;
        //$('.temr').replaceWith($('.temr').clone());
      /*  t.removeEventListener("keyup",function timerHandler(e)
        {

        })
        t.addEventListener("keyup", function timerHandler(e)
        {
           
        });*/
        $('.temr').unbind();
        $('.temr').on("keyup", function(){
 
            _this.tempTime=$(this).val();
        });
       
    },
    componentWillUnmount:function(){
 
    },
    componentDidMount:function(){
        var _this=this;
        var child = document.querySelectorAll('.temr');
        if(child.length>0)
        {
            _this.timerListener(child[0]);
            //child.value="12:22";
        }
        var pos=this.props.state.orderuiPos;
        if(pos.x===null || pos.x==null)
        {
            var nx=CountPos.findMidWin(pos.w);
            var obj={x:nx,y:pos.y,w:pos.w,h:pos.h};
            store.dispatch(Actions.setBundle({orderuiPos:obj}));
        }
    },
    componentWillUpdate:function(){
        var _this=this;
        if(_this.tempTime!=_this.props.state.orderc.arrive.t && _this.tempTime!==null)
        {

                var _this=this;
                var state=this.props.state;
                if(state.orderc.type_temp=="EDIT")
                {
                store.dispatch(Actions.setArrive({type:"t",t:text,ls:true}));
                }
                else{
                store.dispatch(Actions.setArrive({type:"t",t:text}));
            }
        // text=this.masked(text);
                var copy=_.cloneDeep(this.state.arrive);
                copy.t=text;
                this.setState({arrive:copy});
                

        }
         
    },
    componentDidUpdate:function(){
           var _this=this;
        var child = document.querySelectorAll('.temr');
        if(child.length>0)
        {
            _this.timerListener(child[0]);
            //child.value="12:22";
        }
       
    },
      dragBack:function(x,y,store,Actions)
    {
         var pos=this.props.state.orderuiPos;
         var res=CountPos.findOut(x,y,pos.w,pos.h);
         var obj={x:res.x,y:res.y,w:pos.w,h:pos.h};
            store.dispatch(Actions.setBundle({orderuiPos:obj}));
        
    },
    startDrag:function(){
        var pos=this.props.state.orderuiPos;
        var dndf= new DnDF(this.dragBack,pos,store,Actions);
    },
  
    handleClick:function(cat){
        //store.dispatch(Actions.setBundle({route:{r:"PROD_LIST"},catID:id}));
        var showc=this.state.showc;
        showc==cat ? showc=null : showc=cat;
        
        this.setState({showc:showc});
    },
    orderUI:function(action,prod){
        var p=null;
        if(prod)
        {
            p=prod;
        }
        this.setState({orderui:action,orderProd:p});
    },
    editRow:function(index,order){
        var state=this.props.state;
        var type=state.orderc.type_temp;
        var copy;
        if(type=="EDIT")
        {
        copy=_.cloneDeep(state.orderc.temp_edit);
        }
        else
        {
        copy=_.cloneDeep(state.orderc.temp_order);
        }
        copy[index]=order;
        store.dispatch(Actions.updateTempOrder({orders:copy,type:type}));
    },
    delOrder:function(index)
    {
        var state=this.props.state;
         var type=state.orderc.type_temp;
        var copy;
        if(type=="EDIT")
        {
        copy=_.cloneDeep(state.orderc.temp_edit);
        }
        else
        {
        copy=_.cloneDeep(state.orderc.temp_order);
        }
        copy.splice(index,1);
        store.dispatch(Actions.updateTempOrder({orders:copy,type:type}));
    },
    countDiffEdit:function(){
        var orders=this.props.state.orderc.temp_edit;
        var soEdit=this.props.state.soEdit;
        var arr=[];
        for(var i=0; i<soEdit.length; i++)
        {
            var exist=false;
            var items=soEdit[i];
            for(var j=0; j<orders.length; j++)
            {
                var itemo=orders[j];
                if(items.category==itemo.category && items.product==itemo.product)
                {
                    var diff=parseInt(items.amount)-parseInt(itemo.amount);
                    arr.push({category:items.category,product:items.product,diff:diff});
                    exist=true;
                }
            }
            if(!exist)
            {
            arr.push({category:items.category,product:items.product,diff:items.amount}); 
            }
        }
        for(var i=0; i<orders.length; i++)
        {
            var exist=false;
            var itemo=orders[i];
            for(var j=0; j<arr.length; j++)
            {
                var itema=arr[j];
                if(itemo.category==itema.category && itemo.product==itema.product)
                {
                    exist=true;
                }
            }
            if(!exist)
            {
                var diff=-Math.abs(itemo.amount);
            arr.push({category:itemo.category,product:itemo.product,diff:diff}); 
            }
        }
        return arr;
    },
    onBlurT:function(e){
        //console.log(e.target.value);
        this.tempTime=null;
        var t=e.target.value;
        t=this.fixTime(t);
            var copy=_.cloneDeep(this.state.arrive);
        copy.t=t;
        this.setState({arrive:copy});
    },
    fixTime:function(t)
    {
        var aT=t;
         if(aT==null || aT==false || aT=="")
        {
            aT="00:01";
        }
             var stime=aT.split(":");
        var ntime=[];
        ntime.push(stime[0].substring(0,1));
        ntime.push(stime[0].substring(1,2));
        ntime.push(stime[1].substring(0,1));
        ntime.push(stime[1].substring(1,2));
        var rtime="";
        for(var i=0; i<ntime.length; i++)
        {
            var item=ntime[i];
            if(item=="-" || item===null || item==undefined || item==false)
            {
                item=0;
            }
            rtime=rtime+""+item;
            if(i==1)
            {
                rtime=rtime+":";
            }
        }
        aT=rtime;
        if(aT=="00:00")
                    {
                        aT="00:01";
                    }
                    return aT;
    },
    saveOrder:function(){
         var _this=this;
        var state=this.props.state;
        if(state.disabled)
        {
            return false;
        }
        store.dispatch(Actions.setBundle({disabled:true}));
       
        
        var aD=this.state.arrive.d;
        var aT=this.state.arrive.t;
        if(aD==null || aD==false || aD=="")
        {
            var nd=Functions.getDateD(1);
            aD=nd.d+"-"+nd.m+"-"+nd.y;
        }
       
        //aT=this.fixTime(aT);
          if(aT===null || aT==false || aT=="")
        {
            aT="00:01";
        }
        var order;
        var ords;
         if(state.orderc.type_temp=="EDIT")
        {
            ords=state.orderc.temp_edit;
        }
        else
        {
            ords=state.orderc.temp_order;
        }
        for(var i=0; i<ords.length; i++)
        {
            var item=ords[i];
            if(item.amount==0)
            {
                item.amount=1;
            }
        }
        if(state.orderc.type_temp=="EDIT")
        {
            var diff=_this.countDiffEdit();
            order={authorID:state.login.id,token:state.login.token, authorName:state.login.login,contID:state.orderc.cont.id, orders:ords,status:"public",arriveD:aD,arriveT:aT,diff:diff};
            AjaxOrder.saveEdit(order,state.orderc.editID,this.savedOrder,this.failedOrder);
           //console.log(order);
           //console.log(state.orderc.editID);
        }
        else{
            order={authorID:state.login.id,token:state.login.token, authorName:state.login.login,contID:state.orderc.cont.id, orders:ords,status:"public",arriveD:aD,arriveT:aT};
            AjaxOrder.save(order,this.savedOrder,this.failedOrder);
        }
    },
    failedOrder:function(){
        store.dispatch(Actions.setBundle({disabled:false}));
    },
    setArriveD:function(text){
        var copy=_.cloneDeep(this.state.arrive);
        copy.d=text;
        this.setState({arrive:copy});
    },
    setArriveT:function(text){
                // console.log(text);
         var copy=_.cloneDeep(this.state.arrive);
        copy.t=text;
        this.setState({arrive:copy});
    },
    saveArriveD:function(text){
       //var text=e.target.value;

      var time = moment(text).format("DD-MM-YYYY");
            var _this=this;
        var state=this.props.state;
        if(state.orderc.type_temp=="EDIT")
        {
         store.dispatch(Actions.setArrive({type:"d",t:time,ls:true}));
        }
        else{
         store.dispatch(Actions.setArrive({type:"d",t:time}));
        }
        var copy=_.cloneDeep(this.state.arrive);
        copy.d=time;
        this.setState({arrive:copy});
        
       
    },
  
   
    saveArriveT:function(text){
       // text=text.target.value;
       this.tempTime=null;
        var _this=this;
        var state=this.props.state;
        if(state.orderc.type_temp=="EDIT")
        {
        store.dispatch(Actions.setArrive({type:"t",t:text,ls:true}));
        }
        else{
        store.dispatch(Actions.setArrive({type:"t",t:text}));
    }
   // text=this.masked(text);
        var copy=_.cloneDeep(this.state.arrive);
        copy.t=text;
        this.setState({arrive:copy});
        
    },
    savedOrder:function(response)
    {
        var _this=this;
        if(response)
        {
            var state=this.props.state;
            if(state.orderc.type_temp=="EDIT")
            {
                // AjaxOrder.getr(_this.savedOrderEdit,"ORDER_LIST",state.login); 
                store.dispatch(Actions.setOrder({action:"delOrdersE"}));   
                store.dispatch(Actions.setBundle({prods:response.prods,prodsCancel:response.dels,orders:response.orders,route:{r:"ORDER_LIST"}}));  
            }
            else
            {
                //AjaxOrder.get(state.login); 

                store.dispatch(Actions.setOrder({action:"delOrders"}));   
                store.dispatch(Actions.setBundle({prods:response.prods,prodsCancel:response.dels,orders:response.orders}));        
            }
          Alerts.setAlert(true,'Zamówienie zostało zapisane na serwerze',"succes",10000);
          store.dispatch(Actions.setBundle({disabled:false}));
           
        }
    },
    savedOrderEdit:function(route,datar)
    {
        store.dispatch(Actions.setOrder({action:"allOrders",orders:datar}));
        store.dispatch(Actions.setOrder({action:"delOrdersE"}));   
        store.dispatch(Actions.setBundle({disabled:false}));
    },
    deleteOrder:function(){
        store.dispatch(Actions.setOrder({action:"delOrders"}));
    },
    cancelEdit:function(){
        store.dispatch(Actions.setOrder({action:"delOrdersE"}));
    },
    displaySave:function(){
        var _this=this;
        var state=this.props.state;
        if(state.orderc.temp_edit.length>0)
        {
            return  <ActionButton html={"Zmień Zamówienie"} action={_this.saveOrder}/>
        }
    },
    checkMaxA:function(prod){
        var max;
        var _this=this;
        var state=this.props.state;
        var temp=state.orderc.temp_order;
        var soEdit=state.soEdit;
        var prods=state.prods;
            for(var i=0; i<prods.length; i++)
            {
                var item=prods[i];
                if(item.prod==prod.product && item.cat==prod.category)
                {
                    max=item.amount;
                }
            }
             for(var i=0; i<temp.length; i++)
            {
                var item=temp[i];
                if(item.product==prod.product && item.category==prod.category)
                {
                    max=parseInt(max)-parseInt(item.amount);
                }
            }
               for(var i=0; i<soEdit.length; i++)
            {
                var item=soEdit[i];
                if(item.product==prod.product && item.category==prod.category)
                {
                    max=parseInt(max)+parseInt(item.amount);
                }
            }
            return max;

    },
    orderList:function(){
        var _this=this;
        var state=this.props.state;
        var day=this.state.arrive.d;
        var actProd=this.state.actProd;
        var time=this.state.arrive.t;
        if(day==null || day==undefined || day==false)
                    {
                        day=moment().add(1,'days');
                    }
                    else{
                        day=moment(day, "DD-MM-YYYY");
                    }
       //time=this.fixTime(time);
       if(time===null || time==undefined || time==false || time=="")
                    {
                        time="00:01";
                    }
   
                      
        
        function findProd(order)
        {
            var prods=state.prods;
            for(var i=0; i<prods.length; i++)
            {
                var prod=prods[i];
                if(order.product==prod.prod && order.category==prod.cat)
                {
                    return prod;
                }
            }
        }
        function countPrice(arr){
            var price=0;
            for(var i=0; i<arr.length; i++)
            {
                var item=arr[i];
                var prod=findProd(item);
                var a=item.amount;
                if(a<0 || a===null || a==undefined || a==false)
                {
                    a=0;
                }
                    price=price+(item.price*parseInt(a));  
            }
            price=Functions.priceFormat(price);
            return price;
        }

        /*
                <TimeInput value={time} onChange={_this.saveArriveT} defaultValue={"00:01"}/>
        */
        if(state.orderc.type_temp=="EDIT")
        {
        return (<div style={{marginLeft:"20px",marginBottom:"20px"}}>
                Cena łącznie: {countPrice(state.orderc.temp_edit)} zł
                <TempProdOrder type={"top"}/>
                    {state.orderc.temp_edit.map(function(order,index) {
                        var color=index%2;
                        var prod=findProd(order);
                        var max=_this.checkMaxA(order);
                                return <TempProdOrder type={"cells"} color={color} actProd={actProd} max={max} orderc={state.orderc} setActProd={_this.setActProd} index={index} key={index} prod={prod} order={order} del={_this.delOrder} action={_this.editRow} editer={true}/>;
                    })}
                <div className={"doubleMarg"}>
                    </div>
                    
                Proponowana data dostawy: 
                    <div>
                        <DatePicker
                            selected={day}
                            onChange={_this.saveArriveD}
                            dateFormat="DD-MM-YYYY"
                            className='inputCool'
                        />
                    </div>
                    <div>
                            <TimeInput  
                        initTime={time}
                        ref="TimeInputWrapper"
                        className='inputCool'
                        onTimeChange={_this.saveArriveT}
                        onBlurHandler={_this.onBlurT}
   		                />
                         
                    </div>
                
               <div className={"doubleMarg"}>
               
               {_this.displaySave()} <ActionButton html={"Anuluj Edycje"} action={_this.cancelEdit}/>
                </div>
            
            </div>)
        }
        else if(state.orderc.temp_order.length>0)
        {
            //var val = new Date().toISOString();
            //<TextInputA type={"time"} text={_this.state.arrive.t} save={_this.saveArriveT} handleChange={_this.setArriveT} />
            //<TextInputA type={"date"} text={_this.state.arrive.d} save={_this.saveArriveD} handleChange={_this.setArriveD}/>
            //
            /*
                    <TimeInput  
                        initTime={time}
                        ref="TimeInputWrapper"
                        className='inputCool'
                        onTimeChange={_this.saveArriveT}
                        onBlurHandler={_this.onBlurT}
   		            />
                     
                        <MaskedInput mask="11:11" name="expiry" placeholder="12:00" onChange={_this.saveArriveT} value={time}/>
            */
                     //
            return (<div style={{marginLeft:"20px",marginBottom:"20px"}}>
                Cena łącznie: {countPrice(state.orderc.temp_order)} zł
                <TempProdOrder type={"top"}/>
                    {state.orderc.temp_order.map(function(order,index) {
                        var prod=findProd(order);
                        var color=index%2;
                                return <TempProdOrder type={"cells"} color={color} actProd={actProd} orderc={state.orderc} setActProd={_this.setActProd} index={index} key={index} prod={prod} order={order} del={_this.delOrder} action={_this.editRow}/>;
                    })}
                <div className={"doubleMarg"}>
                    </div>
                Proponowana data dostawy:  
                    <div>
                  <DatePicker
                    selected={day}
                     onChange={_this.saveArriveD}
                     dateFormat="DD-MM-YYYY"
                     className='inputCool'
                    />
                     </div>
                      <div>
                        <TimeInput  
                        initTime={time}
                        ref="TimeInputWrapper"
                        className='inputCool temr'
                        onTimeChange={_this.saveArriveT}
                        onBlurHandler={_this.onBlurT}
   		                />
                        </div>
               <div className={"doubleMarg"}>

                <ActionButton html={"Zapisz Zamówienie"} action={_this.saveOrder}/> <ActionButton html={"Usuń Zamówienie"} action={_this.deleteOrder}/>
                </div>
            
            </div>)
        }
    },
    renderProdTopBar:function(){
        var state=this.props.state;
        if(state.login.rank==1)
        {
            return <ProdTopBar state={state}/>
        }
        else if(state.login.rank>1)
        {
            return <ProdTopBar state={state} route={{r:"CONT_LIST"}}/>
        }
    },
   makeArrs:function(prods){
        var arrs={};
        var narr=[];
        var prods= prods.filter(function(element){
            return (element.status == "a");
        });
        for(var i=0; i<prods.length; i++)
        {
            var prod=prods[i];
            if(!arrs[prod.cat])
            {
               arrs[prod.cat]=[];
               arrs[prod.cat].push(prod);
            }
            else
            {
                arrs[prod.cat].push(prod);
            }
             
        }
        //console.log(arrs);
        Object.keys(arrs).map(function(key, index) {
             narr.push({cat:key,prods:arrs[key]})
        });
        narr.sort(function(a, b){
            var a1= a.cat, b1= b.cat;
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
            });
        return narr;
    },
    checkSO:function(){
        var editer=false;
        var soEdit=false;
        var state=this.props.state;
        var orderProd=this.state.orderProd;
          if(state.orderc.type_temp=="EDIT")
                {
                    editer=true;
                    var arr=state.soEdit;
                    for(var i=0; i<arr.length; i++)
                    {
                        var item=arr[i];
                        if(item.category==orderProd.cat && item.product==orderProd.prod)
                        {
                            soEdit=item;
                        }
                    }
                }
                return {editer:editer,soEdit:soEdit};
    },
    renderOrderUI:function()
    {
        var _this=this;
        var orderpos=this.props.state.orderuiPos;
        var state=this.props.state;
        var orderProd=this.state.orderProd;
    



        if(this.state.orderui)
        {
                var ed=_this.checkSO();
                var editer=ed.editer;
                var soEdit=ed.soEdit;
            return <OrderCalc state={_this.props.state} editer={editer} soEdit={soEdit} closeui={_this.closeui} orderc={_this.props.state.orderc} startDrag={_this.startDrag} pos={orderpos} prod={orderProd} />
        }
    },
    closeui:function(){
        this.setState({orderui:false,orderProd:null});
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var prods=state.prods;
        var arr=this.makeArrs(prods);
        var showc=this.state.showc;
        var editer=false;
        var soEdit=false;
        if(state.orderc.type_temp=="EDIT")
                {
                editer=true;
                soEdit=state.soEdit;
                }
        return (<div>{_this.renderProdTopBar()}
            {_this.renderOrderUI()}
            <div style={{float:"left",paddingTop:"20px"}}>
           {arr.map(function(row,index) {
               var show=false;
               if(showc==row.cat)
               {
                   show=true;
               }
               //return <div>{row.cat} Prods: {row.prods.length}</div>
               return <ShowMeat row={row} orderProd={_this.state.orderProd} key={index} editer={editer} soEdit={soEdit} show={show} orderc={state.orderc} handleClick={_this.handleClick} startDrag={_this.startDrag} orderui={_this.orderUI}/>
                        //return <MeatCategory name={row.category} id={row.id} index={index} key={index} handleClick={_this.handleClick}/>;
            })}
            </div>
            <div style={{float:"left"}}>
            {_this.orderList()}
            </div>
         
                     </div>)
    }
});
module.exports = MainMeatCategory;