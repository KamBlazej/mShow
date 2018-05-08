var React = require('react');
var ActionButton = require('./ActionButton');
var TextInputC = require('./TextInputC');
var Alerts = require('../functions/Alerts');
var Loged = require('../functions/Loged');
var AjaxLog = require('../ajaxfunc/AjaxLog');
var MD5 = require("crypto-js/md5");
var $ =require('jquery'); 
var _ = require('lodash');
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');



var Login = React.createClass({
      getInitialState: function() {
        
        return {
            texts:{pass: null,
        log:null,
        mail:null},
        check:{log:false,pass:false,mail:false}
        
        };
    },
    componentDidMount:function(){
        this.checkFields();
    },
    typers:{
        ajax:{login:"login",reg:"reg"},title:{login:"Zaloguj Się",reg:"Zarejestruj Się"}
    },
    handleChange:function(text,type){
        var copy=_.cloneDeep(this.state.texts);
        copy[type]=text;
        this.setState({texts:copy});
        this.checkField(text,type);
    },
    checkField:function(text,type)
    {
        var _this=this;
          var check=_.cloneDeep(_this.state.check);
          var text=text.toString();
          var len=text.length;
           len>2 && len<21 ? check[type]=true : check[type]=false;


    
          this.setState({check:check});
    },
    checkFields:function()
    {
        var _this=this;
          var check=_.cloneDeep(_this.state.check);
          var texts=_.cloneDeep(_this.state.texts);
          Object.keys(texts).forEach(function(key) {
              if(texts[key]===null)
              {
                  check[key]=false;
                  status=false;
              }
              else{
                    var text=texts[key].toString();
                    var len=text.length;
                     if(len>2 && len<21){
                       check[key]=true;
                     } 
                     else{
                         check[key]=false;
                     }
              }
              
          });
          this.setState({check:check});

    },
    onSend:function()
    {
       // .toString();
       var _this=this;
        var log=_this.state.texts.log;
        if(log===null) { log=""}
        log=log.toString();
         
        log=log.length;
        var pass=this.state.texts.pass;
        if(pass===null) { pass=""}
        pass=pass.toString();
        
        pass=pass.length;
       
        

        if((log>2 && log<21) && (pass>2 && pass<21))
        {
            this.onSendAjax();
        }
        else{
            Alerts.setAlert(true,"Hasło oraz Login, nie mogą być dłuższe niż 20 znaków, oraz krótsze niż 3 znaki", "#fc7676", 15000);
        }
    },
    onSendAjax:function()
    {
        var _this=this;
        var nm=AjaxLog.makePass(_this.state.texts.pass);
        
        var type=_this.typers["ajax"][_this.props.typer];
          $.ajax({
                url: "ajax_log.php",
                //headers: {"contentType": "application/json"},
                dataType: 'json',
                type:'POST',
                data: {pass:nm,log:_this.state.texts.log,mail:_this.state.texts.mail,type:type}, 
                    //contentType: 'application/json',
                success: function(datar) {
     
                    if(type=="reg")
                    {
                        if(datar.result=="succes")
                        {
                        Alerts.setAlert(true, "konto o nazwie <strong>"+datar.login+"</strong> zostało utworzone, skontaktuj się z administratorem, aby aktywować konto", "#93bcff", 15000);
                        }  
                        else if(datar.result=="failed")
                        {
                        Alerts.setAlert(true, "rejestracja konta nie powiodła się", "#fc7676", 15000);
                        }
                        else if(datar.result=="exist")
                        {
                        Alerts.setAlert(true, "podany login <strong>"+datar.login+"</strong> już istnieje", "#fc7676", 15000);
                        }
                    }
                    else if(type=="login")
                    {
                         if(datar.result=="failed")
                        {
                        Alerts.setAlert(true, "Podano nieprawidłowe hasło lub/oraz login", "#fc7676", 15000);
                        }
                        else if(datar.result=="nonactive")
                        {
                        Alerts.setAlert(true, "Konto <strong>"+datar.login+"</strong> nie zostało jeszcze aktywowane.", "#fc7676", 15000);
                         }
                         else if(datar.result=="fail")
                        {
                        Alerts.setAlert(true, "Coś się zjebało", "#fc7676", 15000);
                         }
                        else if(datar.result=="succes")
                        {
                        //Alerts.setAlert(true, "Witaj <strong>"+datar.login+"</strong> zalogowałeś się pomyślnie do aplikacji.", "#fc7676", 15000);
                        Loged.login({s:true, login:datar.login, token:datar.token, id:datar.id, rank:datar.rank});
                        }
                    }

                },
                error: function(xhr, status, err) {
                    console.log(err);
                    }
                });
    },
    isMail:function(){
        var _this=this;
        if(this.props.typer=="reg")
        {
            return( <div><div> E-Mail</div><TextInputC text={_this.state.texts.mail} typer={"mail"} clas={"logMAIL"} onSend={_this.onSend} handleChange={_this.handleChange}/></div>)
        }
    },

  render: function() {
    var _this=this;
    var state=this.props.state;
    var title=_this.typers["title"][_this.props.typer];
    var cLog,cPass;
    var setFocus=false;
    if(_this.props.typer=="login")
    {
        setFocus=true;
    }

     this.state.check.log ? cLog="logOK" : cLog="logNO";
     this.state.check.pass ? cPass="logOK" : cPass="logNO";

    
    return (
      <div >
          <div> {title} </div>
            <div> Login</div>
            {<TextInputC text={_this.state.texts.log} typer={"log"} clas={cLog} onSend={_this.onSend} handleChange={_this.handleChange} autoFocus={setFocus}/>}
            <div> Hasło</div>
            {<TextInputC text={_this.state.texts.pass} typer={"pass"} clas={cPass} type={"password"} onSend={_this.onSend} handleChange={_this.handleChange}/>}
            {_this.isMail()}
      </div>
    );
  },

})

module.exports = Login;