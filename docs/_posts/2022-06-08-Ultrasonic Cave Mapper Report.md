
This week in Mechatronics, I completed my cave mapper project which involved wiring, re-coding and writing the task. Getting to take the robot home, I realised that I had not done as much work on it as I thought, especially regarding the coding.

Wiring quite annoying as when I first tried to run the robot, the servos would give random movements, and the serial would not work. There are two main reasons for this, one is that the Arduino cannot provide enough current to drive two servos and serial, and the other being that I mistakably had the servos connected to pins 0, and 1 which are used for serial communication. This essentially meant it was having a hard time driving the servos, and the servos were trying to move whenever the Arduino tried to interact with serial. I fixed these issues by using an external battery pack to drive only the servos, and plugging the servos into pins 2, and 3. This got me to the point of being able to spin the ultrasonic head 360 degrees whilst using serial, but I still needed to fix the code for the actual implementation, as it was not good. Additionally, I had to add a resistor onto the button as it was being unpredictable. These bugs were quite frustrating and took awhile for me to figure out the problem, however if I did not take the robot home to wire it I would not of had the time to fix them. The updated circuit diagram is below.

<img src="/assets/UT-Mapper-Report/Updated-Circuit.png" style="display: block' width: 100%;">

Re-coding was necessary as my original code in tinkercad was a real mess. One problem was the complication of dynamic memory allocation, which I stumbled into the need for when trying to make the program allow for a specified map size. This was difficult as the map and map size variables had to be accessable over all functions, but also had to be dynamically created as a serial input was required to get the map size. This was probably doable if I made dynamic memory for both variables, however the effort was not worth the small extra functionality, and I just made the map size addressable as a define statement. Another issue I had was getting the x and y coordinates, as my logic for that was wrong. I was creating a triangle within a circle using the angle that the head rotated. This meant that some of my supposed right angle triangles had angles of over 180 degrees. I used the modulus operation to get the angle in relation to the closest x / y intercept (% 90). The code for getting the x coordinate is below.

<pre><code class="language-c">

int get_x(int distance, int angle)
{
  int i;
  // Returns x values from measured distance and angle as rounded integers
  if ((angle == 90) || (angle == 270)) { // When the coordinate lies on the y axis
    i = 90; // This is required as the modulus operation moves y axis points to the x axis. cosine(0)=1, cosine(90)=0
  } else {
    i = angle % 90; // Gets the interior angle in all quadrents
  }
  float rad = i * (pi / 180); // Converts degrees to radians (Arduino trig uses radians)
  if ((floor(angle / 90) == 1) || (floor(angle / 90) == 2)) {
    // If cosine of the angle is negative in the given quadrent, make the final result negative.
    distance *= -1;
  }
  return round(cos(rad) * distance);
}
</code></pre>

The guidelines on writing the report were not very detailed, and hence I am not sure as to the quality of my report. From the last blog entry, I have added the planning section which basically involved discussing potential problems with my design iterations and improving. Again I am not sure that this was the right thing to do, but it is a form of planning.

This task was very fun and was the first mechatronics project where I fully designed and coded it. The end result was not perfect, but I learned a lot, especially about c++.