var camera, scene, renderer;
var clock = new THREE.Clock();
var backgroundColor = 0xbfd1e5;
var keyboard = new THREEx.KeyboardState();
var loader = new THREE.JSONLoader();
var particleGroup, emitter;

// hud-information
var itemCounter = 0;
var hpCounter = 100;
var scoreBlumen = 0;

// collision
var collidableMeshList = [];

// init
var blumen = []; // random
var cube, itemApfel, itemPilz, itemBlume, tabaluga, field;
var user, userHitbox;
var loader = new THREE.JSONLoader();

// items-help
var apfelGet = false;
var pilzGet = false;
var blumenGet = false;
var itemApfelX, itemApfelZ, itemPilzX, itemPilzZ, itemBlumeX, itemBlumeZ;

// tabaQuest
var way, way2, way3, way4, way5, way6, way7, way8, way9, way10, way11, way12, way13, way14, way15 ;
var dir = [87, 68, 87, 68, 87, 87, 65, 87, 87, 68, 68, 87, 87, 68, 87];
var questTrue = false;
var arrWay = [];
var questFinish = false;
var cookie = 0;
var game_status = 1;
var keyUpAdded = false;

// sound
var forestSnd = new Audio("sound/forest.wav");
var stepSnd = new Audio("sound/steps.wav");


init();
initTrees();
initParticles();
initBlumen();
initItems();
initTabalugaQuest();
initMemoryquest();
animate();


function init() {
// Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( backgroundColor, 0.0015 );


// Camera
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 65, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 50, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	//camera.position.set(0,25,0);
	camera.lookAt(scene.position);	


// Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( backgroundColor );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );


// Events
	window.addEventListener( 'resize', onWindowResize, false );

//Create Skybox
	THREE.ImageUtils.crossOrigin = '';
	var materialArray = [];
	for ( var i = 0; i < 6; i++ ){
		materialArray.push( new THREE.MeshBasicMaterial({ 
			map: THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/skybox/'+i+'.png'),
			side: THREE.BackSide
		}));
	}	

	var skyBoxGeo = new THREE.CubeGeometry( 4000, 4000, 4000 );
	//MeshFaceMaterial ben?tigt unebdingt ein Array bestehend aus Materials.
	var skyBoxMat = new THREE.MeshFaceMaterial( materialArray );
	//skyBoxMat = new THREE.MeshBasicMaterial( { color: 0xad655f, wireframe: true } );
	var skyBox = new THREE.Mesh( skyBoxGeo, skyBoxMat );
	//skyBox.rotation.x += Math.PI / 2;
	skyBox.position.set(0, 249, 0);
	scene.add( skyBox );


// Floor
	var planeGeo = new THREE.PlaneBufferGeometry(4000, 4000, 100, 100);
	//THREE.ImageUtils.crossOrigin = '';
	var planeTex = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/forest.png');
	//var planeMat = new THREE.MeshPhongMaterial( {color: 0x198c19, side: THREE.DoubleSide}); 
	var planeMat = new THREE.MeshPhongMaterial({ map:planeTex, side:THREE.DoubleSide });
	
	//new begin
	var vertices = planeGeo.attributes.position.array;
	for( var i = -1; i < vertices.length; i += 3) {
		vertices[i] = Math.random() * (5 - 1) + 1;
	}
	planeGeo.computeVertexNormals();
	//new end			
	var plane = new THREE.Mesh( planeGeo, planeMat );
	plane.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2) );
	//plane.position.y = -80;
	scene.add( plane );


// User
	var cubeSize = 35;
	rotcap = new THREE.JSONLoader();
	rotcap.load('http://caro.x15.eu/rotcap3.json', addUser);
			function addUser ( geometry, materials ) {
				var material = new THREE.MeshFaceMaterial (materials);
				user = new THREE.Mesh(geometry, material);
				//model.scale.set (-10,-20,0);
				//model.position.set (-10,-20,0)
				user.position.set(0, 1, 0);
				scene.add(user);
		}
		
		var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
		//Change opacity to 0.0 to make cube invisible
		var material = new THREE.MeshBasicMaterial({color:0xEEE9E9, transparent:true, opacity:0.1, side: THREE.DoubleSide});

		userHitbox = new THREE.Mesh( geometry, material);
		// quest position
		// user.position.set(1000, cubeSize/2, -1300)
		userHitbox.position.set(0, cubeSize/2, 0);

		// origin position
		//user.position.set(0,cubeSize/2, 0);
		
		// apple position
		//user.position.set(1100, cubeSize/2, 1760);

		// mushroom position	
		//user.position.set(-1280, cubeSize/2, -1400);
		scene.add( userHitbox );
		console.log("added userhitbox to scene");
		
	loader.load( 'http://caro.x15.eu/qbaum.json', function( geometry, materials ) 
	{
		
		var material = new THREE.MeshFaceMaterial (materials);
		qbaum = new THREE.Mesh( geometry, material );
		qbaum.scale.set( 20, 20, 20 );
		qbaum.position.set( -400, 0, -200 );
		scene.add( qbaum );
	});

	loader.load( 'http://caro.x15.eu/haus-1.json', function( geometry, materials ) 
	{
		var material = new THREE.MeshFaceMaterial (materials);
		haus = new THREE.Mesh( geometry, material );
		haus.scale.set( 20, 20, 20 );
		haus.position.set( -1400, 0, -200 );
		scene.add( haus );
	});

	loader.load( 'http://caro.x15.eu/wolf4.json', function( geometry, materials ) 
	{
		var material = new THREE.MeshFaceMaterial (materials);
		wolf = new THREE.Mesh( geometry, material );
		wolf.scale.set( 20, 20, 20 );
		wolf.position.set( -1400, 0, -300 );
		scene.add( wolf );
	});


