	// Picking
	function clearTextMessage(){   
		document.getElementById('message').innerHTML = '';
	}

	function appendTextMessage(txt){
		document.getElementById('message').innerHTML += txt;
	}

	// HUD
	function clearTextHud(){   
		document.getElementById('hud').innerHTML = '';
	}

	function appendTextHud(){
		// document.getElementById('hud').innerHTML += txt;
		document.getElementById('hud').innerHTML = 'Red Riding Hood <br> ' + hpCounter + ' HP <br> ' + itemCounter + '/3 Items <br> score: ' + scoreBlumen;
	}

	// Gameinfo
	function clearTextIn(){   
		document.getElementById('control-info').innerHTML = '';
	}

	function appendTextIn(){
		clearTextIn();
		console.log(game_status);
		if (game_status == 1 || questTrue == true){
			document.getElementById('control-info').innerHTML += 'Steuerung:<ul> <li> W: Vor <li> A/D: Links/Rechts	<li>R: Exit	</ul>';
		} else {
			document.getElementById('control-info').innerHTML += 'Steuerung:<ul> <li> Up/Down arrow: Vor/Zurück <li> Left/Right arrow: Links/Rechts	</ul>'
		}	
	}