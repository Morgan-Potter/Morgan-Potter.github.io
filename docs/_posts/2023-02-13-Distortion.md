---
tags: 
    - "Robotics / Mechatronics"
excerpt: "Overcoming camera distortion in computer stereo vision systems."
---

This week in robotics / mechatronics I was essentially given free rain to do research for my project in term 2. In year 11 I missed a significant amount of term 4 due to ilness and was unable to complete my planned project on stereo vision. Considering this, I thought it would be best to continue on with stereo vision this year, as it could culminate into a very impressive final project. I have previously discussed my plans for stereo vision in this blog, however there are more requirements in the new practical project meaning I will have to alter my plans slightly.

Originally I was looking to create a stationary camera system that could map out a 3d environment by measuring the relative location of objects, and turning those points into 3d geometry. The new practical project task requires some physical interaction with the real world, like with a motor for example. My plan is to extend the stereo vision into a practical application - a computer vision rover comes to mind first, however it could be something as simple as a servo that can accurately hit a button. This will be something that I can look into next term, as the stereo vision system will be extremely similar in any practical application.

As with most "solved" problems, there is seemingly endless research into correcting lens distortion. Deciding on a method is difficult as distortion correction is a large factor into the success of a stereo vision system. There are many types of distortion, however the major two are radial and tangential distortion. Radial distortion causes straight lines to appear curved, becoming larger at father points from the image center with positive radial distortion, or the opposite with negative. This effect is highlighted in the below image where the straight red lines do not line up with the radially distorted checkerboard lines.

![Radial Distortion]]({{ site.url }}/assets/Distortion/radial_distortion.jpg){: .full}

Tangential distortion is commonly associated with the de-centering of an image plane, i.e. where the image is skewed from its regular positioning. This is highlighted in the below image where the yellow image plane is skewed from the grey plane. 

![Tangential Distortion]]({{ site.url }}/assets/Distortion/tangential_distortion.png){: .full}
