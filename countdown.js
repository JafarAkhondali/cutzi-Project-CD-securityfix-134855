var timeexpired = false;

function countdown(time,id){
 
  //time brauchen wir später noch
  t = time;
 
  //Tage berechnen
  d = Math.floor(t/(60*60*24)) % 24; 
 
  // Stunden berechnen
  h = Math.floor(t/(60*60)) % 24;
 
 
  // Minuten berechnen
  // Sekunden durch 60 ergibt Minuten
  // Minuten gehen von 0-59
  //also Modulo 60 rechnen
  m = Math.floor(t/60) %60;
 
  // Sekunden berechnen
  s = t %60;
 
  //Zeiten formatieren
  d = (d >  0) ? d+"d ":"";
  h = (h < 10) ? "0"+h : h;
  m = (m < 10) ? "0"+m : m;
  s = (s < 10) ? "0"+s : s;
 
  // Ausgabestring generieren
  strZeit = m + ":" + s;
 
  // Falls der Countdown noch nicht zurückgezählt ist
  if(time > 0)
  {
    //Countdown-Funktion erneut aufrufen
    //diesmal mit einer Sekunde weniger
    window.setTimeout('countdown('+ --time+',\''+id+'\')',1000);
  }
  else
  {
    //führe eine funktion aus oder refresh die seite
    //dieser Teil hier wird genau einmal ausgeführt und zwar 
    //wenn die Zeit um ist.
	timeexpired = true;
    strZeit = "Zeit ist abgelaufen";
  }
  // Ausgabestring in Tag mit id="id" schreiben
  document.getElementById(id).innerHTML = strZeit;
}