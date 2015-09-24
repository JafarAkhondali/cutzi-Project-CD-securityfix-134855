// Funktion um Items aufzusammeln
	function checkItem() {
		// Apfel aufsammeln
		var area = 10;
		var vertexIndex = itemDetection();
		if ( apfelGet == false ) {
			var itemApfelX = itemApfel.position.x;
			var itemApfelZ = itemApfel.position.z;
			if ( user.position.x <= (itemApfelX+area) && user.position.x >= (itemApfelX-area) 
				&& user.position.z <= (itemApfelZ+area) && user.position.z >= (itemApfelZ-area) ){
				alert( "Apfel aufgesammelt" );
				scene.remove( itemApfel );
				apfelGet = true;
			}
		} 
		// Pilz aufsammeln
		if ( pilzGet == false ) {
			var itemPilzX = itemPilz.position.x;
			var itemPilzZ = itemPilz.position.z;
			if (user.position.x <= (itemPilzX+area) && user.position.x >= (itemPilzX-area) 
				&& user.position.z <= (itemPilzZ+area) && user.position.z >= (itemPilzZ-area) ) {
				alert( "Pilz aufgesammelt" );
				scene.remove( itemPilz );
				pilzGet = true;
			}
		}
		// Blumen aufsammeln
		if ( blumenGet == false ) {
			var itemBlumeX = itemBlume.position.x;
			var itemBlumeZ = itemBlume.position.z;	
			if ( user.position.x <= (itemBlumeX+area) && user.position.x >= (itemBlumeX-area) 
				&& user.position.z <= (itemBlumeZ+area) && user.position.z >= (itemBlumeZ-area) ) {
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