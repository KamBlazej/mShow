    
var React = require('react');
var ReactDom = require('react-dom');

var Highcharts = require('highcharts');

var ReactHighcharts = require('react-highcharts');
require('highcharts/modules/exporting')(ReactHighcharts.Highcharts);
//require('highcharts-3d')(ReactHighcharts.Highcharts);
require("../node_modules/highcharts/highcharts-3d.js")(ReactHighcharts.Highcharts);
import { Chart } from 'react-google-charts';

var Functions = require('../functions/Functions');

var DropdownList = require('react-widgets').DropdownList
var OptionComp = require('../components/OptionComp');
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
require('react-select/dist/react-select.css');
require('react-widgets/dist/css/react-widgets.css');

//require('highcharts-3d')(ReactHighcharts.Highcharts);

var config = {
     chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 25,
            depth: 70,
            viewDistance: 30,
        }
    },
    title: {
        text: '3D chart with null values'
    },
    subtitle: {
        text: 'Notice the difference between a 0 value and a null point'
    },
    plotOptions: {
        column: {
            depth: 25
        }
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         labels: {
            style: {
                color: '#6e6e70'
            }
         } 
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            style: {
                color: '#6e6e70'
            }
      }
    },
    series: [{
        name: 'Sales',
        data: [2],
    }]

};


