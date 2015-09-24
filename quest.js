//

function checkQuest() {
	var area = 50;
	var tabPosX = tabaluga.position.x;
	var tabPosZ = tabaluga.position.z;
	if (questFinish == false && questTrue == false ) 
	{				
		if ( user.position.x <= (tabPosX+area) && user.position.x >= (tabPosX-area) 
		&& user.position.z <= (tabPosZ+area) && user.position.z >= (tabPosZ-area) )
		{
			// camera top?
			initField();
			questTrue = true;
			// check

			var newDir = new THREE.Vector3(-1, 0, 0);
			var pos = new THREE.Vector3();
			pos.addVectors(newDir, user.position);
			user.lookAt(pos);

			user.position.setX(1000);
			user.position.setZ(-1200);
			console.log('los gehts');
			window.addEventListener( 'keydown', checkField, false);
			checkField();
		}
	}
}



function initField()
{
	var wayGeo = new THREE.BoxGeometry(50,1,50);
	var wayMat = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide });
	way = new THREE.Mesh( wayGeo, wayMat );
	scene.add( way );
	//1
	way.position.set(1050,10,-1200);
	//2 to right
	way2 = way.clone();
	way2.position.set(way.position.x,way.position.y,way.position.z+50);
	scene.add( way2 );
	//3 up
	way3 = way.clone();
	way3.position.set(way2.position.x+50,way2.position.y,way2.position.z);
	scene.add( way3 );
	//4 right
	way4 = way.clone();
	way4.position.set(way3.position.x,way3.position.y,way3.position.z+50);
	scene.add( way4 );
	//5 up
	way5 = way.clone();
	way5.position.set(way4.position.x+50,way4.position.y,way4.position.z);
	scene.add( way5 );
	//6 up
	way6 = way.clone();
	way6.position.set(way5.position.x+50,way5.position.y,way5.position.z);
	scene.add( way6 );
	//7 left
	way7 = way.clone();
	way7.position.set(way6.position.x,way6.position.y,way6.position.z-50);
	scene.add( way7 );
	//8 up
	way8 = way.clone();
	way8.position.set(way7.position.x+50,way7.position.y,way7.position.z);
	scene.add( way8 );
	//9 up
	way9 = way.clone();
	way9.position.set(way8.position.x+50,way8.position.y,way8.position.z);
	scene.add( way9 );
	//10 right
	way10 = way.clone();
	way10.position.set(way9.position.x,way9.position.y,way9.position.z+50);
	scene.add( way10 );
	//11 right
	way11 = way.clone();
	way11.position.set(way10.position.x,way10.position.y,way10.position.z+50);
	scene.add( way11 );
	//12 up
	way12 = way.clone();
	way12.position.set(way11.position.x+50,way11.position.y,way11.position.z);
	scene.add( way12 );
	//13 up
	way13 = way.clone();
	way13.position.set(way12.position.x+50,way12.position.y,way12.position.z);
	scene.add( way13 );
	//14 right
	way14 = way.clone();
	way14.position.set(way13.position.x,way13.position.y,way13.position.z+50);
	scene.add( way14 );
	//15 up / finish
	way15 = way.clone();
	way15.position.set(way14.position.x+50,way14.position.y,way14.position.z);
	scene.add( way15 );
}

function checkField(event)
{
	for (var i = 0; i < 15; i++ )
	{
		if (event.keyCode == dir[i])
		{
			console.log(dir[i]);
			return true;
		} else{
			console.log('du bist doof');
		}

	}
	// if (event.keyCode == 87 )
	// {
	// 	user.position.x += 50;
	// 	console.log(user.position.x);
	// 	if (event.keyCode == 68 )
	// 	{
	// 		user.position.z += 50;
	// 	}else{
	// 		console.log('wut');
	// 	}
	// }
	// else
	// {
	// 	console.log('dat wars');
	// 	questTrue = false;
	// }
}

