//Refrence various HTML elements
var quizNavEl = document.getElementById("quiz-nav")
var scoreNavEl = document.getElementById("score-nav")
var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")
var mainEl = document.getElementById("welcome")
var quizEl = document.getElementById("quiz")
var scoreEl = document.getElementById("score")
var resultsEl = document.getElementById("results")
var scoreList = document.getElementById("score-list")
var scoreListItemEl = document.getElementById("score-list-items")
var optionAEl = document.getElementById("A")
var optionBEl = document.getElementById("B")
var optionCEl = document.getElementById("C")
var optionDEl = document.getElementById("D")
var scoreFormEl = document.getElementById("score-form")
var scoreResultEl = document.getElementById("score-result")
var submitButtonEl = document.getElementById("submit")
var initialsInput = document.getElementById("initials")
var questionEl = quizEl.children[0]

//array of questions and answers
var questionsAndAnswers = [
    {"question": "What is Lorem Ipsum?", 
    "optionA": "A coding language", 
    "optionB": "A coding accreditation ", 
    "optionC": "A traditional placeholder text", 
    "optionD": "A well-known coding university",
    "correct":  "C"},
    
    {"question": "What tag is used for a hyperlink?", 
    "optionA": "<link>", 
    "optionB": "<ul>", 
    "optionC": "<p>", 
    "optionD": "<a>",
    "correct":  "D"},
    
    {"question": "What special character should be used at the end of every statement in CSS and JavaScript?", 
    "optionA": "period", 
    "optionB": "semicolon", 
    "optionC": "bracket", 
    "optionD": "colon",
    "correct":  "B" },
    
    {"question": "What data type stores true or false values? ", 
    "optionA": "boolean", 
    "optionB": "string", 
    "optionC": "integer", 
    "optionD": "char",
    "correct":  "A" },

    {"question": "What does CSS stand for? ", 
    "optionA": "Cascading Style Sheets", 
    "optionB": "Computer Style Status", 
    "optionC": "Coding Starter Style", 
    "optionD": "Current Style Status",
    "correct":  "A" },

    {"question": "What command do you use in the terminal to change directories?", 
    "optionA": "change", 
    "optionB": "switch", 
    "optionC": "move", 
    "optionD": "cd",
    "correct":  "D" },

    {"question": "How do you download updated content from a GitHub repository that is cloned on your device?", 
    "optionA": "git update", 
    "optionB": "git pull", 
    "optionC": "git status", 
    "optionD": "git new",
    "correct":  "B" },

    {"question": "Where in your HTML should you link your style sheet? ", 
    "optionA": "<header>", 
    "optionB": "<footer>", 
    "optionC": "<head>", 
    "optionD": "<body>",
    "correct":  "C" },

    {"question": "What tag is used to created a bulleted list?", 
    "optionA": "<list>", 
    "optionB": "<ul>", 
    "optionC": "<li>", 
    "optionD": "<ol>",
    "correct":  "B" },

    {"question": "What is an alt attribute on an image", 
    "optionA": "text that tells screen readers what is in an image", 
    "optionB": "text that takes the place of an image when it won't load", 
    "optionC": "text that tells search engines what is in an image", 
    "optionD": "all of the above",
    "correct":  "D" }
]

//the questions and answers after they have been shuffled
var shuffled = shuffle(questionsAndAnswers)

//grabbing highscores from local storage
var retreivedScores = JSON.parse(localStorage.getItem("recordedScores"));

//initializing variables
var timeLeft = 59;
var scoreReached = 0;
var questionNumber = 0;

//inputting the retrieved highscores, or (if none) setting retrieved scores to an empty array
if (retreivedScores){
showScores()
} else {
    retreivedScores = []
}

