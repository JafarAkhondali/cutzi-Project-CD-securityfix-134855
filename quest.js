function checkQuest() {
	var area = 50;
	var visibleFields = 0;
	var tabPosX = tabaluga.position.x;
	var tabPosZ = tabaluga.position.z;

	//check if quest has been finished and has not been started, position-check of user whether is allowed to start quest
	if (questTrue == false) {
		var newDir = new THREE.Vector3(-1, 0, 0);
		var pos = new THREE.Vector3();
		if (questFinish == false ) {
			//check user position
			if ( user.position.x <= (tabPosX+area) && user.position.x >= (tabPosX-area) && user.position.z <= (tabPosZ+area) && user.position.z >= (tabPosZ-area)) {
				//init quest
				addField();
				game_status = 1;
				appendTextIn();

				var visibleFields = initField();
				questTrue = true;

				pos.addVectors(newDir, user.position);
				user.lookAt(pos);

				user.position.setX(1000);
				user.position.setZ(-1200);

				
				// 8s waittime to start quest. after first round no waittime
				/*setTimeout(
					function() {
						if (keyUpAdded == false){
							window.addEventListener( 'keyup', function (event){ checkField(event) }, false);
							keyUpAdded = true;
						} else {
							checkField(event);
						}
					}
				, visibleFields);*/
				if (keyUpAdded == false){
					window.addEventListener( 'keyup', function (event){ checkField(event) }, false);
					keyUpAdded = true;
				} else {
					checkField(event);
				}

			}
		};
	}
}


