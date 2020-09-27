var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")
var mainEl = document.querySelector("main")
var scoreEl = document.getElementById("score")

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
        //   inputScore();
          clearInterval(timeInterval);
        }
        
        timeLeft--;
    }, 1000);
}

function startQuiz() {
    startTime()     
    scoreEl.textContent = "Score: " + scoreReached

    for (var i=0; i<questionsAndAnswers.length; i++){

        mainEl.children[0].textContent = "Question " + i+1
        mainEl.children[1].textContent = questionsAndAnswers[i].question
        let answerArea = mainEl.children[2]
        answerArea.textContent = ""
        var correctAnswer = questionsAndAnswers[i].correct
        
           var answers = Object.values(questionsAndAnswers[0])
           
            for (var j=1; j<5;j++){
                answerEl = document.createElement("button")
                answerEl.style.boxDecorationBreak
                answerEl.classList.add("mx-2", "btn", "btn,lg", "btn-success", "answer-button")
                answerEl.textContent = answers[j]
                answerArea.appendChild(answerEl)
            }

        document.addEventListener("click", function(event){
            if (event.target.matches(".answer-button") && event.target.textContent === correctAnswer){
                event.preventDefault
                alert("Correct!")
            } else if (event.target.matches(".answer-button")){
                event.preventDefault
                alert("Incorrect!")
                timeLeft = timeLeft - 5
            }
        })

    }

}

startEl.addEventListener("click", startQuiz)