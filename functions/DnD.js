var functions = require('./Functions');
var update  = require('immutability-helper');
var ReactDOM = require('react-dom');

function DnD (id,noder,x,y,parent,callback,list,drag) {
  var _this=this;
    this.id=id;
    this.callback=callback;
    this.msX=x;
    this.msY=y;
    this.drag=drag;
    this.list=list;
    this.parent=parent;
    this.cloned=noder;
    this.noder=noder.cloneNode(true);
    this.sX=this.cloned.getBoundingClientRect().left+window.scrollX;
    this.sY=this.cloned.getBoundingClientRect().top+window.scrollY;
     

    var ndrag= update(drag, {
      press: {$set:true}
    });
    callback("drag",ndrag);
    this.drag=ndrag;
    
   

    this.dX=x-this.sX;
    this.dY=y-this.sY;
   





    this.dragid=id;
    ////////////////
    this.move=function(e){

     
         
    var sX=this.sX;
    var sY=this.sY;
     
    
    if(_this.drag.press && !_this.drag.dragging)
    {
       
        if(_this.msX>e.pageX+10 || _this.msX<e.pageX-10 || _this.msY>e.pageY+10 || _this.msY<e.pageY-10 )
        {
      start();
      var ndrag= update(_this.drag, {
          dragging: {$set:true}
        });
        _this.drag=ndrag;
        callback("drag",ndrag)
        }
    }
    if(_this.drag.dragging)
      {
        
        _this.wrap.style.left=(e.pageX-_this.dX)+"px";
        _this.wrap.style.top=(e.pageY-_this.dY)+"px";
        _this.dragCol(_this.wrap,_this.dragid);

       


        e.stopPropagation()
        e.preventDefault()
      }
    function start(){
     
        var wrap = document.createElement("ul");
        wrap.className = "todo-list";
        wrap.style.position="absolute";
        wrap.style.left=e.pageX+"px";
        wrap.style.top=e.pageY+"px";
        wrap.style.zIndex=9999;
        wrap.style.opacity="0.8";
        wrap.prepend(_this.noder);
        document.body.prepend(wrap);
        _this.wrap=wrap;
        var copy = _.cloneDeep(_this.list);
        callback("list",copy);
        _this.list=copy;
        
      }
    }
    this.dragCol=function(wrap,id){
    var _this=this;
    var topm=wrap.getBoundingClientRect().top+window.scrollY;
    var hm=wrap.getBoundingClientRect().height;
    var midm=topm+(hm/2);
    var obj1={x:wrap.getBoundingClientRect().left+window.scrollX,y:topm,w:wrap.getBoundingClientRect().width,h:hm};
    for(var i=0; i<_this.list.length; i++)
    {
      
      var nr=_this.list[i].orderq;
      var elem=ReactDOM.findDOMNode(_this.parent.refs[nr]);
      
      var left=elem.getBoundingClientRect().left+window.scrollX;
      var top=elem.getBoundingClientRect().top+window.scrollY;
      var width=elem.getBoundingClientRect().width;
      var height=elem.getBoundingClientRect().height;
      var mid=top+(height/2);
      var obj2={x:left,y:top,w:width,h:height};
      var dir;
      var cloned;

      if(_this.collission(obj1,obj2) && _this.dragid!==nr)
      {
        if(midm>top && id>nr)
        {
          dir="bot";
        }
        else if(midm<top+height && id<nr)
        {
         dir="top";
        }
        if(dir=="top" || dir=="bot")
        {
          
        
        var copy = _.cloneDeep(_this.list);

             for(var j=0; j<copy.length; j++)
           {
             var item=copy[j];
             if(item.orderq==_this.dragid)
             {
              cloned=_.clone(item);
             }
           }
           cloned.orderq="c"+_this.dragid;
           cloned.dragged=true;
            for(var j=0; j<copy.length; j++)
           {
             var item=copy[j];
             if(item.orderq==nr)
             {
                 
                    copy=update(copy, {
                      
                          [j]: {
                              dragged: {$set: false}
                          }
                      
                  });
             }
           }
            for(var j=0; j<copy.length; j++)
           {
             var item=copy[j];
             if(item.orderq==nr)
             {
                 
                 if(dir=="top")
                 {
                     copy=update(copy, {$splice:[[j,0,cloned]]});
                 }
                 else if(dir=="bot")
                 {

                     copy=update(copy, {$splice:[[j+1,0,cloned]]});
                 }
                 break;
             }
           }
            /*for(var j=0; j<copy.arr.length; j++)
           {
             var item=copy.arr[j];
             if(item.id==id)
             {
                 console.log("deleted");
               copy=update(copy,{arr: {$splice:[[j,0]]}});
             }
           }*/
            var arrc=copy.filter(function(item) {
                return item.orderq !== id
            });
          var copy = update(copy, {
               $set: arrc
          });
          arrc=this.queued(copy);
           /*arrc=functions.mid(copy);*/
           var copy = update(copy, {
               $set: arrc
            });
            for(var j=0; j<copy.length; j++)
           {
             var item=copy[j];
             if(item.dragged)
             {
                 
              _this.dragid=item.orderq;
             }
           }
           //console.log(copy);
              callback("list",copy);
              _this.list=copy;
           //return copy;
        break;
        }
      }
    }
  }
  this.queued=function(arr){
    var max=0;
    for(var i=0; i<arr.length; i++)
    {
      var value=arr[i].orderq;
      if(value.toString().substring(0,1)=="c")
      {
       value= value.substring(1);
      }
 
       value=parseInt(value);
        value>max ? max=value : max=max;
    }
    for(var i=0; i<arr.length; i++)
    { 
      arr[i].orderq=max-i;
    }
    return arr;
  },
    this.end=function(e){
    document.removeEventListener("mouseup",_this.end);
    document.removeEventListener("mousemove",_this.move);

    if(_this.drag.dragging)
    {
      if(_this.list.length>0)
      {
        var cArrc = _.cloneDeep(_this.list);
        for(var i=0; i<cArrc.length; i++)
        {
          cArrc[i].dragged=false;
        }
        _this.callback("end",cArrc);
        
        var narrc= update(_this.list, {
          $set:[]
        });
        _this.list=narrc;
        //this.setState({arrc: narrc});
      }
    _this.wrap.remove();
    e.stopPropagation();
    e.preventDefault();
    }


     var ndrag= update(_this.drag, {
      dragging: {$set:false}
    });
      ndrag= update(ndrag, {
      press: {$set:false}
    });
    //this.setState({drag: ndrag});
    _this.callback("drag",ndrag);

    
  },
   this.collission=function(obj1,obj2){
      if (obj1.x < obj2.x + obj2.w &&
          obj1.x + obj1.w > obj2.x &&
          obj1.y < obj2.y + obj2.h &&
          obj1.h + obj1.y > obj2.y) {
          // collision detected!
          return true
          }else {
            return false;
          }
  }
  document.addEventListener("mouseup",_this.end);
    document.addEventListener("mousemove",_this.move);
  
    /*this.alert = function() {
        console.log("kartofle");
        //this.callback("kupka");
    };*/
    //this.alert();
}

module.exports = DnD;