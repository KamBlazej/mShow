var $ =require('jquery');
var connect=require("react-redux").connect;
var Actions = require('../actions/Actions');
var store = require('../stores/stateApp');

var LoadProducts = {
          get:function(){
  
     var prods=[];
     var array=[["Wieprzowina","Półtusze pełne","Polędwiczki","Schab b/k","Schab z/k","Kotlet zwykły z/k","Kotlet z dł. kością","Karkówka b/k",
     "Karkówka z/k","Żebra paski mięsne","Żebra schabowe","Boczek surowy z/ż","Boczek surowy b/ż","Boczek sur. b/ż b/s","Szynka b/k","Szynka mięśnie","Szynka z nogą","Łopatka b/k",      
	"Golonka b/k","Golonka Przednia","Golonka Zadnia","Biodrówka b/k","Podgardle b/s","Podgardle z/s","Słonina","Kości kark./sch.","Ogony ","Głowy","Mięso kl. II A","Nogi przednie",
	"Nogi tylne","Policzki"],["Wołowina","Polędwica (do 1,6kg)","Polędwica (1,6-2,3kg)","Polędwica (2,4kg +)","Skrzydło wołowe","I krzyżowa","Dolna zrazowa","Górna zrazowa","Ligawa","Łopatka b/k", 
    "Rostbef b/k oczysz.","Rostbef z/k","Rostbef z/k kotlet","Pręga b/k","Pręga z/k","Ossobuco","Antrykot z/k","Antrykot z/k kotlet","Antrykot b/k","Antrykot b/k (rib eye) b/k","Kark b/k",
     "Szponder","Szponder b/k","II wołowa","Ogon pocięty","Łata wołowa","Tłuszcz","Kości pocięte","Mięso kl. I","Policzki","Tomahawk"," Mostek woł z/k"],["Cielęcina","Polędwiczka","Zad b/k","Zad z/k",
    "Łopatka b/k","Górka b/k ocz.","Górka z/k kotl.","Górka z/k","Mostek b/k","Mostek z/k","Kark b/k","Gicz z/k","Gicz równo cięta","Mięso drobne kl. II","Kości cielęce","ośrodki wp.","wątroba wp.",
    "wątroba cielęca","serca wp.","serca woł.","ozory wp.","ozory woł.","ozory ciel.","płuca wp.","nerki wp.","ośrodki ciel.","płuca ciel.","nerki ciel."],["Kurczak","Kurczak świeży",
    "Skrzydełko z kurczaka","Udko ćwiartka","udko kulinarne (noga)","Udzik z/k z/s","Udko/Udzik b/k","Udko/Udzik b/k b/s","Podudzie (pałeczka)","Korpus długi","Korpus krótki","Korpus ze skrzydłem",
	"Filet (podwójny)","Wątroba z kurczaka","Żołądki z kurczaka","Łapki z kurczaka","Serce z kurczaka","Kurczak b/k EXTRA","Kurczak b/k","Kura Mięsna – Rosołowa"],["Kurczak zagrodowy",
    "Kurczak zagrodowy","Kurczak rosołowy","Filet z kurczaka","Udko kulinarne","Kogut"],["Indyk","Filet z indyka","Filet z indyczki","Polędwiczki z indyka","Udziec z indyka b/k b/s",
    "Udziec z indyka b/k z/s","Skrzydło z indyka duże","Skrzydło z indyka małe","Mięso Gulaszowe drobne","Golonka z indyka","Udziec z indyka z/k z/s","Mięso z podudzia","Wątroba z indyka",
    "Szyja z indyka duża","Szyja z indyka mała","Skórki z indyka","Żołądek z indyka","Indyczka Cała"],["Gęś","Pierś gęsi (osłonka)","Tuszka gęsi","Żołądki z gęsi","Tłuszcz z gęsi",
    "Noga z Gęsi","Wątroba z gęsi","Skrzydło z gęsi"],["Kaczka","Kaczka Pekin do 2kg","Kaczka Pekin kl. B","Kaczka Barbarie","Noga z kaczki","Pierś z kaczki b/k","Pierś z kaczki z/k",
    "Porcja z kaczki","Skrzydło z kaczki","Szyja z kaczki"],["Inne","Flaki woł. Mrożone marki","Flaki woł. Krojone płaskie","Tuszka królika mrożona","Kura rosołowa mrożona"]];
    
     for(var i=0; i<array.length; i++)
     {
         var cat="";
         var list=[];
         var subar=array[i];
         for(var j=0; j<subar.length; j++)
         {
             var item=subar[j];
             if(j==0)
             {
                 cat=item;
             }
             else{
                 list.push({name:item,id:j});
             }
         }
         prods.push({category:cat,id:i,prods:list});
     }
     return prods;

  },
   
 

};
module.exports = LoadProducts;