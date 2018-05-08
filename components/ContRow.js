var React = require('react');
var CellAction = require('./CellAction');
var ListBar = require('./ListBar');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var ContRow = React.createClass({
    propTypes: {
    },
    editCont:function(){
        this.props.editCont(this.props.row.id);
    },
     delCont:function(){
        this.props.delCont(this.props.row.id);
    },
    sendPass:function(){
        this.props.sendPass(this.props.row.nick);
    },
    dragStart:function(e){
        var _this=this;
        if(!this.props.drag.press && (_this.props.filter===null || _this.props.filter.length==0 ))
        {
        var x=e.nativeEvent.pageX;
        var y=e.nativeEvent.pageY;
        var noder=_this.getNode();
        _this.props.dragStart(_this.props.row.orderq,noder,x,y,_this);
        e.stopPropagation();
        e.preventDefault();

        }
    },
    contOrder:function(id){
        this.props.contOrder(id);
    },
    getNode:function(){
    return  ReactDOM.findDOMNode(this);
    },
    renderChilds:function(row,widper,width)
    {
             var w7=widper*0.7;
        w7=parseInt(w7);
        var w8=widper*0.8;
        w8=parseInt(w8);
        if(width<501)
        {
             return (<div>{row.name} {row.surname} <i>{row.company}</i>
                        </div>)
        }
        else
        {
            return (<div style={{fontSize:"13px"}}><div  className={"contCellR hideIfMob"}><div style={{width:w7+"px"}}>{row.nick}</div></div>  
                                            <div  className={"contCellR"}><div style={{width:widper+"px"}}>{row.company}</div></div>    
                                            <div  className={"contCellR"}><div style={{width:w8+"px"}}>{row.name}</div></div>  
                                            <div  className={"contCellR"}><div style={{width:w8+"px"}}>{row.surname}</div></div> 
                                            <div  className={"contCellR"}><div style={{width:widper+"px"}}>{row.city}</div></div> 
                                            
                                            <div  className={"contCellR hideIfMob"}><div style={{width:widper+"px"}}>{row.mail}</div></div> 
                                            <div  className={"contCellR hideIfMob"}><div style={{width:w7+"px"}}>{row.tel}</div></div> 
                        </div>)
        }
    },
    topQueue:function(id){
        this.props.topQueue(id);
    },
    setAnot:function(e){
        var el=ReactDOM.findDOMNode(this);
        var pos=getOffset(el);
            function getOffset(el) {
                el = el.getBoundingClientRect();
                return {
                    left: el.left + window.scrollX,
                    top: el.top + window.scrollY
                    }
                }
        var cx=e.clientX;
    	var cy=e.clientY;
        this.props.anot(true,this.props.row.id,pos.left,pos.top,cx,cy);
        
    },
    delAnot:function(){
        this.props.anot(false,null,null,null);
    },
    render: function() {
        var _this=this;
        var row=this.props.row;
        var color;
        var first=50;
         var widper,bwid;
        if(_this.props.width<501)
        {
            widper=120;
            bwid=250;
        }
        else
        {
        widper=(_this.props.width)/8;
        //widper=widper*0.9;
        bwid=widper*2;
        }
        
        if(this.props.color==0)
        {
            color="#eff4fc";
        }
        else  if(this.props.color==1)
        {
            color="white";
        }



                    return <div onMouseEnter={_this.setAnot} onMouseLeave={_this.delAnot} onMouseDown={_this.dragStart} style={{background:color, width:_this.props.width}}>
                                <div className={"inline"} style={{width:"100%"}}>
                                    <div className={"inline contCellTop"}>
                                        <ListBar contOrder={_this.contOrder} contID={row.id}>
                                            {_this.renderChilds(row,widper,_this.props.width)}

                                           
                                        </ListBar>
                                    </div> 
                                    <div className={"contCellBut"} style={{}}>
                                         <div>
                                            <div style={{width:bwid+"px"}}>
                                                <div className={"inline"}>
                                                    <CellAction html={"Edytuj"} action={_this.editCont} idc={row.id}/>
                                                </div>
                                                <div className={"inline"}>
                                                    <CellAction html={"Usuń"} action={_this.delCont} idc={row.id}/>
                                                </div>
                                                <div className={"inline"}>
                                                    <CellAction html={"Wyślij Hasło"} action={_this.sendPass} idc={row.id}/>
                                                </div>
                                                <div className={"inline"}>
                                                    <CellAction html={"Na Górę"} action={_this.topQueue} idc={row.id}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                    </div>
    }
});

module.exports = ContRow;