//function to suffle the questions and answers array
function shuffle(arr){
    //looping through the array, starting at the last value
    for (var i = arr.length - 1; i > 0; i--) {    
        //choosing a random number between 0 and the length of the array
        var j = Math.floor(Math.random() * (i + 1)); 
        //creating a variable which gets the last item of the array
        var selected = arr[i]; 
        // making the last item of the array the randomly selected array value
        arr[i] = arr[j]; 
        //moving the value that was initially the last value of the array to the position of the randomly selected value
        arr[j] = selected; 
    }
    //returing the shuffled array for use outside of the function     
    return arr; 
}

//function to start the quiz
function startQuiz() {
    //starts timer
    startTime()
    //sets text of the score tracking box     
    scoreEl.textContent = "Score: " + scoreReached
    //hides the directions
    mainEl.classList.add("hidden")
    //shows the quiz
    quizEl.classList.remove("hidden")
    //shows the area where answer results are displayed
    resultsEl.classList.remove("hidden")
    //sets the question and answer text
    askQuestion(questionNumber)
}

//function to start the timer (called in startQuiz())
function startTime() {
    var timeInterval = setInterval(function() {
        //setting the timer text content to the time that is left
        timerEl.textContent = "0:" + timeLeft
        //stopping the timer if we are on the score page
        if (scoreList.getAttribute("class") !== "text-center hidden") {
            clearInterval(timeInterval)
            //resets timer style on highscore page
            timerEl.style.backgroundColor = "#27a844"
            timerEl.style.color = "white"
            timerEl.textContent = "1:00"
            //resets timer style on highscore page^^
        }
        //changing timer color based on time left
        if (timeLeft < 20) {
            timerEl.style.backgroundColor = "yellow"
            timer.style.color = "black"
        }
        if (timeLeft < 10) {
            timerEl.textContent = "0:0" + timeLeft
            timerEl.style.backgroundColor = "red"
            timer.style.color = "white"
        }
        //changing timer color based on time left ^^
        // launching highscore page/form and stopping timer when time hits 0
        if (timeLeft <= 0) {
          timerEl.textContent = "0:00";
          inputScore();
          clearInterval(timeInterval)
        }
        //subtracting one second on the time, every 1000 miliseconds
        timeLeft--;
    }, 1000);
}

//function to set change the question and options shown 
//(called in startQuiz() for first question and answerCheck() for subsequent questions)
function askQuestion(x){
    //setting question text
    questionEl.textContent = questionsAndAnswers[x].question
    //setting option buttons text
    optionAEl.textContent = questionsAndAnswers[x].optionA
    optionBEl.textContent = questionsAndAnswers[x].optionB
    optionCEl.textContent = questionsAndAnswers[x].optionC
    optionDEl.textContent = questionsAndAnswers[x].optionD
    //setting option buttons text ^^   
}

//checking if the answer is correct and notifying the user
    //if correct, points are added
    //if incorrect, time is reduced
//also triggers moving to next question, or on to the highscore page
//(called by click events on answer buttons)
function answerCheck(ans){
    //checking if the button selected matches the correct answer value from the question object
    if(ans===questionsAndAnswers[questionNumber].correct) {
        //if correct: notifies user in green text, increases score, and updates text of score tracker
        var result = "correct!"
        resultsEl.style.color = "green"
        scoreReached = parseInt(scoreReached) + 10
        scoreEl.textContent = "Score: " + scoreReached
    }else {
        //if incorrect: notifies user in red text, decreases time left
        var result = "incorrect!"
        timeLeft = timeLeft -5
        resultsEl.style.color = "red"
    }
    //sets the text for the notification of results
    let resultText = "You got question #" + (questionNumber+1) + " " + result
    resultsEl.textContent = resultText
    //sets the text for the notification of results ^^
    //increases which question we are on
    questionNumber++
    //checks to see if the question we are on is past the length of the array
    if(questionNumber<questionsAndAnswers.length){
        //if not past the legth of the array, asks next question
        askQuestion(questionNumber)
    } else {
        //if is past length of array, adds the "bonus points" to the score
        scoreReached = parseInt(scoreReached) + parseInt(timeLeft)
        // moves on to highscore page
        inputScore()
    } 
}

