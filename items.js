// Funktion um Items aufzusammeln
	function checkItem() {
		// Apfel aufsammeln
		var area = 10;
		//var vertexIndex = itemDetection();
		var itemApfel;
		var itemPilz;
		var itemBlume;
		if ( apfelGet == false ) {
			if (!!itemApfel) {
				itemApfelX = itemApfel.position.x;
				itemApfelZ = itemApfel.position.z;
				if ( user.position.x <= (itemApfelX+area) && user.position.x >= (itemApfelX-area) 
					&& user.position.z <= (itemApfelZ+area) && user.position.z >= (itemApfelZ-area) ){
					console.log( "Apfel aufgesammelt" );
					scene.remove( itemApfel );
					apfelGet = true;
				}
			}
		} 
		// Pilz aufsammeln
		if ( pilzGet == false ) {
			if (!!itemPilz) {
				itemPilzX = itemPilz.position.x;
				itemPilzZ = itemPilz.position.z;
				if (user.position.x <= (itemPilzX+area) && user.position.x >= (itemPilzX-area) 
					&& user.position.z <= (itemPilzZ+area) && user.position.z >= (itemPilzZ-area) ) {
					console.log( "Pilz aufgesammelt" );
					scene.remove( itemPilz );
					pilzGet = true;
				}
			};
		}
		// Blumen aufsammeln
		if ( blumenGet == false ) {
			if (!!itemBlume) {
				itemBlumeX = itemBlume.position.x;
				itemBlumeZ = itemBlume.position.z;	
				if ( user.position.x <= (itemBlumeX+area) && user.position.x >= (itemBlumeX-area) 
					&& user.position.z <= (itemBlumeZ+area) && user.position.z >= (itemBlumeZ-area) ) {
					scoreBlumen += 10;
					console.log( "Blume aufgesammelt. Aktueller Score: " + scoreBlumen );
					scene.remove( itemBlume );			
				}
			};
		}

		// random Blumen aufsammeln
		for (var i=0; i<blumen.length; i++)
		{
			if (user.position.x <= (blumen[i].position.x+area) && user.position.x >= (blumen[i].position.x-area) && user.position.z <= (blumen[i].position.z+area) && user.position.z >= (blumen[i].position.z-area) )
			{
				console.log(blumen.length);
				scene.remove(blumen[i]);
				blumen.splice(i);
				scoreBlumen +=10;
		 		console.log( 'Blume aufgesammelt, aktueller Score = ' + scoreBlumen );
			}
		}
		// if ( vertexIndex != null )
		// {
		// 	console.log(vertexIndex);
		// 	for (var i; i < blumen.length; i++ )
		// 		console.log(i);
		// 		scene.remove(blumen[i]);
		// }
		// for (var i=0; i < blumen.length; i++)
		// {
		// 	if (vertexIndex != null && blumen[i] != null && user.position.x <= (blumen[i].position.x+area) && user.position.x >= (blumen[i].position.x-area) && user.position.z <= (blumen[i].position.z+area) && user.position.z >= (blumen[i].position.z-area) )
		// 	{
		// 		console.log(blumen[i]);
		// 		scene.remove( blumen[i] );
		// 		blumen[i] = null;
		// 		scoreBlumen +=10;
		// 		console.log( 'Blume aufgesammelt, aktueller Score = ' + scoreBlumen );			
		//  	}
		// }
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
					var collisionResults = ray.intersectObjects( blumen );
					// Wenn Kollisionslänge größer als 0 UND Kollisionsergebnis-Distanz an der Stelle 0 ist kleiner als Länge des Richtungsvektors
					if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
						// zeige vertexIndex an und gib ihn zurück
				        //console.log(collisionResults);
				        return vertexIndex;
					}
				}
			}

			