var React = require('react');
var PropTypes = React.PropTypes;
var AutoInput = require('./AutoInput');

var FormInput = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string,
  },

 /* getInitialState: function() {
    return {
      text: this.props.text || ''
    };
  },*/


  handleChange:function(e){
    var _this=this;
    var name=this.props.name;
    var text;
    name=="name" ? text=e : text=e.target.value;


    text = text.replace(/\s\s+/g, ' ');
      if(text.toString().length > _this.props.maxL+1) {
      text = text.substring(0,_this.props.maxL+1);
    }
    this.props.handleChange(this.props.name ,text );
  },
  genSug:function(){
    var arr=[];
    var list="Ada, Adela, Adelajda, Adrianna, Agata, Agnieszka, Aldona, Aleksandra, Alicja, Alina, Amanda, Amelia, Anastazja, Andżelika, Aneta, Anita, Anna, Antonina, Barbara, Beata, Berenika, Bernadeta, Blanka, Bogusława, Bożena,Cecylia, Celina, Czesława,Dagmara, Danuta, Daria, Diana, Dominika, Dorota,Edyta, Eliza, Elwira, Elżbieta, Emilia, Eugenia, Ewa, Ewelina,Felicja, Franciszka,Gabriela, Grażyna,Halina, Hanna, Helena,Iga, Ilona, Irena, Irmina, Iwona, Izabela,Jadwiga, Janina, Joanna, Jolanta, Jowita, Judyta, Julia, Julita, Justyna,Kamila, Karina, Karolina, Katarzyna, Kazimiera, Kinga, Klaudia, Kleopatra, Kornelia, Krystyna,Laura, Lena, Leokadia, Lidia, Liliana, Lucyna, Ludmiła, Luiza,Łucja,Magdalena, Maja, Malwina, Małgorzata, Marcelina, Maria, Marianna, Mariola, Marlena, Marta, Martyna, Marzanna, Marzena, Matylda, Melania, Michalina, Milena, Mirosława, Monika,Nadia, Natalia, Natasza, Nikola, Nina,Olga, Oliwia, Otylia,Pamela, Patrycja, Paula, Paulina,Regina, Renata, Roksana, Róża, Rozalia,Sabina, Sandra, Sara, Sonia, Stanisława, Stefania, Stella, Sylwia,Tamara, Tatiana, Teresa,Urszula,Weronika, Wiesława, Wiktoria, Wioletta,Zofia, Zuzanna, Zyta,Żaneta,Adam, Adolf, Adrian, Albert, Aleksander, Aleksy, Alfred, Amadeusz, Andrzej, Antoni, Arkadiusz, Arnold, Artur,Bartłomiej, Bartosz, Benedykt, Beniamin, Bernard, Błażej, Bogdan, Bogumił, Bogusław, Bolesław, Borys, Bronisław,Cezary, Cyprian, Cyryl, Czesław,Damian, Daniel, Dariusz, Dawid, Dionizy, Dominik, Donald,Edward, Emanuel, Emil, Eryk, Eugeniusz,Fabian, Feliks, Ferdynand, Filip, Franciszek, Fryderyk,Gabriel, Gerard, Grzegorz, Gustaw,Henryk, Herbert, Hilary, Hubert,Ignacy, Igor, Ireneusz,Jacek, Jakub, Jan, Janusz, Jarosław, Jerzy, Joachim, Józef, Julian, JuliuszKacper, Kajetan, Kamil, Karol, Kazimierz, Klaudiusz, Konrad, Krystian, Krzysztof,Lech, Leon, Leszek, Lucjan, Ludwik,Łukasz,Maciej, Maksymilian, Marceli, Marcin, Marek, Marian, Mariusz, Mateusz, Michał, Mieczysław, Mikołaj, Miłosz, Mirosław,Nikodem, Norbert,Olaf, Olgierd, Oskar,Patryk, Paweł, Piotr, Przemysław,Radosław, Rafał, Remigiusz, Robert, Roman, Rudolf, Ryszard,Sebastian, Seweryn, Sławomir, Stanisław, Stefan, Sylwester, Szymon,Tadeusz, Teodor, Tomasz,Wacław, Waldemar, Wiesław, Wiktor, Witold, Władysław, Włodzimierz, Wojciech,Zbigniew, Zdzisław, Zenon, Zygmunt";
    var nl=list.split(",");
    for(var i=0; i<nl.length; i++)
    {
      var item=nl[i];
      item=item.trim();
      arr.push({name:item});
    }
    return arr;
  },
  renderInput:function(width,type,text,handle)
  {
      var name=this.props.name;
      var _this=this;
      var sug=this.genSug();
     
      if(name=="name")
      {
        return (<AutoInput text={text} handleChange={_this.handleChange} clas={"inputCool"} sug={sug}/>)
      }
      else{
        return ( <input className={"formInput"} style={{width:width}}
                type={type}
                value={text} 
                onChange={_this.handleChange}/>)
      }
  },
  render: function() {
    var _this=this;
    var width="auto";
    var src;
    var check=this.props.check;
    var cs;
    var img;
    
    if(check=="ok")
    {
      cs="";
      src="img/valid.png";
    }
    else if(check=="wait")
    {
      cs="";
      src="img/load.gif";
    }
    else{
      cs=check;
      src="img/invalid.png";
    }
    if(this.props.width)
    {
      width=this.props.width;
    }
    if(check)
    {
      img= (<img style={{width:"20px",display:"inline-block",verticalAlign:"top",marginTop:"8px"}}  src={src}/>);
    }
    else
    {
      img="";
    }
     var type="text";
     if(_this.props.name=="tel")
     {
       type="number";
     }
     var clas;
     this.props.name=="name" ? clas="setAutoComplete" : clas="contInputStyleClass"
     /* <input className={"formInput"} style={{width:width}}
                type={type}
                value={this.props.text} 
                onChange={this.handleChange}/>*/
                
    return (
      <div className={"formInputDiv"}><div class="inline">{_this.props.translate} </div>
            <div className={clas}>
                
               {_this.renderInput(width,type,this.props.text,this.handleChange)}
                {img}
                <div className={"inline"}>
                     <div className={"validateText"}> {cs}</div>
                </div>
            </div>
            <div className={"formInputBot"}>
            </div>
        </div>
      
    );
  }
});

module.exports = FormInput;
