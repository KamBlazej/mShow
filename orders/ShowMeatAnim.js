var React = require('react');
var ReactDOM = require('react-dom');
var ShowMeatProd= require('./ShowMeatProd');
//const TransitionGroup = React.addons.TransitionGroup;


//var ShowMeatAnim = React.createClass({
class ShowMeatAnim extends React.Component {
          constructor (props) {
                super(props);
                this.state = {
                    
                }
               // this.props=props;
               this.orderUI = this.orderUI.bind(this)
            }

        componentWillEnter (callback) {
            const element = ReactDOM.findDOMNode(this.container);
            Velocity(element, 'slideDown', { duration: 300 }).then(callback);
        }

        componentWillLeave (callback) {
            const element = ReactDOM.findDOMNode(this.container);
            Velocity(element, 'slideUp', { duration: 300 }).then(callback);
        }

        setContainer(c) {
            this.container = c;
        }
        orderUI(action,prod)
        {
            var p=null;
            if(prod)
            {
                p=prod;
            }
            this.props.orderui(action,p);
            /*console.log("orderui");
            console.log(this.props);
            
            console.log("orderui");*/
        }

        render() {
            var _this=this;
            return <div className={"prodContAnim"} ref={this.setContainer.bind(this)}>
                 {_this.props.prods.map(function(row,index) {
                     var color=index%2;
                            return (<ShowMeatProd orderProd={_this.props.orderProd} color={color} editer={_this.props.editer} soEdit={_this.props.soEdit}  orderui={_this.orderUI} orderc={_this.props.orderc} key={index} prod={row}/>)
                                    
                                    //<div onClick={} key={index}>{row.prod} - {row.price} ZŁ {row.amount}</div>
                                        //return <MeatCategory name={row.category} id={row.id} index={index} key={index} handleClick={_this.handleClick}/>;
                            })}
            </div>
        }
    }
   
    
//});
module.exports = ShowMeatAnim;