var React = require('react');
var PropTypes = React.PropTypes;
var classnames = require('classnames');
var TodoTextInput = require('./TodoTextInput');
var connect=require("react-redux").connect;
var copyTodo = require('../actions/TodoActions').copyTodo;
var ReactDOM = require('react-dom');
var DragSource = require('react-dnd').DragSource;
var todoAjax = require('../ajaxmongo/TodoAjax');
var Select = require('react-select');
var DropdownList = require('react-widgets').DropdownList
var OptionComp = require('./OptionComp');
require('react-select/dist/react-select.css');
require('react-widgets/dist/css/react-widgets.css');

//var DragLayer = require('react-dnd').DragLayer;

var cardSource = {
  beginDrag: function (props,monitor,component) {
    var noder= ReactDOM.findDOMNode(component);

      props.dragid(props.todo.id,noder);
    return {
      id: props.todo.id
    };
  },
  endDrag: function (props,monitor,component) {

      var noder = ReactDOM.findDOMNode(component);
      props.dropid(props.todo.id, monitor, noder);
  },
}
function collect(connect,monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var TodoItem = React.createClass({
  propTypes: {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    markTodo: PropTypes.func.isRequired,
    switchTodo: PropTypes.func.isRequired,
    colorsopen:PropTypes.func.isRequired

  },

  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount:function(){
    var _this=this;

    if(this.props.todo.colorp)
    {
      _this.handleColor(true);
    }
  },
  componentDidUpdate:function()
  {
    var _this=this;
    if(this.props.todo.colorp)
    {
      _this.handleColor(true);
    }
  },
  dragStart:function(e){
    var _this=this;
    if(!this.props.drag.press)
    {
    var x=e.nativeEvent.pageX;
    var y=e.nativeEvent.pageY;
    var noder=this.getNode();
    this.props.dragStart(this.props.todo.id,noder,x,y,_this);
 e.stopPropagation();
    e.preventDefault();

    }
  },
  getNode:function(){
    return  ReactDOM.findDOMNode(this);
  },
  handleDoubleClick: function() {
    this.setState({ editing: true });
  },
  handleColorClick: function(){
   var act=!this.props.todo.colorp;
    this.props.colorpTodo(this.props.todo.id,act);
    if(!act)
    {
      this.handleColor(act);
    }

  },
  handleColor: function(act) {
    var component = this,
        node = ReactDOM.findDOMNode(component);

    this.props.colorsopen(node,this.props.todo.id,act,this.props.todo.color);
  },
  handleSwitch: function(){
    this.props.switchTodo(this.props.todo.id);
  },
   handleCopy: function(){
     var dispatch=this.props.dispatch;
      this.props.dispatch(copyTodo(this.props.todo))
   // this.props.addTodo(this.props.todo.text);
  },
  handleDelete:function(){
      todoAjax.delete(this.props.todo)
  },
  handleSave: function(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  },
  prioChange:function(val){
    this.props.todoPriority(this.props.todo.id,val.value);
  },


  render: function() {
    var _this=this;
    var style={"display":"inline-block"};
    var stylem={"display":"inline-block","marginLeft":"10px"};
    var todo = this.props.todo;
    var markTodo = this.props.markTodo;
    var deleteTodo = this.props.deleteTodo;
    var editTodo = this.props.editTodo;
    var colors=this.props.colors;
    var connectDragSource = this.props.connectDragSource;
    var dragmove = this.props.dragmove;
    var filter=this.props.filter;
    var dragging=this.dragging;
    var priority=this.props.priority;
    var options=[];


  var prior;
    for(var i=0; i<priority.length; i++)
    {
      var pr=priority[i];
      if(pr.level==todo.priority)
      {
        prior=pr;
      }
      options.push({value:pr.level,label:pr.name,color:pr.color});
    }

    var cpBorder;

    if(todo.colorp)
    {
      cpBorder="3px groove black";
    }
    else {
      cpBorder="1px dashed black";
    }
    var element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={this.handleSave.bind(this, todo.id)} />
      );
    } else {
      element = (
        <div className='view' style={{"background":todo.color}} ref={todo.id}>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.marked}
                 onChange={markTodo.bind(null, todo.id)} />
          <label style={style} onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className='destroy'
                  onClick={this.handleDelete} />
          <button style={stylem}  onClick={this.handleSwitch}>swap</button>
          <button style={stylem} onClick={this.handleCopy}>copy</button>
          <div style={{"display":"inline-block","marginLeft":"10px","width":"40px","height":"30px", "background":todo.color, "border":cpBorder}}
               onClick={this.handleColorClick}></div>
          <div style={{"display":"inline-block","marginLeft":"10px","width":"140px","height":"50px", "background":prior.color}}> {prior.level} : {prior.name}</div>
          <div style={{marginTop:"20px"}}>
             
          </div>
          <DropdownList  valueField='value' textField='label' defaultValue={_this.props.todo.priority} data={options} onChange={_this.prioChange} itemComponent={OptionComp}/>

        </div>
      );
    }
    if(filter=="show_all")
    {
      return (
          <li className={classnames({
            completed: todo.marked,
            editing: this.state.editing,
          })} onMouseDown={this.dragStart}>
            {element}

          </li>
      );
    }
    else {
      return (
        <li className={classnames({
          completed: todo.marked,
          editing: this.state.editing

        })}>
          {element}

        </li>)

    }


  }
});

module.exports = connect(copyTodo)( TodoItem);
//module.exports = connect(copyTodo)( DragSource("TodoItem", cardSource, collect)(TodoItem));
//module.exports = DragLayer(collect)(TodoItem);