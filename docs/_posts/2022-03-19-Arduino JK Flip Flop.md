
This week I attempted to simulate a JK flip flop with an Arduino. Although the circuit does not currently work, it should be a quick fix. I first created the circuit, which included wiring two buttons: `J` and `K`, and wiring two LEDs: `Q` and `notQ`. My idea was to use the buttons to switch `J` and `K` to 1 and 0 respectively, and to use LEDs to display the output and inverse output.

![Circuit](/assets/Arduino-JK-Flip-Flop/Circuit.jpg)

The JK flip-flop logic was created within the Arduino IDE using the Qnext output formula.

```c#
bool Qnext = (not(q) and j) or (q and not(k))
```

This formula was determined using a karnaugh map, and works yet the LEDs are producing no output. This could be for two reasons: the JK Flip-Flop function, or the loop function. I do not yet fully understand C++ functions, especially regarding constructors and variables. In python, you can easily put a variable in a class constructor and access it within the functions of the class, but I am not sure if I have done this correctly in C++. I added a public access header, and assigned the variable q under that. If this is the issue, the circuit would not be able to produce an output. The loop function contains the logic required to change J and K to a 1 or 0 based on a button press, calls the JK function, and displays it's output. The issue could surround a button press needing to occur to change the LEDs - maybe the button is never pressed when the Arduino is checking. Regardless of the issue, I need to be in class to fix it, so it will be a problem for next week. 

I am really enjoying computer science, and this project has furthered my interest. I have been thinking Comp-Sci has some good paralels in minecraft. You can make logic gates, flip flops, and displays - making a computer in minecraft would be a fun project. Making something simple like a calculator with memory would teach me a lot more about computer science. My assignments are starting to flood in now, so maybe in the holidays. 