var React = require('react');
var ProdTopBar = require('./ProdTopBar');
var Functions = require('../functions/Functions');
var NumberInput = require('../components/NumberInput');
var NumberInputO = require('../components/NumberInputO');
var TextInput = require('../components/TextInput');
var ActionButton = require('../components/ActionButton');
var TextArea = require('../components/TextArea');
var Alerts = require('../functions/Alerts');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var CalcButton = require('./CalcButton');


var OrderCalc = React.createClass({
    getInitialState:function(){
        return {
         value:0,
         comm:null
        }  
    },
    handleChange:function(value){
        if(value<0)
        {
            value=0;
        }
        var sv=value.toString();
        if(sv.length>5)
        {

        }
        else
        {
            value=this.checkAmount(value);
            this.setState({value:value});
        }
        //var am=this.props.prod.amount;
       
    },
    handleComm:function(value){
         var sv=value.toString();
        if(sv.length>150)
        {

        }
        else
        {
         this.setState({comm:value});
        }
    },
    orderk:function(){
        this.makeOrder("k");
    },
    orders:function(){
        this.makeOrder("s");
    },
    amountFix:function()
    {
        var a=this.state.value;
        if(a<0 || a===null || a==undefined || a==false)
        {
            a=0;
        }
        a=+a;
        this.setState({value:a});
    },
    checkAmount:function(a){
        var orderc=this.props.orderc;
        var nam=Functions.cpAmount(orderc.temp_order,this.props.prod);

          var editer=this.props.editer;
        if(editer)
        {
            var soEdit=this.props.soEdit;
            var diff=Functions.cpefAmount(orderc.temp_edit,this.props.prod,soEdit);
            nam=parseInt(nam)-diff;
        }
        if(a>nam)
        {
            a=nam;
        }
        return a;
    },
    makeOrder:function(){
        var state=this.props.state;
        var cat=this.props.prod.cat;
        var prod=this.props.prod.prod;
        var amount=this.state.value;
        var order;
        var price=this.props.prod.price;
        var pr=parseInt(amount)*price;
        pr=Functions.priceFormat(pr);
        if(amount<0)
        {
            amount=0;
        }
        if(state.orderc.type_temp=="EDIT")
        {
            order={category:cat,product:prod,price:price,amount:amount,comm:this.state.comm,contID:state.orderc.cont.id,authorID:state.login.id,authorName:state.login.login};
        }
        else{
            order={category:cat,product:prod,price:price,amount:amount,comm:this.state.comm,contID:state.orderc.cont.id,authorID:state.login.id,authorName:state.login.login};
        }
    
        store.dispatch(Actions.addOrder({order:order,type:state.orderc.type_temp}));
        this.setState({value:0,comm:null});
        this.closeui();
        Alerts.setAlert(true,"Dodano "+this.state.value+" X "+prod+" do zamówienia", "confirmed",10000);
    },
    buttonPress:function(t)
    {
        var amount=this.state.value;
        var len=amount.toString();
        var len=len.length;
        if((t!="X") && amount==0)
        {
            amount=t
        }
        else if(t!="X")
        {
            amount=amount+""+t;
        }
        else if(t=="X" && len>0 && amount!=0)
        {
            if(len==1)
            {
                amount=0;
            }
            else
            {
            var str = amount.toString();
            str = str.slice(0, -1);
            str=parseInt(str);
            amount=str;
            }
            
        }
        var am=this.props.prod.amount;
        amount=this.checkAmount(amount);
        this.setState({value:amount});
    },
    closeui:function(){
        this.props.closeui();
    },
    startDrag:function()
    {
        this.props.startDrag();
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var id=this.props.id;
        var idc=this.props.idc;
        var color,background;
        var posX=this.props.pos.x+"px";
        var posY=this.props.pos.y+"px";
        var wt=this.props.pos.w+"px";
        var ht=this.props.pos.h+"px";
        var row1=[1,2,3,"X"];
        var row2=[4,5,6];
        var row3=[7,8,9,0];
        var cat=this.props.prod.cat;
        var prod=this.props.prod.prod;
        var am=this.props.prod.amount;
        ////
        var orderc=this.props.orderc;
        var nam=Functions.cpAmount(orderc.temp_order,this.props.prod);
        //////
        var editer=this.props.editer;
        if(editer)
        {
            var soEdit=this.props.soEdit;
            var diff=Functions.cpefAmount(orderc.temp_edit,this.props.prod,soEdit);
            
            nam=parseInt(nam)-diff;
        }
        //////
        var price=this.props.prod.price;
        var a=this.state.value;
        if(a===null || a==undefined || a==false)
        {
            a=0;
        }
        var pr=parseInt(a)*price;
        pr=Functions.priceFormat(pr);
        return (<div style={{position:"fixed",left:posX,top:posY,width:wt,height:ht,background:"white",border:"2px solid black",zIndex:"999"}}>
            <div onMouseDown={_this.startDrag} className={"dragBar"}><div style={{float:"right"}}><img onClick={_this.closeui} style={{width:"30px",cursor:"pointer"}}  src={"img/close.png"}/></div></div>
            <div>Kategoria: <b>{cat}</b> Produkt: <b>{prod}</b></div>
            <div><div className={"inline"} style={{width:"80px"}}>Komentarz: </div><TextArea height={5} width={"163px"}  clas={"areaCool"} text={_this.state.comm} handleChange={_this.handleComm} nores={true}/></div>
            <div><div className={"inline"} style={{width:"80px"}}>Ilość Kg: </div><NumberInputO width={"auto"} save={_this.amountFix} clas={"inputCool"} text={_this.state.value} handleChange={_this.handleChange}/> / {nam}</div>
            <div>Cena za kg: {price} <b>Łącznie: </b>{pr} </div>
            <div><ActionButton action={_this.makeOrder} html={"Dodaj do zamówienia"}/>
                <div>{row1.map(function(but,index){
                        return <CalcButton action={_this.buttonPress} number={but}/>
                        })
                    }
                </div>
                <div>{row2.map(function(but,index){
                        return <CalcButton action={_this.buttonPress} number={but}/>
                        })
                    }
                </div>
                <div>{row3.map(function(but,index){
                        return <CalcButton action={_this.buttonPress} number={but}/>
                        })
                    }
                </div>
            </div>

        </div>)
    }
});
module.exports = OrderCalc;