			// Funktion zur Steuerung
			function keyDownHandler(event) {
				var step = 5;
				var up = 0;
			// key left
				if ( event.keyCode === 37) {
					// if barrier -> stop
					cube.translateX( -step );
					cube.translateY( up );
					// camera moves
					camera.position.x += -step;
					camera.position.y += 0;
				}
			// key up
				else if( event.keyCode === 38 ) {
					cube.translateZ( -step );
					cube.translateY( up );
					camera.position.y += 0;
					camera.position.z += -step;
				} 
			// key right
				else if ( event.keyCode === 39 ) {
					cube.translateX( step );
					cube.translateY( up );
					camera.position.x += step;
					camera.position.y += 0;
				}
			// key down
				else if ( event.keyCode === 40 ) {
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
			}