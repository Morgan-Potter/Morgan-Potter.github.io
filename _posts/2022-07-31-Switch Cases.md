---
tags: 
    - "Robotics / Mechatronics"
---
<h3>Work I completed</h3>

This week in robotics / mechatronics I completed the assigned switch case circuit, with my own spin. The task involved wiring a potentiometer to an Arduino and creating a switch case which displays a different message on serial depending on potentiometer resistance. The original circuit was simple, simply involving the direct connection of the potentiometer to 5v, ground and an analog input. The code was also not very complex, the potentiometer value was divided by 255, breaking it into 5ths, and then a switch case was created to evaluate whether the potentiometer was set under one of those 5ths. I created my modified version in the tinkercad circuit simulator, as I did not have the necessary circuitry at my house. The circuit is displayed below.

<img src="/assets/Switch-Cases/Switch-Case-Circuit.png" style='display: block; margin: 0 auto; width: 40%;' alt="Switch Case Circuit">

In this circuit I have added four slide-switches which carry the 5v supply to the potentiometer, creating a sort of puzzle. When all but the second switch are moved to the right side, the 5v power is allowed to travel to the potentiometer, and when the potentiometer is moved to the middle position, the built-in LED lights up. The slide switches connect the middle pin and the pin that is slid over together, so that power can travel through it. It is possible to tell which position the slide switches must go as there is a wire connected to the side continuing the 5v line. This makes the circuit a kind of test to see if you understand circuitry. The code I used for this is below.

<pre><code class="language-c">void setup()
{
  pinMode(13, OUTPUT); // Built in LED
  pinMode(A2, INPUT); // Potentiometer
}

void loop()
{
    int pot = analogRead(A2) / 255; // Splits pot into 5 sections
      switch(pot) {
      case 2: // If pot is in the middle
      	digitalWrite(13, HIGH);
        break;
      default:
        digitalWrite(13, LOW); // Normally have the LED off
        break;
    }
}
</code></pre>

This is a simpler use of a switch case than the example, as it only has one case versus the example which had 5. It does the same thing though, the potentiometer is split into 5 sections, and the LED is turned on the potentiometer is in section 2, otherwise the potentiometer is set to be off. This code is nothing special, the circuit was the most difficult element of this task primarily because of the use of slide switches.

Although they are not difficult, I did use switch cases for the first time in this task, are annoyingly far more efficient than if statements in C++. I will now continue to replace if statements with switch cases in future as their benefits are clear.

<h3>Reflection</h3>

<h4>What made you curious?</h4>

Proper C++ practices was something I struggled with in the practical assignment. This was mainly because C++ is a compiled language, and I did not fully understand the concept, however understanding more functions will also be of benefit to me. I am curious to keep learning this proper practice so that I will have an easier time coding in future assignments and projects.

<h4>If you could do this week over, what would you do differently?</h4>

If I were to do this week over, I would do more work in mechatronics as one small task is not much. I am not sure why I did not complete more work this week, I believe it was mainly due to getting into a habit of not doing work in class. There are many more tasks in the same document that my completed work was in, so I will continue to do this work over the next week. I will try to get more than one task done. I also have to complete week two of the NCSS challenge, so it will be interesting how much work I get done overall.