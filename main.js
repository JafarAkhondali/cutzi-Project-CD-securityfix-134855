/*Die drei "Hauptobjekte" bereitstellen:*/
			var scene = new THREE.Scene();
			/*Parameter:(FOV, Aspect Ratio, near, far) */
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			
			document.addEventListener("keydown", onDocumentKeyDown, false); 
			
			/*Enthält alle vertices(Punkte) und faces des cubes,
			wird also für den cube benötigt!*/
			var geometry = new THREE.BoxGeometry(1,1,1);	
			/*Es gibt mehrere Materials in Three.js. 
			Alle Materials nehmen ein Objekt von Attributen entgegen. */
			var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); 
			/*Die Mesh nimmt eine Geometrie und fügt dieser das Material hinzu,
			welche dann in die Szene eingefügt werden kann und frei beweglich ist*/
			var cube = new THREE.Mesh(geometry, material);
			/*Wird default an (0,0,0) gesetzt*/
			scene.add(cube);
			
			
			
			/*Da die Kamera per Default auf (0,0,0) startet, verschieben wir sie ein wenig raus.*/
			camera.position.z = 7;
			camera.position.y = 1;
			
			/*Punktlicht*/
			var pointLight = new THREE.PointLight(0xFFFFFF);
			pointLight.position.x = 0;
			pointLight.position.y = 10;
			pointLight.position.z = 0;
			
			scene.add(pointLight);
			
			
			/*All die Anweisungen oben lassen aber noch nichts anzeigen,
			da er gerendert werden muss:*/
			/*Alles was bewegt oder verändert werden muss, muss durch diese Funktion laufen*/
			function render() {
				/*Diese Funktion bewirkt dass die Szene mit 60FPS gerendert wird.
				requestAnimation() hat übrigens viele Vorteile, einer davon ist, wenn 
				rausgetabbt wird, dann wird das Rendern pausiert und somit Leistung gespart.*/
				requestAnimationFrame(render);
				
				/*Animation - Rotation:*/
				//cube.rotation.x += 0.1;
				//cube.rotation.y += 0.1;
				renderer.render(scene,camera);
			}
			render();
			
			/*function onDocumentKeyDown(event){
				var keyCode = event.which;
				
				//up
				if(keyCode == 38){
					cube.translateZ(-0.1);
					camera.translateZ(-0.1);
				}
				
				//down
				if(keyCode == 40){
					cube.translateZ(0.1);
					camera.translateZ(0.1);
				}

				//left
				if(keyCode == 37){
					cube.translateX(-0.1);
					camera.translateX(-0.1);
				}
				
				//right
				if(keyCode == 39){
					cube.translateX(0.1);
					camera.translateX(0.1);
				}
			}*/