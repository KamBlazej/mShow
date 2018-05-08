var React = require('react');
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');
var ActionButton = require('./ActionButton');
var TextInput = require('./TextInput');
var FormInput = require('./FormInput');
var _ = require('lodash');
var $ =require('jquery');
var Alerts = require('../functions/Alerts');
var AjaxCont = require('../ajaxfunc/AjaxCont');
var Functions = require('../functions/Functions');

var ContForm = React.createClass({

    componentWillMount: function() {
        this.checkForm(this.props.values,"all");
    },
    getInitialState:function(){
      var checks=this.checked(this.props.values);
        return {
         values:this.props.values,
         checks:checks
        }  
    },
    translate:["Login","Firma","Imię","Nazwisko","Adres","E-Mail","Telefon"],
    maxL:[20,50,30,30,50,50,20],
    handleChange:function(name,val){
      if(this.props.state.disabled)
      {
        return false;
      }
       while(val.charAt(0) == ' ')
          {
          val = val.substr(1);
          }
       if(name=="name" || name=="surname" || name=="company" || name=="city")
       {
        var uc=val.substring(0,1);
        val = val.substr(1);
        uc=uc.toUpperCase();
        val=uc+""+val;
         val=val.replace(/[0-9]/g, "");
       }
       
        var copy=_.cloneDeep(this.state.values);
        copy[name]=val;
        this.setState({values:copy});
        this.checkForm(copy,name);
      },
    sendForm:function(){
        //this.checkForm(this.state.values,"all");
        var checks=this.state.checks;
        var check=true;
         Object.keys(checks).forEach(function(key) {
            if(checks[key]!=="ok")
            {
              check=false;
            } 
          });
          if(check && !this.props.state.disabled)
          {
            this.send();
          }
          else if(!check)
          {
            Alerts.setAlert(true,"Nie można dodać klienta gdy formularz zawiera błędy", "error", 10000);
          }
    },
    checked:function(values){
        var checks={}
           Object.keys(values).forEach(function(key) {
            checks[key]=false;
          });
          return checks;
    },
    send:function(){
      store.dispatch(Actions.setBundle({disabled:true}));
      var _this=this;
      var copy=_.cloneDeep(_this.state.values);
      copy=Functions.trimObj(copy);
      copy.login=_this.props.state.login.login;
      copy.token=_this.props.state.login.token;
      copy.type=_this.props.type;
      if(_this.props.type=="edit")
        {
          copy.nick=_this.props.nick;
        }
        if(_this.props.type=="edit"){copy.id=_this.props.idc}
        $.ajax({
               // url: "ajax_addCont.php",
                url: "ajax_addContA.php",
                dataType: 'json',
                type:'POST',
                data: copy, 
                    //contentType: 'application/json',
                success: function(datar) {
                        

                          if(_this.props.type=="add")
                          {
                               if(datar.result=="succes")
                               {
                                Alerts.setAlert(true,"Dodano Kontrahenta", "succes", 10000);
                              _this.reset();
                              store.dispatch(Actions.getContractor(datar.conts));
                               }
                               else if(datar.result=="exist")
                              {
                                 Alerts.setAlert(true,"Podany Login/Nick jest zajęty", "error", 10000);
                              }
                               else if(datar.result=="failed")
                              {
                                 Alerts.setAlert(true,"Wystąpił błąd", "error", 10000);
                              }
                          }
                          else if(_this.props.type=="edit")
                          {
                              if(datar.result=="succes")
                              {
                              Alerts.setAlert(true,'Edytowano Kontrahenta',"succes",10000);
                              store.dispatch(Actions.getContractor(datar.conts));
                              }
                              else if(datar.result=="failed"){
                              Alerts.setAlert(true,'Wystąpił błąd',"error",10000);
                              }
                            
                          }
      
                       store.dispatch(Actions.setBundle({disabled:false}));
                       //store.dispatch(Actions.addContractor(datar));
               
                     
                },
                error: function(xhr, status, err) {
                  store.dispatch(Actions.setBundle({disabled:false}));
                    console.log(xhr.responseText);
                    }
                });
    },
    checkForm:function(values,what){
        var _this=this;
        var check=false;
        var checks=this.state.checks;
        var copy=_.cloneDeep(_this.state.checks);
          /*Object.keys(_this.state.values).forEach(function(key) {
            if(key=="nick" || key=="name" || key=="surname")
            {
              if(_this.state.values[key].length>0)
              {
                check=true;
              }
            }
       
          });*/
         /* var values=_this.state.values;
            if(_this.props.type=="add")
            {
              if(values.nick.length>2 && values.name.length>0 && values.surname.length>0 && values.mail.length>0)
              {
                check=true;
              }
            }
            else  if(_this.props.type=="edit")
            {
              if(values.name.length>0 && values.surname.length>0 && values.mail.length>0)
              {
                check=true;
              }
            }
          
          if(check)
          {
            callback();
          }
          else{
            if(_this.props.type=="add")
            {
              Alerts.setAlert(true,'Musisz podać "Nick", "Imię", "Nazwisko" oraz "E-mail", aby dodać kontrahenta, Nick musi mieć długość conajmniej 3 znaków',"red",10000);
            }
            else if(_this.props.type=="edit"){
              Alerts.setAlert(true,'Pole "imię", "nazwisko" oraz "E-mail" nie mogą być puste',"red",10000);
            }
            
            //_this.setAlert(true,'Musisz podać "Nick", "Imię", lub "Nazwisko", aby dodać kontrahenta',"red",10000);
          }*/
          
          
          var funcs={
            nick:function(){
              if(values.nick.length>20)
              {
              copy.nick="Login nie może być dłuższy niż 20 znaków";
              }
              else if(values.nick.length>2)
              {
                  $.ajax({
               // url: "ajax_addCont.php",
                url: "ajax_checkNick.php",
                dataType: 'json',
                type:'POST',
                data: {nick:values.nick}, 
                    //contentType: 'application/json',
                success: function(datar) {
                      _this.nickC(datar);
                },
                error: function(xhr, status, err) {
                    console.log(xhr.responseText);
                    }
                });
                copy.nick="wait";
              }
              
              else{
                copy.nick="Login musi zawierać conajmniej 3 znaki";
              }
            },
            name:function(){
               if(values.name.length>30)
                {
                copy.name="Imię nie może być dłuższe niż 30 znaków";
                }
              else if(values.name.length>0)
                {
                  copy.name="ok";
                }
                else{
                  copy.name="Podaj Imię";
                }
            },
            surname:function(){
              if(values.surname.length>30)
                {
                copy.surname="Nazwisko nie może być dłuższe niż 30 znaków";
                }
              else if(values.surname.length>0)
                {
                  copy.surname="ok";
                }
                else{
                  copy.surname="Podaj Nazwisko";
                }
            },
             company:function(){
               if(values.company.length>50)
                {
                copy.company="Nazwa firmy nie może być dłuższe niż 50 znaków";
                }
              else if(values.company.length>0)
                {
                  copy.company="ok";
                }
                else{
                  copy.company="Podaj nazwę firmy";
                }
            },
            city:function(){
               if(values.city.length>50)
                {
                copy.city="Adres nie może być dłuższy niż 50 znaków";
                }
              else if(values.city.length>0)
                {
                  copy.city="ok";
                }
                else{
                  copy.city="Podaj adres";
                }
            },
            mail:function(){
               if(values.mail.length>50)
                {
                copy.mail="Adres E-Mail nie może być dłuższy niż 50 znaków";
                }
                else if(values.mail.length>0)
                {
                  var res=validateEmail(values.mail);
                  function validateEmail(email) {
                      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      return re.test(email);
                  }
                  res==true ? copy.mail="ok" : copy.mail="wprowadź poprawny adres E-Mail"
                }
                else{
                  copy.mail="Podaj adres E-Mail";
                }
            },
            tel:function(){
                if(values.tel.length>20)
                {
                copy.tel="Numer telefonu nie może być dłuższy niż 20 znaków";
              }
              else{
                copy.tel="ok";
              }
              
            }
          }
          if(what=="all")
          {
           Object.keys(checks).forEach(function(key) {
                  funcs[key]();
             });
          }
          else{
                 funcs[what]();
          }
          _this.setState({checks:copy});
    },
    nickC:function(status){
      var copy=_.cloneDeep(this.state.checks);
      copy.nick=status;
      if(this.state.values.nick.length<3)
      {
         copy.nick="Login musi zawierać conajmniej 3 znaki";
      }
      else if(this.state.values.nick.length>20)
      {
         copy.nick="Login nie może być dłuższy niż 20 znaków";
      }
      this.setState({checks:copy});
    },
    cancel:function(){
      //this.reset();
      store.dispatch(Actions.changeRoute("CONT_LIST"));
    },
    reset:function(){
      var _this=this;
           var copy = {};
          Object.keys(_this.state.values).forEach(function(key) {
            copy[key]="";
          });
      this.setState({values:copy});
      this.checkForm(copy,"all");
    },
    setAlert:function(copy)
    {
      this.setState({alerts:copy})
    },
    alerts:function(){
      if(this.state.alerts.s)
      {
        return <div style={{background:this.state.alerts.color}}>{this.state.alerts.t}</div>
      }
    },
  render: function() {
    var _this=this;
    var state=this.props.state;
    var text;
    if(_this.props.type=="add")
      {
      text="dodaj Kontrahenta";
    }
     else if(_this.props.type=="edit")
            {
             text="edytuj Kontrahenta";
            }

    
    return (
      <div>
          {//_this.alerts()
          }
         
        {    Object.keys(_this.state.values).map(function(key,index) {
            var value=_this.state.values[key];
            var check=_this.state.checks[key];
            var tindex=index;
             if(_this.props.type=="edit")
             {
                tindex=tindex+1;
             }
            return (
                <FormInput key={index} text={value} translate={_this.translate[tindex]} maxL={_this.maxL[tindex]} check={check} name={key} handleChange={_this.handleChange}/>
                    )
            })
        }
        <ActionButton action={_this.sendForm} html={text}/> <ActionButton action={_this.cancel} html={"Cofnij"}/>
      </div>
    );
  },

})

module.exports = ContForm;