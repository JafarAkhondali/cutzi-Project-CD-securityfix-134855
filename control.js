function onDocumentKeyDown(event){
	var keyCode = event.which;
				
	//up
	if(keyCode == 38){
		cube.translateZ(-0.1);
		//camera.translateZ(-0.1);
	}
				
	//down
	if(keyCode == 40){
		cube.translateZ(0.1);
		//camera.translateZ(0.1);
	}

	//left
	if(keyCode == 37){
		cube.translateX(-0.1);
		//camera.translateX(-0.1);
	}
				
	//right
	if(keyCode == 39){
		cube.translateX(0.1);
		//camera.translateX(0.1);
	}
}