function fadeVerse() {
//Fade in letters at increasing rate, then fade out
$("#line1").hide().fadeIn(3000).fadeTo( 2500, 0.01 );
$("#line2").hide().fadeIn(6000).fadeTo( 3000, 0.01 );
$("#line3").hide().fadeIn(8000).fadeTo( 3000, 0.01 );
$("#line4").hide().fadeIn(9000).fadeTo( 3000, 0.01 );
$("#line5").hide().fadeIn(11000).fadeTo( 3000, 0.01 );
$("#line6").hide().fadeIn(11000);
};
fadeVerse();

//Fade in box
$( ".target" ).hide().delay( 15000 ).fadeIn(1500);

$( "#line6" ).draggable();
$( ".target" ).droppable({
		drop: function() {
    		iAmHere();
  		}
    });

function iAmHere() {
	console.log("I Am Here.");
	$ (".wrapper").fadeTo( 5000, 0.01 );
};
