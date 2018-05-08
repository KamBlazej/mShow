var React = require('react');
var ProdTopBar = require('./ProdTopBar');
var Functions = require('../functions/Functions');
var NumberInput = require('../components/NumberInput');
var TextInput = require('../components/TextInput');
var ActionButton = require('../components/ActionButton');
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
        this.setState({value:value});
    },
    handleComm:function(id,value){
        this.setState({comm:value});
    },
    orderk:function(){
        this.makeOrder("k");
    },
    orders:function(){
        this.makeOrder("s");
    },
    makeOrder:function(){
        var state=this.props.state;
        var id=this.props.id;
        var idc=this.props.idc;
        var cat=Functions.searchArr(state.prods,"id",idc);
        var prod=Functions.searchArr(cat.prods,"id",id);
        var order;
        if(state.orderc.type_temp=="EDIT")
        {
            order={cat:cat.category,prod:prod.name,amount:this.state.value,comm:this.state.comm,contID:state.orderc.cont.id,authorID:state.login.id,authorName:state.login.login};
        }
        else{
            order={cat:cat.category,prod:prod.name,amount:this.state.value,comm:this.state.comm,contID:state.orderc.cont.id,authorID:state.login.id,authorName:state.login.login};
        }
    
        store.dispatch(Actions.addOrder({order:order,type:state.orderc.type_temp}));
        Alerts.setAlert(true,"Dodano "+this.state.value+" X "+prod.name+" do zamówienia", "confirmed",10000);
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
        this.setState({value:amount});
    },

    render: function(){
        var _this=this;
        var state=this.props.state;
        var id=this.props.id;
        var idc=this.props.idc;
        var color,background;
        var row1=[1,2,3,"X"];
        var row2=[4,5,6];
        var row3=[7,8,9,0];
        var cat=Functions.searchArr(state.prods,"id",idc);
        var prod=Functions.searchArr(cat.prods,"id",id);
        return (<div><ProdTopBar state={state} route={{r:"PROD_LIST",a:{id:idc}}}/>
            <div>Kategoria: <b>{cat.category}</b> Produkt: <b>{prod.name}</b></div>
            <div><div className={"inline"} style={{width:"80px"}}>Komentarz: </div><TextInput text={_this.state.comm} handleChange={_this.handleComm}/></div>
            <div><div className={"inline"} style={{width:"80px"}}>Ilość: </div><NumberInput text={_this.state.value} handleChange={_this.handleChange}/></div>
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