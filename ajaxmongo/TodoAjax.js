var $ =require('jquery');
var connect=require("react-redux").connect;
var actions = require('../actions/TodoActions');
var store = require('../stores/todos');

var TodoAjax = {
       send:function(data,action){
        // var datar=JSON.stringify(data);
         var copied={ id:999, 
        marked: false,
        text: data.text,
        color:"red",
        colorp:false
            };
            $.ajax({
                url: "http://localhost:8125/add",
                //headers: {"contentType": "application/json"},
                //dataType: 'json',
                type:'POST',
                data: JSON.stringify(copied), 
                    contentType: 'application/json',
                success: function(datar) {
                        console.log(datar[0]);
                       store.dispatch(actions.insertTodo(datar[0]));
                },
                error: function(xhr, status, err) {
                    console.log(err);
                // console.error(this.props.url, status, err.toString());
                    }
                });
  },
  delete:function(data)
  {
      console.log(data);
       $.ajax({
                url: "http://localhost:8125/delete",
                //headers: {"contentType": "application/json"},
                //dataType: 'json',
                type:'POST',
                data: JSON.stringify(data), 
                    contentType: 'application/json',
                success: function(datar) {
                        console.log(datar);
                       store.dispatch(actions.deleteTodo(data._id));
                },
                error: function(xhr, status, err) {
                    console.log(err);
                // console.error(this.props.url, status, err.toString());
                    }
                });
  }
 

};
//module.exports = connect(actions)(TodoAjax);
module.exports = TodoAjax;