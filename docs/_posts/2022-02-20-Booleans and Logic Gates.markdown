---
layout: post
title: 'Booleans and Logic Gates'
date: 2022-02-20 13:15:00 +1100
categories: blog
---

This week I covered boolean operators and logic gates. This included learning and, or, and not boolean operators and passing this knowledge to nor, nand, exor and exnor logic gates. One challenge involved creating a compound operator / logic gate that always returns a 1. I created a functional compound operator, but it is most likely not the most efficient (it uses 3 logic gates), and I would not know how to go about creating a more efficient one. This is a sign I did not fully grasp the content covered. Next time it may be wise to attempt to make a better solution - then I would be able to consolidate my knowledge in a better final result. I now better understand how bitwise operators like `&&`, and `||` work, which may help when an unexpected error occurs.

The biggest logic gate challenge I faced this week was flip-flops. I recreated a T, D and SR flip-flop using [logic.ly](https://logic.ly). Here is a basic rundown of each:

* A flip-flop is a logic circuit to physically store a 1 or a 0 without power.

* The T in T flip-flop stands for toggle, as when toggled on, a positive signal from the clock 'flips' the stored bit from a 1 to a 0, or a 0 to a 1. When the toggle is off, the clock does not change the bit.

* A D flip-flop takes an SR flip-flop and combines SR to one switch with a NOT gate on R. Assuming the clock sends a positive pulse - if D is on, S=1 and R=0, which sets Q to 1. IF D is off, S=0 and R=1, which resets Q to 0.

* An SR Flip Flop is one of the most basic flip-flops, and is the foundation to T and D flip-flops. If S (set) is on, R is off, and the clock is on - Q will be set to 1. If R (reset) is on, S is off, and the clock is on, Q will reset to 0. 

Knowing flip-flops helps to understand the fundamentals of RAM, and how a physical bit is flipped from a 1 to a 0.  Having a basic understanding of computer science will be helpful when learning a language other than python, which are less forgiving. I am excited to continue learning about computer science in the future.