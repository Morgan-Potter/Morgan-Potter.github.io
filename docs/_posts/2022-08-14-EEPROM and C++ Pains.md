---
title: 'EEPROM and C++ Pains'
date: 2022-08-14 00:00:00 +1100
layout: post
categories: blog
---

<h3>Work I Completed</h3>

This week in Mechatronics, I attempted a modified EEPROM Arduino challenge. The original EEPROM challenge comprised of wiring up a button, and using the EEPROM to store a counter for the number of times the button had been pressed. The impressive thing about this, is that the counter could maintain it's count even if the arduino was powered down. This is why EEPROM is useful - unlike RAM, it can retain data even after it is powered down. I coded, and constructed this circuit in Tinkercad, however since I copy and pasted the code, it only took me around 5 minutes. I felt that 5 minutes was not enough time to fully understand EEPROM, so I decided to make the challenge a little harder for myself.

My idea originated from the one byte limitation of an EEPROM address, as the EEPROM.write() command only allows for one address. This meant that datatypes such as integers, and floats could not be stored in EEPROM, and my idea was to allow for this. I later learned that it is possible using EEPROM.put(), however I thought it would be a fun project regardless. My idea was to allow the user to input an integer or float in serial, and allocate 4 EEPROM addresses for each number. Considering that there can be multiple addresses for one variable, I would have to create a key-value array to assign addresses to each variable name. The user would not get to decide which addresses to store the data, as filling the EEPROM up progresively would be less annoying to code. 
Thinking about it, I am making EEPROM quite similar to RAM, and storing addresses similarly to an interpreted language. This made me excited - it was like I was making my own little coding language. This idea required no external circuitry, the only reason that it needed to be done on an Arduino was for the inbuilt EEPROM.

On trying to code this I began getting very mad at the complexities of C++. As I am used to using newer, interpreted languages (JavaScript and Python), my brain does not yet fully comprehend dynamic vs static variables. This caused an issue when my brain immediately thought to use a dictionary-like object. After about half an hour of searching for a C++ dictionary alternative, I came to the conclusion that it is not possible. The closest thing was a structure, however they are not dynamic, and each value can only be one byte. My solution was to use two arrays, one consisting of 256 potential variable names, and the other being a 2d array of 256*4 potential memory addresses.This way the key-value could be defined by the index. These arrays can be found below:

{% highlight C %}
  String varName[1024]; // 6kb memory
  int memAdr[1024][4]; // 16kb memory
{% endhighlight %}

My idea for the user input was to have them define a variable by {type} {variable name} {value}. The issue with this is, C++ has no built-in way to split a string into an array by a character. I was fortunate in finding a demo split function online and decided to use that. At this point I was very frustrated, as I thought this was going to be a relatively simple task, I feel like I could code this in Python in 30 minutes. I wanted to quit, and the thing that finally pushed me over the line was when I tried to add an if statement checking whether the correct command had been given, and it threw an error for some reason. My short diagnosis was that you could not run a == operator on an empty array space. The thought of fixing this infuriated me, and then I began writing this entry.

<h3>Reflection</h3>

<h4>Why did you give up?</h4>

I started this journey at around 8:30pm on a school night, and I needed to get this entry done before I passed out from exhaustion. I understood that I already had enough content to cover in this entry, so it seemed less enticing to keep going. So in my mind, I did not really give up, I just had more important things to do.

<h4>What did you learn this week?</h4>

After all of this struggling, I honestly do not feel like I have learnt much more about EEPROM than I knew after the 5 minutes. I do not understand the inner workings, however the basic functions make sense. EEPROM.write(adr, val) writes a byte of storage to a 1-1024 address, EEPROM.read(adr) gives the value of a address and EEPROM.put() is used to store any data type. Struggling through C++ does help me to learn the language, and I think to fully understand it I will have to struggle through it a lot more.

