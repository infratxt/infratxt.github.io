var switchOn = true;	

//For loop to draw (dots) number of divs with sequential integer IDs	
var dots = 120;
function draw() {
	for (x=1; x<=dots; x+=1) {
		document.getElementById("blackoutbox").innerHTML += '<div id="' + x + '" class="round grey"></div>';
	}
} 
draw();

function blackout() {
var html = ''; // Initialise blank html variable
var time = 750; //Time interval for drawing circles
var chance = 7; //Chance of black div out of 100
//Returns a number from 0-255 for rgb values
	function randomRGB() {
		return Math.floor(Math.random() * 256 );
	}

//If mathrandom*10 > chance return rgb div style, else return black div class
	function randomColorDiv () {	  
	  if ((Math.random() * 100) > chance) {
	  	var color = 'style="background-color:rgb(';
	  	  color += randomRGB() + ',';
		  color += randomRGB() + ',';
		  color += randomRGB() + ')"';
		  color += 'class="round"';	
		  	return color;
	  } else {
	  	return 'class="round black"';
	  }
	}

//Uses randomColor to draw a div
	function drawDiv() {
	  	return '<div ' + randomColorDiv() + '></div>';
		}

//For loop: find div with id 'i', check if html is not already 'class="black"', insert a colour div, increase i and repeat.
	function placeDiv() {
		for (var i=1; i<=dots; i+=1) {
			var isBlack = document.getElementById(i).innerHTML;
			if (isBlack!=='<div class="round black"></div>') {
			document.getElementById(i).innerHTML = drawDiv();
			}
		
}	}

//Run placeDivs on a timer (declared as a variable so clearInterval applies)	
	var changes = setInterval(placeDiv, time);
	if (switchOn!==true) {
	clearInterval(changes);
	}
}

//Reset function
function reset() {
	switchOn = false;
	document.getElementById("blackoutbox").innerHTML = "";
	draw();
	console.log(switchOn);
}