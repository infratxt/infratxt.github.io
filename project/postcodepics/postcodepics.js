$(document).ready(function() {
	//1. Retreive postcode value from input
	var myPostcode;

	$('form').submit(function(evt){
		evt.preventDefault();
		myPostcode = $('#search').val().toUpperCase();	

	//2. Pass value into JSON call to Postcode.io
	var URL = "http://api.postcodes.io/postcodes";
	var details ={
		q: myPostcode, //'q' is the postcode.io query identifier
	};	
		function showPostcode(d){
			if (d.result !== null) {
				var postcodeData = d.result[0]; //This is an object containing all returned details
				$('#errorMessage').hide();
				$('#yourPostcode').html(myPostcode);
				$('#yourRegion').html(postcodeData.region);
				$('#yourDistrict').html(postcodeData.admin_district);
				//call function to set max and min coordinates based on postcode
				modCoordinates(postcodeData.latitude, postcodeData.longitude);	
			} else {
				$('#errorMessage').show();
			};
		}; //End showPostcode

	$.getJSON(URL, details, showPostcode);
	}); //End submit function
}); //End document ready

//3.1 Extend lat and long into a square around postcode
var minx, miny, maxx, maxy;
function modCoordinates(lat, lon){
	console.log("Ready to display pictures at: " + lat + " / " + lon);
	 //(I took this from: http://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters)
	 //Earth’s radius, sphere
	 var R=6378137;
	 var Pi=3.141592653589;
	 //Offsets in meters
	 var dn = 500;
	 var de = 500;
	 //Coordinate offsets in radians
	 var dLat = dn/R;
	 var dLon = de/(R * Math.cos(Pi * lat/180));
	 //OffsetPosition, decimal degrees
	 maxy = lat + dLat * 180/Pi;
	 maxx = lon + dLon * 180/Pi;
	 miny = lat - dLat * 180/Pi;
	 minx = lon - dLon * 180/Pi;

	 console.log("Surrounding area coordinates:");
	 console.log(maxx + " / " + maxy + " ; " + minx + " / " + miny);
	 getPics();
}

//3.2 Use updated lat/long values in JSON call to Panoramio
 function getPics(){
	$.ajax({
		  method: "GET",
		  url: "http://www.panoramio.com/map/get_panoramas.php",
		  dataType: "jsonp",
		  jsonpCallback: 'displayPhotos',
		  //To get this to work, I removed '?jsoncallback=?' from URL and added
		  //a named function here as the specified jsonpCallback option
		  async: false,
		  data: {
			order: "popularity",
			set: "public",
			from: 0,
			to: 30,
			minx: minx,
			miny: miny,
			maxx: maxx,
			maxy: maxy,
			size: "medium"
			},
		  error: function(xhr,status,error) {
		  	console.log("AJAX failed: " + status + " - " + error);
		  }					 
	})
}

//4. Display photos
function displayPhotos(data){	
	console.log(data);
	$('#pictures').remove();
	$('.wrapper').append('<div id="pictures"></div>');
	$.each(data.photos, function(i, value){
		var picture = '<a href="' + value.photo_file_url + '">';
		picture +='<img src="' + value.photo_file_url + '"';
		picture += ' alt="' + value.photo_title + '"></img></a>';		
		$('#pictures').append(picture);
	})	
}





