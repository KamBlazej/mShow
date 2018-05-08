var React = require('react');
var Functions = require('../functions/Functions');
import Flexbox from 'flexbox-react';

var ShowMeatProd = React.createClass({
    getInitialState:function(){
        return {
            orderProd:this.props.orderProd
        }  
    },

    orderUI:function(e){
        e.stopPropagation();
        
        this.props.orderui(true,this.props.prod);
    },
    componentWillReceiveProps:function(p){
        if(p.orderProd!=this.state.orderProd)
        {
            this.setState({orderProd:p.orderProd});
        }
    },
    render: function(){
        var _this=this;
        var orderc=this.props.orderc;
        var prod=this.props.prod;
        var nam=Functions.cpAmount(orderc.temp_order,prod);
        var fcol="black";

        var editer=this.props.editer;
        if(editer)
        {
            var so=false;
            var arr=_this.props.soEdit;
                    for(var i=0; i<arr.length; i++)
                    {
                        var item=arr[i];
                        if(item.category==prod.cat && item.product==prod.prod)
                        {
                            so=item;
                        }
                    }
            if(!so)
            {
                so={category:prod.cat,product:prod.prod,amount:0}
            }
            var diff=Functions.cpefAmount(orderc.temp_edit,prod,so);
            nam=parseInt(nam)-diff;
        }
        var clas;
            if(this.props.color==0)
            {
            clas="meatProd meatProd1";
            }
            else  if(this.props.color==1)
            {
            clas="meatProd meatProd2";
        }
        var fonter="normal";
        var orderProd=_this.state.orderProd;
        if(orderProd!==null && orderProd!=false && orderProd!=undefined)
        {
            if(orderProd.cat==prod.cat && orderProd.prod==prod.prod)
            {
                fonter="bold";
            }
        }
        if(nam==0)
        {
            fcol="red";
        }
        /*  */
        return (  <div  className={clas} onClick={_this.orderUI} style={{fontWeight:fonter}}>
                    <Flexbox element="div" width="100%" display="flex" flexWrap="wrap"> 
                        <Flexbox element="div" display="flex" alignItems="center" justifyContent="center">
                            <div style={{width:"180px",color:fcol}}> {prod.prod}  </div>
                        </Flexbox>
                        <Flexbox element="div" display="flex" alignItems="center" justifyContent="center">
                            <div style={{width:"70px"}}>{prod.price} ZŁ</div>
                        </Flexbox>
                        <Flexbox element="div" display="flex" alignItems="center" justifyContent="center">
                            <div style={{width:"70px",color:fcol}}>{nam} KG</div>
                        </Flexbox>
                    </Flexbox>
                </div> )
    }
});
module.exports = ShowMeatProd;