//hides the quiz and brings up the high score page 
//(called in startTime() or answerCheck() dependent on if user runs out of time or finishes questions first)
function inputScore() {
    //shows form to submit score
    scoreFormEl.classList.remove("hidden")
    //shows list of high scores
    scoreList.classList.remove("hidden")
    //hides quiz
    quizEl.classList.add("hidden")
    //notifies user of their final score
    scoreResultEl.textContent = "You scored " + scoreReached + " points!"
    //updates the score tracker at the top of the page with the final score
    scoreEl.textContent = "Score: " + scoreReached
}

//writes the scores array on the high scores page
function showScores() {
    //itterates through all of the scores in the array
    for(var i=0; i<retreivedScores.length; i++) {
        //creates a new list item
        var oldScore = document.createElement("li")
        //stores the initials of the object as a variable
        var initialsShown = retreivedScores[i].initials
        //stores the score of the object as a variable
        var scoreShown = retreivedScores[i].scoreRecorded
        //sets the text content of the list item to the initials and the score
        oldScore.textContent = "Initials: " + initialsShown + " --- Score: " + scoreShown
        //adds the appropriate classes to the list item
        oldScore.classList.add("list-group-item","list-group-item-secondary")
        //sets the text size of the list item
        oldScore.style.fontSize = "30px"
        //sets the color of the list item
        oldScore.style.color = "green"
        //adds the list item to the unordered list
        scoreListItemEl.appendChild(oldScore)
    }
}

//listens for clicks on the start button and launched the beginning of the quiz
startEl.addEventListener("click", startQuiz)

//listens for clicks on the answer buttons
document.addEventListener("click", function(event){
    //makes sure the click is on an answer button
    if(event.target.matches(".answer-button")){
        //stores if user picked A B C or D
        ans = event.target.getAttribute("id")
        //checks if the user chose the correct answer, and launches next question (if applicable)
        answerCheck(ans)
    }
})

//listens for clicks on the high score form submit button, and stores results in local storage
submitButtonEl.addEventListener("click", function(event){
    //stops the form from attempting to submit
    event.preventDefault()
    //logs the initials and score as an object
    var score = {
        initials: initialsInput.value.trim().toUpperCase(),
        scoreRecorded: scoreReached
    }
    //checks that the user input initials
    if (score.initials === "") {
        //if blank, alerts user that initials cannot be blank
        resultsEl.textContent = "Initials cannot be blank."
        resultsEl.style.color = "red"
    } else {
        //if not blank, thanks user
        resultsEl.textContent = "Thank you for submitting your high score!"
        resultsEl.style.color = "green"
        //adds score object to array of scores pulled from local storage
        retreivedScores.push(score)
        //hides the score form
        scoreFormEl.classList.add("hidden")
    }
    //stores the updates scores array in local storage (as a string)
    localStorage.setItem("recordedScores", JSON.stringify(retreivedScores));
    //emptys the contents of the score list
    scoreListItemEl.innerHTML = ""
    //updates the contents of the score list with the new array including the most recent score
    showScores()
})

//listens for clicks on the quiz navigation button to bring back the quiz directions page
quizNavEl.addEventListener("click", function(){ 
    //reloads the page which will bring back the directions and reset timer, score, classes, etc.   
    location.reload()
})

//listens for clicks on the high score navigation button and brings up the high score page
scoreNavEl.addEventListener("click", function(){
        //shows the list of scores
        scoreList.classList.remove("hidden")
        //hides the quiz directions
        mainEl.classList.add("hidden")
        //hides the quiz
        quizEl.classList.add("hidden")
        //hides the area where results are displayed
        resultsEl.classList.add("hidden")
        //resets the score tracker
        scoreEl.textContent = "Score"
        //resets timer style on highscore page
        timerEl.style.backgroundColor = "#27a844"
        timerEl.style.color = "white"
        timerEl.textContent = "1:00"
        //resets timer style on highscore page^^
        
})