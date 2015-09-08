			var camera, scene, renderer;
			var cube, itemApfel, itemPilz, itemBlume, tabaluga;
			var scoreBlumen = 0;
			var apfelGet = false;
			var pilzGet = false;
			var blumenGet = false;
			var collidableMeshList = [];
			var morphs = [];


			init();
			animate();


			function init() {
			// Scene
				scene = new THREE.Scene();


			// Camera
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				//camera.position.set(-1500, 100, 2000);
				camera.position.set(0, 100, 200);


			// Renderer
				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0xbfd1e5 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );


			// Events
				window.addEventListener( 'resize', onWindowResize, false );
				window.addEventListener( 'keydown', keyDownHandler, false);


			// Grid
				var size = 2000, step = 10;
				var geometry = new THREE.Geometry();
				var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
				for ( var i = - size; i <= size; i += step ) {

					geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
					geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

					geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
					geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );
				}
				var line = new THREE.Line( geometry, material, THREE.LinePieces );
				scene.add( line );


			// Tabaluga-Quest
				var tabaGeometry = new THREE.BoxGeometry(50,1,50);
				var tabaMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
				tabaluga = new THREE.Mesh( tabaGeometry, tabaMaterial );
				scene.add( tabaluga );
				tabaluga.position.set(1000,0,200);

			

				
			// Cube
				var cubeSize = 50;
				var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
				var material = new THREE.MeshPhongMaterial( { color:  'rgb(255,0,0)', emissive: 0x200000, wireframe:true } );

				cube = new THREE.Mesh( geometry, material);
				scene.add( cube );
				//cube.position.set(-1500, cubeSize/2, 1760);	
				cube.position.set(0, cubeSize/2, 0);

			// Light
				var light = new THREE.AmbientLight( 0x808080 );
				scene.add( light );


			// item Apfel
				var apfelSize = 30;
				var geometry2 = new THREE.BoxGeometry( apfelSize, apfelSize, apfelSize );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe:true } );
				itemApfel = new THREE.Mesh( geometry2, material2);
				scene.add( itemApfel );
				itemApfel.position.set(1120, apfelSize/2, 1800);


			// item Pilz
				var pilzSize = 15; 
				var geometry3 = new THREE.BoxGeometry( pilzSize, pilzSize, pilzSize );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material3 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
				itemPilz = new THREE.Mesh( geometry3, material3);
				scene.add( itemPilz );
				itemPilz.position.set(-1320, pilzSize/2, -1380);


			// item Blume
				var blumeSize = 25;
				var geometry4 = new THREE.BoxGeometry( blumeSize, blumeSize, blumeSize );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material4 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
				itemBlume = new THREE.Mesh( geometry4, material4);
				scene.add( itemBlume );
				itemBlume.position.set(-980, blumeSize/2, 1650);


			// Wall test				
				var wallGeometry = new THREE.CubeGeometry( 100, 100, 20, 1, 1, 1 );
				var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
				var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );
				
				var wall = new THREE.Mesh(wallGeometry, wallMaterial);
				wall.position.set(100, 50, -100);
				scene.add(wall);
				collidableMeshList.push(wall);
				var wall = new THREE.Mesh(wallGeometry, wireMaterial);
				wall.position.set(100, 50, -100);
				scene.add(wall);
				
				var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
				wall2.position.set(-150, 50, 0);
				wall2.rotation.y = 3.14159 / 2;
				scene.add(wall2);
				collidableMeshList.push(wall2);
				var wall2 = new THREE.Mesh(wallGeometry, wireMaterial);
				wall2.position.set(-150, 50, 0);
				wall2.rotation.y = 3.14159 / 2;
				scene.add(wall2);	


			// Tree - Blender-import
				var tree = null;
				
				var loader = new THREE.JSONLoader();
				loader.load('http://caro.x15.eu/baumbart.json', function(geometry) {
				    tree = new THREE.Mesh(geometry);
				    tree.scale.set( 20, 20, 20 );
				    tree.position.set( 150, 100, 20);
				    tree.translation = geometry.center(geometry);
				    collidableMeshList.push(tree);
				    scene.add(tree);
				});	
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate )

			// rotation item
				itemApfel.rotation.y += 0.01;
				itemPilz.rotation.y += 0.01;
				itemBlume.rotation.y += 0.01;

			// render-update
				renderer.render( scene, camera );

			}		

/* Chrome

Close all running Chrome instances first. The important word here is 'all'.

On Windows, you may check for Chrome instances using the Windows Task Manager. Alternatively, if you see a Chrome
 icon in the system tray, then you may open its context menu and click 'Exit'. This should close all Chrome instances.

Then start the Chrome executable with a command line flag:

chrome --allow-file-access-from-files
On Windows, probably the easiest is probably to create a special shortcut icon which has added the flag 
given above (right-click on shortcut -> properties -> target) */