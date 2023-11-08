var questions = [
  {
      prompt: "What does HTML stand for?",
      options: ["Hot Mail", "How to Make Lunch", "Hyper Text Markup Language", "Hypo Type Marker Language"],
      answer: "Hyper Text Markup Language"
  },
  {
      prompt: "<br/> is which type of tag?",
      options: ["Broken tag", "Break tag", "Opening tag", "Console Log"],
      answer: "Break tag"
  },
  {
      prompt: "What should values be enclosed in?",
      options: ["Quotes", "Commas", "Tildas", "Parenthesis"],
      answer: "Quotes"
  },
  {
      prompt: "In JavaScript, which of the following is a logical operator?",
      options: ["|", "&&", "%", "/"],
      answer: "&&" 
  },
  {
      prompt: "What is always a welcome page, and explains the purpose or topic of the site?",
      options: ["Page 2", "Homepage", "Table of Contents", "Appendix"],
      answer: "Homepage"
  }];

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  var landingScreenEl = document.getElementById("start");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
var promptEl = document.getElementById("question-new")
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function(choice, i) {
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("value", choice);
      choiceBtn.textContent = i + 1 + ". " + choice;
      choiceBtn.onclick = questionClick;
      choicesEl.appendChild(choiceBtn);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Incorrect. Correct answer: ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("completed");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      name: name
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.replace("./hscore.html")
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
      saveHighscore();
  }
}
nameEl.onkeyup = checkForEnter;

submitBtn.onclick = saveHighscore;

startBtn.onclick = quizStart;