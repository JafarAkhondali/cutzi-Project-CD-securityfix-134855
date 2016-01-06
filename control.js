			// Funktion zur Steuerung
			function update() {
				var delta = clock.getDelta(); // seconds.
				var step = 200 * delta; // 200 pixels per second
				var fixStep = 10;
				var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
				
				vertexIndex = collisionDetection();

			// move forwards/backwards/left/right
				if (questTrue == true )
				{	
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
				} else {
					if ( keyboard.pressed('up') && vertexIndex != 4 && vertexIndex != 6 && vertexIndex != 1 && vertexIndex != 3 )
						user.translateZ( -step );
					if ( keyboard.pressed('down') && vertexIndex != 0 && vertexIndex != 2 && vertexIndex != 5 && vertexIndex != 7 )
						user.translateZ(  step );

					// rotate left/right/up/down
					var rotation_matrix = new THREE.Matrix4().identity();
					if ( keyboard.pressed('left')  && vertexIndex != 4 && vertexIndex != 5 && vertexIndex != 6 && vertexIndex != 7 )
						user.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
					if ( keyboard.pressed('right') && vertexIndex != 1 && vertexIndex != 3 && vertexIndex != 0 && vertexIndex != 2 )
						user.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);

					if ( keyboard.pressed('ctrl') )
					{
						console.log(user.position.x + ", " + user.position.y + ", " + user.position.z );
					}

					//camera settings
					var relativeCameraOffset = new THREE.Vector3(0,50,200);

					var cameraOffset = relativeCameraOffset.applyMatrix4( user.matrixWorld );

					camera.position.x = cameraOffset.x;
					camera.position.y = cameraOffset.y;
					camera.position.z = cameraOffset.z;
					camera.lookAt(user.position);
				};

				checkItem();
				//if (itemCounter == 3) 
					checkQuest();
			}

		// Kollisionserkennung; 
			function collisionDetection(){
				// Cube Position in originPoint kopiert
				var originPoint = user.position.clone();

				// for-schleife für alle Eckpunkte, die Kollisionen hervorrufen können
				for (var vertexIndex = 0; vertexIndex < user.geometry.vertices.length; vertexIndex++)
				{
					// aktueller Punkt, (0 bis 7) --> Array der Eckpunkte, in Variable kopieren
					var localVertex = user.geometry.vertices[vertexIndex].clone();
					// 
					var globalVertex = localVertex.applyMatrix4( user.matrix );
					// Richtungsvektor, dessen Position
					var directionVector = globalVertex.sub( user.position );
					
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

			// Picking
			function clearTextMessage(){   
				document.getElementById('message').innerHTML = '';
			}

			function appendTextMessage(txt){
				document.getElementById('message').innerHTML += txt;
			}

			// HUD
			function clearTextHud(){   
				document.getElementById('hud').innerHTML = '';
			}

			function appendTextHud(){
				// document.getElementById('hud').innerHTML += txt;
				document.getElementById('hud').innerHTML = 'Red Riding Hood <br> ' + hpCounter + ' HP <br> ' + itemCounter + '/3 Items <br> score: ' + scoreBlumen;
			}

			// Gameinfo
			function clearTextIn(){   
				document.getElementById('control-info').innerHTML = '';
			}

			function appendTextIn(){
				clearTextIn();
				console.log(game_status);
				if (game_status == 1 || questTrue == true){
					document.getElementById('control-info').innerHTML += 'Steuerung:<ul> <li> W: Vor <li> A/D: Links/Rechts	<li>R: Exit	</ul>';
				} else {
					document.getElementById('control-info').innerHTML += 'Steuerung:<ul> <li> Up/Down arrow: Vor/Zurück <li> Left/Right arrow: Links/Rechts	</ul>'
				}	
			}

			function cameraUpdate(){
				var relativeCameraOffset = new THREE.Vector3(0,50,200);

				var cameraOffset = relativeCameraOffset.applyMatrix4( user.matrixWorld );

				camera.position.x = cameraOffset.x;
				camera.position.y = cameraOffset.y;
				camera.position.z = cameraOffset.z;
				camera.lookAt( user.position );
			}



