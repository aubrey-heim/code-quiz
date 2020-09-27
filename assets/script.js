var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")
var mainEl = document.querySelector("main")
var quizEl = document.getElementById("quiz")
var scoreEl = document.getElementById("score")
var buttonListEl = document.getElementById("button-list")
var resultsEl = document.getElementById("results")

var questionsAndAnswers = [
    {"question": "What is Lorem Ipsum?", 
    "option1": "A coding language", 
    "option2": "A coding accreditation ", 
    "option3": "A traditional placeholder text", 
    "option4": "A well-known coding university",
    "correct": "A traditional placeholder text" },
    
    {"question": "What tag is used for a hyperlink?", 
    "option1": "<link>", 
    "option2": "<ul>", 
    "option3": "<p>", 
    "option4": "<a>",
    "correct": "<a>" },
    
    {"question": "What special character should be used at the end of every statement?", 
    "option1": "period", 
    "option2": "semi-colon", 
    "option3": "bracket", 
    "option4": "colon",
    "correct": "semi-colon" },
    
    {"question": "What data type stores true or false values? ", 
    "option1": "boolean", 
    "option2": "string", 
    "option3": "integer", 
    "option4": "char",
    "correct": "boolean" }
]
    


var timeLeft = 59;
var scoreReached = 0;

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

startEl.addEventListener("click", startQuiz)

function startQuiz() {
    startTime()     
    scoreEl.textContent = "Score: " + scoreReached
    
    var i=0
    while (i<questionsAndAnswers.length){

        mainEl.innerHTML=""
        quizEl.children[0].textContent = questionsAndAnswers[i].question
        let answers = Object.values(questionsAndAnswers[i])
           
        for (var j=1; j<5; j++){
            answerEl = document.createElement("button")
            answerEl.classList.add("mx-2", "btn", "btn,lg", "btn-success", "answer-button")
            answerEl.setAttribute("question-number", i)
            answerEl.textContent = answers[j]
            buttonListEl.appendChild(answerEl)
        }

        quizEl.addEventListener("click", function(event){
            questionNumber = event.target.getAttribute("question-number")
            console.log(questionNumber)
            let answers = Object.values(questionsAndAnswers[i])
            let correctAnswer= answers.correct
            console.log(correctAnswer)
            if (event.target.matches(".answer-button") && event.target.textContent === correctAnswer){
                event.preventDefault
                var result = "Correct!"
                resultsEl.textContent = result
                scoreReached = parseInt(scoreReached) + 10
            } else if (event.target.matches(".answer-button")){
                event.preventDefault
                var result = "Incorrect!"
                timeLeft = timeLeft - 5
                resultsEl.textContent = result
            } else {
                var result = ""
            }
        })

        if (result !== "") {
            i++
        }
    
    }
}

function inputScore() {
    alert("Your score was " + scoreReached + "!")
    var initials = prompt("Enter your initials")
    localStorage.setItem("initials", initials)
    localStorage.setItem("score", scoreReached)
    window.location.href="scores.html"
}