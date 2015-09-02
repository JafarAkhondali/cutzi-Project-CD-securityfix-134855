// Funktion um Items aufzusammeln
	function checkItem() {
		if ( apfelGet == false ) {
			if ( cube.position.x == itemApfel.position.x && cube.position.z == itemApfel.position.z ) {
				alert( "Apfel aufgesammelt" );
				scene.remove( itemApfel );
				apfelGet = true;
			}
		} 
		if ( pilzGet == false ) {
			if ( cube.position.x == itemPilz.position.x && cube.position.z == itemPilz.position.z ) {
				alert( "Pilz aufgesammelt" );
				scene.remove( itemPilz );
				pilzGet = true;
			}
		}
		if ( blumenGet == false ) {	
			if ( cube.position.x == itemBlume.position.x && cube.position.z == itemBlume.position.z ) {
				scoreBlumen += 10;
				alert( "Blume aufgesammelt. Aktueller Score: " + scoreBlumen );
				//scene.remove( itemBlume );			
			}	
		}
	}