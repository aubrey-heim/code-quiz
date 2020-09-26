var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")
var mainEl = document.querySelector("main")

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
    




function startTime() {
    var timeLeft = 59;
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

        if (timeLeft === 0) {
          timerEl.textContent = "0:00";
        //   inputScore();
          clearInterval(timeInterval);
        }
        
        timeLeft--;
    }, 1000);
}

function startQuiz() {
    startTime()     

    for (var i=0; i<questionsAndAnswers.length; i++){
        mainEl.children[0].textContent = "Question " + i+1
        mainEl.children[1].textContent = questionsAndAnswers[i].question
        var answerArea = mainEl.children[2]
        answerArea.textContent = ""

        
        spaceEl=document.createElement("div")
        answerEl = document.createElement("button")
        answerEl.classList.add("my-2", "btn", "btn,lg", "btn-success")
        answerEl.textContent = questionsAndAnswers[i].option1
        spaceEl.appendChild(answerEl)
        answerArea.appendChild(spaceEl)

        spaceEl=document.createElement("div")
        answerEl = document.createElement("button")
        answerEl.classList.add("my-2", "btn", "btn,lg", "btn-success")
        answerEl.textContent = questionsAndAnswers[i].option2
        spaceEl.appendChild(answerEl)
        answerArea.appendChild(spaceEl)

        spaceEl=document.createElement("div")
        answerEl = document.createElement("button")
        answerEl.classList.add("my-2", "btn", "btn,lg", "btn-success")
        answerEl.textContent = questionsAndAnswers[i].option3
        spaceEl.appendChild(answerEl)
        answerArea.appendChild(spaceEl)

        spaceEl=document.createElement("div")
        answerEl = document.createElement("button")
        answerEl.classList.add("my-2", "btn", "btn,lg", "btn-success")
        answerEl.textContent = questionsAndAnswers[i].option4
        spaceEl.appendChild(answerEl)
        answerArea.appendChild(spaceEl)

    
    
    }

     
}

startEl.addEventListener("click", startQuiz)