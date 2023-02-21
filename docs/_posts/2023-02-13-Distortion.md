---
tags: 
    - "Robotics / Mechatronics"
excerpt: "Overcoming camera distortion in computer stereo vision systems."
---

This week in robotics / mechatronics I was essentially given free rain to do research for my project in term 2. In year 11 I missed a significant amount of term 4 due to ilness and was unable to complete my planned project on stereo vision. Considering this, I thought it would be best to continue on with stereo vision this year, as it could culminate into a very impressive final project. I have previously discussed my plans for stereo vision in this blog, however there are more requirements in the new practical project meaning I will have to alter my plans slightly.

Originally I was looking to create a stationary camera system that could map out a 3d environment by measuring the relative location of objects, and turning those points into 3d geometry. The new practical project task requires some physical interaction with the real world, like with a motor for example. My plan is to extend the stereo vision into a practical application - a computer vision rover comes to mind first, however it could be something as simple as a servo that can accurately hit a button. This will be something that I can look into next term, as the stereo vision system will be extremely similar in any practical application.

As with most "solved" problems, there is seemingly endless research into correcting lens distortion. Deciding on a method is difficult as distortion correction is a large factor into the success of a stereo vision system. There are many types of distortion, however the major two are radial and tangential distortion. Radial distortion causes straight lines to appear curved, becoming larger at father points from the image center with positive radial distortion, or the opposite with negative. This effect is highlighted in the below image where the straight red lines do not line up with the radially distorted checkerboard lines.

![Radial-Distortion]({{ site.url }}/assets/Distortion/radial_distortion.jpg){: .full}
[(OpenCV, n.d.)](https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html){: style="text-align: center;"}

Tangential distortion is commonly associated with the de-centering of an image plane, i.e. where the image is skewed from its regular positioning. This is highlighted in the below image where the yellow image plane is skewed from the grey plane. 

![Tangential-Distortion]({{ site.url }}/assets/Distortion/tangential_distortion.png){: .full}
[(Steward, 2021)](https://www.tangramvision.com/blog/camera-modeling-exploring-distortion-and-distortion-models-part-i){: style="text-align: center;"}

These distortions are defined by functions of x and y in the below formulas

Radial Distortion
{: style="text-align: center;"}

\\[
x_{distorted} = x( 1 + k_1 r^2 + k_2 r^4 + k_3 r^6) 
y_{distorted} = y( 1 + k_1 r^2 + k_2 r^4 + k_3 r^6)
\\]

Tangential Distortion
{: style="text-align: center;"}

\\[
x_{distorted} = x + ( 2p_1xy + p_2(r^2+2x^2)) 
y_{distorted} = y + ( p_1(r^2+ 2y^2)+ 2p_2xy)
\\]

So to be able to calculate the tangential and radial distortion and hence reverse it, 5 paramaters need to be found which are called the distortion coefficients. These can be seen below.

\\[
Distortion \; coefficients=(k_1 \hspace{10pt} k_2 \hspace{10pt} p_1 \hspace{10pt} p_2 \hspace{10pt} k_3)
\\]

These coefficients are found by taking several images of a pattern (typically a checkered board), finding the corners of each box pattern and then calculating the disparity between the cameras image, and the real world difference. When considering the image to be flat (i.e z=0) if each box is an equal size, however there are different numbers of captued pixels in each box, this disparity can be calculated via the distortion coefficients. 

Fortunately instead of doing these difficult calculations, the opencv python library has a method for handling it. First