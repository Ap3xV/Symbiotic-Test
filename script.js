// Symbiotic Test of Knowledge — Engine
let state = {
  level: "beginner",
  all: false,
  questions: [],
  currentIndex: 0,
  score: 0,
  correct: 0,
  total: 0,
  breakdown: {}
};

// Elements
const screens = {
  start: document.getElementById("screen-start"),
  quiz: document.getElementById("screen-quiz"),
  end: document.getElementById("screen-end"),
};

const btnStart = document.getElementById("btn-start");
const btnStartAll = document.getElementById("btn-start-all");
const levelButtons = document.querySelectorAll(".level-btn");

const hudLevel = document.getElementById("hud-level");
const hudProgress = document.getElementById("hud-progress");
const hudScore = document.getElementById("hud-score");

const qText = document.getElementById("question-text");
const qOptions = document.getElementById("options");
const btnSubmit = document.getElementById("btn-submit");
const btnNext = document.getElementById("btn-next");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const finalCorrect = document.getElementById("final-correct");
const finalTotal = document.getElementById("final-total");
const breakdownDiv = document.getElementById("breakdown");
const btnRetry = document.getElementById("btn-retry");
const btnHome = document.getElementById("btn-home");
const btnShare = document.getElementById("btn-share");

let selectedIndex = null;
let answered = false;

// Level selection
levelButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    levelButtons.forEach(b => b.classList.remove("primary"));
    btn.classList.add("primary");
    state.level = btn.dataset.level;
    state.all = false;
    btnStart.disabled = false;
  });
});

btnStartAll.addEventListener("click", () => {
  levelButtons.forEach(b => b.classList.remove("primary"));
  state.level = "all";
  state.all = true;
  btnStart.disabled = false;
});

btnStart.addEventListener("click", startQuiz);

function startQuiz() {
  // reset
  state.questions = getQuestions(state.level);
  shuffle(state.questions);
  state.currentIndex = 0;
  state.score = 0;
  state.correct = 0;
  state.total = state.questions.length;
  state.breakdown = { beginner: {correct:0,total:0}, intermediate:{correct:0,total:0}, advanced:{correct:0,total:0} };

  // initialize breakdown totals
  state.questions.forEach(q => {
    state.breakdown[q.level].total++;
  });

  showScreen("quiz");
  hudLevel.textContent = cap(state.level);
  hudScore.textContent = state.score;
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  selectedIndex = null;
  feedback.textContent = "";
  btnNext.disabled = true;
  btnSubmit.disabled = false;

  const q = state.questions[state.currentIndex];
  hudProgress.textContent = `${state.currentIndex + 1} / ${state.total}`;

  qText.textContent = q.question;

  qOptions.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.addEventListener("click", () => selectOption(i, btn));
    qOptions.appendChild(btn);
  });
}

function selectOption(i, el) {
  if (answered) return;
  selectedIndex = i;
  // highlight selection
  [...qOptions.children].forEach(child => child.classList.remove("primary"));
  el.classList.add("primary");
}

btnSubmit.addEventListener("click", () => {
  if (answered) return;
  const q = state.questions[state.currentIndex];
  if (selectedIndex == null) {
    feedback.textContent = "Pick an option to submit.";
    return;
  }
  answered = true;
  // mark classes
  [...qOptions.children].forEach((child, i) => {
    if (i === q.answer) child.classList.add("correct");
    if (i === selectedIndex && i !== q.answer) child.classList.add("wrong");
    child.disabled = true;
  });

  if (selectedIndex === q.answer) {
    state.score += 10;
    state.correct += 1;
    state.breakdown[q.level].correct += 1;
    feedback.textContent = "Correct! +10 points";
  } else {
    feedback.textContent = "Not quite. Keep going!";
  }

  hudScore.textContent = state.score;
  btnNext.disabled = false;
  btnSubmit.disabled = true;
});

btnNext.addEventListener("click", () => {
  if (state.currentIndex + 1 >= state.total) {
    endQuiz();
  } else {
    state.currentIndex += 1;
    loadQuestion();
  }
});

function endQuiz() {
  finalScore.textContent = state.score;
  finalCorrect.textContent = state.correct;
  finalTotal.textContent = state.total;

  // breakdown
  breakdownDiv.innerHTML = "";
  const keys = ["beginner","intermediate","advanced"];
  keys.forEach(k => {
    if (state.breakdown[k].total > 0) {
      const p = document.createElement("p");
      p.className = "result-line";
      p.textContent = `${cap(k)}: ${state.breakdown[k].correct} / ${state.breakdown[k].total}`;
      breakdownDiv.appendChild(p);
    }
  });

  // share link
  const text = encodeURIComponent(`I just scored ${state.score} in the Symbiotic Test of Knowledge! Try it and tag @symbioticfi`);
  const url = encodeURIComponent(location.href);
  btnShare.href = `https://x.com/intent/tweet?text=${text}&url=${url}`;

  showScreen("end");
}

btnRetry.addEventListener("click", () => {
  // retry same level set
  state.level = state.all ? "all" : state.level;
  startQuiz();
});

btnHome.addEventListener("click", () => {
  showScreen("start");
});

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function cap(s) { return s === "all" ? "All Levels" : s.charAt(0).toUpperCase() + s.slice(1); }
