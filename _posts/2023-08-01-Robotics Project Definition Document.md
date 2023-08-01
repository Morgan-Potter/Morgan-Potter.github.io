---
tags:
    - "Robotics / Mechatronics"
    - "Winston"
---

This blog post is the project definition document for Winston's computer vision systems. A project definition document is a school assessment item that defines the project I am doing for robotics this semester. Note that the template for this document was designed to be completed by a team, however our team divided work into sub-systems, so each of us are filling in separate documents. If you are interested, there is another [project definition document for Winston's navigation systems.]({{site.url}}/2023/08/01/Data-Science-Project-Definition-Document.html)

#### Project Definition Information

| Project Name: | Winston Computer Vision Systems |
| --- | --- |
| Project Team: | Morgan Potter |
| Mentoring Teacher: | Mr. Edwin Griffin |
| Proposed Project Start Date: | 17/07/2023 |

#### Project Idea

Winston is a quadrupedal robotic system capable of mapping and navigating complex environments. When complete, Winston should be a highly versatile system that can be molded to autonomously complete complex tasks. For example, with a 6DOF robotic arm attachment, Winston could deliver food to customers in a restaurant. In addition to this versatility, Winston is an order of magnitude less expensive than competing systems such as Boston Dynamics' Spot, making Winston accessible to a much larger demographic. This drastic reduction in cost is achieved through the use of FDM manufacturing of custom parts, and the use of consumer grade electronic components.

Winston is the combination of many sub-systems working in tangent. Each sub-system is being developed by a different team member so each member can work to their individual strengths. I am developing Winston's computer vision systems. The goal of the computer vision sub-system is to make a 3D map of Winston's environment, that is highly accurate and computationally efficient. To achieve this, I will be using computer stereo vision.

#### Project Purpose

The vision sub-system will give Winston the information to navigate to specific locations in the real world, making the user confident that any movement command given to Winston will be executed accurately. The vision sub-system is therefore crucial for navigating difficult terrain such as stairs, uneven ground, or even a maze as the navigation systems need reliable real-world information.

#### Team Member Capabilities

| **Team Member** | **Capabilities** |
| --- | --- |
| Morgan Potter | Knowledge of Python and Fusion 360.<br>Experience with Computer Vision, and 3D-Printing |

#### Project Outcomes/Requirement Objectives

| **Outcome** | **Description** |
| --- | --- |
| Create camera housing | Create a custom camera housing that attaches to the robot chassis and maintains the desired position of each image plane. |
| Undistort Image | Use calibration techniques to remove tangential and radial lens distortion from both images, such that each observed pixel can be considered to perfectly represent an incoming light ray. |
| Correspond pixels | Use an algorithm on the captured image pairs to find pixels that represent the same object in real space. Ideally match every pixel in both images. |
| Create a depth map | Use the displaced view of each image plane to compute the depth of each previously matched pixel. |
| Ensure accuracy | Tweak the vision systems until a suitable accuracy for terrain navigation is achieved. |
| Format data | Coordinate with Josh to format the observed depth map in a way that can be easily transmitted to a server and displayed on a website. |
| Compute in real-time | Reduce the time it takes to create a depth map by enough that someone could comfortably view the program output in real-time. |

#### Initial Scope of the Project

| **In Scope** | **Out of Scope** |
| --- | --- |
| Using image processing to improve stereo matching | Deep learning enhanced stereo matching |
| Creating a depth map from stereo camera disparity | Pathfinding through the created environment. |
| Computing in real-time | Computing at 60 frames per second. |
| Sending the result to a server to be displayed | Programming the software to display the depth map in 3d on a website. |

#### Time Objective

The timeframe for this project is: 6/08/23

#### Parties Involved

| **Party** | **Involvement** |
| --- | --- |
| PyConAU Audience | Broad feedback on the project and presentation to improve it in future. |
| Userbase | Can test and review the accuracy of the vision systems. |

#### Constraints

| **Constraint** | **Impact on Project Success**** (High/Med/Low)** |
| --- | --- |
| Use of the little computing power available on the Raspberry Pi 4b+ | High |
| Time constraints – project and presentation must be complete by the 18th of August at the absolute latest. | High |
| Programming in a team – making my code succinct, efficient, and readable. | Med |
| Images captured have separate controllers for auto focus, exposure, and white balance creating additional variation. | Low |

#### Feasibility

| **Skill Required** | **Resource with skill / capability** |
| --- | --- |
| Multi-threading / GPU acceleration | Asyncio and PyOpenCL Python libraries.<br>PyCUDA if processing is offloaded to the server. |
| Time management strategies | Physical Calendar. |
| Good Programming Habits | The Zen of Python.<br>Me. |
| Learning computer vision algorithms | Me, assisted by Wikipedia, university lectures, textbooks, journal articles etc. |
| Design and manufacturing skills for the camera housing | Pen and Paper.<br>Fusion 360.3d-Printing.<br>The design process. |

Feasibility Scale: 70%

#### Roles & Responsibilities

| **Team Member** | **Roles / Responsibilities** |
| --- | --- |
| Morgan Potter | Everything.Coordination with other team members to connect projects. |


#### Initial Issues

| **Issue** | **Description** |
| --- | --- |
| School Absences | I regularly miss school for personal reasons, which impacts the project if I need assistance or need to coordinate with the team. |
| Testing on Raspberry Pi 4b+ | I can only test my code on Winston's hardware at home, as I need a monitor – SSH is an option, however I still need a display to configure the Pi's network settings. |

#### Risks

| **Risk** | **Description** | **Impact of Risk(L M H)** | **Mitigation / Reduction** |
| --- | --- | --- | --- |
| Loss of data | Project files get lost, deleted, or corrupted. | H | Make consistent commits to the project GitHub repository. Keep a backup of any local changes. Ensure file changes have been saved. |
| Conflicting assessment | One or more team members must commit their time to other assessment items. | M | Make sure each team member considers this project their main priority, as this project is being presented at a national conference. Ask for special considerations on other tasks. |

#### Deliverables, Timeframes and Dependencies

Timeframe estimate: Two weeks (5 days remaining)

| **Deliverable** | **Duration** | **Completion Date** | **Dependencies** |
| --- | --- | --- | --- |
| Stereo Camera Housing | 3 Days | End Week 1\* | CAD Model Completed.<br>Assembly is 3D-Printed. |
| Camera Calibration | 1 Day | Mid Week 2\* | Calibration images taken.
 Camera matrix and distortion coefficients computed. |
| Pixel correspondence algorithm | 1-2 Days | Mid Week 3 | Determine if image rectification is required.Block similarity metric chosen.
 Block matching algorithm chosen and implemented. |
| Depth map created | 1-2 Days | Late Week 3 | Camera matrix used to convert pixels to distance on image sensor.Triangulation algorithm implemented. |
| Real-time computation | 2 Days | End Week 3 | Implement multi-threading, and/or GPU acceleration. |

\*Deliverable is already complete