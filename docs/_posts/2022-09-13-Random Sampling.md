---
layout: post
title: 'Random Sampling'
date: 2022-09-19 00:00:00 +1100
categories: blog
---

### Work I Completed

Although admittedly late, this week in data science, I worked through the assigned random sampling work. With the computational power I currently have access to, processing big data in the next assessment task will be an issue. The sheer size of big data means a single threaded python program run on the CPU will take forever to create a big data visualization. Besides using the ANU supercomputer (i cannot be bothered), there are workarounds to utilize more of my hardware, or lower the computing power required. One such workaround is random sampling, which involves randomly taking a small part of the big data, and using it for analysis. In theory, because the selection is random, it will be representative of the whole data set. The sampled data is significantly smaller than the whole dataset, and hence requires less computing power. 

There are many methods of random sampling, however the given PowerPoint focuses on four.

1. Simple random sampling is very surprisingly the simplest of the 4 methods. You randomly shuffle the dataset, and then take the first n data points. This method is increasingly prone to selection bias, as the first n data points may not be large enough to accurately represent the entire dataset.

2. Stratified random sampling first separated the dataset into groups with similar attributes, then takes a simple random sample from each. Contrary to simple random sampling, this method ensures each data group is accurately represented.

3. Cluster random sampling involves first separating the dataset into multiple different cluster that are representative of the whole population, and then take a simple random sample from different clusters. This made me wonder - why not just analyze the clusters in the first place?

4. Systematic random sampling involves sampling every kth data point of a dataset. K is defined as the total number of data points N, divided by the desired sample size n. 

There are many python functions that can assist in random sampling, mainly using the random module. Namely, random.randint() for a random integer in a given range, random.random() for a random value between -1 and 1, random.choice() to choose a random value from a list, random.shuffle() to randomly reorder a list and random.sample() to take a random sample of n items from a list. NumPy has functions for generating random values with a uniform distribution, and normal distribution.

I have not been able to test these methods on a dataset yet, as I still need to obtain the full NRL Fantasy dataset. I have not been able to obtain every NRL Fantasy dataset I set out to, however I have collected around ~ 1M data points. This collected data very likely has selection bias as it is missing around 4M data points, and hence would not provide any meaningful observations as to the accuracy of these sampling methods. I could use it to determine the efficiency of these methods, however I am currently struck for time.

### Reflection

#### Why were you late to do this work? What are the consequences?

I have been very busy with assignments over the past few weeks, and I have not really had the opportunity to do this at home. In IT classes at school, I have noticed that I have gotten into a habit of not doing any work due to a combination of distractions, and low drive. This might be okay for a one-time thing, but not when it is ongoing. 

Not doing work in class has meant I have been grasping for straws at things to write in these blog entries, and often means I am doing class-work at home, just to have something to discuss in these blogs. If I actually get into a habit of doing work in class, then these blog posts will be of higher quality due to my increased knowledge, and further assessment tasks involving the class-work will become easier. I have discussed trying to get an extremely high ATAR in these blogs before, and not doing work in class is working against this goal. I really need to start doing work in class again.

#### Why do you believe we’re studying this?

I understand that the next data science assignment involves analyzing big data sets. Random sampling will be useful as a workaround for more computing power in this assignment, as I do not have access to much computing power. I do not believe that I will use random sampling in my assignment, as there are ways to analyze the entire data set with my recourses. It is however a good prelude to get me thinking about all the possible ways I could analyze big data.



