
<h3>Work I Completed</h3>

During this week, I have been away from school for 3/5 days. It was unfortunate that I took so many days off school, as I did not have time to do IT classwork. There is a whole load of new content that I will need to catch up on in both robotics/mechatronics, and data science. During the week, I did complete some IT related work, however it was not academic. In preparation for the end of the 2022 NRL season, I decided to try and collect NRL Fantasy data on the teams of each coach, for every round. A NRL Fantasy coach is a competing NRL Fantasy user who makes their own team. Each NRL player on a coaches team scores NRL Fantasy points, which when added together determine the coaches score for a given round. I am trying to download the teams and scores of every coach, for every round. There are around 204000 coaches, and there are 25 rounds, meaning around 5000000 teams (assuming every coach started at round 1). With this data, I would be able to analyse the patterns between the most successful teams, and understand how to do better next season. Additionally, this counts as a big data set and it could be used for my data science class work.

On the official NRL Fantasy website, when looking at the rankings of coaches you can individually view each coaches team for each round. Obviously I was not going to manually write down the 5000000 teams, so I found out where the data came from. When requested, the server sends a JSON file containing a coaches team for given round. My plan was to send a HTTP request and download every individual file using python. 

My first issue with this was that the server was blocking my HTTP requests. This was because I was not requesting the files using the required session cookie to validate I had logged in. Apparently only users can access this info, despite it being free to be a user. To download the file, I had to log into NRL Fantasy and then copy the session cookie into python.

Now that I could start downloading files, I quickly realized that it was going to take forever to download 5000000 JSON files using HTTP requests. It took about 5 minutes to download 2400 files - meaning it would take roughly 170 hours to download the full 5 million. I was worried that letting a python file run for this long would cause some issue, like the session cookie running out. My solution to this issue was to use multithreading. In my current implementation, I am using 200 threads to download the files 200x faster, which would still take about 50 minutes. Below is my implementation.

{% highlight python %}

round = int(input('Rounds: ')) # get the desired rounds
session = input('Session Cookie: ') # get the session cookie

def thread(round, session, start, fin):
    for coach_id in range(start, fin): # loop over the assigned coaches
        for i in range(round+1): # loop over all specified rounds

            # make http request for particular coach and round
            coach = requests.get('https://fantasy.nrl.com/nrl_classic/api/teams_classic/show?id=' + str(coach_id) + '&round=' + str(i), cookies={'session': session}).text

            # this is leftover code from when i was not using threads
            #if json.loads(coach)['errors'] != []:
                #running = False
            
            # save the file to a given directory with utf-8 encoding
            with open(r'folderForData\id_' + str(coach_id) + '_round_' + str(i) + '.json', 'wb') as f:
                f.write(bytes(coach, 'utf-8'))
start = 0
fin = 0
for i in range(1, 201): # loops over all 200 threads
    fin += 1022 # assigns finishing value (total coaches / 200)
    threading.Thread(target=thread, args=(round, session, start, fin)).start() # creates and starts individual thread
    start = fin # makes the next starting value the previous finish value

{% endhighlight %}

Once I have succesfully downloaded all of the files, I will then merge them into one big JSON file for easier access.

<h3>Reflection</h3>

<h4>What can you do now to navigate the road ahead with the most success?</h4>

My plan is to catch up on my IT work during the next week, and actually have something academic to talk about during next week's reflections. Hopefully, I will be able to make some visualizations on the NRL Fantasy data. 

<h4>Could you have done more?</h4>

During the past week I have been mainly focusing on my ANU Discovering Engineering assignment, which was due on Friday. It took all of my time to finish that assignment - mainly because I kept second guessing myself about whether my answers were correct. If I was more sure in my ANU assignment answers, I definitely would have had more time to do IT stuff, however my assignment may not have been as polished. My perfectionism can often cause time issues, however it is a main driving factor for the quality of my work. 

