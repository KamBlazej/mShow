
var ThreeT = {
    threeTextStart:function(cont){
var container, scene, camera, renderer, controls,font,pivot;

function init() {
    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    var degree=Math.PI/180;
    var SCREEN_WIDTH = 1200, SCREEN_HEIGHT = 270;
    var VIEW_ANGLE = 20, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    //camera.position.set(0,20,10);
    camera.position.x=0;
    camera.position.y=-100;
    camera.position.z=1800;
    //camera.rotation.x = 90 * degree ;
    camera.lookAt(scene.position);
    renderer = new THREE.WebGLRenderer( {antialias:true, alpha: true} );
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    //console.log(cont);
    cont.appendChild( renderer.domElement );

    // CONTROLS
    //controls = new THREE.OrbitControls( camera, renderer.domElement );

    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(160,0,340);
    scene.add(light);

    // add 3D text default
    var material = new THREE.MeshPhongMaterial({
        color: 0xdddddd
    });
    var materials = [new THREE.MeshPhongMaterial({color: 0x00ff00}),new THREE.MeshPhongMaterial({color: 0xff0000})
    ];
    var textGeom = new THREE.TextGeometry( 'Hello, World!', {
        font: font,
        size: 30
    });

    var textMesh = new THREE.Mesh( textGeom, material );

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    
    textMesh.position.set( -0.5 * textWidth, 0, 0 );
   



    // add 3D text beveled and sized
    var material2 = new THREE.MeshPhongMaterial({
        color: 0x00ff00
    });
    var textGeom2 = new THREE.TextGeometry( 'Meat APP', {
        size: 70, height: 15, curveSegments: 3,
        font: font, weight: 'normal',
        bevelThickness: 3, bevelSize: 3, bevelEnabled: true
    });
    var textMesh2 = new THREE.Mesh( textGeom2, materials );

    textGeom2.computeBoundingBox();
    var textWidth2 = textGeom2.boundingBox.max.x - textGeom2.boundingBox.min.x;
    
    textMesh2.position.set( -0.5 * textWidth2, 0, 0 );
    //scene.add( textMesh2 );
    
    pivot = new THREE.Object3D();
    pivot.add( textMesh2 );
    scene.add( pivot );
}

function render() {
    renderer.render( scene, camera );
}

function animate() {
    window.requestAnimationFrame( animate );
       pivot.rotation.y -= 0.02;
    render();
}



loadFont();
function loadFont() {
				var loader = new THREE.FontLoader();
				loader.load( '/font.json', function ( response ) {
					font = response;
                    init();
                    animate();
				} );
			}
    },
    /////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////
    threeTextStart2:function(cont){
var container, scene, camera, renderer, controls,font, ray, projector,directionVector ;
//var cur=0;
  var raycaster;
        var mouse; 

var clickInfo = {
  x: 0,
  y: 0,
  userHasClicked: false
};

cont.addEventListener('mousemove', function (evt) {
  // The user has clicked; let's note this event
  // and the click's coordinates so that we can
  // react to it in the render loop
  var diff=cont.getBoundingClientRect();
  diff=diff.left;

  clickInfo.userHasClicked = true;
  clickInfo.x = parseInt(evt.clientX)-parseInt(diff);
  clickInfo.y = evt.clientY;
}, false);

var anim={status:true,cur:0,lap:0,frame:0};
var degree=Math.PI/180;
var letters=[
    {l:"S"},
    {l:"H"},
    {l:"O"},
    {l:"W"},
    {l:""},
    {l:"M"},
    {l:"E"},
    {l:"A"},
    {l:"T"},
    {l:""},
    {l:"A"},
    {l:"P"},
    {l:"P"},

];
var meshes=[];
var SCREEN_WIDTH =1200, SCREEN_HEIGHT = 50;
var arrow;
var cs=0x226ce8;
var ci=0xccdfff;
function init() {
    // SCENE
       raycaster = new THREE.Raycaster(); // create once
         mouse = new THREE.Vector2(); // create once
    scene = new THREE.Scene();

   
    
    var VIEW_ANGLE = 7, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    //camera.position.set(0,20,10);
    camera.position.x=0;
    camera.position.y=-100;
    camera.position.z=1800;
    //camera.rotation.x = 90 * degree ;
    camera.lookAt(scene.position);
    renderer = new THREE.WebGLRenderer( {antialias:true, alpha: true} );
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    //console.log(cont);
    cont.appendChild( renderer.domElement );

    // CONTROLS
    //controls = new THREE.OrbitControls( camera, renderer.domElement );

    // LIGHT
   /* var light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,340);
    scene.add(light);*/
      // LIGHT
    /*var light = new THREE.PointLight(0xffffff);
    light.position.set(0,-100,340);
    scene.add(light);*/
     var light = new THREE.DirectionalLight(0xFFFFFF,1.4);
    light.position.set(0, -1500, 1800);
    light.target.position.set(0, -100, 1800);

   light.shadowCameraVisible = true;
   light.castShadow = true;

    scene.add(light);
    

 
   



    // add 3D text beveled and sized
    for(var i=0; i<letters.length; i++)
    {
        var letter=letters[i];
      
        letter.x=i*200;
        if(letter.l!=="")
        {
            letter.type="mesh";
            create();
        }
        else
        {
            letter.type="space";
        }
        function create()
        {    
         var materials = [new THREE.MeshPhongMaterial({color: ci}),new THREE.MeshPhongMaterial({color: cs})
         ];
         letter.cs=cs;
         letter.ci=ci;
         letter.anim={status:false,power:false,deg:0,speed:0}
         letter.id=i;
        
        var geom = new THREE.TextGeometry( letter.l, {
        size: 120, height: 15, curveSegments: 3,
        font: font, weight: 'normal',
        bevelThickness: 3, bevelSize: 3, bevelEnabled: true
         });
         var mesh = new THREE.Mesh(geom, materials);
         //mesh.writable= true;
         letter.mesh=mesh;
         geom.computeBoundingBox();
         var wid = geom.boundingBox.max.x - geom.boundingBox.min.x;
         //geom.translate( distX, distY, distZ );
         mesh.position.set(-(wid/2), 0, 0 );
         //mesh.lookAt( camera.position );
        scene.add( mesh );
        mesh.idr=i;
         meshes.push(mesh);
        //var pivot=null;
        var pivot = new THREE.Object3D();

        pivot.add( mesh );
        pivot.position.set(letter.x-SCREEN_WIDTH,-40,0);
        scene.add( pivot );
       // mesh.position.set(letter.x,-40,0);

        letter.pivot=pivot;
        }

    }
}

function render() {
    renderer.render( scene, camera );
}

function animate() {
    window.requestAnimationFrame( animate );

   



    var sec=3;
    var cur=anim.cur;
   // var lett=letters[cur];
    for(var i=0; i<letters.length; i++)
    {
        var lett=letters[i];
        if(i==cur)
        {
            //lett.anim.power=true;
           
            rotate(lett,8,true);
        }
        else if(i==cur+1 && cur+1<letters.length)
        {
            if(letters[cur+1].type=="mesh")
            {
                rotate(letters[cur+1],false,true); 
            }
            else if(cur+2<letters.length)
            {
                rotate(letters[cur+2],false,true);
            }
        }
        else if(i==cur+2 && letters[cur+1].type=="space" && cur+2<letters.length)
        {

        }
        else if(lett.type=="mesh")
        {
            rotate(lett,false,false);
        }
    }
      anim.frame+=1;
        if(anim.frame>=100)
        {
            anim.frame=0;
            anim.cur+=1;
        }
      
      if(anim.cur>=letters.length)
        {
        anim.cur=0;
        }  
      if(letters[anim.cur].type=="space")
        {
             anim.cur+=1;
        }
        if(anim.cur>=letters.length)
        {
        anim.cur=0;
        }  
    function power(obj,status){
      
           
        
        if(!status && obj.anim.power)
        {
        obj.anim.power=status;  
        obj.mesh.material[0].color.set( ci )  
        }
        else if(status)
        {
          obj.anim.power=status;
          obj.mesh.material[0].color.set( 0xff0000 )  
        }

         console.log("//");
            console.log(status);
            console.log(obj);
            console.log("//");

        //obj.anim.power=status;
        //status ? obj.mesh.material[0].color.set( 0xff0000 ) :  obj.mesh.material[0].color.set( ci );
        if(status)
        {
            if(obj.anim.deg*degree>360*degree)
            {
                obj.anim.deg-=360*degree;
            }
        }
       
    }
    function rotate(obj,speed,status)
    {
        if(status)
        {
            obj.anim.status=true;
        }
        if(obj.anim.status)
        {
            if(speed)
            {
                obj.anim.speed=speed;
            }
            else
            {
              obj.anim.speed=sec;  
            }
        if(speed && status)
        {
             obj.mesh.material[1].color.set( 0xf49542 ) ; 
        }
        else
        {
           obj.mesh.material[1].color.set( cs ) ;  
        }
        
        obj.pivot.rotation.y+=obj.anim.speed*degree;
        obj.anim.deg=obj.anim.deg+(obj.anim.speed*degree);
            
       
        //lett.pivot.rotation.y=0;
            if(obj.anim.deg>=1080*degree)
            {
                
                obj.pivot.rotation.y=0;
                obj.anim.deg=0;
                obj.anim.status=false;
                obj.anim.power=false;
                if(!status)
                {
                    obj.mesh.material[0].color.set( ci );
                }
                
            }
        }
       
    }

     if(clickInfo.userHasClicked)
    {
        

    mouse.x = ( clickInfo.x / SCREEN_WIDTH ) * 2 - 1;
    mouse.y = - ( clickInfo.y / SCREEN_HEIGHT ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );



    var intersects = raycaster.intersectObjects( meshes, true);
    	for ( var i = 0; i < intersects.length; i++ ) {

		
        var getId=intersects[ i ].object.idr;
        if(!letters[getId].anim.power)
        {
            intersects[ i ].object.material[0].color.set( 0xff0000 );
            var l=letters[getId];
            l.anim.power=true;
            
           
             anim.cur=getId;
            anim.frame=0;
        }
       

	}
        //console.log(scene.children);
        clickInfo.userHasClicked=false;
    }
   
   /* if(lett.type=="mesh")
    {
         if(anim.cur>=letters.length)
        {
        anim.cur=0;
        }
    }
    else if(lett.type=="space")
    {
         anim.cur=anim.cur+1;
      if(anim.cur>=letters.length)
        {
        anim.cur=0;
        }  
    }*/



    /*for(var i=0; i<letters.length; i++)
    {
        var letter=letters[i];
       
        
            if(cur==i)
            {
               if(letter.type=="mesh")
                { 
                    console.log(letter);
                    letter.pivot.rotation.y += 4*degree;
                    anim=anim+1;
                    if(anim>=90)
                    {
                        anim=0;
                        cur=cur+1;
                     
                    } 
                }
                else
                {
                    cur=cur+1;
                } 
                if(cur>=letters.length)
                {
                    anim=0;
                    cur=0;
                }
            }
            //letter.pivot.rotation.y += 0.02;
       
        
    }
       */
    render();
}



loadFont();
function loadFont() {
				var loader = new THREE.FontLoader();
				loader.load( '/font.json', function ( response ) {
					font = response;
                    init();
                    animate();
				} );
			}
    }

};

module.exports = ThreeT;

