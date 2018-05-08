var React = require('react');
var ReactDOM = require('react-dom');

var Functions = require('../functions/Functions');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var PrintChild = require('./PrintChild');


var PrintRow = React.createClass({
    getInitialState:function(){
        return {
        }  
    },
    getRem:function(len){
        var _this=this;
        var add=this.props.add;
         var adres=this.props.adres;
        if(_this.props.remaining.length>0 && add[0]==adres[0] && add[1]==adres[1])
        {
            var rem=_this.props.remaining[0];
            return <PrintChild info={rem}  contractors={_this.props.contractors} checked={_this.check}  key={len}/>
        }
         else if(_this.props.remaining.length==0 && add[0]==adres[0] && add[1]==adres[1]){
            _this.props.action({type:"END"});
        }
        else{
           
        }
    },
    check:function(){
        var adres=this.props.adres;
        var node=ReactDOM.findDOMNode(this);
        var ov=isOverFlowed(node);
        function isOverFlowed(element){
            return element.scrollHeight > element.clientHeight;
        }
        if(!ov)
        {
            this.props.action({type:"NEXT_CHILD", adres:adres});
        }
        else{
             this.props.action({type:"OVERFLOW", adres:adres});
        }
    },
    render: function(){
        var _this=this;
        var childs=this.props.childs;
        var rem;
        var len=childs.length;
       
       
        return (<div className={"printRow"}>
            {childs.map(function(row,index){
                return <PrintChild info={childs[index]} contractors={_this.props.contractors}  key={index}/>
            })}
            {_this.getRem(len)}

        </div>)
    }
    
});
module.exports = PrintRow;