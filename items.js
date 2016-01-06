// Funktion um Items aufzusammeln
	function checkItem() {
		// Apfel aufsammeln
		var area = 10;
		//var vertexIndex = itemDetection();
		
		if ( apfelGet == false ) {
			//if (!!itemApfel) {
				itemApfelX = itemApfel.position.x;
				itemApfelZ = itemApfel.position.z;
				if ( user.position.x <= (itemApfelX+area) && user.position.x >= (itemApfelX-area) 
					&& user.position.z <= (itemApfelZ+area) && user.position.z >= (itemApfelZ-area) ){
					scene.remove( itemApfel );
					itemCounter+=1;
					appendTextMessage('Apfel wurde aufgesammelt.' );
					setTimeout(
						function() {
							clearTextMessage();
						}
					, 5000);
					clearTextHud();
					appendTextHud();
					apfelGet = true;
				}
			//}
		} 
		// Pilz aufsammeln
		if ( pilzGet == false ) {
			//if (!!itemPilz) {
				itemPilzX = itemPilz.position.x;
				itemPilzZ = itemPilz.position.z;
				if (user.position.x <= (itemPilzX+area) && user.position.x >= (itemPilzX-area) 
					&& user.position.z <= (itemPilzZ+area) && user.position.z >= (itemPilzZ-area) ) {
					scene.remove( itemPilz );
					itemCounter+=1;
					clearTextMessage();
					appendTextMessage('Pilz wurde aufgesammelt.' );
					setTimeout(
						function() {
							clearTextMessage();
						}
					, 5000);
					clearTextHud();
					appendTextHud();
					pilzGet = true;
				}
			//}
		}
		// Blumen aufsammeln
		if ( blumenGet == false ) {
			//if (!!itemBlume) {
				itemBlumeX = itemBlume.position.x;
				itemBlumeZ = itemBlume.position.z;	
				if ( user.position.x <= (itemBlumeX+area) && user.position.x >= (itemBlumeX-area) 
					&& user.position.z <= (itemBlumeZ+area) && user.position.z >= (itemBlumeZ-area) ) {
					scoreBlumen += 100;
					scene.remove( itemBlume );
					itemCounter+=1;
					clearTextMessage();
					appendTextMessage('Blume wurde aufgesammelt. Aktueller Score = ' + scoreBlumen );
					setTimeout(
						function() {
							clearTextMessage();
						}
					, 5000);
					
					clearTextHud();
					appendTextHud();
					blumenGet = true;		
				}
			//}
		}

		// random Blumen aufsammeln
		for (var i=0; i<blumen.length; i++)
		{
			if (user.position.x <= (blumen[i].position.x+area) && user.position.x >= (blumen[i].position.x-area) && user.position.z <= (blumen[i].position.z+area) && user.position.z >= (blumen[i].position.z-area) )
			{
				scene.remove(blumen[i]);
				
				blumen.splice(i, 1);
				scoreBlumen +=10;
				clearTextHud();
				appendTextHud();
			}
		}
	}
	
/* 
function itemDetection(){
	// Cube Position in originPoint kopiert
	var originPoint = user.position.clone();
	clearTextMessage();
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
		// Kollisionen = Überschneidungen des Cubes mit blumenliste
		var collisionResults = ray.intersectObjects( blumen );
		// Wenn Kollisionslänge größer als 0 UND Kollisionsergebnis-Distanz an der Stelle 0 ist kleiner als Länge des Richtungsvektors
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
			// zeige vertexIndex an und gib ihn zurück
			//console.log(collisionResults);
			return vertexIndex;
		}
	}
}
*/