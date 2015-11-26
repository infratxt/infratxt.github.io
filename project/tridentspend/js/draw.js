
//initialise variables
var all_costs, healthCost, edCost, welfCost, houseCost, tranCost;

// wrap up d3plus draw function
function drawTree(dataset) {
  var visualization = d3plus.viz()
  .container("#viz")  // container div to hold the visualization
  .data(dataset)  // data to use with the visualization
  .type("tree_map")   // visualization type
  .id("name")         // key for which data is unique on
  .size("spending")      // sizing of blocks
  .attrs(attributes)
  .color("hex")
  .draw()             // draw the visualization!
}

//Set colours
var attributes = [
    {"name": "Healthcare", "hex": "#9C4192"},
    {"name": "Education", "hex": "#9EE87C"},
    {"name": "Housing", "hex": "#7D5142"},
    {"name": "Welfare", "hex": "#6BB7E8"},
    {"name": "Transport + Infrastructure", "hex": "#555D70"} 
    ]


$('#draw').click(function() {
  drawTree(all_costs);
  //List out total spend from all_costs in <li>
  var html = "";  
  $.each(all_costs, function(i, value) {  
    html += "<li>£" + all_costs[i].spending / 1e+9 + " billion to <b>" + all_costs[i].name + "</b>.</li>";
  });  
  $('#youspent ul').html(html);
  $('#youspent').removeClass("hidden");
});
    

//When a slider changes, get values from each sliders and update array
$('#healthcare').on("change", function(){
    healthCost = parseInt( $(this).val() );
    $(this).prev().html(" " + healthCost +"%");
    checkTotal();
});
$('#education').on("change", function(){
    edCost = parseInt( $(this).val() );
    $(this).prev().html(" " + edCost + "%");
    checkTotal();
});
$('#welfare').on("change", function(){
    welfCost = parseInt( $(this).val() );
    $(this).prev().html(" " + welfCost + "%");
    checkTotal();
});
$('#housing').on("change", function(){
    houseCost = parseInt( $(this).val() );
    $(this).prev().html(" " + houseCost + "%");
    checkTotal();
});
$('#transport').on("change", function(){
    tranCost = parseInt( $(this).val() );
    $(this).prev().html(" " + tranCost + "%");
    checkTotal();
});

//Gets value of all inputs, subtracts difference from all unfocused inputs if total > 100
function checkTotal(){
  var total = healthCost + edCost + welfCost + houseCost + tranCost; 
  if (total >100) {
    var diff = (total - 100) / 4; //Divide by number of total inputs - 1

    $("input").each(function(){
      if ($(this).is(":focus")){
        //Do nothing to the focused input
      } else {
        var newVal = $(this).val() - diff;
        $(this).val(newVal); //Set new value for input
        $(this).prev().html(" " + Math.floor(newVal) + "%");
      }
    });//End each
    updateCosts();

  } else {
    updateCosts();
  }
}

//Sets data array to the latest input values
function updateCosts (){  
  all_costs = [
      {"spending": healthCost * 6e+7, "name": "Healthcare"},
      {"spending": edCost * 6e+7, "name": "Education"},
      {"spending": welfCost * 6e+7, "name": "Welfare"},
      {"spending": houseCost * 6e+7, "name": "Housing"},
      {"spending": tranCost * 6e+7, "name": "Transport + Infrastructure"}
    ]
}
