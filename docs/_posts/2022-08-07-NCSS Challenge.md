---
layout: post
title: "NCSS Challenge"
date: 2022-08-08 00:00:00 +1100
categories: blog
---

<h3>Work I Completed</h3>

Over the past two weeks I have been working to complete the Advanced NCSS challenge to improve my Python programming, and to strengthen my application for the NCSS Summer School. The challenge has a simple Grok format - a brief problem description and then a section for writing a solution. The problems follow the ideology of concept to code - the description will never ask for you to determine an original algorithm for a problem, the solutions are explained to you. This makes it more straightforward, the only difficult area of this challenge is understanding how to code a solution into existence, not finding the solution itself. I have completed the first two weeks of challenges, which were increasingly difficult. The most difficult of which was the last problem of week two.

The problem description was a game where lamps, numbered boxes and walls were placed on a N*N size grid. The rules were as follows:

A board is 'happy' if (and 'unhappy' if not)

1. "no two lamps are in NSEW (North/South/East/West) line-of-sight of each other"
2. "black cells with numbers must have less than or equal to that many lamps as direct NSEW adjacent neighbours."

A board is considered 'solved' if (and 'unsolved' if not)

1. the board is happy
2. "all black cells with numbers must have exactly that many lamps as direct NSEW adjacent neighbours"
3. "all white cells are illumated yellow."

My code for checking criteria one of being happy is below:

{% highlight python %}

def is_obstructed(board, x,y):
  if x != 0: # checks if square is not in the far left
    for west in reversed(board[y][0:x]): # loops over all squares west from given coordinates
      if west == 'X' or west in '0123456789':
        break
      if west == 'L': # if a lamp is found return true
        return True
  if x != len(board[y]) -1: # checks if square is not in the far right
    for east in board[y][x+1:]: # loops over all squares east from given coordinates
      if east == 'X' or east in '0123456789':
        break
      if east == 'L': # if a lamp is found return true
        return True
  if y != 0: # if the square is not in the top row
    for north in reversed([i[x] for i in board[:y]]): # loops over all squares north from given coordinates
      if north == 'X' or north in '0123456789':
        break
      if north == 'L':# if a lamp is found return true
        return True
  if y != len(board) - 1: # if the square is not in the bottom row
    for south in [i[x] for i in board[y+1:]]: # loops over all squares south from given coordinates
      if south == 'X' or south in '0123456789':
        break
      if south == 'L': # if a lamp is found return true
        return True
  return False

{% endhighlight %}

This code loops through all of the squares in the north/south/east/west directions, and returns true if a light is found, and false if not. The most difficult part of this was getting the list of values in a given direction. To get the all the squares north of the lamp, the list <code>reversed([i[x] for i in board[:y]])</code> is used. This loops through all the y values above y created by board[:y], and adds the square with the same x coordinate or i[x]. The list must be reversed, as it must search from the specified lamp to the upper square, not the other way around. Strictly speaking, the if statements checking whether the square is on the edge of the board are not necessary, as for loop will be iterating over an empty list if it is on the edge. It does not change the functionality, but would be computationally faster to remove the statements.

<h3>Reflection</h3>

<h4>What are your next steps?</h4>

This challenge was very difficult and took me ~5 hours on and off to complete. This makes me concerned for the upcoming weeks as the challenges are bound to increase in difficulty. To get into the NCSS Summer School, I have to show that I am proficient at coding and this is the best way to do it, however it will not be easy. I am going to make doing these challenges a higher priority so regardless of the difficulty, I should find the time to complete the challenge before it is due.

<h4>Did you do an effective job of communicating your learning to others?</h4>

I had the knowledge to be able to help my peers with the NCSS challenge, as they were struggling more than I was. Whilst doing this I try to not write the code for them, however enticing it may be. They need to learn from their mistakes, they just need a hand to do so. Additionally, helping others is more about understanding their code and helping them to fix it, not forcing my own logic. I think I mostly did an effective job at this, the area with most failure being me writing code for them.