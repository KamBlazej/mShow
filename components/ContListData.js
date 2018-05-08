var React = require('react');
var ReactDOM = require('react-dom');
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var ActionButton = require('./ActionButton');
var TextInput=require('./TextInput');
var ContRow = require('./ContRow');
var CellAction = require('./CellAction');
var AutoInput = require('./AutoInput');
var AjaxCont = require('../ajaxfunc/AjaxCont');
var _ = require('lodash');
var DnD = require('../functions/DnD');
var Functions = require('../functions/Functions');
var Alerts = require('../functions/Alerts');
var DropdownList = require('react-widgets').DropdownList
require('fixed-data-table/dist/fixed-data-table.css');
require('react-widgets/dist/css/react-widgets.css');
import {Table, Column, Cell} from 'fixed-data-table';
import ResponsiveFixedDataTable from 'responsive-fixed-data-table';


var ContListData = React.createClass({
   propTypes: {
  },
      getInitialState: function() {
    return {  
           drag:{left:0,top:0,dragging:false,press:false,noder:false,element:null,id:null},
           anot:{id:null,status:false,x:20,y:20}
       // show: this.props.rows
        //this.props.rows.slice(this.props.per*this.props.page,this.props.per*this.props.spage) 
    };
  },
 
  dragCall:function(type,data){
    var _this=this;
      switch (type) {
      ////////////// dodaj
        case "drag":
        _this.setState({drag: data});
        return false;
         case "list":
  
        _this.props.setNewOrder(data,"temp");
        return false;
         case "end":
        _this.props.setNewOrder(data,"action");
        return false;
      }
  },
  dragStart:function(id,noder,x,y,element){
   var dnd= new DnD(id,noder,x,y,this,this.dragCall,this.props.rows,this.state.drag);
  },
  result:function(){

  },
  addC:function(){
    store.dispatch(Actions.changeRoute("ADD_CONTRACTOR"));
  },
  editCont:function(id){
    store.dispatch(Actions.setBundle({route:{r:"EDIT_CONTRACTOR"},contEditID:id}));
  },
  delCont:function(id){
      var nick=Functions.searchArr(this.props.rows,"id",id);
      nick=nick.nick;
    AjaxCont.delete(this.props.state.login,id,nick);
  },
  sendPass:function(nick){
    AjaxCont.sendPass(this.props.state.login,nick,this.sendPassResult);
  },
  sendPassResult:function(result)
  {
    if(result=="succes")
    {
    Alerts.setAlert(true,"Hasło Zostało zmienione, oraz wysłane na mail klienta", "succes", 10000);
    }
  },
      prev:function(){
        this.props.prev();
    },
    next:function(){
        this.props.next();

    },
       prevb:function(){
           var _this=this;
            
            if(_this.props.page>0)
            {
               
             return(  <ActionButton action={_this.prev} html={"poprzednia strona"} />);
            }
        },
        nextb:function(){
            var _this=this;
            if(_this.props.rows.length<_this.props.per || _this.props.rows.length+(_this.props.per*_this.props.page)>=_this.props.len)
            {

            }
            else{
                return(  <ActionButton action={_this.next} html={"następna strona"} />); 
            }
        },
        selRow:function(event,index){
 
        },
        parentWidth:function(){
            var parent=this.props.parent;
           // var width=React.findDOMNode(parent).offsetWidth;
            return ReactDOM.findDOMNode(parent).offsetWidth;
        },
        contOrder:function(id){
            var cont =Functions.searchArr(this.props.state.contractors, "id", id);
            
            ////////
            if(this.props.state.orderc.cont.id==id)
            {
            store.dispatch(Actions.setOrder({action:"loadCont",cont:cont})); 
            }
            else{
                store.dispatch(Actions.setOrder({action:"newCont",cont:cont}));
            }
  
            
        },
        changeSel:function(val)
        {
            store.dispatch(Actions.setBundle({filterContSelect:val.value}));
        },
        changeFilter:function(text){
             store.dispatch(Actions.setBundle({filterCont:text}));
        },
        topQueue:function(id){
            this.props.topQueue(id);
        },
        renderTopBar:function(width,widper)
        {
             var w7=widper*0.7;
        w7=parseInt(w7);
        var w8=widper*0.8;
        w8=parseInt(w8);

                if(width>500)
                {
                       return (<div  style={{width:"100%", display:"table",background:"black",color:"white",textAlign:"center",borderRight:"1px solid white", fontWeight:"bold"}}>
                                        <div className={"inline contCellTop"}> 
                                            <div  className={"contCell"}><div style={{width:w7+"px"}}>NICK</div></div> 
                                            <div  className={"contCell"}><div style={{width:widper+"px"}}>FIRMA</div></div>    
                                            <div  className={"contCell"}><div style={{width:w8+"px"}}>IMIĘ</div></div>  
                                            <div  className={"contCell"}><div style={{width:w8+"px"}}>NAZWISKO</div></div> 
                                             <div  className={"contCell"}><div style={{width:widper+"px"}}>ADRES</div></div> 
                                            <div  className={"contCell"}><div style={{width:widper+"px"}}>E-MAIL</div></div> 
                                            <div  className={"contCell"}><div style={{width:w7+"px"}}>TEL</div></div>
                                        </div>
                                        <div className={"inline"} style={{width:"19%",verticalAlign:"top"}}>
                                            <div  className={"contCell"}>
                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>)
                }
                else{
                       return (<div  style={{width:"100%", display:"block",background:"black",color:"white",textAlign:"center",borderRight:"1px solid white", fontWeight:"bold"}}>
                                        
                                    LISTA KONTRAHENTÓW
                                        
                                    </div>)
                }
        },
        getSug:function(){
            var sug=[];
            var rows=this.props.rows;
            var cs=this.props.state.filterContSelect;
            for(var i=0; i<rows.length; i++)
            {
                var row=rows[i];
                 if(cs=="all")
                {
                    var name=row.name;
                    var surname=row.surname;
                    var company=row.company;
                    name=name.trim();
                    surname=surname.trim();
                    company=company.trim();
                    sug.push({name:name});
                    sug.push({name:surname});
                    sug.push({name:company});
                }
                else
                {
                    var tcs=row[cs].trim();
                    sug.push({name:tcs});
                }

            }
           return sug;
        },
        setAnot:function(status,id,x,y,cx,cy)
        {
            var ny=y-100;
            var nx=cx+80;
            var anot={status:status,id:id,x:nx,y:ny};
            this.setState({anot:anot});
        },
        anotCount:function(){
            var _this=this;
            var orders=this.props.state.orderc.orders;
            var ordNext=[];
            var ordToday;
            var ordPrev=[];
            var value=0;
            var gd = Functions.getDate();
            var date=gd.y+""+gd.m+""+gd.d;
        
            date=parseInt(date);

            for(var i=0; i<orders.length; i++)
            {
                var ord=orders[i];
                     var arrd=ord.info.arriveD;
                    arrd = arrd.split("-");
                     arrd = arrd[2]+""+arrd[1]+""+arrd[0];
            
                    arrd=parseInt(arrd);
                   
               
                if(ord.info.contID==_this.state.anot.id)
                {

                        if(date>arrd)
                        {
                            ordPrev.push(ord);
                        }
                        else if(date==arrd)
                        {
                            ordToday=ord;
                        }
                        else if(date<arrd)
                        {
                            ordNext.push(ord);
                        }

                    for(var j=0; j<ord.orders.length; j++)
                    {
                        var or=ord.orders[j];
                         value=parseFloat(value)+(parseFloat(or.price)*parseInt(or.amount));
                    }
                }
            }
            value=Functions.priceFormat(value);
            //ordPrev=Math.max.apply(Math,ordPrev.map(function(o){return parseInt(o.info.arriveD);}));
            //ordNext=Math.min.apply(Math,ordNext.map(function(o){return parseInt(o.info.arriveD);}));
            var high,low;
            for(var i=0; i<ordPrev.length; i++)
            {
                var prev=ordPrev[i];
                if(i==0)
                {
                    high=prev;
                }
                 var prevD=prev.info.arriveD;
                 prevD=Functions.dateInt(prevD);
                 var highD=high.info.arriveD;
                 highD=Functions.dateInt(highD);
                if(prevD>highD)
                {
                    high=prev;
                }
            }
            for(var i=0; i<ordNext.length; i++)
            {
                var next=ordNext[i];
                if(i==0)
                {
                    low=next;
                }
                 var nextD=next.info.arriveD;
                 nextD=Functions.dateInt(nextD);
                 var lowD=low.info.arriveD;
                 lowD=Functions.dateInt(lowD);
                if(nextD<lowD)
                {
                    low=next;
                }
            }
            return {value:value,prev:high,today:ordToday,next:low};
        },
        renderAnot: function(){
            
            var info=this.anotCount();
            var anot=this.state.anot;
            var prev=info.prev;
            var today=info.today;
            var next=info.next;
            function rendPrev(){
                if(prev===null || prev=="" || prev==false || prev==undefined)
                {
                    return (<div><span style={{color:"#f2b598"}}>Poprzednie zamówienie:</span> Brak</div>);
                }
                else
                {
                    return (<div><span style={{color:"#f2b598"}}>Poprzednie zamówienie:</span> {prev.info.arriveD} {prev.info.arriveT} </div>)
                }
            }
            function rendToday(){
                if(today===null || today=="" || today==false || today==undefined)
                {
                    return (<div><span style={{color:"#f4f0d7"}}>Dzisiejsze zamówienie:</span> Brak</div>);
                }
                else
                {
                    return (<div><span style={{color:"#f4f0d7"}}>Dzisiejsze zamówienie:</span> {today.info.arriveD} {today.info.arriveT} </div>)
                }
            }
            function rendNext(){
                if(next===null || next=="" || next==false || next==undefined)
                {
                    return (<div><span style={{color:"#d7ffaa"}}>Kolejne zamówienie:</span> Brak</div>);
                }
                else
                {
                    return (<div><span style={{color:"#d7ffaa"}}>Kolejne zamówienie:</span> {next.info.arriveD} {next.info.arriveT} </div>)
                }
            }
            
            if(anot.status)
            {
                return (<div style={{background:"#262828",color:"white",zIndex:"99", padding:"6px",fontSize:"13px",fontFamily:"arial", border:"2px solid #0499ce",position:"absolute", left:anot.x, top:anot.y}}>
                        <div>Wartośc Zamówień: <span style={{fontWeight:"bold"}}> {info.value}</span>  ZŁ  </div>
                        {rendPrev()}
                        {rendToday()}
                        {rendNext()}
                </div>)
            }
        },
       render: function() {
      var _this=this;
        var prevb, nextb,width,height;
        var rowHeight=30;
       // this.display=this.result();
        height=(_this.props.rows.length*rowHeight)+100;
        width=_this.parentWidth();
        width=width*0.95;
        width=parseInt(width);
        var first=50;
        var widper=(width)/8;
        var searchV = [{text:"Imię/Nazwisko/Firma",value:"all"},{text:"Login",value:"nick"},{text:"Imię",value:"name"},{text:"Nazwisko",value:"surname"},{text:"Firma",value:"company"},{text:"Adres",value:"city"}];
        //widper=widper*0.9;
        var cs=this.props.state.filterContSelect;

        var sug=this.getSug();
        
        var widget =(
            <DropdownList data={searchV}
            textField='text'
            valueField='value'
            onChange={_this.changeSel}
            defaultValue={cs}
            />
        )
       

    return (
      <div>
          {_this.renderAnot()}
          <div style={{marginTop:"5px", marginBottom:"5px"}}> <div style={{fontFamily:"arial", fontSize:"13px"}}>Aby dodać zamówienie, należy kliknąć w danego klienta.</div>
           <div className={"inlinet"}><ActionButton action={_this.addC} html={"Dodaj Kontrahenta"} /></div>
          <div className={"inlinet"} style={{marginLeft:"15px"}}><div className={"inlinet"}> Wyszukaj: <AutoInput text={_this.props.state.filterCont} handleChange={_this.changeFilter} sug={sug}/></div><div className={"inlinet"}>{widget}</div></div>
          </div>
                <div  style={{width:width, margin:"0 auto"}}>
                                 {_this.renderTopBar(width,widper)}
                     {this.props.rows.map(function(row,index) {
                         var color=index%2;
                        
                        return <ContRow ref={row.orderq} anot={_this.setAnot} topQueue={_this.topQueue} filter={_this.props.state.filterCont} width={width} key={row.orderq} drag={_this.state.drag} dragStart={_this.dragStart} color={color} row={row} delCont={_this.delCont} editCont={_this.editCont} contOrder={_this.contOrder} sendPass={_this.sendPass}/>;
                     })}
                </div>
                <div style={{marginTop:"10px"}}>
                {_this.prevb()}
                {_this.nextb()}
                </div>
      </div>
    );
  },

})

module.exports = ContListData;