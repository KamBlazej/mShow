var types = require('../constants/ActionTypes');
var fetch = require('redux-fetch');
var $ =require('jquery');


module.exports.addTodoAjax = function addTodoAjax(text) {
  return {
    type: 'FETCH',
    payload: {
      method: 'POST',
      url: '"http://localhost:8125/add"',
      body: {id: 999,
        priority:0,
        marked: false,
        text: text,
        color:"white",
        colorp:false}
    },
    meta: {
      then: addTodo(body.text)
    }
  }
}


module.exports.addContractor = function addContractor(obj) {
  return {
    type: "ADD_CONTRACTOR",
    obj: obj
  };
}
module.exports.setProds = function setProds(arr) {
  return {
    type: "SET_PRODS",
    arr: arr
  };
}
module.exports.setProdsCancel = function setProdsCancel(arr) {
  return {
    type: "SET_PRODS_CANCEL",
    arr: arr
  };
}
module.exports.getContractor = function getContractor(obj) {
  return {
    type: "GET_CONTRACTORS",
    obj: obj
  };
}
module.exports.changeRoute = function changeRoute(route) {
  return {
    type: "CHANGE_ROUTE",
    route: route
  };
}
module.exports.changeRouteAttr = function changeRouteAttr(obj) {
  return {
    type: "CHANGE_ROUTE_ATTR",
    obj: obj
  };
}
module.exports.changeRouteCE = function changeRouteCE(obj) {
  return {
    type: "CHANGE_ROUTE_CE",
    obj: obj
  };
}
module.exports.changeRouteNoHist = function changeRouteNoHist(obj) {
  return {
    type: "CHANGE_ROUTE_NO_HIST",
    obj: obj
  };
}
module.exports.addOrder = function addOrder(obj) {
  return {
    type: "ADD_ORDER",
    obj: obj
  };
}
module.exports.loadOrders = function loadOrders(obj) {
  return {
    type: "LOAD_ORDERS",
    obj: obj
  };
}
module.exports.updateTempOrder = function updateTempOrder(obj) {
  return {
    type: "UPDATE_TEMP_ORDER",
    obj: obj
  };
}
module.exports.loadOrderCont = function loadOrderCont(obj) {
  return {
    type: "LOAD_ORDER_CONT",
    obj: obj
  };
}

module.exports.setLogLor = function setLogLor(set) {
  return {
    type: "SET_LOG_LOR",
    set: set
  };
}
module.exports.setLogin = function setLogin(set) {
  return {
    type: "SET_LOGIN",
    set: set
  };
}
module.exports.setAlert = function setAlert(set) {
  return {
    type: "SET_ALERT",
    set: set
  };
}
module.exports.setArrive = function setArrive(set) {
  return {
    type: "SET_ARRIVE",
    set: set
  };
}

module.exports.setBundle = function setBundle(obj) {
  return {
    type: "SET_BUNDLE",
    obj: obj
  };
}
module.exports.setContListPage = function setContListPage(page) {
  return {
    type: "SET_CONT_LIST_PAGE",
    page:  page
  };
}
module.exports.setOrder = function setOrder(obj) {
  return {
    type: "SET_ORDER",
    obj: obj
  };
}
module.exports.priorityColor = function priorityColor(id,color) {
  return {
    type: "PRIORITY_COLOR",
    id: id,
    color:color
  };
}
module.exports.priorityName = function priorityName(id,name) {
  return {
    type: "PRIORITY_NAME",
    id: id,
    name:name
  };
}
module.exports.todoPriority = function todoPriority(id,priority) {
  return {
    type: "TODO_PRIORITY",
    id: id,
    priority:priority

  };
}
module.exports.nestedColor = function nestedColor(arr) {
  return {
    type: "NESTED_COLOR",
    arr: arr
  };
}
module.exports.nestedArray = function nestedArray(arr) {
  return {
    type: "NESTED_ARRAY",
    arr: arr
  };
}
module.exports.copyTodo = function copyTodo(item) {
  return {
    type: types.COPY_TODO,
    item: item
  };
}
module.exports.copyArr = function copyArr(arr) {
  return {
    type: types.COPY_ARR,
    arr: arr
  };
}

module.exports.deleteTodo = function deleteTodo(_id) {
  return {
    type: types.DELETE_TODO,
    _id: _id
  };
}

module.exports.switchTodo = function switchTodo(id) {
  return {
    type: types.SWITCH_TODO,
    id: id
  };
}
module.exports.switchdTodo = function switchdTodo(id,ids,dir) {
  return {
    type: types.SWITCHD_TODO,
    id: id,
    ids:ids,
    dir:dir
  };
}
module.exports.colorpTodo = function switchTodo(id,colorp) {
  return {
    type: types.COLORP_TODO,
    id: id,
    colorp:colorp
  };
}
module.exports.colorTodo = function switchTodo(id,color) {
  return {
    type: types.COLOR_TODO,
    id: id,
    color:color
  };
}

module.exports.editTodo = function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id: id,
    text: text
  };
}

module.exports.markTodo = function markTodo(id) {
  return {
    type: types.MARK_TODO,
    id: id
  };
}

module.exports.markAll = function markAll() {
  return {
    type: types.MARK_ALL
  };
}

module.exports.clearMarked = function clearMarked() {
  return {
    type: types.CLEAR_MARKED
  };
}
