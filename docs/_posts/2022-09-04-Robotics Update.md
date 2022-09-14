---
layout: post
date: 2022-09-04 00:00:00 +1100
title: 'Robotics Update'
categories: blog
---

<h3>Work I Completed</h3>

This week in Robotics/Mechatronics, I have been away for 3/5 school days. This means that I have not done much work on IT. In the classes that I did have, I was doing the work discussed in this week's other blog post. I have spent the entire week completing my ANU Discovering Engineering assingment which is essentially Robotics. Considering I have no other work to discuss, I will talk about that. This task was an electronics and programming take-home test comprising of 3 questions. Each question had atleast 4 sub questions, so it was deceivingly long.

The first question involved circuit calculations for a resistor. Essentially, there was a photoresistor (LDR) that would provide sufficient current to a base pin of a transistor when it was at normal indoor light. The question invovlved calculating the resistance of a resistor on a node with the base pin of the transistor, so that the transistor would turn on during normal indoor light. Despite R1 and the base pin being on a node, the assignment sheet said to treat the calculation as resistors in series. First I calculated the resistance of a LDR at normal indoor light or 700 LUX, which was around 850 ohms. Between that resistance, the voltage of 0.7v at the node, and the battery voltage, there were enough equations to solve for R1. My answer was 180 ohms, however I have no real way of testing it as I did not have access to real components, and did I did not know the transistor turn on voltage in TinkerCAD.

The second question was much easier, just slightly tedious. It gave a pre-made circuit diagram, and asked for code to do functions like blinking the lights, and turning the motor. I was able to reconstruct this circuit in TinkerCAD, so I am fairly sure that all of my code is functional. The one element I am slghtly concerned with is the commenting, as they did not provide much instruction on what is too much, or too little. Typically, I just comment everything to make sure I am explaining things properly, however it is possible that they do not like this style of commenting. An example program is below.

{% highlight C %}

// Define component pins

int LED = 8;
int pot = A0;
  
void setup()
{
  // Initialize all required pins
  pinMode(LED, OUTPUT);
  pinMode(pot, INPUT);
  // Start with LED turned off (PWM pin acts as ground)
  digitalWrite(LED, HIGH);
}
void loop() 
{
  // analogRead maps 5v of power to 1023, hence reading this potentiometer at 0 ohms = 1023
  
  switch(analogRead(pot)) { // A switch statement is more efficient than an if statement
    case 1023: // If the potentiometer is turned all the way to the right (no resistance)
      digitalWrite(LED, LOW); // Turn LED on
    default: // Default is needed to stop flickering at pot = 1023
     digitalWrite(LED, HIGH); // Turn LED off
  } 
}

{% endhighlight %}

In this example, there is not many lines I have not commented. I think it is easy to understand how the program operates, however it may not be what they were looking for. I even commented the lines turning the LED on and off.

The third example involved both creating a circuit and writing code for a temperature sensing device. This device is meant to tell whether it is too hot to use the play equipment at a playground, following an article from the ABC news surrounding playground burn dangers. Considering this circuit involved an Arduino, and only one temperature sensor, and two LEDs, it was fairly easy to construct. Coding this implementation was similarly easy. The difficult part was determining at what temperature is too hot. All materials conduct heat differently, so it is impossible to provide a perfectly accurate rule for all play equipment. Considering this, I researched profesional opinions on the subject, which pointed me to the cut-off temperature of 50 degrees. This seems weird to me considering water at 50 degrees can burn, and metal conducts much more efficiently than water, however I went with the online opinion.

This assignment was fairly challenging, but I think I did well on it. Even if my solutions were flawed in some way, I provided reasoning for all of them, so they cannot mark me down too much. I also looked over the task sheet a lot, and made sure there was nothing that I missed so hopefully it turns out alright.

<h3>Reflection</h3>

<h4>How does this make you feel?</h4>

Not getting to do any work for Robotics was quite dissapointing, as I was excited to mess around with the new shift registers, and the transistors that were found buried in other components. Although it was not exactly the same content, I did learn a lot about Robotics this week which is a good constilation. This assignment really helped to solidify my foundational Robotics skills since I did not try all that hard to create a strong knowledge base. 

<h4>What are your next steps?</h4>

I am going to catch up on Robotics in the coming week, so I can present what I have learnt in the next blog post. My assignments are starting to slow down now, so I will have more time to focus on classwork. In terms of further Robotics work, I think I am going to take a more general C++ coding course. Although learning to code in Python first made things easier, it makes it difficult to use other languages. I do not fully understand the intricoucies of a compiler, and hence when I code in C++, my brain often approaches problems in a way that is very difficult to code in C++. I do not need to understand how to convert Python code to C++ code (which I can do with JS), I have to make my brain processes suited to a compiled language.