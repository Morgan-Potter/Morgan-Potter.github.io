---
tags: 
    - "Robotics / Mechatronics"
---
### Work I Completed

Unfortunately this week I have been away from school for 3/5 days. In this time, I had the opportunity to work on my Literature assignment, which became a priority after I found out PeCan was on this weekend. During the week, the only thing IT related I have done is consider the options for my practical Robotics project next term. This is a rather large decision to make, as I want to keep improving this project in further tasks, so at the end of year 12 I will have something very advanced. It is difficult to justify improving my last robotics project, as the ultrasonic sensor is just too inaccurate. I can however use a different technology to achieve the same goal, only better.

Computer stereo vision uses two cameras to compute depth similar to how humans do. The beneficial thing about stereo vision over ultrasonic sensors is the camera's wide field of view, meaning a 3d environment can be mapped out with relative ease. The downside to stereo vision is that it is much more computationally complex than ultrasonic, mainly due to image processing. To my knowledge, an Arduino is not powerful enough to handle stereo vision - a more powerful single board computer would be required, the most common of which being the Raspberry Pi. I own two small USB cameras, and a Raspberry Pi 4b 4Gb which would be perfect for stereo vision. In the future I plan to add object detection and path finding to the vision model, and a Raspberry Pi 4 should be powerful enough for this.

There are many complexities that I will have to understand to map a 3d environment with stereo vision. At this point in time, I only understand how it works conceptually - I have no code or calculations to show. The concept of stereo vision is based on the same triangulation method I learned in year 9 math - if you have two angles and one side, you know every side of a triangle. When calculating the distance to a given pixel, you know two angles as the cameras are positioned at a known angle to each other, and you know one side as the distance between the cameras is known. Below is a visualization of this concept:
<figure style="display: block; width: 50%; margin: 0 auto; text-align: center;">
<img src="/assets/Computer-Stereo-Vision/Stereo_Vision_Visualization.png" >
<figcaption>(<a href="https://en.wikipedia.org/wiki/Computer_stereo_vision#/media/File:Stereoscopic_images,_depth_to_displacement_relationship_assuming_flat_co-planar_images..png">"ThePigDog"</a>, 2014)</figcaption>
</figure>

In this diagram, light from point A is transmitted through perfect pinhole cameras B and D and onto image screens E and H. Triangles ABC and ACD are similar, and therefore BC and CD can be found from baseline BD. All internal angles are known due to the two camera angles ABC and ADC, and hence distance C can be found.

The difficulties with stereo vision stem from camera distortion. The lens of any camera used for stereo vision imposes a distortion to the image. This is problematic, as the light rays observed to the object become displaced, and hence the calculated distance to an object will be inaccurate. There is no camera without distortion, and hence to remove distortion, post-processing is required. Calculations for removing camera distortion are very complex and hard to understand, and considering the effect this will have on the calculated distance, it is worth devoting significant attention into this area.

Considering this project is going to be so big, I want to add my own flare to things. If I do not do this, I am essentially just creating an identical implementation of stereo vision to everyone else. I want to do something that makes it stand out - whether that is finding some optimizations, using stereo vision for a unique concept, or any of the other billion ways I could make it unique. I want to be the kid that creates some amazing product, and is bought out by the Australian Government. To do this I will have to do more than a standard implementation. 

### Reflection

#### Do you think this is achievable?

This is going to be extremely difficult to pull off - stereo vision certainly seems university level. I have however shown my ability to understand difficult algorithms, when doing my Perlin Noise implementation last year. Considering this, I think I will be able to do it, especially since I get very excited about challenge.

#### Will you consider other projects?

Stereo vision seems like an appropriate project, however I have not really explored other options yet. Looking at other possibilities for projects may present a much more lucrative project in terms of the end product. It is quite a large decision to make without much time to make it (due to other assignments) but I still it is worth browsing other options, even if it is not in detail.