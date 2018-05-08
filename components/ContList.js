var React = require('react');
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var ActionButton = require('./ActionButton');
var ContListData = require('./ContListData');
var AjaxCont = require('../ajaxfunc/AjaxCont');
var Functions = require('../functions/Functions');
var _ = require('lodash');



var ContList = React.createClass({
   propTypes: {
  },
 
   
      getInitialState: function() {
        var _this=this;
        var filter=this.props.state.filterCont;
        var filterT=this.props.state.filterContSelect;
        var page=_this.props.state.pageContList;
        var per=50;
        var res=this.filtering(_this.props.state.contractors,filter,filterT);
        var rows=res.slice(per*page,per*(page+1))
    return {
         pobj:{page:page,spage:page+1,per:per},
         rows: rows,
         filter:filter,
         filterT:filterT

         
    };
  },
  componentWillReceiveProps:function(p)
  {
    //console.log(p);
    var page=p.state.pageContList;
    var per=this.state.pobj.per;
    var res=this.filtering(p.state.contractors,p.state.filterCont,p.state.filterContSelect);
    this.setState({rows:res.slice(per*page,per*(page+1)),filter:p.state.filterCont});
  },
  topQueue:function(id){
    var arr=_.cloneDeep(this.props.state.contractors);
    var max=0;
    for(var i=0; i<arr.length; i++)
    {
      var value=arr[i].orderq; 
       value=parseInt(value);
        value>max ? max=value : max=max;
    }
    for(var i=0; i<arr.length; i++)
    { 
      arr[i].orderq=max-i;
      var item=arr[i];
      if(item.id==id)
      {
        item.orderq=max;
      }
      else
      {item.orderq=item.orderq-1;
      }
    }
    AjaxCont.orderq(this.props.state.login,arr);
  
  },
  filtering:function(rows,filter,t)
  {
        var conts=rows;
    var res;
      while(filter.charAt(0) == ' ')
          {
          filter = filter.substr(1);
         }
    if(filter===null || filter.length==0)
    {
      res=conts;
    }
    else{
      res=[];
      if(t=="all")
      {
        for(var i=0; i<conts.length; i++)
        {
          var cont=conts[i];
          filter=filter.toLowerCase().trim();
          var nick,name,surname,company;
          nick=cont.nick.toLowerCase().trim();
          name=cont.name.toLowerCase().trim();
          surname=cont.surname.toLowerCase().trim();
          company=cont.company.toLowerCase().trim();
          if(nick.includes(filter) || name.includes(filter) || surname.includes(filter) || company.includes(filter))
          {
            res.push(cont);
          }
        }
      }
      else{
        for(var i=0; i<conts.length; i++)
        {
          var cont=conts[i];
          filter=filter.toLowerCase().trim();
          var tp=cont[t].toLowerCase().trim();
          if(tp.includes(filter))
          {
            res.push(cont);
          }
        }
      }
      

    }
    return res;
  },
  result:function(np,nsp){
      var res=this.filtering(this.props.state.contractors,this.state.filter);
      var copy=res.slice(this.state.pobj.per*np,this.state.pobj.per*nsp);
     
        this.setState({rows:copy});
  },
  setNewOrder:function(arr,type)
  {
    var _this=this;
      if(type=="temp")
      {
        this.setState({rows:arr});
      }
      else if(type=="action")
      {
        this.setState({rows:arr});
        AjaxCont.orderq(_this.props.state.login,arr);
      }
  },
 
      prev:function(){
        //var copy=_.cloneDeep(this.state.pobj);
        var page=this.props.state.pageContList;
        //copy.page=copy.page-1;
        //copy.spage=copy.spage-1;
        var np=page-1;
        var nsp=page;
        store.dispatch(Actions.setContListPage(np));
        this.result(np,nsp);

    },
    next:function(){
         //var copy=_.cloneDeep(this.state.pobj);
        var page=this.props.state.pageContList;
        //copy.page=copy.page-1;
        //copy.spage=copy.spage-1;
        var np=page+1;
        var nsp=page+2;
        store.dispatch(Actions.setContListPage(np));
        this.result(np,nsp);
    },
  render: function() {
      var _this=this;
      var len=_this.props.state.contractors.length;
       var page=_this.props.state.pageContList;
    return (
      <ContListData parent={_this.props.parent} setNewOrder={_this.setNewOrder} topQueue={_this.topQueue} len={len} state={_this.props.state} rows={_this.state.rows} next={_this.next} prev={_this.prev} page={page} spage={page+1} per={_this.state.pobj.per}/>
    );
  },

})

module.exports = ContList;