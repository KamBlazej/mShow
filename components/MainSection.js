var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var TodoItem = require('./TodoItem');
var Footer = require('./Footer');
var filters = require('../constants/TodoFilters');
var ColorPanel = require('./ColorPanel');
var update  = require('immutability-helper');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var ReactDOMServer = require('react-dom/server');
var addons = require('react-addons');
var _ = require('lodash');
var functions = require('../functions/Functions');
var DnD = require('../functions/DnD');
var update  = require('immutability-helper');
var $ =require('jquery');

var SHOW_ALL = filters.SHOW_ALL;
var SHOW_UNMARKED = filters.SHOW_UNMARKED;
var SHOW_MARKED = filters.SHOW_MARKED;

var TODO_FILTERS = {};
TODO_FILTERS[SHOW_ALL] = function() { return true };
TODO_FILTERS[SHOW_UNMARKED] = function(todo) { return !todo.marked };
TODO_FILTERS[SHOW_MARKED] = function(todo) { return todo.marked };

var MainSection = React.createClass({
  propTypes: {
    todos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  },
  componentDidMount: function() {
    var _this=this;
    this.serverRequest = $.get("http://localhost:8125/data", function (result) {
      
        _this.props.actions.copyArr(result);
    }.bind(this));
  },
  getInitialState: function() {
     //this.drag = new Drag();
    return {
      filter: SHOW_ALL,
      showCP:false,
      cpID:false,
      colorP:{left:0,top:0,id:false,color:false,show:"none",noder:false},
      drag:{left:0,top:0,dragging:false,press:false,noder:false,element:null,id:null},
      arrc:null
    };
  },
  nodeClone:null,
  handleClearMarked: function() {
    const atLeastOneMarked = this.props.arr.some(function(todo) { return todo.marked });
    if (atLeastOneMarked) {
      this.props.actions.clearMarked();
    }
  },
  dragCall:function(type,data){
    var _this=this;
      switch (type) {
      ////////////// dodaj
        case "drag":
        _this.setState({drag: data});
        return false;
         case "list":
  
        _this.setState({arrc: data});
        return false;
         case "end":
        _this.props.actions.copyArr(data);
        return false;
        

      }
  },
  dragStart:function(id,noder,x,y,element){
   var dnd= new DnD(id,noder,x,y,this,this.dragCall,this.props.todos.arr,this.state.drag);
  },
 

  getDragId: function(id,noder)
  {
    var _this=this;
    var top=noder.getBoundingClientRect().top;
  },
  getDropId: function(id,monitor,noder)
  {
    var ntop=monitor.getClientOffset().y;
    //var top=noder.getBoundingClientRect().top
    var array=[];
    var _this=this;
    var topm=monitor.getClientOffset().y+window.scrollY;
    var hm=noder.getBoundingClientRect().height;
    var midm=topm+(hm/2);
    var obj1={x:monitor.getClientOffset().x+window.scrollX,y:topm,w:noder.getBoundingClientRect().width,h:hm};
    for(var i=0; i<this.props.todos.arr.length; i++)
    {
      var elem=ReactDOM.findDOMNode(_this.refs[i]);
      var left=elem.getBoundingClientRect().left+window.scrollX;
      var top=elem.getBoundingClientRect().top+window.scrollY;
      var width=elem.getBoundingClientRect().width;
      var height=elem.getBoundingClientRect().height;
      var mid=top+(height/2);
      array.push({id:i,elem:elem,left:left,top:top,width:width,height:height});
      var obj2={x:left,y:top,w:width,h:height};
      //console.log({id:i,elem:elem,top:top,height:height});
      if(_this.collission(obj1,obj2))
      {
        if(midm<mid)
        {
          _this.props.actions.switchdTodo(id,i,"top");
        }
        else if(midm>mid)
        {
          _this.props.actions.switchdTodo(id,i,"bot");
        }
        break;
       // console.log("colission id: "+i);
      }
    }

  },
  collission:function(obj1,obj2){
      if (obj1.x < obj2.x + obj2.w &&
          obj1.x + obj1.w > obj2.x &&
          obj1.y < obj2.y + obj2.h &&
          obj1.h + obj1.y > obj2.y) {
          // collision detected!
          return true
          }else {
            return false;
          }
  },
  colorsopen: function(td,id,act,color)
  {
    if(act){
      this.nodeinfo(td,id,color);
    }
    else if(!act)
    {
      !this.closenode();
    }
  },
  closenode:function(){
    var nCP = update(this.state.colorP, {
      show: {$set: "none"}
    });
    nCP = update(nCP, {
      noder: {$set: false}
    });
    this.setState({colorP: nCP});
  },
  nodeinfo: function(td,id,color){
    var parent= ReactDOM.findDOMNode(this).parentNode;
    var ptop=parent.getBoundingClientRect().top+window.scrollY;
    var pleft=parent.getBoundingClientRect().left+window.scrollX;
    // this.setState({colorP:{show:"block",left:td.getBoundingClientRect().left,top:td.getBoundingClientRect().top}});
    var nCP = update(this.state.colorP, {
      left: {$set: td.getBoundingClientRect().left+window.scrollX+170}
    });
    nCP = update(nCP, {
      top: {$set: (td.getBoundingClientRect().top+window.scrollY-ptop)-150}
    });
    nCP = update(nCP, {
      show: {$set: "block"}
    });
    nCP = update(nCP, {
      noder: {$set: td}
    });
    nCP = update(nCP, {
      id: {$set: id}
    });
    nCP = update(nCP, {
      color: {$set: color}
    });
    this.setState({colorP: nCP});
  },

  handleShow: function(filter) {
    this.setState({ filter: filter });
  },

  render: function() {
    var _this=this;
    var todos = this.props.todos;
    var actions = this.props.actions;
    var filter = this.state.filter;
    var arr=this.props.arr;
    var colors=todos.colors;
    var colorsopen=this.colorsopen;
    var dragid=this.getDragId;
    var dropid=this.getDropId;
    var dragStart=this.dragStart;
    var drag=this.state.drag;
    var mouseMove=this.mouseMove;
    var arrc=this.state.arrc;
    var priority=this.props.todos.priority;


    var filteredTodos; 
    if(drag.dragging)
    {
      filteredTodos = arrc;
    }
    else{
      filteredTodos  = arr.filter(TODO_FILTERS[filter]);
    }
    var markedCount = arr.reduce(function(count, todo) {
        return todo.marked ? count + 1 : count;
      },
      0
    );
    var doShow,colorpn;
    function chShow(){

            doShow="none";
            for(var i=0; i<filteredTodos.length; i++)
            {
                if(filteredTodos[i].colorp)
                {
                    return doShow="block";
                    break;
                }   
            }
            return doShow;
 
        }
        doShow=chShow();
    if (doShow=="block") {
     colorpn = (
         <ColorPanel colorP={_this.state.colorP} colorclose={colorsopen}  todos={todos}  {...actions} />
      );
    } else {
      colorpn = ("");
    }

    return (
      
      <section className='main'>

        
        {this.renderToggleAll(markedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(function(todo) {
            return <TodoItem colors={colors} dragStart={dragStart} drag={drag} priority={priority}  colorsopen={colorsopen} filter={filter} ref={todo.id} key={todo.id} todo={todo} {...actions} />
          })}
        </ul>
        {this.renderFooter(markedCount)}
        {colorpn}
        
      </section>
    );
  },

  renderToggleAll: function(markedCount) {
    var todos = this.props.todos;
    var actions = this.props.actions;
    var arr=this.props.arr;
    if (todos.arr.length > 0) {
      return (
        <input className='toggle-all'
               type='checkbox'
               checked={markedCount === todos.arr.length}
               onChange={actions.markAll} />
      );
    }
  },

  renderFooter: function(markedCount) {
    var todos = this.props.todos;
    var filter = this.state.filter;
    var unmarkedCount = todos.arr.length - markedCount;
    if (todos.arr.length) {
      return (
        <Footer markedCount={markedCount}
                unmarkedCount={unmarkedCount}
                filter={filter}
                onClearMarked={this.handleClearMarked}
                onShow={this.handleShow} />
      );
    }
  }
});
//module.exports = DragDropContext(HTML5Backend)(MainSection);
module.exports = MainSection;
