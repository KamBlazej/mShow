
var CountPos = {
    findMidWin:function(w){
        var win = window.innerWidth;
        return (win-w)/2;
    },
    findOut:function(x,y,w,h){
        var ww = window.innerWidth;
        var wh = window.innerHeight;
        var nx=x
        var ny=y;
        if(parseInt(x)+parseInt(w)>ww ){
            nx=parseInt(ww)-(parseInt(w)+10)
        } 
        else if(x<0)
        {
            nx=0;
        }

        if(parseInt(y)+parseInt(h)>wh ){
            ny=parseInt(wh)-(parseInt(h)+10)
        }
        else if(y<0)
        {
             ny=0;
        }
        return {x:nx,y:ny};
    }

};

module.exports = CountPos;

