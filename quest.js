//

function checkQuest() {
	var area = 10;
	var tabPosX = tabaluga.position.x;
	var tabPosZ = tabaluga.position.z;
	if (questTrue == false ) {
		if ( user.position.x <= (tabPosX+area) && user.position.x >= (tabPosX-area) 
		&& user.position.z <= (tabPosZ+area) && user.position.z >= (tabPosZ-area) )
		{
			startTabaluga()
			
			user.position.set(tabPosX, cubeSize/2, tabPosZ);
			var wayGeo = new THREE.BoxGeometry(50,1,50);
			var wayMat = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide });
			way = new THREE.Mesh( wayGeo, wayMat );
			scene.add( way );
			//1
			way.position.set(1050,10,-1200);
			//2 to right
			var way2 = way.clone();
			way2.position.set(way.position.x,way.position.y,way.position.z+50);
			scene.add( way2 );
			//3 up
			var way3 = way.clone();
			way3.position.set(way2.position.x+50,way2.position.y,way2.position.z);
			scene.add( way3 );
			//4 right
			var way4 = way.clone();
			way4.position.set(way3.position.x,way3.position.y,way3.position.z+50);
			scene.add( way4 );
			//5 up
			var way5 = way.clone();
			way5.position.set(way4.position.x+50,way4.position.y,way4.position.z);
			scene.add( way5 );
			//6 up
			var way6 = way.clone();
			way6.position.set(way5.position.x+50,way5.position.y,way5.position.z);
			scene.add( way6 );
			//7 left
			var way7 = way.clone();
			way7.position.set(way6.position.x,way6.position.y,way6.position.z-50);
			scene.add( way7 );
			//8 up
			var way8 = way.clone();
			way8.position.set(way7.position.x+50,way7.position.y,way7.position.z);
			scene.add( way8 );
			//9 up
			var way9 = way.clone();
			way9.position.set(way8.position.x+50,way8.position.y,way8.position.z);
			scene.add( way9 );
			//10 right
			var way10 = way.clone();
			way10.position.set(way9.position.x,way9.position.y,way9.position.z+50);
			scene.add( way10 );
			//11 right
			var way11 = way.clone();
			way11.position.set(way10.position.x,way10.position.y,way10.position.z+50);
			scene.add( way11 );
			//12 up
			var way12 = way.clone();
			way12.position.set(way11.position.x+50,way11.position.y,way11.position.z);
			scene.add( way12 );
			//13 up
			var way13 = way.clone();
			way13.position.set(way12.position.x+50,way12.position.y,way12.position.z);
			scene.add( way13 );
			//14 right
			var way14 = way.clone();
			way14.position.set(way13.position.x,way13.position.y,way13.position.z+50);
			scene.add( way14 );
			//15 up / finish
			var way15 = way.clone();
			way15.position.set(way14.position.x+50,way14.position.y,way14.position.z);
			scene.add( way15 );

			// check
			if ( user.position.x <= (way.position.x+area) && user.position.x >= (way.position.x-area) 
			&& user.position.z <= (way.position.z+area) && user.position.z >= (way.position.z-area) )
			{
				if ( user.position.x <= (way2.position.x+area) && user.position.x >= (way2.position.x-area) 
				&& user.position.z <= (way2.position.z+area) && user.position.z >= (way2.position.z-area) )
				{
					if ( user.position.x <= (way3.position.x+area) && user.position.x >= (way3.position.x-area) 
					&& user.position.z <= (way3.position.z+area) && user.position.z >= (way3.position.z-area) )
					{
						
					} else{
						fail();
					}
				} else{
					fail();
				}
			} else{
				fail();
			}
		//questTrue = true;
		}
	}

}

function fail()
{
	alert(" Das wars leider, du musst nochmal von vorne Anfangen" );
}

function startTabaluga()
{
	alert( "Los gehts, Steuerung mit w,a,s,d" );	
}
