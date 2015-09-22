// Funktion um Items aufzusammeln
	function checkItem() {
		// Apfel aufsammeln
		var vertexIndex = itemDetection();
		if ( apfelGet == false ) {
			if ( user.position.x == itemApfel.position.x && user.position.z == itemApfel.position.z ) {
				alert( "Apfel aufgesammelt" );
				scene.remove( itemApfel );
				apfelGet = true;
			}
		} 
		// Pilz aufsammeln
		if ( pilzGet == false ) {
			if ( user.position.x == itemPilz.position.x && user.position.z == itemPilz.position.z ) {
				alert( "Pilz aufgesammelt" );
				scene.remove( itemPilz );
				pilzGet = true;
			}
		}
		// Blumen aufsammeln
		if ( blumenGet == false ) {	
			if ( user.position.x == itemBlume.position.x && user.position.z == itemBlume.position.z ) {
				scoreBlumen += 10;
				alert( "Blume aufgesammelt. Aktueller Score: " + scoreBlumen );
				//scene.remove( itemBlume );			
			}	
		}
	}

				function itemDetection(){
				// Cube Position in originPoint kopiert
				var originPoint = user.position.clone();
				clearText();

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
					var collisionResults = ray.intersectObjects( itemList );
					// Wenn Kollisionslänge größer als 0 UND Kollisionsergebnis-Distanz an der Stelle 0 ist kleiner als Länge des Richtungsvektors
					if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
						// zeige vertexIndex an und gib ihn zurück
				        //console.log(collisionResults);
				        appendText(vertexIndex);
				        return vertexIndex;
					}
				}
			}