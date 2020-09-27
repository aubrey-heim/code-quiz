var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")
var mainEl = document.querySelector("main")
var quizEl = document.getElementById("quiz")
var scoreEl = document.getElementById("score")
var buttonListEl = document.getElementById("button-list")
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
    
    {"question": "What special character should be used at the end of every statement?", 
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
    "correct":  "A" }
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
    }else {
        var result = "Incorrect!"
        timeLeft = timeLeft -5
    }
    resultsEl.textContent = result
    questionNumber++
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