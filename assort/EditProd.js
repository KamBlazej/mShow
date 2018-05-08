var React = require('react');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var NavButton = require('../components/NavButton');
var Alerts = require('../functions/Alerts');
var Functions = require('../functions/Functions');

var ActionButton = require('../components/ActionButton');
var TextInputA = require('../components/TextInputA');
var AjaxOrder = require('../ajaxfunc/AjaxOrder');

var PropTypes = React.PropTypes;

var ProdRow = require('./ProdRow');
var ProdRowRestore = require('./ProdRowRestore');




var EditProd = React.createClass({
          
          
    propTypes: {
        state: PropTypes.object.isRequired,
    },
     getInitialState:function(){
        return {
        
        }  
    },
    makeArrs:function(prods,type){
        var arrs={};
        var narr=[];
        var status;
        if(type=="edit"){status="a"}
        else if(type=="restore"){status="d"}
        var prods= prods.filter(function(element){
            return (element.status == status);
        });
        for(var i=0; i<prods.length; i++)
        {
            var prod=prods[i];
            if(!arrs[prod.cat])
            {
               arrs[prod.cat]=[];
               arrs[prod.cat].push({cat:prod.cat,type:"main",data:prod.cat});
            }
             arrs[prod.cat].push({cat:prod.cat,type:"prod",data:prod});
        }
        //console.log(arrs);
        var ar=[]
        Object.keys(arrs).map(function(key, index) {
            // narr = narr.concat(arrs[key]);
            ar.push(arrs[key]);
        });
        ar.sort(function(a, b){
            var a1= a[0].cat, b1= b[0].cat;
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        });
        for(var i=0; i<ar.length; i++)
        {
            var a=ar[i];
            narr = narr.concat(a);
        }
        return narr;
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var type=this.props.type;
        var prods;
        if(type=="edit")
        {
            prods=state.prods;
        }
        else if(type=="restore")
        {
            prods=state.prodsCancel;
        }
        var cused=[];

        function catsUsed(cat){
            var res=false;
            for(var i=0; i<cused.length; i++)
            {
                var item=cused[i];
                if(item==cat)
                {
                    res=true;
                }
            }
            if(!res)
            {
                cused.push(cat);
            }
            return res;
        }
            var narr=_this.makeArrs(prods,type);
        return (<div>
           {
               
               narr.map(function(row,index) {
                   //var newcu=catsUsed(row.cat);
                   var color=index%2;
                   if(row.type=="main")
                   {
                        return <div><b>{row.data}</b></div>
                   }
                   else
                   {
                         if(type=="edit")
                        {
                             return <ProdRow row={row.data} orderc={state.orderc} login={state.login} key={index} color={color}/>
                        }
                        else if(type=="restore")
                        {
                             return <ProdRowRestore row={row.data}  orderc={state.orderc} login={state.login} key={index} color={color}/>
                        }
                   }
                   /*var color=index%2;
                        if(newcu)
                        {
                          return <ProdRow row={row} key={index} color={color}/>
                        }
                        else
                        {
                             return <div><b>{row.cat}</b></div>
                           
                        }*/
                       
                        //return <MeatCategory name={row.category} id={row.id} index={index} key={index} handleClick={_this.handleClick}/>;
                })
            }
    
         
                     </div>)
    }
});
module.exports = EditProd;