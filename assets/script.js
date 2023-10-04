



var currentQuestionIndex = 0;
var time = 60; // Initial time in seconds
var timerInterval;
var score = 0;
var questionEl = document.querySelector(".questionEl");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var startBtn=document.getElementById("startBtn");
console.log(questionEl);
function startQuiz() {
document.getElementById("startBtn").style.display="none";
  timerInterval = setInterval(updateTimer, 1000); // Start the timer
  displayQuestion();
}
startBtn.addEventListener("click",startQuiz);
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = currentQuestion.choices[i];
    choiceBtn.setAttribute("onclick", "checkAnswer(this)");
    choicesEl.appendChild(choiceBtn);
  }
}
function checkAnswer(btn) {
  var userAnswer = btn.textContent;
  var currentQuestion = questions[currentQuestionIndex];
  if (userAnswer === currentQuestion.answer) {
    score++;
  } else {
    time -= 10; // Subtract 10 seconds for incorrect answer
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length || time <= 0) {
    endQuiz();
  } else {
    displayQuestion();
  }
}
function endQuiz() {
  clearInterval(timerInterval);
  // Display game over message
  // Prompt user for initials and save score
}
function updateTimer() {
  timerEl.textContent = "Time: " + time;
  if (time <= 0) {
    endQuiz();
  } else {
    time--;
  }
}