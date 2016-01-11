---
layout: post
title:  "My First Dataviz"
date:   2015-11-10 15:58:00
categories: experiments 50DaysOfCode
permalink:
---

Last weekend I went to my first [MozFest][MF], a three-day conference/festival/expo run by the Mozilla foundation.

Personally, I was excited to see that one whole floor of the Ravensbourne media campus was devoted specifically to journalism projects, so I ended up spending a lot of my time there.

All of the sessions I attended were interesting, but on a practical level the most useful to me was a [practical demonstration of D3][D3] by Knight-Mozilla Fellow [Juan Elosua][JE], and a guided introduction to some basic data journalism techniques by [Samantha Sunne][SS].

I was really keen to try out some of what I'd picked up with real-life data, and just about as soon as I got back in front of my computer I started experimenting with some of the techniqes I'd learned. After the best part of a day learning, exploring, testing and tweaking, I finally came up with...my first data visualisation:

> View: [Crime Data by London Borough.][CLB]

(NB, styling doesn't work properly on mobile.)

<div style="text-align: center;margin-bottom:10px;"> <b>* * *</b> </div>

Although it seems fairly basic, it still took quite a few steps to piece together, so here's a short overview:


### 1. Get the data

I wanted to work with real data rather than just generate random values to visualise, so I visited the [UK Police open data site][UKP] and downloaded the most recent (September '15) crime data from the Metropolitan Police Service.

With the Met covering so many areas, this amounted to a spreadsheet with well over one thousand rows, and a total of over a million data points. Not exactly easy to scan through at a glance.

### 2. Clean the data

This is where the techniques from Samantha's workshop came in. To extract the information I was looking for - the number of reported crimes in each borough - required a two step process.

![Crime data](/images/crimedata1.png)

In the spreadsheet, each separate incident had its own row but there were no overall totals. To find these, I created a [pivot table][PT], and used the *count* function to find the total number of entries for given criteria.

![Crime data 2](/images/crimedata2.png)

But because of how the areas were labelled - each borough was divided into many smaller units identified with a four digit code - the summarized data was still thousands of rows long.

To get around this, I created a new column in the original spreadsheet, and filled it by using a formula which copied the previous column, but shifted off the last four characters: `=LEFT(I2, LEN(I2)-4)`

(This means, take characters starting from the left of cell I2, with a length equal to the contents of cell I2 - 4).

![Crime data 3](/images/crimedata3.png)

After a bit more manipulation of the data, this allowed me to create a pivot table with borough-wide totals for each type of crime.

### 3. Export the data

I now had all of the data I wanted to visualise in spreadsheet form, but in order to work with it in JavaScript, ideally I wanted it to be in JSON format. Thankfully, I found this super useful [CSV or tab to JSON converter][CSV] online, and transformed it into one large JSON file.

![Crime data JSON](/images/crimedata4.png)

### 4. Present the data

This should really be a blog post in its own right, but I'm going to take the easy way out and just post a few short pieces of code by way of explanation.

In a nutshell, in order to go from data for all of London to data for just one borough, first I used a [jQuery.each() function](http://api.jquery.com/jquery.each/) to loop through each value of the complete dataset (stored in an object called *crimeData*), and compile only the data which matched the selected borough into a new object called *boroughCrimes*.


{% highlight javascript %}

function compileBoroughGraph(borough) {
  var i = 0;
  $.each(crimeData, function (index, value) {
	if(value.Borough === borough){
		boroughCrimes[i] = {Crime: value.CrimeType, Incidents: value.Incidents};
		i += 1;
	}
  }); 	
};

{% endhighlight %}

With all of the data I wanted in one object, I used what I'd learned in the Mozilla demonstration, along with a step-by-step [tutorial from D3 inventor Mike Bostock][MD3], to dynamically draw rectangles with a size corresponding to the number of incidents of each type.

Voilà, my first dataviz!

![Crime data Hackney](/images/crimedata5.png)

*(If you're interested in seeing the full code for the project and the source JSON, you can [view it on GitHub][GH].)*


[MF]: https://2015.mozillafestival.org/
[D3]: http://www.juanelosua.com/presentations/2015/20151107-mozfest-d3/#/
[CLB]: http://www.infratxt.co/project/crimedata
[UKP]: https://data.police.uk/
[PT]: https://en.wikipedia.org/wiki/Pivot_table
[CSV]: http://shancarter.github.io/mr-data-converter/
[MD3]: http://bost.ocks.org/mike/bar/
[GH]: https://github.com/infratxt/infratxt.github.io/tree/master/project/crimedata
[JE]: https://twitter.com/jjelosua
[SS]: https://twitter.com/samanthasunne
