var scene, camera, renderer;
var geometry, material, mesh;

var startFieldGeo, startFieldMat, startFieldMesh;

var memoryQuestActive = false;	
var questNotDone = true;
var prevState = null;
var shroom = [];
var shroomHead = [];
var shroomState = [];
var cursorPointingAt = 0;
	
//load soundfiles
var pickupSnd = new Audio("sound/pickup.wav"); // buffers automatically when created
var errorSnd = new Audio("sound/error.wav");
//var forestSnd = new Audio("sound/forest.wav");
	
	
THREE.ImageUtils.crossOrigin = '';
var shroomHeadRedTex = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/fliegenpilz.png');
var shroomHeadNormalTex = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/pilz.png'); 
	
// var hp = 100;
	
/*THREE.ImageUtils.crossOrigin = '';
var planeTex = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/forest.png');
var shroomHeadRedTex = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/fliegenpilz.png');
var shroomHeadNormalTex = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/pilz.png'); 

planeTex.wrapS = THREE.RepeatWrapping;
planeTex.wrapT = THREE.RepeatWrapping;
planeTex.repeat.set( 4, 4 );*/
		
document.addEventListener("keydown", onDocumentKeyDown, false);	
	
function initMemoryquest() {
		
	
	
	// Create startfield
	startFieldGeo = new THREE.BoxGeometry(50 , 10, 50);
	startFieldMat = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
	startFieldMesh = new THREE.Mesh( startFieldGeo, startFieldMat );
	scene.add( startFieldMesh );
	startFieldMesh.position.set(-1350, 5, -1220);
	
	//Create Rest
	initShrooms();
	
	// Create selection
	
	//Start sound
	//forestSnd.play();
	/*
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
	*/
}

function animate() {
    requestAnimationFrame( animate );
		
    renderer.render( scene, camera );
}

function onDocumentKeyDown( event ){
	var keyCode = event.which;
	var units = 100;
	//up
	if(memoryQuestActive){
	if( keyCode == 38){
		if( cursorPointingAt != 0 && cursorPointingAt != 1 && cursorPointingAt != 2 ) {
			mesh.translateZ(-(units-5));
			cursorPointingAt -= 3;
		}
		//camera.translateZ( -units );
	}
				
		//down
		if( keyCode == 40 ){
			if( cursorPointingAt != 6 && cursorPointingAt != 7 && cursorPointingAt != 8 ){
				mesh.translateZ(units-5);
				cursorPointingAt += 3;
			}
			//camera.translateZ( units );
		}

		//left
		if( keyCode == 37 ){
			if( cursorPointingAt != 0 && cursorPointingAt != 3 && cursorPointingAt != 6 ) {
				mesh.translateX(- units);
				cursorPointingAt -= 1;
			}
			//camera.translateX( -units );
		}
				
		//right
		if( keyCode == 39 ){
			if( cursorPointingAt != 2 && cursorPointingAt != 5 && cursorPointingAt != 8 ){
				mesh.translateX(units);
				cursorPointingAt += 1;
			}
			//camera.translateX( units );
		}
				
		if( keyCode == 13 ){
			pickupSnd.play();
			console.log('Enter');
			checkShroom();
		}
	}
		//console.log(cursorPointingAt);
}

function createSelectionCube(){
	//Create Cube
    geometry = new THREE.BoxGeometry( 50, 100, 50 );
    //material = new THREE.MeshBasicMaterial( { color: 0xad655f, wireframe: true } );
	material = new THREE.MeshBasicMaterial({color:0xEEE9E9, transparent:true, opacity:0.2, side: THREE.DoubleSide});
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
		
	//Position of transparent cube 
	mesh.position.x = -1500;
	mesh.position.y = 3;
	mesh.position.z = -1500;
}

function startMemoryquest(){
	
	if(!memoryQuestActive && questNotDone){
		console.log("memoryquest start");
		memoryQuestActive = true;
		createSelectionCube();
		
		//align camera
		var newDir = new THREE.Vector3(0, 0, 0);
		var pos = new THREE.Vector3();
		
		pos.addVectors(newDir, user.position);
		user.lookAt(pos);
		user.position.setX(-1350);
		user.position.setZ(-1220);
		
		var relativeCameraOffset = new THREE.Vector3(0,50,200);

			var cameraOffset = relativeCameraOffset.applyMatrix4( user.matrixWorld );

			camera.position.x = cameraOffset.x;
			camera.position.y = cameraOffset.y+150;
			camera.position.z = cameraOffset.z;
			camera.lookAt(new THREE.Vector3(
				user.position.x,
				user.position.y+50,
				user.position.z)
			);
		//camera.rotation.x = 125;
	}
	
}
	
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
	
