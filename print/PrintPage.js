var React = require('react');

var Functions = require('../functions/Functions');

var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var PrintRow = require('./PrintRow');


var PrintPage = React.createClass({
    getInitialState:function(){
        return {
        }  
    },
    action:function(action){
        this.props.action(action);
    },

    render: function(){
        var _this=this;
        var rows=this.props.rows;
        var adres=this.props.adres;
        var pad;
        if(this.props.index>0)
        {
            pad="30px";
        }
        else
        {
           pad="0px"; 
        }
        
       
        return (<div className={"page"} style={{paddingTop:pad}}>
            {rows.map(function(row,index){
                var ad=adres;
                ad[1]=index;
                return <PrintRow childs={rows[index].childs}  key={index} add={_this.props.add} adres={ad} contractors={_this.props.contractors} action={_this.action} remaining={_this.props.remaining}/>
            })}

        </div>)
    }
    
});
module.exports = PrintPage;