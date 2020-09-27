var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")
var mainEl = document.querySelector("main")
var quizEl = document.getElementById("quiz")
var scoreEl = document.getElementById("score")
var resultsEl = document.getElementById("results")
var scoreList = document.getElementById("score-list")
var optionAEl = document.getElementById("A")
var optionBEl = document.getElementById("B")
var optionCEl = document.getElementById("C")
var optionDEl = document.getElementById("D")
var questionEl = quizEl.children[0]

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
    "optionB": "semi-colon", 
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
    "optionA": "tells screen readers what is in an image", 
    "optionB": "text that takes the place of an image when it won't load", 
    "optionC": "tells search engines what is in an image", 
    "optionD": "all of the above",
    "correct":  "D" }
]
    
var timeLeft = 59;
var scoreReached = 0;
var questionNumber = 0;

startEl.addEventListener("click", startQuiz)

function startQuiz() {
    startTime()     
    scoreEl.textContent = "Score: " + scoreReached
    mainEl.classList.add("hidden")
    quizEl.classList.remove("hidden")
    askQuestion(questionNumber)
}

function startTime() {
    var timeInterval = setInterval(function() {
        timerEl.textContent = "0:" + timeLeft
        
        if (timeLeft < 20) {
            timerEl.style.backgroundColor = "yellow"
            timer.style.color = "black"
        }

        if (timeLeft < 10) {
            timerEl.textContent = "0:0" + timeLeft
            timerEl.style.backgroundColor = "red"
            timer.style.color = "white"
        }

        if (timeLeft <= 0) {
          timerEl.textContent = "0:00";
          inputScore();
          clearInterval(timeInterval);
        }
        
        timeLeft--;
    }, 1000);
}

function askQuestion(x){
    questionEl.textContent = questionsAndAnswers[x].question
    optionAEl.textContent = questionsAndAnswers[x].optionA
    optionBEl.textContent = questionsAndAnswers[x].optionB
    optionCEl.textContent = questionsAndAnswers[x].optionC
    optionDEl.textContent = questionsAndAnswers[x].optionD   
}
    
function answerCheck(ans){
    if(ans===questionsAndAnswers[questionNumber].correct) {
        var result = "Correct!"
        scoreReached = parseInt(scoreReached) + 10
        scoreEl.textContent = "Score: " + scoreReached
        resultsEl.style.color = "green"
    }else {
        var result = "Incorrect!"
        timeLeft = timeLeft -5
        resultsEl.style.color = "red"
    }
    resultsEl.textContent = result
    questionNumber++
    if(questionNumber<questionsAndAnswers.length){
        askQuestion(questionNumber)
    } else {
        scoreReached = parseInt(scoreReached) + parseInt(timeLeft)
        inputScore()
    } 
}

function inputScore() {
    window.location.href="scores.html"
    alert("Your score was " + scoreReached + "!")
    var initials = prompt("Enter your initials")
    var scoreListing = document.createElement("li")
    scoreListing.textContent = "Initials:" + initials + "--- Score:" + scoreReached
    scoreList.appendChild(scoreListing)
    localStorage.setItem("initials", initials)
    localStorage.setItem("score", scoreReached)    
}

document.addEventListener("click", function(event){
    if(event.target.matches(".answer-button")){
        ans = event.target.getAttribute("id")
        answerCheck(ans)
    }
})