// Funktion um Items aufzusammeln
	function checkItem() {
		if ( cube.position.x == item.position.x && cube.position.z == item.position.z){
			alert("item aufgesammelt");
			scene.remove( item );
		}
}