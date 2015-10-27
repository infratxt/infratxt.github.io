---
layout: post
title:  "Last Week's Work: Dark Rap"
date:   2015-10-27 11:55:15
categories: update
permalink:
---


At the end of last week, I built two interactive pages based around modifying text in different ways.

The first was the [_Dark Rap Generator_][DR], a project for rap entertainment brand [Don't Flop][DF], and the second was [_Words In Chalk_][WC], a simple text animation of a short poem by Hibaq Osman. (Full interactivity for the latter only works on desktop). 

Both of them were quick to put together and fun to make, and let me play around with a few different JavaScript techniques in the process; for now I'm going to talk about the first.


### Dark Rap Generator
The idea behind the Dark Rap Generator comes from what I guess you could call a 'performance meme' within the Don't Flop rap battle league. 

It would take longer than it's worth to explain in context, but it began with the phrase *"I'm rapping it darker"*, and evolved into an in-joke where various rappers in the league would start verses with a line that was constructed <em>"I'm (<b>verb</b>)ing it (<b>adverb</b>)."</em>

For an example, see **11m00 onwards** in the video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Rkw0P2ijYdc?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

So, the project brief - thought up in a pub with [my brother][FDF], who also happens to be the founder of Don't Flop - was to make a random phrase generator that fans could use to create something in the same format.

<div style="text-align: center;margin-bottom:10px;"> <b>* * *</b> </div>

The most encouraging thing for me was how easy I found it was to do this, when just a few weeks ago it would have been at the edge of my ability.

When broken down, the basic process I identified was: 

1. Populate two lists of words and store them in arrays
2. When a button was clicked, use a random function to select an index number from each array
3. return the corresponding items and print them inside designated HTML elements

And when properly written out and tested, it looked like:

### darkrap.js

{% highlight javascript %}

//1. Populate list of verbs and adverbs
var verbList = [
	"rapping", "speaking", "rhyming", etc..];
	
var adverbList = [
	"dark", "darker", "hard", etc...];
	
//2. Use math.random and array.length to select random item
	function darkRap() {
	var verb = verbList[Math.floor((Math.random() * verbList.length))];
	var adverb = adverbList[Math.floor((Math.random() * adverbList.length))];

//3. Place items into #verb and #adverb span
	document.getElementById('verb').innerHTML = verb;
	document.getElementById('adverb').innerHTML = adverb;
}

{% endhighlight %}

The html on the corresponding page was also simple: two text spans with the id "verb" and "adverb" and a button which called the darkRap function.

### darkrap.html
{% highlight html %}
<div>

 <h1>Dark rap generator:</h1>
 
	<div id="darkrap">
	  <p>I'm <span id="verb"></span> it <span id="adverb"></span>.</p>
	</div>			
	
	<button type="button" class="btn-lg" onclick="darkRap()">Rap it...</button>
	
	Click button to rap it dark.
</div>
{% endhighlight %}

I styled the page using [Bootstrap][BS], then added some custom images and CSS for an appropriate visual tone. 

It was launched at around midday on Friday 23rd October, and got more than a thousand unique visitors *per day* across that weekend.

### Lessons:

1. It's not about **complexity**, it's about **concept**. The code was simple, but the finished product looked good, worked well, and most importantly was fun to use.
2. **Mobile-first design is important**. Nearly two-thirds of page hits were from mobile devices rather than desktop, but using Bootstrap and responsive design meant that it still looked good on a small screen.
3. Working with bigger brands will **get you traffic**. Without promotion from Don't Flop there's no way so many people would have visited the site.

Overall, the project was fun for me to work on, and I could imagine building some more rap word games in future.

> *Try out the Dark Rap Generator for youself:  [infratxt.co/darkrap](http://www.infratxt.co/darkrap)*

[DR]: http://www.infratxt.co/darkrap
[DF]: http://www.dontflop.com/
[WC]: http://www.infratxt.co/wordsinchalk
[FDF]:https://twitter.com/twitteurgh
[BS]: http://getbootstrap.com/
