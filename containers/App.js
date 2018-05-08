var React = require('react');
var MeatApp = require('./MeatApp');
var Provider=require("react-redux").Provider;
var store = require('../stores/stateApp');


var App = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <MeatApp />
      </Provider>
    );
  }
});

module.exports = App;