// Light
	//var lightA = new THREE.AmbientLight( 0x808080 );
	//scene.add( lightA );
	var lightH = new THREE.HemisphereLight( 0xFFEF32, 0x674C1E, 0.21 );
	scene.add( lightH );


// Wall test				
	var wallGeometry = new THREE.CubeGeometry( 4000, 100, 20, 1, 1, 1 );
	// var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x722F2F} );
	var wallMaterial = new THREE.MeshNormalMaterial( {transparent: true, opacity: 0.0} );		
	//wall x-direction
	var wall = new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(0, 50, 2000);
	scene.add(wall);
	collidableMeshList.push(wall);
	var wall = new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(0, 50, -2000);
	scene.add(wall);
	collidableMeshList.push(wall);				
	//wall z-direction
	var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
	wall2.position.set(-2000, 50, 0);
	wall2.rotation.y = 3.14159 / 2;
	scene.add(wall2);
	collidableMeshList.push(wall2);
	var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
	wall2.position.set(2000, 50, 0);
	wall2.rotation.y = 3.14159 / 2;
	scene.add(wall2);
	collidableMeshList.push(wall2);		

	//Sound 
	forestSnd.play();
}

function checkPosition(){
	var x = user.position.x;
	var z = user.position.z;
	
	if((x < -1325 && x > - 1375) && (z > -1245 && z < -1195)){
		startMemoryquest();
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
	requestAnimationFrame( animate )

	// rotation item
	//itemApfel.rotateY(0.05);
	//itemPilz.rotateY(0.05);
	//itemPilz.rotateZ(0.005);
	//itemBlume.rotateY(0.05);
	checkPosition();
	
	particleGroup.tick()
	// render-update
	renderer.render( scene, camera );

	update();
}		

// Environment Trees -> now in tree.js


// Environment Flowers
function initBlumen() 
{
	var blume = null;				
	// init loading
	loader.load( 'http://caro.x15.eu/blume.json', function( geometry, materials ) 
	{
		var material = new THREE.MeshLambertMaterial( materials);
		for ( var i = 0; i < 150; i ++ ) 
		{
			// random placement in a grid
			var x = Math.random() * 4000 - 2000;
			var z = Math.random() * 4000 - 2000;

			if ( Math.abs( x ) < 200 && Math.abs( z ) < 100 ) continue;

			blume = new THREE.Mesh( geometry, material );
			blume.name = "blume"+i;
			var s = THREE.Math.randFloat( 1.5, 2.5 );
			blume.scale.set( s, s, s );

			blume.position.set( x, 5, z );
			blume.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

			blume.matrixAutoUpdate = false;
			blume.updateMatrix();

			scene.add( blume );

			blumen.push( blume );
		}					
	});
}


// Items
function initItems()
{
	// item Apfel
	loader.load( 'http://caro.x15.eu/apple.json', function( geometry, materials )
	{
		var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
		itemApfel = new THREE.Mesh( geometry, material );
		var s = 10;
		itemApfel.scale.set( s, s, s );
		itemApfel.position.set(1120, 50, 1800);
		scene.add( itemApfel );
	});
	//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
	// var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe:true } );
	// itemApfel = new THREE.Mesh( geometry2, material2);
	// scene.add( itemApfel );
	// itemApfel.position.set(1120, apfelSize/2, 1800);
	// itemList.push(itemApfel);

	// item Pilz
	loader.load( 'http://caro.x15.eu/pilz.json', function( geometry, materials ) 
	{
		var s = 10;
		var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
		itemPilz = new THREE.Mesh( geometry, material );
		itemPilz.scale.set( s, s, s );
		itemPilz.position.set( -1320, 10, -1380 );
		scene.add( itemPilz );
	});


	// item Blume
	loader.load( 'http://caro.x15.eu/blume.json', function( geometry, materials ) 
	{
		//var geometry4 = new THREE.BoxGeometry( blumeSize, blumeSize, blumeSize );
		//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
		var s = 10;
		var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		itemBlume = new THREE.Mesh( geometry, material);
		itemBlume.scale.set( s, s, s);
		itemBlume.position.set(-980, s/2, 1650);
		scene.add( itemBlume );
	});
}


// TabalugaQuest
function initTabalugaQuest()
{
	// Tabaluga-Quest
	var tabaGeometry = new THREE.BoxGeometry(50,1,50);
	var tabaMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
	tabaluga = new THREE.Mesh( tabaGeometry, tabaMaterial );
	scene.add( tabaluga );
	tabaluga.position.set(1000,10,-1200);
}


// Create particle group and emitter
// https://github.com/squarefeet/ShaderParticleEngine
function initParticles() {
	THREE.ImageUtils.crossOrigin='';
	particleGroup = new SPE.Group({
		texture: THREE.ImageUtils.loadTexture('http://caro.x15.eu/star.png'),
		maxAge: 8,
		blending: THREE.AdditiveBlending
	});
	emitter = new SPE.Emitter({
		positionSpread: new THREE.Vector3(4000, 200, 4000),
		acceleration: new THREE.Vector3(0, -1, 0),
		velocity: new THREE.Vector3(0, 5, 5),
		colorStart: new THREE.Color('yellow'),
		colorEnd: new THREE.Color('red'),
		sizeStart: 6,
		sizeEnd: 4,
		opacityStart: 0,
		opacityMiddle: 1,
		opacityEnd: 0,
		particleCount: 20000
	});
	particleGroup.addEmitter( emitter );
	scene.add( particleGroup.mesh );
}