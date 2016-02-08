---
layout: post
title:  "The Velociraptor Problem in D3"
date:   2016-02-08 15:50:00
categories: experiments
image:
---

I love the XKCD webcomic, and at the weekend I saw one particular panel from it in which a substitute teacher asks a [question about velociraptors](https://www.xkcd.com/135/).

![Velociraptor Problem](/images/xkcdVelociraptorProblem1.png)

In fact, I only heard about the 'Velociraptor Problem' though this Wired post about [how to solve it in Python](http://www.wired.com/2015/10/heres-solve-xkcd-velociraptor-problem-code/).

Helpfully, the author breaks down the logical reasoning behind his solution and ends by posting a Python code example to solve the problem. And just for fun, I thought I'd see what it would take to translate it into JavaScript, then make a nice visualisation with D3.

<div style="text-align: center;margin-bottom:10px;"> <b>* * *</b> </div>

The first part, switching from Python to JavaScript, was really easy to do now that I've started writing more in [CoffeeScript](http://coffeescript.org/). In fact, the syntax is so similar to Python that I only had to change a few lines of Rhett Allain's original code to end up with valid CoffeeScript:

{% highlight coffeescript linenos%}
#### set up initial conditions
xv=-40 #this is the initial location of velociraptor (you can change)
xh=0 #location of human
av=4 #acceleration of velociraptor (you can change)
ah=3 #accel of human (can change)
vvmax=25 #maximum velocity of the velociraptor (change)
vhmax=6 #max velocity of human (change)
vh=0 #starting velocity of human
vv=0 #starting velocity of velociraptor
t=0 #starting time
dt=0.1 #time step (you can play with this)

while (xv<=xh)
  #first check if the human is at max v
  if (vh>=vhmax)
    ah=0 #if yes, set accel to zero
  #check if velociraptor is at max speed
  if (vv>=vvmax)
    av=0 #if yes, set accel to zero

  #calc new human velocity after time interval
  vh=vh+ah*dt
  #calc new velociraptor velocity
  vv=vv+av*dt

  #calc new positions
  xh=xh+vh*dt
  xv=xv+vv*dt

  #increment time
  t=t+dt
 
#once the loop is finished, print the final location
console.log xh, t
{% endhighlight %}

Running this from command line gives a print out of the final position and time at which the human is caught by the velociraptor:

![The answer](/images/raptorCLI.png)

<div style="text-align: center;margin-bottom:10px;"> <b>* * *</b> </div>

Ok, so there's the answer: the human can make it 6 metres in 31.5 seconds before the velociraptor catches up and rips them to shreds. 

We've solved the problem, but on its own it's not very satisfying - what would make it far better would be to see a graph of the human's flight and then eventual capture, which can be done using [D3](https://d3js.org/).

The first thing to do is get a dataset for D3 to work with. The initial code only prints out a snapshot of the final time and location of the human at capture, so what's needed is to log additional data for the position of both the human and the velociraptor at each time interval along the way. 

I added a few lines to the start and finish of the **while** loop to create two empty arrays - one for the human and one for the raptor - and then push data into them each time the loop runs:

{% highlight coffeescript linenos %}
####create arrays
velociraptor=[]
human=[]

while (xv<=xh)
  #first check if the human is at max v
  if (vh>=vhmax)
    ah=0 #if yes, set accel to zero
  #check if velociraptor is at max speed
  if (vv>=vvmax)
    av=0 #if yes, set accel to zero

  #calc new human velocity after time interval
  vh=vh+ah*dt
  #calc new velociraptor velocity
  vv=vv+av*dt

  #calc new positions
  xh=xh+vh*dt
  xv=xv+vv*dt

  #increment time
  t=t+dt

  #add data to arrays
  humanPos={
    distance: xh.toFixed(2),
    time: t.toFixed(1),
  }
  velociPos={
    distance: xv.toFixed(2),
    time: t.toFixed(1)
  }
  velociraptor.push velociPos
  human.push humanPos

{% endhighlight %}

Each array now contained distance and time values for every 0.1 seconds of the pursuit, ready for plotting on a graph. For example, here's what the first 1.5 seconds of data for the human looks like:

![Human pursuit data](/images/humanCLI.png)

I wanted to plot the two datasets together onto a multi-line chart, and found a [tutorial which explained step-by-step](http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935) how to do this. Then, with a little bit of tweaking of the styling and axes based on [this example](http://bl.ocks.org/mbostock/1166403) I ended up with a chart I was happy with.

**And voilà - a graph showing the data behind a velociraptor chase.**

![Human pursuit data](/images/velociraptorchase.png)

*All code for this project can be found in this [Github repository](https://github.com/infratxt/velociraptorproblem).*
