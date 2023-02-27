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

To start off I want to clarify that I do not count using exec() as one line python, as it just runs a python file which can technically formatted in one line with a string. If you could use exec() then you could run literally any python program in one line, ruining the fun. I also avoid using semicolons as it essentially just works as a newline character which is against the spirit of one line coding.

There are many methods in python that assist in writing code in one line. Generally these are methods to turn normal syntax into one-line syntax such as conditionals and loops. Originally when I started this I did not understand how to call a lambda function in one line because you generally assign it to a variable. Because of this, instead of using lambda functions, I used a scuffed list comprehension to assign a variable to an input, and to use conditionals. The below line prints the opposite of the input.

~~~ python
print( ['no' if a == 'yes' else 'yes' if a == 'no' else 'Answer not in ["yes", "no"]' for a in [input('')]][0] )
~~~

Yes i know you could achieve a similar result in a much simpler way with a dictionary, but it highlights my original thought process. This line works similarly to a lambda function by iterating through a list of length one with the input in it, meaning the input gets assigned the variable a. To get the string out of the list, it must be grabbed at index 0 of the list comprehension, because there is only one item in the list. Note the weird syntax of inline conditionals - where the internals of the if statement are put before the if, and the else is always placed after it. The table below displays the one-line answer with normal syntax compared to a more conventional solution.

<table>
<tr>
<th>Full Syntax List Comprehension Solution</th>
<th>Typical Multi-line Solution</th>
</tr>
<tr>
<td>

~~~python
list_comprehension = []
for a in [ input('') ]: # a == input(''), will only iterate once
    if a == 'yes':
        list_comprehension.append('no')
    else:            # shares the same function as elif
        if a == 'no': #
            list_comprehension.append('yes')
        else:
            list_comprehension.append('Answer not in ["yes", "no"]')\
del a # a cannot be referenced outside list comprehension
print(list_comprehension[0]) # the output will always be at index 0.
~~~
</td>
<td>

~~~python
a = input('')
if a == 'yes':
    print('no')
elif a == 'no':
    print('yes')
else:
    print('Answer not in ["yes", "no"]')
~~~
</td>
</tr>
</table>

This list comprehension is a very unclear, and inefficient way of solving the problem as you would never use the same code in full syntax. In this case, lambda functions are significantly better as they can be both created and called in one line. Additionally, Lambda conditional syntax is the same as it is in list comprehension. The below code solves the problem with a lambda function.

<table>
<tr>
<th>Lambda Solution</th>
<th>Full Syntax Lambda Solution</th>
</tr>
<tr>
<td>

~~~python
print( (lambda a: 'no' if a == 'yes' else 'yes' if a == 'no' else 'Answer not in ["yes", "no"]')(input('')) )
~~~
</td>
<td>

~~~python
def lambda_func(a):
    if a == 'yes':
        return 'no'
    elif a == 'no':
        return 'yes'
    else:
        return 'Answer not in ["yes", "no"]'
print( lambda_func( input('') ) )

~~~
</td>
</tr>
</table>


The two main methods are lambda functions (inline functions) and list comprehension. 