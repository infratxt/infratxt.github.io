//Draw SVG of given height + width
var w = 500;
var h = 500;
var barHeight = 35;

var crimeData;
var boroughCrimes = [];


//Load json data into crimeData object
$.getJSON("data/CrimesByBorough.json", function(data){
	crimeData = data;
}); 
 

//0. Reset SVG
 function resetSVG(){
 	$(".graph").remove(); 	
 	$("#borough").remove();
 };

//1. Gets the borough name from the text of button, passes it to compileBorough function
$("button").click(function(event){
	var b = $(this).text(); 
	resetSVG();
	compileBoroughGraph(b);
	addTitle(b);
	drawGraph();
	
});

function addTitle(t){
		$("#buttons").after('<h2 id="borough">' + t + '</h2>');
	};

//2. Loop through all data, add borough-specific data to the boroughCrimes object
function compileBoroughGraph(borough) {
	var i = 0;
	$.each(crimeData, function (index, value) { //loop through crimeData object
		if(value.Borough === borough){
		boroughCrimes[i] = {Crime: value.CrimeType, Incidents: value.Incidents};
		i += 1;
		}
	}); 	
};

//3 Draw bars on the graph based on boroughCrimes properties

function drawGraph(){

$("#main").append('<svg class="graph"></svg>');

// First select SVG element with d3
var graph = d3.select(".graph")
        .attr("width", w)
        .attr("height", barHeight * boroughCrimes.length);

var x = d3.scale.linear()
    .domain([0, 500]) //Should add in Max function really...
    .range([0, w]);

	var bar = graph.selectAll("g")
    .data(boroughCrimes)
  	.enter()
  	.append("g")
  	.attr("transform", function(d, i) {
  	 	return "translate(0," + i * barHeight + ")"; 
  	});

  	bar.append("rect")
  		.attr("width", function(d) {
  			var count = d.Incidents;
  			return count;
  		})
  		.attr("height", barHeight - 1)
  		.attr("fill", "#FF6161")

  	bar.append("text")
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d){
		var txt = d.Crime;
		txt += ": "
		txt += d.Incidents;
		return txt;
    });

 };