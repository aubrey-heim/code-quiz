var timerEl = document.getElementById("timer")
var startEl = document.getElementById("start-button")

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
startEl.addEventListener("click", startTime)