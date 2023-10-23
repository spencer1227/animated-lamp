



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

// function nextQuestion() {
//   pEl.textContent = question[q].title;
//   for (let index = 0; index < question[q].answers.length; index++) {
//     let button = document.createElement(“button”);
//     // button.textContent = “”;
//     button.textContent = question[q].answers[index];
//     // console.log(document.getElementById(“btnhlder2”));
//     document.getElementById(“btnhlder2").appendChild(button)
//     button.addEventListener(‘click’, function () {
//       if (button.innerText == question[q].correctAnswer) {
//         console.log(score);
//         document.getElementById(‘btnhlder2’).innerHTML = “”;
//         score += 1;
//         console.log(score);
//         scoreBoard.innerHTML = score;
//         q += 1;
//         nextQuestion();
//       }
//       else {
//         console.log(‘incorrectAnswer’)
//         document.getElementById(“btnhlder2").innerHTML = “”;
//         scoreBoard.innerHTML = score;
//         console.log(score);
//         scoreBoard.innerHTML = score;
//         q += 1;
//         nextQuestion();
//       }
//       if (question[3]){
//       console.log(quizover);
//     }
//   }}};

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