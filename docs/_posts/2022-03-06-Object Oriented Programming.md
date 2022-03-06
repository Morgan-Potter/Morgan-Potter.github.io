---
layout: post
title: 'Object Oriented Programming'
date: 2022-03-06 5:00:00 +1100
categories: blog
---

This week I started an object-oriented programming (OOP) python challenge. This challenge gives information regarding classes, functions, and constructors and gives an OOP code example which simulates logic gates. I have completed part one of the challenge: adding NAND, and NOR gates to the existing list of AND, OR, and NOT gates and proving `NOT((A AND B) OR (C AND D))` is the same as `NOT(A AND B) and NOT(C AND D)`. Adding the gates was simple, I just copied the AND gate and the OR gate and flipped the output. I was a little confused as to whether a NAND and NOR gate flipped the two inputs, or flipped the output, however looking at the truth tables cleared my doubts.

![Nand Logic Gates](/assets/NAND_logic_gates.png)
*Nand Logic Gates ([Project Lovelace](https://projectlovelace.net/problems/nand-gate/), n.d.)*

There was not much involved in proving the challenge statement. I had to learn how to use the connector class to combine logic gates, and tediously connect everything. The whole challenge is going to be complete next week, and it seems like it gets harder, I have only done the preliminary work. I now understand how the classes and functions connect together, I just have to apply that in more challenging ways. I am excited at the upcoming challenge and hope I get the time to complete it. My classmates have been working on it for longer than me so I'll do my best and see where it lands me. The code is [here](/assets/Logic_Gate_OOP.py), I'll update it as I continue to work on it.