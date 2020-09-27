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

var retreivedScores = JSON.parse(localStorage.getItem("recordedScores"));

console.log(retreivedScores)

var timeLeft = 59;
var scoreReached = 0;
var questionNumber = 0;
var recordedScores = []

if (retreivedScores){
showScores()
} else {
    retreivedScores = []
}


function startQuiz() {
    startTime()     
    scoreEl.textContent = "Score: " + scoreReached
    mainEl.classList.add("hidden")
    quizEl.classList.remove("hidden")
    resultsEl.classList.remove("hidden")
    askQuestion(questionNumber)
}

function startTime() {
    var timeInterval = setInterval(function() {
        timerEl.textContent = "0:" + timeLeft
        
        scoreNavEl.addEventListener("click", function(){
            clearInterval(timeInterval)
        })

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
          clearInterval(timeInterval)
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
        var result = "correct!"
        scoreReached = parseInt(scoreReached) + 10
        scoreEl.textContent = "Score: " + scoreReached
        resultsEl.style.color = "green"
    }else {
        var result = "incorrect!"
        timeLeft = timeLeft -5
        resultsEl.style.color = "red"
    }
    let resultText = "You got question #" + (questionNumber+1) + " " + result
    resultsEl.textContent = resultText
    questionNumber++
    if(questionNumber<questionsAndAnswers.length){
        askQuestion(questionNumber)
    } else {
        scoreReached = parseInt(scoreReached) + parseInt(timeLeft)
        inputScore()
    } 
}

function inputScore() {
    scoreFormEl.classList.remove("hidden")
    scoreList.classList.remove("hidden")
    quizEl.classList.add("hidden")
    scoreResultEl.textContent = "You scored " + scoreReached + " points!"
    scoreEl.textContent = "Score: " + scoreReached
}

startEl.addEventListener("click", startQuiz)

document.addEventListener("click", function(event){
    if(event.target.matches(".answer-button")){
        ans = event.target.getAttribute("id")
        answerCheck(ans)
    }
})

submitButtonEl.addEventListener("click", function(event){
    event.preventDefault()
    
    var score = {
        initials: initialsInput.value.trim().toUpperCase(),
        scoreRecorded: scoreReached
    }
    
    if (score.initials === "") {
        resultsEl.textContent = "Initials cannot be blank."
        resultsEl.style.color = "red"
    } else {
        resultsEl.textContent = "Thank you for submitting your high score!"
        resultsEl.style.color = "green"
        retreivedScores.push(score)
    }

    localStorage.setItem("recordedScores", JSON.stringify(retreivedScores));
    scoreListItemEl.innerHTML = ""
    showScores()
    scoreFormEl.classList.add("hidden")
})

function showScores() {
    for(var i=0; i<retreivedScores.length; i++) {
        var oldScore = document.createElement("li")
        var initialsShown = retreivedScores[i].initials
        var scoreShown = retreivedScores[i].scoreRecorded
        oldScore.textContent = "Initials: " + initialsShown + " --- Score: " + scoreShown
        scoreListItemEl.appendChild(oldScore)
    }
}


quizNavEl.addEventListener("click", function(){    
    location.reload()
})

scoreNavEl.addEventListener("click", function(){
        scoreList.classList.remove("hidden")
        mainEl.classList.add("hidden")
        quizEl.classList.add("hidden")
        resultsEl.classList.add("hidden")
        timerEl.textContent = "1:00"
        timerEl.style.backgroundColor = "#27a844"
        timerEl.style.color = "white"
        scoreEl.textContent = "Score"
})