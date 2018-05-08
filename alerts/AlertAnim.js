var React = require('react');
var ReactDOM = require('react-dom');
//const TransitionGroup = React.addons.TransitionGroup;


//var ShowMeatAnim = React.createClass({
class AlertAnim extends React.Component {
          constructor (props) {
                super(props);
                this.state = {
                    
                }
            }

        componentWillEnter (callback) {
            const element = ReactDOM.findDOMNode(this.container);
            Velocity(element, 'fadeIn', { duration: 300 }).then(callback);
        }

        componentWillLeave (callback) {
            const element = ReactDOM.findDOMNode(this.container);
            Velocity(element, 'fadeOut', { duration: 300 }).then(callback);
        }

        setContainer(c) {
            this.container = c;
        }
        markup(html){
            return { __html: html };
        }
        render() {
            var _this=this;
            var clas=this.props.clas;
            var text=this.props.text;
            return   <div ref={this.setContainer.bind(this)} className={clas} dangerouslySetInnerHTML={_this.markup(text)}  />
        }
    }
   
    
//});
module.exports = AlertAnim;