var Charts = React.createClass({
    getInitialState:function(){
        var state=this.props.state;
        return {
            days:state.chartSet.days,
            type:state.chartSet.type
        }  
    },
    componentWillReceiveProps:function(p){
        var _this=this;
        if(p.state.chartSet.days!=_this.state.days || p.state.chartSet.type!=_this.state.type)
        {
            _this.setState({days:p.state.chartSet.days,type:p.state.chartSet.type});
        }
    },
    componentDidMount:function(){
        console.log(this.props.state);
    },
    setColor:function(cat){
          switch (cat) {
                case "Kurczak":
                    //color="#f46242";
                return "#f46242";
                case "Wieprzowina":
                    //color="#f9370c";
                return "#f9370c";
                case "Wołowina":
                    //color="#a82a0f";
                return "#a82a0f";
                 case "Cielęcina":
                    //color="#f9370c";
                return "#935345";
                case "Indyk":
                    //color="#84301e";
                return "#84301e";
                case "Kaczka":
                    //color="#b7503a";
                return "#b7503a";
                case "Gęś":
                    //color="#f9846b";
                return "#f9846b";
                case "Inne":
                    //color="#ffad9b";
                return "#ffad9b";
                }
    },
    setDesc:function(t){
          switch (t) {
                case "all":
                return "Wartość zamówień";
                case "m3":
                return "Wartość dzisiejszych zamówień, oraz z kolejnych 2 dni";
                case "m7":
                return "Wartość dzisiejszych zamówień, oraz z kolejnych 6 dni";
                 case 3:
                return "Wartość zamówień z 3 ostatnich dni";
                case 7:
                return "Wartość zamówień z ostatniego tygodnia";
                case 14:
                return "Wartość zamówień z ostatnich 2 tygodni";
                case 30:
                return "Wartość zamówień z ostatniego miesiąca";
            }
    },
    getData:function(){
        var _this=this;
        var state=this.props.state;
        var orders=state.orderc.orders;
        var days=this.state.days;
        var type=this.state.type;
        var from,to;
        var gtd=Functions.getDate();
        var today = gtd.y+''+gtd.m+''+gtd.d;
        today=parseInt(today);
        if(days.toString().includes("m"))
        {
            days=days.toString().substr(1);
            days=parseInt(days);
             to = Functions.getDateD(days);
             to=to.y+""+to.m+""+to.d;
             to=parseInt(to);
              from = Functions.getDateD(-1);
             from=from.y+""+from.m+""+from.d;
             from=parseInt(from);
            
        }
        else if(days=="all")
        {
            days=0;
            from=0;
            to=99999999;
        }
        else
        {
            days=0-parseInt(days);
            from=Functions.getDateD(days);
            from=from.y+""+from.m+""+from.d;
            from=parseInt(from);
            to=today;
        }
         
        var gd = Functions.getDateD(days);
        var date=gd.y+""+gd.m+""+gd.d;
        var cats={};
        
        date=parseInt(date);
        for(var i=0; i<orders.length; i++)
        {
            var order=orders[i];
            var arrd=order.info.arriveD;
            arrd = arrd.split("-");
            arrd = arrd[2]+""+arrd[1]+""+arrd[0];
            
            arrd=parseInt(arrd);

            if(arrd>from && arrd<to)
            {
                var ords=order.orders;
                if(type=="cats")
                {
                         for(var j=0; j<ords.length; j++)
                        {
                            var ord=ords[j];
                            var cat=ord.category;
                            if(cats[cat])
                            {
                                cats[cat].amount=parseInt(cats[cat].amount)+parseInt(ord.amount);
                                cats[cat].price=parseFloat(cats[cat].price)+(parseFloat(ord.price)*parseInt(ord.amount));
                            }
                            else{
                                cats[cat]={amount:parseInt(ord.amount),price:parseFloat(ord.price)*parseInt(ord.amount)}
                            }
                        }
                }
                else if(type=="prods")
                {
                     for(var j=0; j<ords.length; j++)
                        {
                            var ord=ords[j];
                            var cat=ord.category;
                            var prod=ord.product;
                            if(cats[cat])
                            {
                                if(cats[cat][prod])
                                {
                                cats[cat][prod].amount=parseInt(cats[cat][prod].amount)+parseInt(ord.amount);
                                cats[cat][prod].price=parseFloat(cats[cat][prod].price)+(parseFloat(ord.price)*parseInt(ord.amount));  
                                }
                                else
                                {
                                  cats[cat][prod]={amount:parseInt(ord.amount),price:parseFloat(ord.price)*parseInt(ord.amount)}  
                                }
                            }
                            else{
                                cats[cat]={};
                                cats[cat][prod]={amount:parseInt(ord.amount),price:parseFloat(ord.price)*parseInt(ord.amount)}
                            }
                        }
                }
                else if(type=="conts")
                {
                 for(var j=0; j<ords.length; j++)
                        {
                            
                            var ord=ords[j];
                            var cont=order.info.contID;
                            cont=Functions.searchArr(state.contsAll,"id",cont);
                            cat=cont.nick;
                            if(cats[cat])
                            {
                                cats[cat].amount=parseInt(cats[cat].amount)+parseInt(ord.amount);
                                cats[cat].price=parseFloat(cats[cat].price)+(parseFloat(ord.price)*parseInt(ord.amount));
                            }
                            else{
                                cats[cat]={amount:parseInt(ord.amount),price:parseFloat(ord.price)*parseInt(ord.amount),name:cont.name+" "+cont.surname+" \""+cont.company+"\""}
                            }
                        }
                }
           
            }

        }
        var charts=[];
        if(type=="cats")
        {
            Object.keys(cats).map(function(key,index) {
                var color=_this.setColor(key);
                cats[key].price=Functions.priceFormat(cats[key].price);
                var obj={cat:key,amount:cats[key].amount,price:cats[key].price,color:color};
                charts.push(obj);
                
            });
        }
        else if(type=="conts")
        {
            Object.keys(cats).map(function(key,index) {
                var color="#498fff";
                cats[key].price=Functions.priceFormat(cats[key].price);
                var obj={cat:key,amount:cats[key].amount,price:cats[key].price,color:color,name:cats[key].name};
                charts.push(obj);
                
            });
        }
        else if(type=="prods")
        {
                Object.keys(cats).map(function(key,index) {
                var color="#498fff";
                    Object.keys(cats[key]).map(function(prod,indexx) {
                        cats[key][prod].price=Functions.priceFormat(cats[key][prod].price);
                        var obj={cat:key,prod:prod,amount:cats[key][prod].amount,price:cats[key][prod].price,color:color};
                        charts.push(obj);
                    
                    });
                });
        }
        charts.sort(function(a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });
        if(type=="prods" || type=="conts")
        {
            var nc=[];
            var top=charts.length;
            if(charts.length>15)
            {
                top=15;
            }
            for(var i=0; i<top; i++)
            {
                var c=charts[i];
                nc.push(c);
            }
            charts=nc;
        }
        return charts;

    },
    renderChart:function(){
        if(this.state.ready)
        {
             return <ReactHighcharts config={config}></ReactHighcharts>
        }
        else{
            return <div>wait</div>
        }
    },
     renderGChart:function(data){
         var type=this.state.type;
         var h;
         
        
            var chd=[];
            chd.push(['Element', 'Wartość', { role: 'style' }, { role: 'annotation' }]);
            for(var i=0; i<data.length; i++)
            {
                var name;
                var d=data[i];
                 if(type=="cats")
                    {
                     name=d.cat;
                     h=400;
                    }
                else if(type=="prods")
                {
                    name=d.cat+" / "+d.prod;
                    h=800;
                }
                else if(type=="conts")
                {
                    name=d.name;
                    h=800;
                }
                
                chd.push([name,parseFloat(d.price),d.color,parseFloat(d.price)+" zł"]);
            }
            if(data.length>0)
            {
                var char;
                if(type=="cats")
                {
                     char="ColumnChart";
                }
                else if(type=="prods" || type=="conts")
                {
                    char="BarChart";
                }
                    return   (<div>
                            <Chart
                            chartType={char}
                            data={ chd}
                            options={{legend: 'none'}}
                            
                            graph_id="ColumnChart"
                            width="100%"
                            height={h+"px"}
                            />
                    </div>)
            }
            else
            {
                 return <div style={{fontSize:"18px",fontFamily:"arial",marginTop:"15px",marginLeft:"15px",color:"#42070b"}}>Brak Danych do wyświetlenia</div>
            }
            
    },
    daysChange:function(val){
        var obj={days:val.value,type:this.state.type}
         store.dispatch(Actions.setBundle({chartSet:obj}));
       // this.setState({days:val.value});
    },
    genOptions:function(){
        var options=[];
        options.push({value:"all",label:"Wszystko",color:"#f4f0a1"});
        options.push({value:"m3",label:"dziś oraz 2 kolejne dni",color:"#c6ffc4"});
        options.push({value:"m7",label:"dziś oraz 6 kolejnych dni",color:"#a3e0a1"});
        options.push({value:3,label:"3 ostatnie dni",color:"#e0a1a1"});
        options.push({value:7,label:"ostatni tydzień",color:"#e59595"});
        options.push({value:14,label:"ostatnie 2 tygodnie",color:"#e0a1a1"});
        options.push({value:30,label:"ostatni miesiąc",color:"#e59595"});
        return options;
    },
     typeChange:function(val){
          var obj={days:this.state.days,type:val.value}
         store.dispatch(Actions.setBundle({chartSet:obj}));
        //this.setState({type:val.value});
    },
    genOptionsType:function(){
        var options=[];
        options.push({value:"cats",label:"Kategorie",color:"white"});
        options.push({value:"prods",label:"Top 15 produktów",color:"#bec9db"});
        options.push({value:"conts",label:"Top 15 Klientów",color:"white"});
        return options;
    },
    ////////{_this.renderChart()}
    render: function(){
        var _this=this;
        var options=this.genOptions();
        var optionsType=this.genOptionsType();
        var data=this.getData();
        var desc=this.setDesc(_this.state.days);
        return( <div>
                    <div>
                        <div className="inlinet" style={{width:"150px"}}>Przedział Czasowy: </div><div className="inlinet" style={{width:"200px"}}><DropdownList  valueField='value' textField='label' defaultValue={_this.state.days} data={options} onChange={_this.daysChange} itemComponent={OptionComp}/></div>
                    </div>
                    <div>
                        <div className="inlinet" style={{width:"150px"}}>Typ Danych:  </div><div className="inlinet" style={{width:"200px"}}><DropdownList  valueField='value' textField='label' defaultValue={_this.state.type} data={optionsType} onChange={_this.typeChange} itemComponent={OptionComp}/></div>
                    </div>
            <div>{desc}</div>{_this.renderGChart(data)}</div> )
        
        
    }
})
module.exports = Charts;