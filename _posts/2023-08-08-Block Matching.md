---
tags:
    - "Data Science"
header:
    overlay_image: '/assets/Block-Matching/disparity-map.png'
---

#### What I have been doing

Following me [re-planning how to implement stereo vision in Winston]({{site.url}}/2023/07/31/Rethinking-Stereo-Vision.html), I have been working on code for a block matching algorithm. Currently, I have an implementation that works - however, it is not real-time even while using the multiprocessing library to pin my R9 5900HX at 100% usage.

#### How block-matching works

Block-matching is a well established image processing technique that is used to determine which pixels represent the same object in an array of images. This is needed in computer stereo vision, as the cameras are displaced, meaning the pixel positions will also be displaced. Block-matching is a dense matching technique, meaning that it aims to match every pixel between the images - giving a high amount of detail. It is fairly simple to understand.

Block matching can be broken into two separate components, the iterative algorithm, and the difference function. 

The iterative algorithm involves looping over the images in some way to create a set of pixel blocks to compare. The most accurate iterative algorithm is an exhaustive method - i.e. iterating over all possible combinations of pixel blocks. This means every pixel in image A will iterate through every pixel in image B, meaning if both images are \\(640\*480\\) pixels, there will be \\((640\*480)^2\\), or \\(94371840000\\) iterations. The difference function is called in every iteration to compare the blocks.

The difference function takes two blocks of pixels, and determines the overall difference between them. This can also be described as a matching cost. The most simple function is SAD, or sum of absolute differences - which just involves adding the difference between each pixel in each block. The formula is below:

\\[
    \sum_{(i,j) \in B} |i_1(i,j) - i_2(i+x,j+y)|
\\]

Where \\(i_1\\) and \\(i_2\\) are the two images, \\(B\\) is the block in image one, and \\(x\\) and \\(y\\) represent the pixel offset between the block in image one, and the block in image two. Often the result of the SAD algorithm is a fairly small number, making it difficult to find distinguished matches (as all the numbers are very similar). To rectify this, the sum of squared differences (SSD) algorithm can be used, which simply replaces taking the absolute value of each pixel difference, to squaring each pixel difference. The formula is below:

\\[
    \sum_{(i,j) \in B} (i_1(i,j) - i_2(i+x,j+y))^2
\\]

Once the difference between a pixel in image A, and every pixel of image B have been computed, the pixel combination with the lowest difference is chosen to be a match. 

#### My implementation

In this stereo vision implementation, the cameras are only displaced horizontally - meaning that the pixels only differ along each row. This means that there is no need to look for pixel matches with a vertical displacement, as they do not exist. My implementation is therefore based on the below pseudocode.

<pre><code class="language-plaintext hljs" style="white-space: pre-wrap;">for every row in image A:
    for every pixel in imageA[row]:
        for every pixel in imageB[row]:
            difference = SSD of block1, block2
        add (row, pixelA, pixelB, lowestDifference) to matches
</code></pre>


My method for finding the lowest difference value is to create a variable called lowest, and modify it if the new difference is lower than the current lowest difference. I also decided to allow a variable block size, meaning additional loops are needed to iterate through every pixel in the block. Additionally, I added a mapping function to convert the disparity values (-480-480), to pixel brightness values (0-255). My code is below:

<pre><code class="language-python hljs" style="white-space: pre-wrap;">def match_images(img1, img2, block_size: int) -> list:
    """ ## Returns a disparity map image """
    # Ranges computed now instead of every iteration
    block_max = int(block_size/2)
    img1x = range(block_max, len(img1[0]) - block_max) # range shortened so block does not include undefined points
    img2x = range(block_max, len(img2[0]) - block_max)
    block = range(-block_max, block_max + 1)# e.g block_size = 5, matrix will be [-2, -1, 0, 1, 2] ** 2
    out = []
    row = []
    for j in img1y:
        for i in img1x:
            lowest_tot = float('inf')
            for x in img2x:
                total = 0
                for wy in block:
                    for wx in block:
                        total += (int(img1[row + wy][i + wx]) - int(img2[row + wy][x + wx]))**2
                if lowest_tot > total:
                    lowest = x
                    lowest_tot = total + 1
            row.append(_map((i-lowest), -len(img1[0]), len(img1[0]), 0, 255))
        print('row', row, 'complete')
        out.append(row)
    return row
</code></pre>

I have only been able to test this code on one scene, however the results are fairly promising. See below:

| Disparity Map (disparity represents depth)|Source image|
| --- | --- |
|![Disparity Map]({{site.url}}/assets/Block-Matching/disparity-map.png)|![Source Image]({{site.url}}/assets/Block-Matching/source.png)|

There are some issues - some parts of the image are not shared across both cameras, and hence the matched pixel is not accurate, and the disparity values become fairly random. Additionally, sections with large blocks of color are difficult to match properly because there is no information to distinguish the blocks. These are innate problems with block matching, which I will consider solutions for in the future.

The most pressing issue for me right now is the performance of the program. To create even one depth map in reasonable time, I had to use multiprocessing - and the process still took a few minutes. To compute this in real-time some significant optimisations must be made.

#### Real-time computation

At this stage, there are two ways I can increase the speed of block-matching, by optimising the algorithm, or using more computing power.

By optimising the algorithm, I am mainly referring to lowering the total number of iterations. There are several block matching algorithms that yield lower total iterations. In terms of relative optimisation, think of my exhaustive implementation as like Dijkstra's algorithm - it always gives the most correct answer, but significant optimisations can be made. I am still in the early stages of optimisation, and hence I am going to take it in baby steps, so I can find a good middle ground between speed and accuracy. A simple way to optimise the algorithm is to add a threshold for what constitutes a match i.e. if difference < 10, a match is found. To best utilise this threshold, search should start at the left image point and move outward. This can significantly reduce the number of iterations, as the best match is often found close to the left image point. It is worth noting that lower threshold values are more precise, leading to more accurate results, but also can lead to more iterations. 

An adaptive threshold can be used to achieve high precision at points where the image has clear matches, and high speed at points where there are no clear matches. I am considering implementing this in two different ways - an adaptive threshold based on the previous matches' median cost, or lowest cost. It is basically a throw up between these two - median cost is influenced by all the cost values which can be a positive if you are looking for faster computation. A lowest cost adaptive threshold is more precise, but is effected harshly when the lowest cost is an outlier. The main issue with an adaptive threshold is that it means each match is dependant on the previous, meaning a parallel computing approach would be much more difficult to make work. 

This algorithm could also be made faster by using more computing power. Currently, I set up multiprocessing with 61 python processes running in parallel. This runs on the CPU, and still takes several minutes to compute one image - it also pins my CPU at 100% usage. The GPU is much better than the CPU at parallelisation, with the architecture made up of thousands of small cores, versus a few multipurpose cores. For this application, I am going to use CUDA for GPU parallelisation as it is optimised for Nvidia GPUs, and is general purpose. There is a CUDA python library, however any code running on the GPU has to be written in C++. 

#### Reflection

##### How are you going with the current workload?

I had a lot of catch up to do last week in terms of completing my IT reflections - whereas this week I had the opportunity to be on time again. I did not really have time though, because it was my 18th on Saturday, and I competed in Pecan+CTF2023, which ran over Saturday and Sunday. This left me in a bit of a slump of unproductiveness, which took a bit to get over. So I do not think this week was very indicative of my tolerance to the current workload, however it is good that I was able to have a break and then get back on the horse - which I have failed to do in the past.