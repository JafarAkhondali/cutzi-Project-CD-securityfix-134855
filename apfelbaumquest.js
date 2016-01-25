var apfelbaumQuestActive = false;
var questDone = false;
var keyboardCounter = 0;
var MAXCOUNTER = 100;
var lastWasLeft = false;

var startFieldAQGeo, startFieldAQMat, startFieldAQMesh;

function initApfelbaumQuest(){
	startFieldAQGeo = new THREE.BoxGeometry(50 , 10, 50);
	startFieldAQMat = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
	startFieldAQMesh = new THREE.Mesh( startFieldAQGeo, startFieldAQMat );
	scene.add( startFieldAQMesh );
	startFieldAQMesh.position.set(1445, 2, 1263);
}

function startApfelbaumQuest(){
	if(!apfelbaumQuestActive){
		apfelbaumQuestActive = true;
		console.log("ApfelbaumQuest is activated!");
		clearTextMessage();  
		appendTextMessage("Schüttel den Apfelbaum (mit den Pfeilen nach link und rechts) <br> solange bis ein Apfel herunterfällt!");
		setTimeout(
			function() {
				clearTextMessage();
			}
		, 2000);
	}
}

function checkAQ(){
	if(keyboardCounter > MAXCOUNTER){
		finishQuest();
	}
}

function finishQuest(){
	apfelbaumQuestActive = false;
	questDone = true;
	initApfel();
	//itemCounter++;
	//text
}