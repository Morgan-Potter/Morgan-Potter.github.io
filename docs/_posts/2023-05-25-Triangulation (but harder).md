---
tags:
    - "Robotics / Mechatronics"
    - "Winston"
excerpt: "A story of how research makes seemingly simple algorithms annoyingly complex."
header:
    overlay_color: "#000"
    overlay_filter: "0.5"
---

Now that I have developed a solution to the [correspondence problem]({{site.url}}/2023/04/26/Harris-Corner-Detection.html), I can start the actual triangulation process and get some distance values. You would think this would be a trivial process - you find the 3d vector from the center of the baseline between the two image planes to the pixels selected to correspond with each other using simple trigonometry, and then find the x, y and z components of the vector. This is a part of the process, however the values generated from this are inaccurate, as there are many factors with the camera that cause distortion of the light rays (even with a distortion corrected image), and therefore further estimations have to take place. This can be done through many methods, however a prominent solution is to compute a projection matrix for each camera, which is then used to find the distance vector to a point on the 2d image plane of either camera, and then the intersection of these vectors is calculated (which is the point in 3d space). This method is called multi-view geometry.

To compute proper triangulation, you first have to calculate the intrinsic camera matrix, which is described in a [previous blog post]({{site.url}}/2023/02/13/Distortion.html). The method for finding this matrix using OpenCV is also detailed in that post. Using this matrix, an estimation of the projection matrix is calculated by first finding the inverse of the intrinsic camera matrix (K). Note this must be done for both cameras in the stereo configuration.

\\[
K = \begin{bmatrix} f_x & 0 & c_x \\\ 0 & f_y & c_y \\\ 0 & 0 & 1 \end{bmatrix}
\\]

Where \\(f_x\\) and \\(f_y\\) are abstractions of the camera focal length given in mm (F), and the number of mm/pixel in the x and y resolutions respectively (\\(s_x\\) and \\(s_y\\)). It represents the focal length in terms of pixels, instead of millimeters.

\\[f_x = F / s_x \\]
\\[f_y = F / s_x \\]

\\(c_x\\) and \\(c_y\\) is the principal point of the image - which is the point where the image center aligns with the image plane (the image plane is the photo being captured). The principle point is not trivial to find as the camera lens bends the light rays, so it is not always in the direct center of the sensor (i.e. x resolution / 2, y resolution / 2). The principal point is approximated in Open CV by taking an image of a grid, and finding the point at which the distortion is the lowest i.e. where the grid is the closest to its real world size (as lens distortion is a function of distance from the principal point). When distortion has already been reversed however, you can just take the center point of the sensor.

The projection matrix is calculated from the camera matrix by adding information surrounding the cameras position in real space, including the rotation matrix and the translation matrix. The rotation matrix reperesents the rotation of the indiviudal cameras with respect to the world coordinate system, i.e. it is a matrix used to convert the camera axes (x,y,z) to the real world axes. The translation matrix describes the cameras position in the real world, which can be used to know the displacement between each camera. The translation matrix must also be changed if the camera array is moved in real space, and you want to merge captures of the environment.

The rotation matrix can be calculated fairly easily by finding the angles between the real world axes and the camera axes, i.e. measure the cameras angle relative to the floor. This can also be done with gyroscope or similar rotational sensor by moving the sensor from the real world axes to being rotated to the camera axes, and measuring the difference. From these values \\((\\theta_x, \\theta_y, \\theta_z)\\) the rotation matrix can be computed.

\\[R = \\begin{bmatrix}
\\cos(\\theta_y)\\cos(\\theta_z) & -\\cos(\\theta_x)\\sin(\\theta_z) + \\sin(\\theta_x)\\sin(\\theta_y)\\cos(\\theta_z) & \\sin(\\theta_x)\\sin(\\theta_z) + \\cos(\\theta_x)\\sin(\\theta_y)\\cos(\\theta_z) \\\
\\cos(\\theta_y)\\sin(\\theta_z) & \\cos(\\theta_x)\\cos(\\theta_z) + \\sin(\\theta_x)\\sin(\\theta_y)\\sin(\\theta_z) & -\\sin(\\theta_x)\\cos(\\theta_z) + \\cos(\\theta_x)\\sin(\\theta_y)\\sin(\\theta_z) \\\
-\\sin(\\theta_y) & \\sin(\\theta_x)\\cos(\\theta_y) & \\cos(\\theta_x)\\cos(\\theta_y)
\\end{bmatrix}\\]

