---
tags:
    - "Data Science"
excerpt: My final projects are coming up and I have not completed the Data Science portion - where do I go from here?
---

#### What I have been doing

I have recently been informed that if I receive exemptions from my IT reflections or projects I will not get an ATAR. Given that my projects are due in a few weeks, I decided I would write a few reflection journals discussing the issues surrounding my projects currently, and what I am doing to alleviate this. Knocking out two birds with one stone if you will.

##### What issues have you been having with your projects?

My most pressing issue currently is re-determining what my projects actually are, and how they are divided. I have put a considerable amount of work into my projects already. Currently, I have a stereo camera system (based on [IGEV](https://github.com/gangweiX/IGEV)) that is generating fairly accurate disparity maps. I am yet to properly calibrate, and convert the disparity map into a 3D point cloud, but the math to do so is fairly trivial. The issue is, I have not yet done the 3D pathfinding that was going to be my data science project. Given the small amount of time I have remaining (~ 5 days), I think it is important to weigh up my options.

##### Option 1: Try to finish the project as planned

This option would be preferable, as I would not have to compromise on the quality of the final product - it is what I originally set out to achieve. Unfortunately it just may not be possible for me to do this in the small time-frame I have left. The [project definition document]({{site.url}}/2023/08/01/Winston-Navigation-Project-Definition-Document.html) I wrote for data science was extremely ambitious, requiring a pathfinding system that dynamically controls each leg. A significant amount of modern quadruped robots do not have any kind of dynamic movement because it is extremely difficult. Implementing this pathfinding system would involve at least months of research, which is time I do not have. It is just not realistically achievable in 5 days.

##### Option 2: Implement pathfinding using non-dynamic gait

This option involves using a simpler pathfinding model that would not involve individual leg control. A path would be made for Winston's entire body, and then a premade walking pattern (gait) would control the robot movements. Winston would then be able to navigate around obstacles such as a wall, or ledge, but would not be able to traverse difficult terrain such as stairs.

This compromise still leaves me to create a 3D pathfinding system based on a 3D point cloud. The algorithm behind 3D pathfinding is simple (I can just use A*), the difficulty comes with determining suitable nodes to traverse. The point cloud represents solid objects, some are traversable, and some are not - so the traversable nodes must be sorted out algorithmically. Additionally, the point cloud may not be dense enough to create the cheapest path, and therefore additional interpolated points may need to be added. These issues may take a significant amount of time to solve, especially considering I still need to polish the stereo vision system. This could end up compromising the final quality of the stereo vision system, which has a big impact on the quality of the final product.

##### Option 3: Scrap pathfinding for something else

This option would involve completely backflipping on pathfinding, and instead try to do an easier project. My best option for an easier project is to continue working on the stereo vision system, and redefine what part of the project is for data science, and what part is for mechatronics / robotics. The stereo matching is done using a pre-trained [IGEV](https://github.com/gangweiX/IGEV) model - I did not create the model, and I do not fully understand how it works, I just know from research that it works well. Instead of just using someone else's model without understanding how it works, I could try and understand at least some of it. I think it would be possible for me to learn how a convolutional neural network (CNN) works, and implement my own model in place of a cost function (i.e. [MC-CNN]({{site.url}}/2023/09/18/Modern-Stereo-Matching.html#breakthroughs-in-stereo-matching)). PyTorch makes neural networks significantly easier, so I would just need to understand how CNNs work, and then implement the 'Siamese' MC-CNN model.

##### Option 4: Submit the project in its current state

My last option is to submit the projects as they are currently. Doing this would require me to say some of the work I have been doing for robotics was for data science. I would likely change the less important sections to data science, which includes undistortion, the calibration process, the math for generating a 3D point cloud from a disparity map, and my research into more advanced stereo matching algorithms. This would leave mechatronics / robotics with the camera housing design, the work I did into Harris corner detection, and my research and old implementation of block matching. Doing this would mean I would likely get a much lower mark, I am not entirely up to date with the task criteria, but I think this would be a significant decrease in quality. I also know that my classmates have some very impressive projects, and mine probably needs more work to be the best. It is nice to have this option as a last resort at least.

##### Conclusion

I am not entirely sure which option to go with. If I work really hard over the next few days I could probably achieve option 2 or 3, but I am not sure that I am healthy enough to subject myself to that yet. Option 3 is likely easier than option 2 as I have already done a lot of research into CNNs, but it still might be too much for me. I am going to try and get outside opinions on this, because I cant afford to push myself too hard anymore. It sounds completely backwards, but if I try too hard and burn myself out again, then I might not get an ATAR at all. I would really love to be able to do option 2 or 3 and see Winston flourish, but I also need to consider what is best for me.