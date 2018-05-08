var functions = require('./Functions');
var update  = require('immutability-helper');
var ReactDOM = require('react-dom');

function DnDF (callback,sp,store,Actions) {
  var _this=this;
  this.callback=callback;
  this.sx=sp.x;
  this.sy=sp.y;
  this.cpSet=false;
  this.dx=0;
  this.dy=0;

    ////////////////
    this.move=function(e){
       
      if(!_this.cpSet)
      {
        _this.cpSet=true;
        _this.dx=parseInt(e.pageX)-parseInt(_this.sx);
        _this.dy=parseInt(e.pageY)-parseInt(_this.sy);
      }
      else
      {
      _this.callback(parseInt(e.pageX)-parseInt(_this.dx),parseInt(e.pageY)-parseInt(_this.dy),store,Actions);
      }
      e.stopPropagation();
        e.preventDefault();
    }
    
    this.end=function(e){
    document.removeEventListener("mouseup",_this.end);
    document.removeEventListener("mousemove",_this.move);
    _this.callback(parseInt(e.pageX)-parseInt(_this.dx),parseInt(e.pageY)-parseInt(_this.dy),store,Actions);
    e.stopPropagation();
        e.preventDefault();
  },

  document.addEventListener("mouseup",_this.end);
    document.addEventListener("mousemove",_this.move);

}

module.exports = DnDF;