			// Funktion zur Steuerung
			function keyDownHandler(event) {
				var step = 10;
				var up = 0;
				vertexIndex = collisionDetection();
			// key left  --  bei vertexIndex * nicht weitergehen
				if ( event.keyCode === 37 && vertexIndex != 4 && vertexIndex != 5 && vertexIndex != 6 && vertexIndex != 7) {
					cube.translateX( -step );
					cube.translateY( up );
					// camera moves
					camera.position.x += -step;
					camera.position.y += 0;
				}
			// key up  --  bei vertexIndex * nicht weitergehen
				else if( event.keyCode === 38 && vertexIndex != 4 && vertexIndex != 6 && vertexIndex != 1 && vertexIndex != 3) {
					cube.translateZ( -step );
					cube.translateY( up );
					camera.position.y += 0;
					camera.position.z += -step;
				} 
			// key right  --  bei vertexIndex * nicht weitergehen
				else if ( event.keyCode === 39 && vertexIndex != 1 && vertexIndex != 3 && vertexIndex != 0 && vertexIndex != 2) {	
				//else if ( event.keyCode === 39 && vertexIndex != 0 ) {	
					cube.translateX( step );
					cube.translateY( up );
					camera.position.x += step;
					camera.position.y += 0;
				}
			// key down  --  bei vertexIndex * nicht weitergehen
				else if ( event.keyCode === 40  && vertexIndex != 0 && vertexIndex != 2 && vertexIndex != 5 && vertexIndex != 7) {
					cube.translateZ( step );
					cube.translateY( up );
					camera.position.y += 0;
					camera.position.z += step;
				}

				// camera position external
			// up with w
				else if ( event.keyCode === 87 ) {
					camera.position.y += step;
				}
			// down with s
				else if ( event.keyCode === 83 ) {
					camera.position.y += -step;
				}
			// right with d
				else if ( event.keyCode === 68 ) {
					camera.position.x += step;
				}
			// left with a
				else if ( event.keyCode === 65 ) {
					camera.position.x += -step;
				}
			// angle down with y
				else if ( event.keyCode === 89 ) {
					camera.rotation.x += 50;
				}
			// angle up q
				else if ( event.keyCode === 81 ) {
					camera.rotation.x += -50;
				}
			// 
				else if ( event.keyCode === 71 ) {
					alert(cube.position.x + ", " + cube.position.y + ", " + cube.position.z );
				}
				checkItem();
				checkQuest();

				// console.log('x' + cube.position.x);
				// console.log('y' + cube.position.y);
				// console.log('z' + cube.position.z);
			}

		// Kollisionserkennung; erkennt Wände, kann aber z.B. nicht nach rechts laufen, wenn vertexIndex = 1, geht aber nach rechts (an wand entlang)
			function collisionDetection(){
				// Cube Position in originPoint kopiert
				var originPoint = cube.position.clone();
				clearText();

				// for-schleife für alle Eckpunkte, die Kollisionen hervorrufen können
				for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++)
				{
					// aktueller Punkt, (0 bis 7) --> Array der Eckpunkte, in Variable kopieren
					var localVertex = cube.geometry.vertices[vertexIndex].clone();
					// 
					var globalVertex = localVertex.applyMatrix4( cube.matrix );
					// Richtungsvektor, dessen Position
					var directionVector = globalVertex.sub( cube.position );
					
					// origin Point und normalisierter Richtungsvektor des Cubes
					var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
					// Kollisionen = Überschneidungen des Cubes mit collidableMeshList
					var collisionResults = ray.intersectObjects( collidableMeshList );
					// Wenn Kollisionslänge größer als 0 UND Kollisionsergebnis-Distanz an der Stelle 0 ist kleiner als Länge des Richtungsvektors
					if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
						// zeige vertexIndex an und gib ihn zurück
				        appendText(vertexIndex);
				        return vertexIndex;
					}
				}
			}

			function clearText(){   
				document.getElementById('message').innerHTML = '..........';   
			}

			function appendText(txt){   
				document.getElementById('message').innerHTML += txt;   
			}