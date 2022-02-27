---
layout: post
title: 'Finite State Machines'
date: 2022-02-27 13:00:00 +1100
categories: blog
---

This week I completed two simple finite state machine tasks - involving visualizing them on paper, and coding them in python. The finite state machines were a garage door, and a vending machine. Finite state machines on paper are a good way to visualize an object that simplifies understanding what you need to code. Additionally, finite state machines on paper can be easily converted to code. 

![Garage Door FSM Diagram](/Morgan-Potter.github.io/docs/assets/Garage_Door_FSM.png)

The garage door involved modifying a pre-existing finite state machine with 4 states, to change from the closing, or opening state to closed or open after 5 seconds, and to add the stopped state. I incorrectly read the task and ended up using `time.time` to literally make a timer running paralel with the code, but the task simply asked to activate the sensor 5 times - assuming that each loop of the code is one second. The stopped state was simple to add, which was a testiment to the diagram. They are more useful than they seem. The code can be found below:

{% highlight python %}
import time
# set initial state 
# door is closed 
door = "closed" 
print("Door is", door) 
# repeat forever 
while True: 
    # ask user for input 
    instruction = input("User input: ") 
    # transition to opening state 
    if instruction == "b" and door == "closed": 
        door = "opening" 
        start = time.time()
    # transition to open state 
    elif instruction == "s" and door == "opening": 
        door = "open" 
    elif instruction == 'b' and door == "closing":
        door = "opening"
        start = time.time()
    elif instruction == 'b' and door == "opening":
        door = "stopped"
    elif instruction == "b" and door == "stopped":
        door = "closing"
        start = time.time()
    # transition to closing state 
    elif instruction == "b" and door == "open": 
        door = "closing"
        start = time.time()
    # transition to closed state 
    elif instruction == "s" and door == "closing": 
        door = "closed" 
    # print the current state of the door 
    if (time.time() - start) >= 5:
        if door == "closing":
            door = "closed"
        if door == "opening":
            door = "open"
        start = 0

    print("Door is", door)
{% endhighlight% }

The vending machine was a very simple task. It prompted the user for money until there was enough to buy a coke for one dollar. The diagram was similarly simple:

![Vending Machine FSM Diagram](/Morgan-Potter.github.io/docs/assets/Vending_Machine_FSM.png)

The only challenge I ran into with this code was float addition and subtraction. Even if the float is a whole number, the result of the float minus one is something like 1.999999999. I used the decimal module, which did not have the same issue and the code worked fine. It can be found below:

{% highlight python %}
import decimal

money = 0
while True:
    inserted = decimal.Decimal(input("Dispense Money: (0.10,0.20,0.50,1,2)"))
    if inserted > 2:
        inserted = decimal.Decimal("0."+str(inserted))
    money += inserted
    if money >= 1:
        print("A drink was dispensed")
        if money - 1 > 0:
            print("You got", str(money - 1) + "$ back!")
        money = 0    
{% endhighlight %}

