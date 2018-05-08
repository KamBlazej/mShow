var React = require('react');
var Functions = require('../functions/Functions');
var NumberInput = require('../components/NumberInput');
var ActionButton = require('../components/ActionButton');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var PrintPage = require('./PrintPage');
var ReactDOM = require('react-dom');
var _ = require('lodash');


var MainPrint = React.createClass({
     
    getInitialState:function(){
        return {
            state:{pages:[{rows:[{childs:[]}]}],remaining:this.props.orders,add:[0,0]},
            ready:false
        }  
    },
    componentDidUpdate:function(){
        if(this.state.state.remaining.length==0)
        {
          window.print();  
        }
    },
    componentDidMount:function(){
         if(this.state.state.remaining.length==0)
        {
          window.print();  
        }
    },
    action:function(action)
    {
        var _this=this;
        var adres=action.adres;
        var copy=_.cloneDeep(this.state.state);
        var add=_this.state.state.add;
         switch (action.type) {
        case "NEXT_CHILD":
            copy.pages[adres[0]].rows[adres[1]].childs.push(copy.remaining[0]);
            copy.remaining.shift();
            this.setState({state:copy});
        return false;
        case "OVERFLOW":
            if(add[1]==0)
            {
                copy.add[1]=1;
                copy.pages[add[0]].rows.push({childs:[]});
            }
            else if(add[1]==1)
            {
               copy.add[1]=0;
               copy.add[0]=copy.add[0]+1;
               copy.pages.push({rows:[{childs:[]}]});  
            }
            this.setState({state:copy});
        return false;
        
          case "END":
          var node=ReactDOM.findDOMNode(this);        
             
            //window.print();
          
        return false;
         }
        
    },
    render: function(){
        var _this=this;
        var state=this.props.state;
       
        return (<div className={"mainPrint"}>
                {_this.state.state.pages.map(function(page,index){
                    var adres=[index,0];
                        return <PrintPage rows={_this.state.state.pages[index].rows} index={index} add={_this.state.state.add} contractors={_this.props.contractors} adres={adres} key={index} action={_this.action} remaining={_this.state.state.remaining}/>
                    })
                }
        </div>)
    }
});
module.exports = MainPrint;