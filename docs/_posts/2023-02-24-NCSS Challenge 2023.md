---
tags: 
    - "Data Science"
excerpt: "Doing the Intermediate NCSS challenge with one line answers because its fun."
header:
    overlay_image: "/assets/NCSS-Challenge-2023/cover.png"
    overlay_color: "#000"
    overlay_filter: "0.5"
---

#### What I have been doing

This week I have been working on completing the NCSS 2023 Intermediate challenge with one liner answers. Why you ask? Started off with me being bored, and turned into something that I was actually interested in completing. It also proves a point that the intermediate challenge is extremely easy compared to the advanced one. If you are not familiar with the NCSS challenge, it is essentially a large set of python programming challenges hosted on groklearning.com (which is now free thanks to WiseTech Global). You get 10 points for answering a question correctly in 5 or less attempts, 9 for 10 attempts or less, 8 for 15 attempts or less and so on. So far I have completed week one and two with a perfect score, using only one line 0f code for each question.

#### Writing python code in one line

There are many methods in python that assist in writing code in one line. Generally these are methods to turn normal syntax into one-line syntax such as conditionals and loops. Originally when I started this I did not understand how to call a lambda function in one line because you generally assign it to a variable. Because of this, instead of using lambda functions, I used a scuffed list comprehension to assign a variable to an input, and to use conditionals. The below line prints the opposite of the input.

~~~ python
print( ['no' if a == 'yes' else 'yes' if a == 'no' else 'Answer not in ["yes", "no"]' for a in [input('')]][0] ) 
~~~

This line works similarly to a lambda function by iterating through a list of length one with the input in it, meaning the input was assigned to the variable a. To get the string out of the list, it must be grabbed at index 0 of the list comprehension.

The two main methods are lambda functions (inline functions) and list comprehension. 