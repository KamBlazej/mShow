
var Functions = {
    searchArr:function(arr,field,value){

      for(var i=0; i<arr.length; i++)
      {
        var item=arr[i];
        if(item[field]==value)
        {       
          return item;
        }
      }
    },
    getDate:function()
    {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 
      return {d:dd,m:mm,y:yyyy};
    },
    getDateD:function(diff){
      var currentDate = new Date(new Date().getTime() + diff * 24 * 60 * 60 * 1000);
      var dd = currentDate.getDate()
      var mm = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 
      return {d:dd,m:mm,y:year};
    },
    dateInt:function(d){
                  var  date = d.split("-");
                     date = date[2]+""+date[1]+""+date[0];
            
                  date=parseInt(date);
                  return date;
    },
    reverseDate:function(date)
    {
        var d=date.split("-");
        var nd=d[2]+"-"+d[1]+"-"+d[0];
        return nd;
    },
    priceFormat:function(pr){
        pr=pr.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
            var ac = pr.substr(pr.indexOf(".") + 1);
            if (pr.indexOf('.') == -1)
            {
             pr=pr+".00";
            }
            else if(ac.length==1)
            {
            pr=pr+"0"; 
            }
        return pr;
    },
     cpAmount:function(arr,prod,type,am){
        var find=false;
      for(var i=0; i<arr.length; i++)
      {
        var item=arr[i];
        if(item.category==prod.cat && item.product==prod.prod)
        {
            find=true;
            if(type=="add")
            {
             return parseInt(am)+parseInt(item.amount);   
            }
            else{
                return parseInt(prod.amount)-parseInt(item.amount);
            }
            
        }
      }
      if(!find)
      {
           if(type=="add")
            {
             return parseInt(am);  
            }
            else{
                return parseInt(prod.amount);
            }
      }
    },
      cpeAmount:function(arr,prod,org){
        var find=false;
      for(var i=0; i<arr.length; i++)
      {
        var item=arr[i];
        if(item.category==org.category && item.product==org.product)
        {
            find=true;
                return parseInt(item.amount)-parseInt(org.amount);
        }
        else if(item.category==prod.cat && item.product==prod.prod)
        {
            find=true;
                return item.amount;
        }
      }
      if(!find)
      {
             return 0;
      }
    },
    cpepAmount:function(arr,prod,org){
        var find=false;
      for(var i=0; i<arr.length; i++)
      {
        var item=arr[i];
        if(item.category==org.category && item.product==org.product)
        {
            find=true;
                return parseInt(item.amount)-parseInt(org.amount);
        }
      }
      if(!find)
      {
           for(var i=0; i<arr.length; i++)
            {
                var item=arr[i];
                if(org.category==prod.cat && org.product==prod.prod)
                {
                    find=true;
                        return 0-parseInt(org.amount);
                }
            }
            return 0;
      }
    },
        cpefAmount:function(arr,prod,org){
        var find=false;
      for(var i=0; i<arr.length; i++)
      {
        var item=arr[i];
        if(item.category==org.category && item.product==org.product)
        {
            find=true;
                return parseInt(item.amount)-parseInt(org.amount);
        }
      }
      //////////////
        for(var i=0; i<arr.length; i++)
            {
                var item=arr[i];
                if(item.category==prod.cat && item.product==prod.prod)
                {
                    find=true;
                         return item.amount;
                }
            }
      //////////////
        for(var i=0; i<arr.length; i++)
            {
                var item=arr[i];
                if(org.category==prod.cat && org.product==prod.prod)
                {
                    find=true;
                        return 0-parseInt(org.amount);
                }
            }
        //////////
            return 0;
      
    },
    trimObj:function(obj){
          Object.keys(obj).forEach(function(key) {
              var v=obj[key];
            if (typeof v === 'string' || v instanceof String)
            {
                obj[key]=obj[key].trim();
            }
          });
          return obj;
    }

};

module.exports = Functions;

