---
tags: 
    - "Robotics / Mechatronics"
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

<pre><code style="language-python hljs">print( ['no' if a == 'yes' else 'yes' if a == 'no' else 'Answer not in ["yes", "no"]' for a in [input('')]][0] )
</code></pre>

Yes i know you could achieve a similar result in a much simpler way with a dictionary, but it highlights my original thought process. This line works similarly to a lambda function by iterating through a list of length one with the input in it, meaning the input gets assigned the variable a. To get the string out of the list, it must be grabbed at index 0 of the list comprehension, because there is only one item in the list. Note the weird syntax of inline conditionals - where the internals of the if statement are put before the if, and the else is always placed after it. The table below displays the one-line answer with normal syntax compared to a more conventional solution.

<table>
<tr>
<th>Full Syntax List Comprehension Solution</th>
<th>Typical Multi-line Solution</th>
</tr>
<tr>
<td>

<pre><code class="language-python hljs" style="white-space: pre-wrap;">list_comprehension = []
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
</code></pre>
</td>
<td>

<pre><code class="language-python hljs" style="white-space: pre-wrap;">a = input('')
if a == 'yes':
    print('no')
elif a == 'no':
    print('yes')
else:
    print('Answer not in ["yes", "no"]')
</code></pre>
</td>
</tr>
</table>

This list comprehension is a very unclear, and inefficient way of solving the problem as you would never use the same code in full syntax. In this case, lambda functions are significantly better as they can be both created and called in one line while removing the weird indexing and iteration issues. Additionally, Lambda conditional syntax is the same as it is in list comprehension. The below code solves the problem with a lambda function.

<table>
<tr>
<th>Lambda Solution</th>
<th>Full Syntax Lambda Solution</th>
</tr>
<tr>
<td>

<pre><code class="language-python hljs" style="white-space: pre-wrap;">print( (lambda a: 'no' if a == 'yes' else 'yes' if a == 'no' else 'Answer not in ["yes", "no"]')(input('')) )
</code></pre>
</td>
<td>

<pre><code class="language-python hljs" style="white-space: pre-wrap;">def lambda_func(a):
    if a == 'yes':
        return 'no'
    else:
        if a == 'no':
            return 'yes'
        else:
            return 'Answer not in ["yes", "no"]'
print( lambda_func( input('') ) )
</code></pre>
</td>
</tr>
</table>

#### Complex examples

As the NCSS Intermediate challenge continues, the problems get increasingly more difficult. Due to the one line restrictions, this often means more creative solutions are required to solve any given problem. To maintain integrity, I will give some examples of more difficult problems but will not state which problem they are from, making it harder for someone to stumble upon my answer with a Google search. The most challenging one I completed is below:

<pre><code class="language-python hljs" style="white-space: pre-wrap;"> print((lambda a: '\n'.join([i for i in a if i]) + '\nUltra Viral names: ' + str(len([i for i in a if not i])))([f"The '{b}' will go nowhere, the dance already exists!" if b in ['ballet', 'tap', 'jazz', 'belly', 'contemporary', 'ballroom', 'salsa', 'step', 'swing', 'irish', 'modern', 'shuffle', 'floss', 'twisting', 'macarena', 'interpretive', 'wobble', 'flick', 'stomp', 'tango'] else f"The '{b}' will go not viral!" if len(b) == 8 else f"The '{b}' will go slightly viral!" if len(b) < 4 else  f"The '{b}' will go somewhat viral!" if 'j' in b else 0 for b in input('Enter names: ').split()]).strip('\n'))
</code></pre>

Yes, this code is a mockery of the "Zen of Python", but it is for science. The main functionality of the above code is defined in the largest list comprehension. It defines a list of names, and returns how viral the list will go based on a number of fairly random conditional statements. The difficulty comes as the problem requires you to count the number of names that do not match any of the criteria. I ended up solving this by returning a 0 in the list comprehension when no conditions are met, and then counting the number of 0s in the list. The code <code style="language-python hljs">'\n'.join([i for i in a if i])</code> removes all the 0s from the list (variable a) and formats it into a string. The code <code style="language-python hljs">str(len([i for i in a if not i])))</code> counts all the 0s in the list and formats the int as a string. Finally, I had to add a <code style="language-python hljs">.strip('\n')</code> at the end, as when there are no strings in the list comprehension, <code style="language-python hljs">'\n'.join([])</code> is still '\n', meaning a pointless gap was being created, which then had to be removed. This code could be improved using the walrus (:=) operator to count ultra viral names while returning something (as += cannot), however it was introduced in Python 3.8, and Grok uses version 3.7.

#### Reflection

##### Do you think this is a useful skill?

Understanding the methods behind one-line python code is a good way to deepen your understanding of the language, and I am sure that writing python code will be easier in future. However as stated before, this manner of coding breaks many of the principles presented in the "Zen of Python", and hence is bad practice for any real application. More simple, and readable programs are much better in almost every case, and my only concern is that I will start the habit of writing confusing code. I suppose time will tell.

##### Do you think you will be able to complete the later problems?

Given the complexity of the current code for a fairly simple program, I find it unlikely that I will be able to complete the entire challenge using only one-line answers. It is most likely theroretically possible, however I no longer have the time or drive to write these. Additionally the learning portion of writing one-line python code is basically over, so I would not have much to gain from doing these more difficult challenges... except clout.