// build successway
function initField() {
	var increaseTime = 500;
	var visibleTime = 1000;
	var wayGeo = new THREE.BoxGeometry(50,1,50);
	var wayMat = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide });
	
	way = new THREE.Mesh( wayGeo, wayMat );
	scene.add( way );
	arrWay.push( way );
	//1

	way.position.set(1050,10,-1200);
	//2 to right
	setTimeout(
		function() {
			way2 = way.clone();
			way2.position.set(way.position.x,way.position.y,way.position.z+50);
			scene.add( way2 );
			arrWay.push( way2 );
		}
	, visibleTime);

	visibleTime += increaseTime;

	//3 up
	setTimeout(
		function() {
			way3 = way.clone();
			way3.position.set(way2.position.x+50,way2.position.y,way2.position.z);
			scene.add( way3 );
			arrWay.push( way3 );
		}
	, visibleTime);

	visibleTime += increaseTime;

	//4 right
	setTimeout(
		function() {
			way4 = way.clone();
			way4.position.set(way3.position.x,way3.position.y,way3.position.z+50);
			scene.add( way4 );
			arrWay.push( way4 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//5 up
	setTimeout(
		function() {
			way5 = way.clone();
			way5.position.set(way4.position.x+50,way4.position.y,way4.position.z);
			scene.add( way5 );
			arrWay.push( way5 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//6 up
	setTimeout(
		function() {
			way6 = way.clone();
			way6.position.set(way5.position.x+50,way5.position.y,way5.position.z);
			scene.add( way6 );
			arrWay.push( way6 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//7 left
	setTimeout(
		function() {
			way7 = way.clone();
			way7.position.set(way6.position.x,way6.position.y,way6.position.z-50);
			scene.add( way7 );
			arrWay.push( way7 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//8 up
	setTimeout(
		function() {
			way8 = way.clone();
			way8.position.set(way7.position.x+50,way7.position.y,way7.position.z);
			scene.add( way8 );
			arrWay.push( way8 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//9 up
	setTimeout(
		function() {
			way9 = way.clone();
			way9.position.set(way8.position.x+50,way8.position.y,way8.position.z);
			scene.add( way9 );
			arrWay.push( way9 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//10 right
	setTimeout(
		function() {
			way10 = way.clone();
			way10.position.set(way9.position.x,way9.position.y,way9.position.z+50);
			scene.add( way10 );
			arrWay.push( way10 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//11 right
	setTimeout(
		function() {
			way11 = way.clone();
			way11.position.set(way10.position.x,way10.position.y,way10.position.z+50);
			scene.add( way11 );
			arrWay.push( way11 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//12 up
	setTimeout(
		function() {
			way12 = way.clone();
			way12.position.set(way11.position.x+50,way11.position.y,way11.position.z);
			scene.add( way12 );
			arrWay.push( way12 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//13 up
	setTimeout(
		function() {
			way13 = way.clone();
			way13.position.set(way12.position.x+50,way12.position.y,way12.position.z);
			scene.add( way13 );
			arrWay.push( way13 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//14 right
	setTimeout(
		function() {
			way14 = way.clone();
			way14.position.set(way13.position.x,way13.position.y,way13.position.z+50);
			scene.add( way14 );
			arrWay.push( way14 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//15 up / finish
	setTimeout(
		function() {
			way15 = way.clone();
			way15.position.set(way14.position.x+50,way14.position.y,way14.position.z);
			scene.add( way15 );
			arrWay.push( way15 );
		}
	, visibleTime);

	visibleTime += increaseTime;
	
	//after 2seconds
	setTimeout(
		function() {
			for (var i=0; i<arrWay.length; i++){
				scene.remove(arrWay[i]);
			}
		}
	, visibleTime);
	console.log(visibleTime);
	return visibleTime;
}

// check if right keyseries
checkField = function(event) {
	//console.log('cookie: '+cookie);
	//console.log('game_status: '+game_status);
	try{
		if (event.keyCode == 87 || event.keyCode == 68 || event.keyCode == 65) {
			if (game_status == 1 && questFinish == false) {
				//current position array = dir[cookie]
				if (dir[cookie] == event.keyCode) {
					
					//next positon correct
					if (event.keyCode == 87) {
						user.translateZ(-50);
					} else if (event.keyCode == 68){
						user.translateX(50);
					} else if (event.keyCode == 65){
						user.translateX(-50);
					}
					scene.add(arrWay[cookie]);
					/* .... bis 14 */
					
					if (cookie == 14) {
						//quest finished
						questFinish = true;
						scene.add(way15)
						clearTextMessage();
						appendTextMessage('You won! Now try to make some money or press "r" to resume to the open world.');
					};
					cookie = cookie + 1;
				} else {
					//next position error
					game_status = 0;
					hpCounter -= 10;
					clearTextHud();
					appendTextHud();
					clearTextMessage();
					appendTextMessage('Game over! Press "r" to resume to the open world.');
				};
			};
		}

		if (event.keyCode == 82) {
			// R - resume open world
			questTrue = false;
			cookie = 0;
			game_status = 0;
			clearTextHud();
			appendTextHud();
			clearTextMessage();
			appendTextIn();
		}
	} catch(e) {
		console.log('');
	}
};

// Build questfield
function addField(){
	for (var i=1; i <10; i++)
	{
		for (var j=0; j < 5; j++)
		{
			var fieldGeo = new THREE.BoxGeometry(50,1,50);
			var fieldMat = new THREE.MeshBasicMaterial( { color: 0x1D3008, side: THREE.DoubleSide, wireframe: true } );
			field = new THREE.Mesh ( fieldGeo, fieldMat );
			scene.add( field );
			field.position.set(tabaluga.position.x+50*i, tabaluga.position.y, tabaluga.position.z+50*j);
		}
	}
	for (var i=1; i <10; i++)
	{
		for (var j=0; j < 5; j++)
		{
			var fieldGeo = new THREE.BoxGeometry(50,1,50);
			var fieldMat = new THREE.MeshBasicMaterial( { color: 0x2D5206, side: THREE.DoubleSide, wireframe: false } );
			field = new THREE.Mesh ( fieldGeo, fieldMat );
			scene.add( field);
			field.position.set(tabaluga.position.x+50*i, tabaluga.position.y, tabaluga.position.z+50*j);
		}
	}
}
