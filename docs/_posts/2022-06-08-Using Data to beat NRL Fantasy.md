---
layout: post
title: 'Using Data to Beat NRL Fantasy'
date: 2022-06-08 00:00:00 +1100
categories: blog
---

This week in Data Science I completed my NRL Fantasy project. Since I had done so little work on the project, i had to both code it and write the report over the weekend. This probably meant that the project was not very high quality, but I tried my best in the time that I had. I ended up deciding on what topic to do my project on - that being how the free Fantasy data can be used to predict the future of a players price. I chose price instead of points because price is not so dependent on random human error.

Whilst coding the project, I was given the extra challenge of making my code efficient, which is something I realised I have not thought about much. My dataset was in JSON format, so loading into python created a lot of dictionaries to sort through. I cleaned the data by taking the stats, and players wanted from the set, and then converting there format into one more easily readable by matplotlib. The efficiency of my code I realise is very questionable, as I did not really plan out how my functions were going to work with each other. I kind of did it as I went along, meaning that some functions needed extra statements to allow them to mesh together. My code was only around 200 lines, so at least it was somewhat concise - I made the functions work for multiple stats to help with this. Overall my coding was ok, and there is definitely room for improvement in the next project. My main visualization is below.

<img src="/assets/Beating-NRL-Fantasy/Initial_Visualization.png" style="display: block; width: 40%; margin: 0 auto;">

My report was interesting as I also did not plan it very much. With my original visualization of player scores plotted against prices, I simply made some observations as to the connections and formulated a trading strategy. This gave me something to go more indepth with, allowing me to bring in more graph examples to test the strategy on. One thing I realised after I had done the testing, was that I only tested the strategy in spike situations, meaning I was not testing it's ability to find a spike in price, but only to capitalize on one. I believe that the strategy has potential to find a spike, but I did not test for this. A visualization of the strategy is below.

<img src="/assets/Beating-NRL-Fantasy/Strategy.png" style="display: block; width: 40%; margin: 0 auto;">

I enjoyed this assingment, especially since it gave me the opportunity to look at one of my hobbies more scientifically. There are definitely things I am going to change for the next report (mostly more planning), but considering my time constraints I think this was a good report.