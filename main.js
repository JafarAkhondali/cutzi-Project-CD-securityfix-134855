			var camera, scene, renderer;
			var cube, itemApfel, itemPilz, itemBlume;
			var scoreBlumen = 0;
			var apfelGet = false;
			var pilzGet = false;
			var blumenGet = false;


			init();
			animate();


			function init() {
			// Scene
				scene = new THREE.Scene();


			// Camera
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;
				camera.position.y = 200;
				camera.rotation.x += 50;


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
				var size = 500, step = 10;
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


			// Cube
				var geometry = new THREE.BoxGeometry( 100, 100, 100 );
				var material = new THREE.MeshPhongMaterial( { color:  'rgb(255,0,0)', emissive: 0x200000, wireframe:true } );

				cube = new THREE.Mesh( geometry, material);
				scene.add( cube );
				cube.position.set(0, 100/2, 0);	
				

			// Light
				var light = new THREE.AmbientLight( 0x808080 );
				scene.add( light );


			// item Apfel
				var geometry2 = new THREE.BoxGeometry( 50, 50, 50 );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe:true } );
				itemApfel = new THREE.Mesh( geometry2, material2);
				scene.add( itemApfel );
				itemApfel.position.set(100, 50/2, 0);


			// item Pilz
				var geometry3 = new THREE.BoxGeometry( 50, 50, 50 );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material3 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
				itemPilz = new THREE.Mesh( geometry3, material3);
				scene.add( itemPilz );
				itemPilz.position.set(-200, 50/2, 0);


			// item Blume
				var geometry4 = new THREE.BoxGeometry( 50, 50, 50 );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material4 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
				itemBlume = new THREE.Mesh( geometry4, material4);
				scene.add( itemBlume );
				itemBlume.position.set(0, 50/2, 100);	
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

			// render-update
				renderer.render( scene, camera );

			}		