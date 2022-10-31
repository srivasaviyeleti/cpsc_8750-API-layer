// use the express library
const express = require('express');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

// create a new server application
  const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
    const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
// The main page of our website
/*app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>An Example Title</title>
        <link rel="stylesheet" href="app.css">
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>HTML is so much better than a plain string!</p>
      </body>
    </html>
  `);
});*/

let nextVisitorId = 1;

// the main page
app.get("/trivia", async (req,res) =>{
    // res.send('TODO');
  
    // fetch the data
    const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
  
    // fail if bad response
    if(!response.ok){
        res.status(500);
        res.send(`Open Trivia Database failed with HTTP code ${response.status}`);
        return;
    }
  
    // interpret the body as json
    const content = await response.json();
  
    // TODO: make proper HTML
    const format = JSON.stringify(content,2);
  
    const correctAnswer = content.results[0].correct_answer;
    const answers = content.results[0].incorrect_answers;
    answers.push(correctAnswer);
  
  
    // Randomize Answers Array
    answers.sort(() => Math.random() - 0.5)
    const answerLinks = answers.map(answer => {
        return `<a href="javascript:alert('${
           answer === correctAnswer ? 'Correct!' : 'Incorrect, Please Try Again!'
          }')">${answer}</a>`
    });
  
    // respond to the browser
    // TODO: make proper HTML
    // res.send(JSON.stringify(content,2));
    res.render('trivia',{
        category:  content.results[0].category,
        difficulty: content.results[0].difficulty,
        question: content.results[0].question,
        answers: answers,
        answerLinks: answerLinks,
    });
  });
// Start listening for network connections
app.listen(port);
// Printout for readability
console.log("Server Started!");



