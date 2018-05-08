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




var RestoreProd = React.createClass({
          
          
    propTypes: {
        state: PropTypes.object.isRequired,
    },
     getInitialState:function(){
        return {
        
        }  
    },

    makeArrs:function(prods){
        var arrs={};
        var narr=[];
        for(var i=0; i<prods.length; i++)
        {
            var prod=prods[i];
            if(!arrs[prod.cat])
            {
               arrs[prod.cat]=[];
               arrs[prod.cat].push({type:"main",data:prod.cat});
            }
             arrs[prod.cat].push({type:"prod",data:prod});
        }
        //console.log(arrs);
        Object.keys(arrs).map(function(key, index) {
             narr = narr.concat(arrs[key]);
        });
        return narr;
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
        var prods=state.prodsCancel;
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
            var narr=_this.makeArrs(prods);
            //console.log(narr);
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
                       return <ProdRowRestore row={row.data} login={state.login} key={index} color={color}/>
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
module.exports = RestoreProd;