function initShrooms() {
	//camera.rotation.x = 125;
	createShrooms();
}
	
function checkShroom() {
	if(shroomState[cursorPointingAt] == true ) {
		//shroom[cursorPointingAt].material.color.setHex( 0x00ff7f );
		shroomHead[cursorPointingAt].material.map = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/steinpilz.png');
		//shroomHead[cursorPointingAt].material.color.setHex( 0x00ff7f );
		if(prevState != null) {
			//Compare
			if(prevState == true) {
				console.log("Memoryquest successful solved!");
				questNotDone = false;
				memoryQuestActive = false;
				clearTextMessage();
				appendTextMessage('Yay, du hast das Memory gelöst.');
				setTimeout(
						function() {
							clearTextMessage();
						}
					, 5000);
			}
			else {
				prevState = null;
				setTimeout( function(){ resetShrooms() }, 500 );
			}
		}
		else {
			prevState = true;
		}
	}
	else {
		//shroom[cursorPointingAt].material.color.setHex( 0x990000 );
		shroomHead[cursorPointingAt].material.map = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/fliegenpilz.png');
		if( prevState != null ) {
			if( prevState == false ) {
				console.log("Abzug von HP!");
				/*hp -= 10;
				var hpHUD = document.getElementById("hp");
				hpHUD.innerHTML = hp + " HP";*/
				errorSnd.play();
			}
				prevState = null;
				setTimeout( function(){ resetShrooms() }, 500 );
		}
		else{
			prevState = false;
		}
	}
}
	
function resetShrooms(){
	for(var i = 0; i < 9; i++){
		shroom[i].material.color.setHex( 0xffffff );
		shroomHead[i].material.map = THREE.ImageUtils.loadTexture('http://caro.x15.eu/img/pilz.png');
	}
}
	
function createShrooms() {
	var shroomGeo = new THREE.CylinderGeometry( 10, 10, 50, 8 );
	//var shroomMat = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

	for( var i = 0; i < 9; i++ ){
		//var shroomMat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
		var shroomMat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
		shroom[i] = new THREE.Mesh( shroomGeo, shroomMat );
		scene.add( shroom[i] );
	}
		
	var counter; // Counter = 2 -> No more true.
	//while( counter != 2 ){
	counter = 0;
	for( var i = 0; i < 9; i++ ){
		var rnd = getRandomInt(0, 1); //O -> False, 1 -> True
			 
		if( rnd == 1 && counter < 2){
			shroomState[i] = true;
			counter++;
		}
		else {
			shroomState[i] = false;
		}
		console.log(i+': '+shroomState[i]);
	}
		//}
		
	var shroomHeadGeo = new THREE.CylinderGeometry( 1, 20, 20, 8 );
		
	for( var i = 0; i < 9; i++ ) {
		//var shroomHeadMat = new THREE.MeshBasicMaterial( { color: 0x8B3A3A } );
		var shroomHeadMat = new THREE.MeshBasicMaterial( { map: shroomHeadNormalTex } );
		shroomHead[i] = new THREE.Mesh( shroomHeadGeo, shroomHeadMat );
		scene.add( shroomHead[i] );
	}
			
	//Set positions
	var x = -1500;
	var z = -1500;
	var y = 5;
		
	shroom[0].position.z = z;
	shroom[0].position.x = x;
		
	shroom[1].position.z = z;
	shroom[1].position.x = x+100;
		
	shroom[2].position.z = z;
	shroom[2].position.x = x+200;
		
	shroom[3].position.z = z+100;
	shroom[3].position.x = x;
		
	shroom[4].position.z = z+100;
	shroom[4].position.x = x+100;
		
	shroom[5].position.z = z+100;
	shroom[5].position.x = x+200;
		
	shroom[6].position.z = z+200;
	shroom[6].position.x = x;
		
	shroom[7].position.z = z+200;
	shroom[7].position.x = x+100;
		
	shroom[8].position.z = z+200;
	shroom[8].position.x = x+200;
		
	for( var i = 0; i < 9; i++ ) {
		shroomHead[i].position.z = shroom[i].position.z;
		shroomHead[i].position.x = shroom[i].position.x;
		shroomHead[i].position.y = y+25;
	}	
}