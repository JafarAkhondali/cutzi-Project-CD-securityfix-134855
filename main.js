			var camera, scene, renderer;
			var cube, itemApfel, itemPilz, itemBlume, tabaluga, field, way;
			var questTrue = false;
			var scoreBlumen = 0;
			var apfelGet = false;
			var pilzGet = false;
			var blumenGet = false;
			var collidableMeshList = [];
			var itemList = [];
			var clock = new THREE.Clock();
			var backgroundColor = 0xbfd1e5;
			var keyboard = new THREEx.KeyboardState();
			var loader = new THREE.JSONLoader();



			init();
			initTrees();
			initBlumen();
			initItems();
			initQuest();
			animate();


			function init() {
			// Scene
				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( backgroundColor, 0.0025 );



			// Camera
				var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
				var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 50, FAR = 20000;
				camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
				scene.add(camera);
				camera.position.set(0,150,400);
				camera.lookAt(scene.position);	


			// Renderer
				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( backgroundColor );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );


			// Events
				window.addEventListener( 'resize', onWindowResize, false );
				//window.addEventListener( 'keydown', keyDownHandler, false);


			// Floor
				var planeGeo = new THREE.PlaneBufferGeometry(4000, 4000, 100, 100);
				var planTex  = new THREE.ImageUtils.loadTexture("grass.jpg");
				var planeMat = new THREE.MeshPhongMaterial( {color: 0x198c19, side: THREE.DoubleSide}); 
				//var planeMat = new THREE.MeshPhongMaterial({ map:planeTex, side:THREE.DoubleSide });
				
				//new begin
				var vertices = planeGeo.attributes.position.array;
				for( var i = -1; i < vertices.length; i += 3) {
					vertices[i] = Math.random() * (10 - 1) + 1;
					//console.log(vertices[i]);
					//console.log(vertices.length);
				}
				planeGeo.computeVertexNormals();
				//new end
			
				var plane = new THREE.Mesh( planeGeo, planeMat );
				plane.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2) );
				//plane.position.y = -80;
				scene.add( plane );
			


			

				
			// User
				var cubeSize = 35;
				var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
				var material = new THREE.MeshLambertMaterial( { color:  'rgb(255,0,0)', emissive: 0x200000, wireframe:false } );

				user = new THREE.Mesh( geometry, material);
				user.position.set(1000, cubeSize/2, -1000)
				scene.add( user );
				//user.position.set(-1500, cubeSize/2, 1760);	
				//user.position.set(-1280, cubeSize/2, -1400);


			// Light
				//var lightA = new THREE.AmbientLight( 0x808080 );
				//scene.add( lightA );

				var lightH = new THREE.HemisphereLight( 0xFFEF32, 0x674C1E, 0.21 );
				scene.add( lightH );


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
				
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate )

			// rotation item
				itemApfel.rotateY(0.05);
				//itemPilz.rotateY(0.05);
				//itemPilz.rotateZ(0.005);
				itemBlume.rotateY(0.05);

			// render-update
				renderer.render( scene, camera );

				update();

			}		


			function initTrees() 
			{
				var tree = null;
				// init loading
				loader.load( 'http://caro.x15.eu/baum.json', function( geometry ) 
				{
					
					var material = new THREE.MeshLambertMaterial( {color: 0x1f5c35} );
						for ( var i = 0; i < 400; i ++ ) 
						{

							// random placement in a grid
							var x = Math.random() * 4000 - 2000;
							var z = Math.random() * 4000 - 2000;

							if ( Math.abs( x ) < 200 && Math.abs( z ) < 100 ) continue;

							tree = new THREE.Mesh( geometry, material );

							var s = THREE.Math.randFloat( 10, 20 );
							tree.scale.set( s, s, s );

							tree.position.set( x, 0, z );
							tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

							tree.matrixAutoUpdate = false;
							tree.updateMatrix();

							scene.add( tree );

							collidableMeshList.push( tree );

						}
					
				});
			}

			// Blumen für die Umgebung
			function initBlumen() 
			{
				var blumen = null;
				
				// init loading
				loader.load( 'http://caro.x15.eu/blume.json', function( geometry ) 
				{
					
					var material = new THREE.MeshLambertMaterial( {color: 0xE065D8} );
						for ( var i = 0; i < 400; i ++ ) 
						{

							// random placement in a grid
							var x = Math.random() * 4000 - 2000;
							var z = Math.random() * 4000 - 2000;

							if ( Math.abs( x ) < 200 && Math.abs( z ) < 100 ) continue;

							blumen = new THREE.Mesh( geometry, material );

							var s = THREE.Math.randFloat( 1.5, 2.5 );
							blumen.scale.set( s, s, s );

							blumen.position.set( x, 5, z );
							blumen.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );

							blumen.matrixAutoUpdate = false;
							blumen.updateMatrix();

							scene.add( blumen );

						}
					
				});
			}

			// Items
			function initItems()
			{
				// item Apfel
				var apfelSize = 30;
				var geometry2 = new THREE.BoxGeometry( apfelSize, apfelSize, apfelSize );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe:true } );
				itemApfel = new THREE.Mesh( geometry2, material2);
				scene.add( itemApfel );
				itemApfel.position.set(1120, apfelSize/2, 1800);
				itemList.push(itemApfel);

				itemPilz = null;
				// init loading
				loader.load( 'http://caro.x15.eu/pilz.json', function( geometry ) 
				{
					var material = new THREE.MeshLambertMaterial( {color: 0x846E9C} );
					itemPilz = new THREE.Mesh( geometry, material );
					itemPilz.scale.set( 3, 3, 3 );
					itemPilz.position.set( -1320, 10, -1380 );
					scene.add( itemPilz );
					itemList.push( itemPilz );
				});


			// item Blume
				var blumeSize = 25;
				var geometry4 = new THREE.BoxGeometry( blumeSize, blumeSize, blumeSize );
				//var material = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
				var material4 = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
				itemBlume = new THREE.Mesh( geometry4, material4);
				scene.add( itemBlume );
				itemBlume.position.set(-980, blumeSize/2, 1650);
				itemList.push(itemBlume);
			}

			// TabalugaQuest
			function initQuest()
			{
				// Tabaluga-Quest
				var tabaGeometry = new THREE.BoxGeometry(50,1,50);
				var tabaMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
				tabaluga = new THREE.Mesh( tabaGeometry, tabaMaterial );
				scene.add( tabaluga );
				tabaluga.position.set(1000,10,-1200);
				for (var i=0; i <10; i++)
				{
					for (var j=0; j < 5; j++)
					{
						var fieldGeo = new THREE.BoxGeometry(50,1,50);
						var fieldMat = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide, wireframe: true } );
						field = new THREE.Mesh ( fieldGeo, fieldMat );
						scene.add( field );
						field.position.set(tabaluga.position.x+50*i, tabaluga.position.y, tabaluga.position.z+50*j)
					}
				}
				
			}
/* Chrome

Close all running Chrome instances first. The important word here is 'all'.

On Windows, you may check for Chrome instances using the Windows Task Manager. Alternatively, if you see a Chrome
 icon in the system tray, then you may open its context menu and click 'Exit'. This should close all Chrome instances.

Then start the Chrome executable with a command line flag:

chrome --allow-file-access-from-files
On Windows, probably the easiest is probably to create a special shortcut icon which has added the flag 
given above (right-click on shortcut -> properties -> target) */