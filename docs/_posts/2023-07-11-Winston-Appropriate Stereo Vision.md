---
tags:
    - "Drafts"
excerpt: "Maybe it's time to slow down and think about which stereo vision method is the best for winston."
header:
    overlay_image: "/assets/NCSS-Challenge-2023/cover.png"
    overlay_color: "#000"
    overlay_filter: "0.5"
---

As previously discussed on this blog, I am in the process in creating the computer vision system for W.I.N.S.T.O.N the robot dog. Quite naively, I previously approached this by looking through various wikipedia articles and randomly choosing an approach to map winstons environment. My research into this approach can be read on this blog. The approach I happened apon was not suited to a robotic dog application for a few reasons. 

Sparse v.s. Dense matching:

There are two ways to approach finding correspondence in the stereo images, sparse and dense. Sparse correspondence matches a few distinctive features between the stereo images, whereas dense correspondence aims to match each individual pixel between the stereo images. My previous approach to the correspondence problem was to use harris corner detection to find matching corners between the two images. This method is considered a sparse matching method, as it matches a few distinctive features i.e. the corners. Sparse correspondance does not apply very well to winston when you think further into the project. One of the goals for winston is to traverse/avoid difficult terrain. To be able to do this a high resolution 3d model will have to be created to ensure that the terrain that winston wants to traverse is actually there, and is reperesented properly. Sparse correspondence provides a very low resolution 3d model, as there are significantly less points to work with, and bold assumptions would have to be made surrounding how points connect to each-other. A dense correspondence approach provides depth at the pixel level, meaning there will be significantly more information about the terrain. Additionally, the correspondance at a pixel level can be converted directly into a height map meaning there is no need to make assumptions about what points connect together.

Depth Calculations:

Previously as discussed in this blog I was using a method for depth calculations called multi-view geometry. This involves the use of a number of matricies to determine the depth of an image, and is discussed further in [this blog post.]('https://morgan-potter.github.io/2023/05/25/Triangulation-(but-harder).html'){:.underline} This method essentially does a calculation of distance using the internal camera paramaters of both cameras, and then estimates the intersecting point of both distance vectors to get the real-world distance. This is a very complex method, involving a number of camera concepts I do not understand, however there is a far easier method which creates similar results. Depth can also be calculated by determining the disparity between the two images