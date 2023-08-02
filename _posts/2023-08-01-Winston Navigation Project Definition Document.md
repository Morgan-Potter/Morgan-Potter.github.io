---
tags:
    - "Data Science"
    - "Winston"
toc: true
---

This blog post is the project definition document for Winston's navigation systems. This project definition document is a school assessment item that defines the project I am doing for Data Science this semester. Note that the template for this document was designed to be completed by a team, however our team divided work into sub-systems, so each of us are filling in separate documents. If you are interested, there is another [project definition document for Winston's computer vision systems.]({{site.url}}/2023/08/01/Winston-Computer-Vision-Project-Definition-Document.html)

#### Project Definition Information

| Project Name: | Winston Navigation Systems |
| --- | --- |
| Project Team: | Morgan Potter |
| Full Project Team: | Morgan Potter (computer vision and navigation), Samuel Sidebotham (Physical design and inverse kinematics), Joshua Kisnorbo (Website and object detection) |
| Mentoring Teacher: | Mr. Edwin Griffin |
| Proposed Project Start Date: | 17/07/2023 |

#### Project Idea

Winston is a quadrupedal robotic system capable of mapping and navigating complex environments. When complete, Winston should be a highly versatile system that can be molded to autonomously complete a wide range complex tasks. For example, with a 6DOF robotic arm attachment, Winston might deliver food to customers in a restaurant. In addition to this versatility, Winston is an order of magnitude less expensive than competing systems such as Boston Dynamics' Spot, making Winston accessible to a much larger demographic. This drastic reduction in cost is achieved through the use of FDM manufacturing of custom parts, and the use of consumer grade electronic components.

Winston is the combination of many sub-systems working in tangent. Each sub-system is being developed by a different team member so each member can work to their individual strengths. I am developing Winston's navigation systems. The goal of the navigation sub-system is to automatically create a set of instructions for Winston to execute that moves Winston from its current position to a specified destination. To achieve this, I will be using dynamic 3D path-finding for each leg through Winston's view of the world. This leg control algorithm may need to consider variables such as ground stability, quadrupedal gait, balance, and unexpected forces.

#### Project Purpose

The main purpose of the navigation system is to automatically plan individual leg control, meaning Winston can plan complex paths through rough terrain. This realizes the potential of quadruped robots versus more conventional wheeled robots, which cannot truly path-find in 3D. Additionally, this system simplifies the user experience by automatically planning the path to specified coordinates.

#### Team Member Capabilities

| **Team Member** | **Applicable Capabilities** |
| --- | --- |
| Morgan Potter | Knowledge of Python. <br>Experience with dynamic, and non-dynamic path-finding algorithms. |

#### Project Outcomes/Requirement Objectives**

| **Outcome** | **Description** |
| --- | --- |
| Define nodes | Use the computer vision system output to define a set of traversable nodes for Winston as a whole, and an additional set for each leg. |
| Pathfinding | Autonomously find the optimal path from the current position, to the destination through the set of nodes computed for Winston's full assembly. |
| Leg movement planning | Find an optimal node to place each leg that moves Winston along the defined path, considering the effect it will have on the rest of Winston's body. |
| Format data | Coordinate with Sam to format the navigation system output so it can be executed by Winston. |
| Compute in real-time | Reduce the time it takes to create / dynamically alter a movement plan so that Winston can move smoothly in real-time. |

#### Initial Scope of the Project

| **In Scope** | **Out of Scope** |
| --- | --- |
| Using data obtained from computer vision system | Creating and/or modifying the computer vision system |
| Determining the best place to move a leg | Determining the joint angles to put the leg in that position |
| Computing in real-time | Computing paths 60 times per second |
| Sending the result to a server to be displayed | Programming the software to display the path in 3d on a website. |

#### Time Objective

The timeframe for this project is: 3/08/23

#### Parties Involved

| **Party** | **Involvement** |
| --- | --- |
| PyConAU Audience | Broad feedback on the project and presentation to improve it in future. |
| Userbase | Can provide more thorough testing than me, and can provide suggestions / feedback. |

#### Constraints**

| **Constraint** | **Impact on Project Success (High/Med/Low)** |
| --- | --- |
| Use of the little computing power available on the Raspberry Pi 4b+ | High |
| Time constraints – PyConAU project and presentation must be complete by the 18th of August at the absolute latest. | High |
| Programming in a team – making my code succinct, efficient, and readable. | Med |

#### Feasibility

| **Skill Required** | **Resource with skill / capability** |
| --- | --- |
| Multi-threading / GPU acceleration | Asyncio and PyOpenCL Python libraries.<br>PyCUDA if processing is offloaded to the server. |
| Time management strategies | Physical Calendar. |
| Good Programming Habits | The Zen of Python.<br>Me. |
| Learning quadrupedal movement planning algorithms | Me, assisted by Wikipedia, university lectures, textbooks, journal articles etc. |

Feasibility Scale: 70%

#### Roles & Responsibilities

| **Team Member** | **Roles / Responsibilities** |
| --- | --- |
| Morgan Potter | Everything.<br>Coordination with other team members to connect projects. |

#### Initial Issues

| **Issue** | **Description** |
| --- | --- |
| School Absences | I regularly miss school for personal reasons, which impacts the project if I need assistance or need to coordinate with the team. |
| Testing on Raspberry Pi 4b+ | I can only test my code on Winston's hardware at home, as I need a monitor – SSH is an option, however I still need a display to configure the Pi's network settings. |

#### Risks

| **Risk** | **Description** | **Impact of Risk (L M H)** | **Mitigation / Reduction** |
| --- | --- | --- | --- |
| Loss of data | Project files get lost, deleted, or corrupted. | H | Make consistent commits to the project GitHub repository. Keep a backup of any local changes. Ensure file changes have been saved. |
| Conflicting assessment | One or more team members must commit their time to other assessment items. | M | Make sure each team member considers this project their main priority, as this project is being presented at a national conference. Ask for special considerations on other tasks if needed. |

#### Deliverables, Timeframes and Dependencies

Timeframe estimate: Four Days for PyConAU, 3-4 weeks for final presentation.

| **Deliverable** | **Duration** | **Completion Date** | **Dependencies** |
| --- | --- | --- | --- |
| Defining traversable nodes for Winston's whole body | 1 Day | End Week 3 | Computer vision data read.<br>Translated Winston's view into a birds eye perspective.<br>Determined non-traversable nodes based on height. |
| Pathfinding algorithm | 2 Days | Mid Week 4 | Set of traversable nodes read.<br>Initial path found.<br>Initial path altered as more world information is discovered. |
| Real-time computation of whole-body pathfinding | 1 Day | Mid Week 4 | Algorithms are optimized.<br>Computation acceleration techniques may be added. |
| Individual leg control | 3-4 weeks | ?? | Optimal gait considered.Force tolerance of surface considered.<br>Change in balance considered.<br>Force tolerance of motors considered.<br>Adjustment in response to unexpected outcomes considered.<br>Optimal path considered.<br>Optimizations for real-time computation made |
\*Deliverable is already complete