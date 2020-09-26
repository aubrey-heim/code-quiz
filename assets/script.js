var timerEl = document.getElementById("timer")

function startTime() {
    var timeLeft = 59;
    var timeInterval = setInterval(function() {
        timerEl.textContent = "0:" + timeLeft
        timeLeft--;
    
        if (timeLeft === 0) {
          timerEl.textContent = "0:00";
          inputScore();
          clearInterval(timeInterval);
        }
    }, 1000);
}
