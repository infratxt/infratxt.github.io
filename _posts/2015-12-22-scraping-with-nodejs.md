---
layout: post
title:  "Webscraping with Node.js"
date:   2015-12-22 17:35:00
categories: node journalism investigation
image:
  feature: dailyscrape1.png
  thumb: dailyscrape1-thumb.png
---

At the beginning of October when I started the process of learning to code, being able to write and deploy my own scrapers was one of the progress milestones I had in mind.

[Scraping](https://en.wikipedia.org/wiki/Web_scraping) is the process of programmatically retrieving information which is available on a website but not accessible through a specific API. To put it in more general terms, there are many instances where a range of related information is made available on one or more websites, but can't be accessed as a unified dataset unless an automated process is created to access, extract and compile the data - and this is the process of webscraping.

Examples can be found everywhere on the internet: Google scrapes websites in order to index content for efficient searches; price comparison websites use scraping to find the best deals offered by a large range of companies; and brand management companies scrape social media data to detect mentions of a brand, person or product.

As a journalist, I'm interested in using scraping as a tool for generating stories from previously inaccessible datasets, and detecting patterns that are spread across disparate sources of information. And in order to write my own scraper, I had to first get to grips with [NodeJS][NJ].

**Node.js** is *"a JavaScript runtime built on Chrome's V8 JavaScript engine"*, or in other words, a way to write and execute JavaScript programmes which can run as standalone applications instead of working only in the browser. This means they can be controlled from your computer's command line, and perform operations like writing to the filesystem, [talking to a database](http://mean.io/#!/) and many other things besides. 

What's also incredibly useful is that there are a huge number of ['packages' available for Node](https://www.npmjs.com/), each of which is a collection of code which a developer has written to make Node perform a certain task, and then published online for other people to make use of. 

There are also a huge number of online tutorials showing you how to make use of different packages, like this video specifically on webscraping with Node - which helped me start on writing my own scraper.

<iframe width="420" height="270" src="https://www.youtube.com/embed/LJHpm0J688Y?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

---

##The Daily Scraper

To get to grips with scraping I set myself a practical challenge: to write a programme that would visit the **Daily Mail** homepage and download the the text of every article, then perform a word frequency analysis on the complete body of text and display a list of the most commonly occurring words.

In practice this involves two successive scraping operations: firstly to visit the homepage and get the link URL to each article published that day, then to visit each of those URLs (articles) and download the body text. This then needs to be combined and saved into one large text file, then analysed.

Here's a step by step.

###0.Require modules

{% highlight javascript %}
var request = require('request'), //module for http requests
    cheerio = require('cheerio'), // module for jQuery-ish parsing
    fs = require('fs'),
    async = require('async'),
    url = "http://www.dailymail.co.uk/home/index.html",
    _ = require("lodash"), // util library
    allLinks = [];
{% endhighlight %}

This requires the [request][RQ], [cheerio][CO], [filesystem][FS], [async][AS] and [lodash][LD] Node modules, defines the URL to be scraped, and creates an empty array called `allLinks`, which will eventually store all the article URLs from the homepage.

###1.Visit the homepage and get all article URLs

With the Cheerio module, you can download a webpage into your computer's memory, then use CSS selectors to select the specific parts of a page that you want to perform an operation on, just like with [jQuery](JQ).

Once you know the URL to be scraped, you can use the [inspect element][IE] tool in your browser to look at the HTML formatting of the webpage and find out where the target information is found within the page structure.

You can then make a request to the URL of that page, select each of the targets - in my case, links to each of the articles - and perform a function on them - in my case, add them to the big ``allLinks`` array.

For me this looked like:

{% highlight javascript %}
request(url, function(err, resp, body) {
    if (resp.statusCode == 200 && !err) {
        var $ = cheerio.load(body);
        //Get links from main content section
        $('#content h2 a').each(function(){
            var link = {};
            link.title = $(this).text();
            link.href = $(this).attr('href');
            allLinks.push(link);
        })
        //Get links from sidebar of shame
        $('.puff ul li a').each(function(){
            var link = {};
            link.title = $(this).children('.pufftext').text()
                .replace("\n          \n          \n          ", ""); //remove formatting
            link.href = $(this).attr('href');
            allLinks.push(link);
        })
    } //End if
 }) //End request
{% endhighlight %}

###2.Visit all articles and download body text
I wrote another simple scraper request to visit an article on the DM website and download just the main body text (ignoring other text on the page like adverts, sidebar links etc.).

This was wrapped in a function called `getPageText` (below) which could be performed on every link in the `allLinks` array.

{% highlight javascript %}
function getPageText(pageURL, callback){
    var textBody = "";
    request(pageURL, function(err, resp, body){
        if (resp.statusCode == 200 && !err) {
            var $ = cheerio.load(body);
            $('p.mol-para-with-font').each(function(){
                textBody += $(this).text();
                textBody += " ";
            });
            callback(err, textBody) //callback fires with completed textBody variable
        }
    })//end request
}
{% endhighlight %}

###3.Combine and save as a file

Using Node's [filesystem API][FS] (**fs**), the text data returned in the previous step is then appended to a single text file. (This step was chained to the previous step as part of a larger function, but for simplicity I have left it out here.)

{% highlight javascript %}
function writeTextToFile(textData){
    fs.appendFile("./corpus.txt", textData+"\n", function(err){
        if(err){
            return console.error(err);
        }else{
            console.log("Page text saved.");
        }
    });
}
{% endhighlight %}

###4.Perform word frequency analysis

Thankfully, most of the functionality I needed to do this was already available in another package, [gramophone][GP].

All I needed to do was use **fs** to read the text file that I had saved, use **gramophone** to find the most common words, and then use **lodash** (represented by **_**) to filter out any words with fewer than four letters, since this is probably bad data.

{% highlight javascript %}
var gramophone = require('gramophone');

var completeDMcorpus = fs.readFile('./corpus.txt', 'utf8', 
    function (err, data) {
  if (err) throw err;
  console.log("Data received.");
  keywordAnalyse(data);
});

function keywordAnalyse(words){
    var wordArray = gramophone.extract(words, {score: true, limit: 80})
    var longWords = _.filter(wordArray, function(w){
        return w.term.length > 4
    })
    console.log(longWords)
}
{% endhighlight %}

---

Here's a video of the scraper in action:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Dfauiz8U9C4?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

Given that it's late December, the most common word at the moment is 'Christmas' - but I'm far more interested in the patterns this scraper could show in the wake of a significant political or cultural event, or the insights it might provide into changing word frequency over time.

Though *The Daily Scrape* was just a test case, I'm confident that scraping will start to play a far bigger role in how I research and report on news stories in future.

[NJ]:https://nodejs.org/en/
[RQ]: https://www.npmjs.com/package/request
[CO]: http://cheeriojs.github.io/cheerio/
[FS]: https://nodejs.org/api/fs.html
[AS]: https://github.com/caolan/async
[LD]: https://lodash.com/
[IE]: https://developers.google.com/web/tools/chrome-devtools/iterate/inspect-styles/basics?hl=en
[GP]: https://www.npmjs.com/package/gramophone
