---
layout: post
title:  "Proverb maker"
date:   2015-10-06 12:05:15
categories: experiments 50DaysOfCode
permalink:
---

<script src="/assets/js/proverbs.js">

</script>

The proverb you've just created was made with my first JavaScript programme!

The code that runs it is as follows:

	// Capture story elements
	var subject = prompt("Type in an animated thing, e.g. 'cat' or 'fire'");
	var adjective = prompt("Type an adjective");
	var verb = prompt("Type a verb e.g. 'hit'");
	var object = prompt("Type an object noun, e.g. 'brick'");
	var natObject = prompt("Type a natural object, e.g. 'lake'")

	alert("Ok, let's hear your proverb!");

	// Combine strings
	var line1 = "When the " + subject + " " + verb + "s the " + object + ",";
	var line2 = " the " + natObject + " will be " + adjective + ".";

	// Join and write to document
	var proverb = line1 + line2;
	document.write("<h2>"+proverb+"</h2>")

It may be simple, but I'm still excited about it. Being able to build and create interactive experiences for users is something I've wanted to do for a long time, and, though for now it's baby steps, I know that I'm heading in the right direction.

Feel free to tweet me your proverbs using the Twitter link below...
