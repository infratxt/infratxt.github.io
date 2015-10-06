// Capture story elements
var subject = prompt("Write an animated thing, e.g. 'cat' or 'fire'");
var adjective = prompt("Write an adjective");
var verb = prompt("Write a verb e.g. 'hit'");
var object = prompt("Write an object noun, e.g. 'brick'");
var natObject = prompt("Write a natural object, e.g. 'lake'")

alert("Ok, let's hear your proverb!");

// Combine strings
var line1 = "When the " + subject + " " + verb + "s the " + object + ",";
var line2 = " the " + natObject + " will be " + adjective + ".";

// Join and write to document
var proverb = line1 + line2;
document.write("<h2>"+proverb+"</h2>")

