	// Funktion zur Steuerung
	function update() {
		var delta = clock.getDelta(); // seconds.
		var step = 200 * delta; // 200 pixels per second
		var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
		
		vertexIndex = collisionDetection();
		
	// move forwards/backwards/left/right
		if (questTrue)
		{	
			var relativeCameraOffset = new THREE.Vector3(0,50,200);

			var cameraOffset = relativeCameraOffset.applyMatrix4( userHitbox.matrixWorld );

			camera.position.x = cameraOffset.x;
			camera.position.y = cameraOffset.y+150;
			camera.position.z = cameraOffset.z;
			camera.lookAt(new THREE.Vector3(
				userHitbox.position.x,
				userHitbox.position.y+50,
				userHitbox.position.z)
			);
		} 
		else if(memoryQuestActive){
			startMemoryquest();
		}
		
		else if(isInEndstate()){
			if (keyboard.pressed('r')) {
			// R - restart game
				console.log("Reloading page...");
				location.reload();
			}
		}
		
		else {
			if ( keyboard.pressed('up') && vertexIndex != 4 && vertexIndex != 6 && vertexIndex != 1 && vertexIndex != 3 ){
				stepSnd.play();
				userHitbox.translateZ( -step );
			}
			else if(!keyboard.pressed('down')){
				stepSnd.pause();
			}
			if ( keyboard.pressed('down') && vertexIndex != 0 && vertexIndex != 2 && vertexIndex != 5 && vertexIndex != 7 ){
				stepSnd.play();
				userHitbox.translateZ(  step );
			}
			else if(!keyboard.pressed('up')){
				stepSnd.pause();
			}
			
			// rotate left/right/up/down
			var rotation_matrix = new THREE.Matrix4().identity();
			if ( keyboard.pressed('left')  && vertexIndex != 4 && vertexIndex != 5 && vertexIndex != 6 && vertexIndex != 7 ){
				userHitbox.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
				user.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
			}
			if ( keyboard.pressed('right') && vertexIndex != 1 && vertexIndex != 3 && vertexIndex != 0 && vertexIndex != 2 ){
				userHitbox.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
				user.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
			}

			if ( keyboard.pressed('ctrl') )
			{
				console.log(user.position.x + ", " + user.position.y + ", " + user.position.z );
			}
			user.position.x = userHitbox.position.x;
			user.position.z = userHitbox.position.z;
			//camera settings
			var relativeCameraOffset = new THREE.Vector3(0,50,200);

			var cameraOffset = relativeCameraOffset.applyMatrix4( userHitbox.matrixWorld );

			camera.position.x = cameraOffset.x;
			camera.position.y = cameraOffset.y;
			camera.position.z = cameraOffset.z;
			camera.lookAt(userHitbox.position);
		};
		
		if(hpCounter <= 0){
			switchToEndstate();
		}
		
		/*if(memoryQuestActive){
			startMemoryquest();
		}*/

		checkItem();
		//if (itemCounter == 3) 
			checkQuest();
	}

// Kollisionserkennung; 
	function collisionDetection(){
		// Cube Position in originPoint kopiert
		var originPoint = userHitbox.position.clone();

		// for-schleife für alle Eckpunkte, die Kollisionen hervorrufen können
		for (var vertexIndex = 0; vertexIndex < userHitbox.geometry.vertices.length; vertexIndex++)
		{
			// aktueller Punkt, (0 bis 7) --> Array der Eckpunkte, in Variable kopieren
			var localVertex = userHitbox.geometry.vertices[vertexIndex].clone();
			// 
			var globalVertex = localVertex.applyMatrix4( userHitbox.matrix );
			// Richtungsvektor, dessen Position
			var directionVector = globalVertex.sub( userHitbox.position );
			
			// origin Point und normalisierter Richtungsvektor des Cubes
			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			// Kollisionen = Überschneidungen des Cubes mit collidableMeshList
			var collisionResults = ray.intersectObjects( collidableMeshList );
			// Wenn Kollisionslänge größer als 0 UND Kollisionsergebnis-Distanz an der Stelle 0 ist kleiner als Länge des Richtungsvektors
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
				// zeige vertexIndex an und gib ihn zurück
				return vertexIndex;
			}
		}
	}



	function cameraUpdate(){
		var relativeCameraOffset = new THREE.Vector3(0,50,200);

		var cameraOffset = relativeCameraOffset.applyMatrix4( userHitbox.matrixWorld );

		camera.position.x = cameraOffset.x;
		camera.position.y = cameraOffset.y;
		camera.position.z = cameraOffset.z;
		camera.lookAt( userHitbox.position );
	}



