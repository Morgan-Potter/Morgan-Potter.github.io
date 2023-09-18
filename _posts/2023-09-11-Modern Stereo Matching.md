---
tags:
    - "Robotics / Mechatronics"
    - "Winston"

excerpt: SAD and SSD are bad, so what is better?
---

#### What I have been doing

Over the past 6ish months I have been building up fundamental knowledge that is required to make stereo vision work. The whole premise so far has been on understanding the most basic block matching method so that I can read more papers and understand new stereo matching techniques. Stereo vision is a solved problem in that there is a mathematical expression that converts disparity to depth, and depth to 3d-coordinates, however stereo matching is a highly dynamic field with a large amount of research going into it. The papers I have been interested in are aiming to improve on traditional block matching by altering the baseline algorithm, or by finding a better cost function. Implementing these improvements will be crucial for Winston, as my current implementation of block matching is highly [inaccurate, and unoptimised.]({{site.url}}/2023/08/08/block-matching.html)

##### "Breakthroughs" in stereo matching

The stereo matching research community lay relatively dormant until fairly recently, as LiDAR is already a tested solution for accurately mapping 3d environments. The paper that really started to push the progression of stereo matching techniques outlined a "multichannel convolutional neural network" (MC-CNN) as a matching cost function, which showed significant improvement over more conventional cost functions. The neural network is trained on large datasets containing the stereo images and the ground truth (i.e. the actual disparity map) found with LiDAR. An example data point can be seen below.

| Left Image | Right Image |
| --- | --- |
| ![Left Image]({{site.url}}/assets/Modern-Stereo-Matching/imgleft.jpg) | ![Right Image]({{site.url}}/assets/Modern-Stereo-Matching/imgright.jpg) |

| Result |
| --- |
| ![Disparity]({{site.url}}/assets/Modern-Stereo-Matching/leftdisp.jpg) |

[(Scharstein et al., 2014)](https://www.cs.middlebury.edu/~schar/papers/datasets-gcpr2014.pdf)

The exact details of how the MC-CNN model functions is rather complex, but I have a baseline understanding of how it works. 

A training dataset is made that contains both positive and negative stereo blocks, positive meaning the blocks are a matching pair, and negative meaning the blocks are not matching. This dataset is made by choosing positive and negative blocks from a stereo image dataset. The network architecture is a 'Siamese' network, meaning there are two convolutional neural networks that share weights, and correspond to the left and right image blocks, which are then combined into a cost with rather another neural network, or with cosine similarity.

A convolutional neural network consists of a number of convolution layers, each with a kernel of rectified linear units (ReLUs). The result of each layer is parsed into the next layer to extract more detailed information about the image - and to progressively make it smaller (when stride length is above 1). There is also a pooling layer which lowers computational complexity by reducing the size of the final convolution. This is done by essentially doing another convolution, but instead of doing a [Hadamard product](https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29) with a kernel, you typically just take the max value of the block. The CNN used on the left and right image block will result in a matrix that can be flattened into a vector, where cosine similarity can be computed to get the matching cost. This is a fast method of computing the matching cost, you can also use another more conventional neural network to get the final matching cost, which is more accurate but takes more time to compute.

##### Improving the MC-CNN

The MC-CNN was indeed a breakthrough in stereo matching, however it was very slow to compute and still had significant error involved. In the last 8 years, many papers have been released that improve on these elements. One such example includes adding hierarchical matching, which was already an established technique but had not yet been applied to a MC-CNN.

Hierarchical matching involves scaling the input image down into a number of levels, where stereo matching is computed at each level. The benefit of this is that it reduces computation time as matches in the lower resolutions levels can be used as a starting point for higher resolution levels. This lower computation time allows for much larger images to be used for matching, which is always beneficial as it adds more detail to be compared, hence improving performance. This hierarchical structure was implemented in a number of papers, most notably in [PSMNet](https://github.com/JiaRenChang/PSMNet), and more wholistically in ["high-res-stereo"](https://github.com/gengshan-y/high-res-stereo).

These papers tend to follow a timeline of a team introducing a new way to improve stereo matching, and then another team taking that paper, and combining it with a suite of modern matching techniques to create the best model available. The "high-res-stereo" model focused on stereo matching high resolution images, however it was more of a collation of good matching techniques rather than a presentation of something new (although it is still a great paper). These models show good improvement and are very impressive, but they do not add many additional techniques to the table. PSMNet on the other hand had a fairly conventional implementation of a MC-CNN, however it added hierarchical matching, which showed significant improvements over the current techniques.

##### What does this mean for Winston?

As outlined in the project definition documents, Winston should be able to compute depth and path find in real-time, as to navigate complex environments, on the fly adjustments will need to be made. Additionally, Winston needs an accurate map of the environment, otherwise the pathfinding nodes will not represent real objects. This means a compromise between accuracy and speed needs to be made - the question is, where do you draw the line?

#### Reflection

##### Are you planning on implementing your own model?

This is a rough question. I only have ~ 6 weeks before the project is due so I need to structure my time wisely. If I do decide to make my own model it would not be nearly as good as what researchers have made, as I would only have time to make a simple model that would help me understand the MC-CNN paper - I barely understand neural networks in general, let alone an abstract implementation of a convolutional neural network. Utilizing a pre-made model has significant benefits to consider, the original plan for Winston was to have him navigating his environment by PyCon, but he cannot even see yet. It was rather naive of me to think that stereo matching was a solved problem.