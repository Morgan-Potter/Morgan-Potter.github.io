---
tags: 
    - "Data Science"
    - "ref-gen"
---
<h3>Work I Completed</h3>

Over the past month I have been continually working on the Burgmann APA referencing generator website, and it is extremely close to completion. As discussed in my previous post about the topic, I learned how to code using HTML+CSS+JS specifically for this project, so I am quite excited about the progress. Two months ago I had completed the main HTML+CSS elements, and learned JS cookies. Now I have coded all the functional elements (replacing cookies with localStorage), but have yet to finalize the styling. I have also showed the working website to the schools librarian, and they are taking the website to the faculty heads to discuss how it could be used - hopefully they will officially support it. This project was such a big learning experience, I could honestly discuss it for 10,000 words, but I will try to condense it to main points.

<ol>
<li>From where I left off two months ago, I had to learn how to use JavaScript. I assume my use of JavaScript is improper, especially in regard to my random 'let' > 'var' ideology for variable assignment, however I found that it is very similar to Python. My normal problem solving approach to coding was not impeded by lack of functions - all the Python features I normally use are available via some means in Javascript. Switching languages merely involved googling the 'JavaScript equivalent' of a given Python feature. 
</li>
<br>
<li> My main trouble in coding the website came from generating a word document in a static environment. I now have a profound hatred for the docx.js module, as I struggled through the limited and inconsistent documentation with no real knowledge of using JS modules. The form of the module is similar to HTML in the creation of sections and subsections to place text. An example document is created with the below code:
<pre>
<code class='language-javascript'>const doc = new docx.Document({
      sections: [{ // Sections parent
        properties: {},
        children: [
          new docx.Paragraph({ // Paragraph parent
            children: [
              new docx.TextRun("Hello World"), // TextRun parent
              new docx.TextRun({
                text: "Foo Bar", // addressable properties 
                bold: true,
              }),
              new docx.TextRun({
                text: "\tGithub is the best", // TextRun parent
                bold: true,
              }),
            ],
          }),
        ],
      }]
    });
</code></pre>
Essentially each parent (e.g. sections, paragraph, textrun) has a multitude of addressable properties, and have children which inherit those properties (most of the time :/ ). Sections is similar to &lt;body&gt;, Paragraph is similar to &lt;div&gt;, and TextRun is similar to &lt;span&gt;. My code creates a list of individual paragraphs and then adds them to one final document which allows for more dynamic word documents compared to the above example.
</li>
<br>
<li> Although I dreaded the idea, I realized I would have to make a way to edit an individual references after they have been created. I did this by sending the user to the given reference type html page, and changing the values of the form to match the generated reference. This was difficult as pressing a button does not normally allow the change of a webpage and then the execution of code on the next webpage. Essentially, when I set the button onclick argument to change the webpage and run a function, it was running the function on the first webpage and then switching over after completion. To counteract this, I made the button change the webpage and instead create a localStorage item called 'edit'. I then created a window.onlaod function which only activated if the localStorage('edit') item was filled in. I feel as though there was a very simple way of doing this that I missed, especially considering my browser was remembering all the text boxes I filled in. Regardless, the current function works and I will probably only change it if someone tells me I did something wrong.
</li>
</ol>

<h3>Reflection</h3>

<h4>Where did you meet success, and who might benefit most from what you’ve learned along the way?</h4>

I achieved success in this project through the support it received from the school, and hence my willingness to continue with it. I am not sure that I would of made this project if I knew that it would not receive support from the school, as using the tool myself can only help me so much. The people who will benefit the most from this is me as I apply to universities, but also those who just cannot seem to get referencing right. I hope that people using my generator can more easily get good marks for referencing in their assignments as it is often a crucial component.

<h4>What can I do to keep helping others?</h4>

Depending on the website's success, I am planning to continue to support it and add to it as its developer, and fix any bugs that people come across. I will likely add a Google Form to collate these bug reports / feature requests (most students don't use GitHub), but I am likely getting ahead of myself. I still don't know if anyone will actually trust the site, after all it was made by a student. 