/* =====================================================
   app.js — COSMOS Science Quiz · Project 3
  
   Architecture: IPO Loop (from PDF)
   ─ INPUT:   Event listeners detect user actions
   ─ PROCESS: Functions evaluate state + business logic
   ─ OUTPUT:  DOM mutations reflect the new state

   Engineering Standards (from PDF):
   ─ const  → DOM references and fixed values
   ─ let    → mutable state variables
   ─ var    → NEVER used
   ─ js-    prefix classes → JavaScript hooks only
   ─ is-    prefix classes → visual state (CSS handles look)
   ─ textContent → safe DOM injection (never innerHTML for data)
   ─ Functions are small and single-purpose
   ===================================================== */

'use strict';

/* ─────────────────────────────────────────────────────
   PHASE 1: SENSORY RECEPTORS — DOM References (const)
   Target specific nodes in the DOM tree
───────────────────────────────────────────────────── */

// Theme
const appBody       = document.getElementById('app-body');
const themeToggleBtn= document.getElementById('themeToggle');
const themeLabel    = document.getElementById('themeLabel');

// Screens
const screenWelcome = document.getElementById('screenWelcome');
const screenQuiz    = document.getElementById('screenQuiz');
const screenResults = document.getElementById('screenResults');

// Welcome screen
const startBtn      = document.getElementById('startBtn');
const catButtons    = document.querySelectorAll('.js-cat-btn');

// Quiz screen
const progressFill  = document.getElementById('progressFill');
const progressBar   = document.getElementById('progressBar');
const questionCounter = document.getElementById('questionCounter');
const questionCategory= document.getElementById('questionCategory');
const timerDisplay  = document.getElementById('timerDisplay');
const timerCircle   = document.getElementById('timerCircle');
const questionNum   = document.getElementById('questionNum');
const questionText  = document.getElementById('question-heading');
const optionsGrid   = document.getElementById('optionsGrid');
const feedbackPanel = document.getElementById('feedbackPanel');
const feedbackIcon  = document.getElementById('feedbackIcon');
const feedbackResult= document.getElementById('feedbackResult');
const feedbackExplanation = document.getElementById('feedbackExplanation');
const nextBtn       = document.getElementById('nextBtn');

// Results screen
const resultsScore  = document.getElementById('resultsScore');
const finalScore    = document.getElementById('finalScore');
const resultsVerdict= document.getElementById('resultsVerdict');
const resultsBreakdown = document.getElementById('resultsBreakdown');
const resultsBadge  = document.getElementById('resultsBadge');
const restartBtn    = document.getElementById('restartBtn');
const homeBtn       = document.getElementById('homeBtn');

// Score (header)
const scoreDisplay  = document.getElementById('scoreDisplay');

/* ─────────────────────────────────────────────────────
   PHASE 2: STATE MANAGEMENT
   All mutable data lives here as let variables.
   The UI is always a reflection of this state.
───────────────────────────────────────────────────── */
let currentQuestionIndex = 0;
let score                = 0;
let selectedCategory     = 'all';
let activeQuestions      = [];
let timerInterval        = null;
let timeLeft             = 30;
let answerLocked         = false;   // prevents double-click

// Dark mode state (boolean)
let isDarkMode = true;

/* ─────────────────────────────────────────────────────
   QUESTION BANK — Static Data
───────────────────────────────────────────────────── */
const questionBank = [
  // Physics
  {
    category: 'physics',
    text: 'What is the speed of light in a vacuum?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '299 km/s'],
    correct: 0,
    explanation: 'Light travels at approximately 299,792 km/s (~300,000 km/s) in a vacuum — the universal speed limit.'
  },
  {
    category: 'physics',
    text: 'Which scientist proposed the theory of general relativity?',
    options: ['Isaac Newton', 'Niels Bohr', 'Albert Einstein', 'Max Planck'],
    correct: 2,
    explanation: 'Albert Einstein published the theory of general relativity in 1915, revolutionizing our understanding of gravity and spacetime.'
  },
  {
    category: 'physics',
    text: 'What particle has no electric charge and is found in an atomic nucleus?',
    options: ['Proton', 'Electron', 'Neutron', 'Photon'],
    correct: 2,
    explanation: 'Neutrons are neutral particles found in the nucleus alongside protons. Electrons orbit the nucleus.'
  },
  // Biology
  {
    category: 'biology',
    text: 'What molecule carries genetic information in living organisms?',
    options: ['ATP', 'RNA', 'DNA', 'Glucose'],
    correct: 2,
    explanation: 'DNA (deoxyribonucleic acid) is the double-helix molecule that encodes all genetic instructions for life.'
  },
  {
    category: 'biology',
    text: 'Which organelle is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
    correct: 2,
    explanation: 'Mitochondria generate ATP (energy) through cellular respiration, earning them the "powerhouse" nickname.'
  },
  {
    category: 'biology',
    text: 'How many chromosomes does a typical human cell contain?',
    options: ['23', '44', '46', '48'],
    correct: 2,
    explanation: 'Human cells have 46 chromosomes arranged in 23 pairs — one set from each parent.'
  },
  // Space
  {
    category: 'space',
    text: 'Which planet in our solar system has the most moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correct: 1,
    explanation: 'Saturn has over 140 confirmed moons as of 2024, surpassing Jupiter and making it the most moon-rich planet.'
  },
  {
    category: 'space',
    text: 'What is the name of the galaxy that contains our solar system?',
    options: ['Andromeda', 'Triangulum', 'Milky Way', 'Whirlpool'],
    correct: 2,
    explanation: 'Our solar system is located in the Milky Way galaxy — a barred spiral galaxy with over 200 billion stars.'
  },
  {
    category: 'space',
    text: 'What is a "light year"?',
    options: ['A unit of time', 'The distance light travels in one year', 'The brightness of a star', 'One billion kilometres'],
    correct: 1,
    explanation: 'A light year is a unit of distance — approximately 9.46 trillion km — the distance light covers in one year.'
  },
  // Chemistry
  {
    category: 'chemistry',
    text: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correct: 2,
    explanation: 'Gold\'s symbol Au comes from the Latin "aurum". Ag is silver (argentum), not gold.'
  },
  {
    category: 'chemistry',
    text: 'What is the most abundant gas in Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Argon', 'Nitrogen'],
    correct: 3,
    explanation: 'Nitrogen (N₂) makes up about 78% of Earth\'s atmosphere. Oxygen is second at ~21%.'
  },
  {
    category: 'chemistry',
    text: 'At what temperature does water boil at sea level?',
    options: ['90°C', '95°C', '100°C', '105°C'],
    correct: 2,
    explanation: 'Water boils at 100°C (212°F) at standard atmospheric pressure (1 atm / sea level).'
  },
];

/* ─────────────────────────────────────────────────────
   LOGIC ACTUATORS — Functions (small, single-purpose)
───────────────────────────────────────────────────── */

/**
 * filterQuestions — filters bank by category, shuffles, picks 10
 */
function filterQuestions(category) {
  let pool = category === 'all'
    ? [...questionBank]
    : questionBank.filter(q => q.category === category);

  // Shuffle using Fisher-Yates algorithm
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, 10);
}

/**
 * showScreen — hides all screens, shows the target
 * INPUT:  screen element to show
 * OUTPUT: DOM mutation — class toggle
 */
function showScreen(targetScreen) {
  [screenWelcome, screenQuiz, screenResults].forEach(s => {
    s.classList.remove('is-active');
  });
  targetScreen.classList.add('is-active');
}

/**
 * updateScoreDisplay — mutates the score badge
 * Uses textContent (safe, no XSS risk)
 */
function updateScoreDisplay() {
  scoreDisplay.textContent = score;
  // Add flash class then remove — CSS handles animation
  scoreDisplay.classList.add('is-updated');
  setTimeout(() => scoreDisplay.classList.remove('is-updated'), 300);
}

/**
 * startTimer — runs the 30s countdown per question
 */
function startTimer() {
  timeLeft = 30;
  const circumference = 138; // 2π × r (r=22)

  clearInterval(timerInterval);
  timerCircle.classList.remove('is-urgent');

  timerInterval = setInterval(() => {
    timeLeft--;
    // OUTPUT: update timer number
    timerDisplay.textContent = timeLeft;

    // Animate SVG circle (strokeDashoffset maps time to arc length)
    const offset = circumference - (timeLeft / 30) * circumference;
    timerCircle.style.strokeDashoffset = offset;

    // Add urgent class when < 10s — CSS changes stroke color
    if (timeLeft <= 10) {
      timerCircle.classList.add('is-urgent');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

/**
 * handleTimeout — auto-selects wrong when time runs out
 */
function handleTimeout() {
  if (answerLocked) return;
  answerLocked = true;

  // Disable all buttons
  optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
  });

  // Highlight the correct answer
  const correctIndex = activeQuestions[currentQuestionIndex].correct;
  const allOptions = optionsGrid.querySelectorAll('.option-btn');
  allOptions[correctIndex].classList.add('is-correct');

  // Show feedback
  showFeedback(false, "⏱ Time's up!", activeQuestions[currentQuestionIndex].explanation);
}

/**
 * renderQuestion — mutates the DOM to show a question
 * PROCESS phase of the IPO loop
 */
function renderQuestion() {
  const q = activeQuestions[currentQuestionIndex];
  answerLocked = false;

  // Reset feedback panel
  feedbackPanel.classList.add('is-hidden');
  feedbackPanel.classList.remove('is-correct-fb', 'is-wrong-fb');

  // Update progress bar (OUTPUT: DOM mutation)
  const progress = (currentQuestionIndex / activeQuestions.length) * 100;
  progressFill.style.width = progress + '%';
  progressBar.setAttribute('aria-valuenow', currentQuestionIndex);

  // Update counter and category
  questionCounter.textContent = `Q${currentQuestionIndex + 1} / ${activeQuestions.length}`;
  questionCategory.textContent = q.category.charAt(0).toUpperCase() + q.category.slice(1);
  questionNum.textContent = String(currentQuestionIndex + 1).padStart(2, '0');

  // Update question text — textContent for safe injection
  questionText.textContent = q.text;

  // Build answer option buttons via document.createElement (node creation)
  optionsGrid.innerHTML = '';  // clear previous options
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((optionText, index) => {
    // createElement — document.createElement() pattern from PDF
    const btn = document.createElement('button');
    btn.className = 'option-btn js-option-btn';
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('aria-label', `Option ${letters[index]}: ${optionText}`);
    btn.dataset.index = index;

    const letterSpan = document.createElement('span');
    letterSpan.className = 'option-btn__letter';
    letterSpan.textContent = letters[index];
    letterSpan.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.className = 'option-btn__text';
    textSpan.textContent = optionText;  // textContent — safe, no XSS

    btn.appendChild(letterSpan);
    btn.appendChild(textSpan);

    // addEventListener — wiring the nerve (from PDF)
    btn.addEventListener('click', handleAnswerClick);

    optionsGrid.appendChild(btn);
  });

  startTimer();
}

/**
 * handleAnswerClick — INPUT event → PROCESS logic → OUTPUT DOM mutation
 */
function handleAnswerClick(event) {
  // Guard: ignore if already answered
  if (answerLocked) return;
  answerLocked = true;

  clearInterval(timerInterval);

  const clickedBtn    = event.currentTarget;
  const selectedIndex = parseInt(clickedBtn.dataset.index);
  const correctIndex  = activeQuestions[currentQuestionIndex].correct;
  const isCorrect     = selectedIndex === correctIndex;

  // Disable all buttons (prevent further clicks)
  optionsGrid.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

  // OUTPUT: mutate DOM — add state classes (CSS handles color)
  if (isCorrect) {
    clickedBtn.classList.add('is-correct');
    score++;
    updateScoreDisplay();
  } else {
    clickedBtn.classList.add('is-wrong');
    // Also reveal the correct answer
    optionsGrid.querySelectorAll('.option-btn')[correctIndex].classList.add('is-correct');
  }

  showFeedback(
    isCorrect,
    isCorrect ? '✅ Correct!' : '❌ Incorrect',
    activeQuestions[currentQuestionIndex].explanation
  );
}

/**
 * showFeedback — mutates the feedback panel with result info
 */
function showFeedback(isCorrect, resultText, explanation) {
  feedbackPanel.classList.remove('is-hidden');
  feedbackPanel.classList.remove('is-correct-fb', 'is-wrong-fb');
  feedbackPanel.classList.add(isCorrect ? 'is-correct-fb' : 'is-wrong-fb');

  // textContent for safe data injection (PDF: avoid innerHTML for user data)
  feedbackIcon.textContent     = isCorrect ? '🎯' : '💡';
  feedbackResult.textContent   = resultText;
  feedbackExplanation.textContent = explanation;
}

/**
 * showResults — builds the results screen dynamically
 */
function showResults() {
  clearInterval(timerInterval);
  showScreen(screenResults);

  // Update score (OUTPUT: textContent mutation)
  finalScore.textContent = score;

  // Badge and verdict based on score
  let badge, verdict;
  if (score === 10)     { badge = '🏆'; verdict = 'Perfect score! You\'re a science genius.'; }
  else if (score >= 8)  { badge = '🥇'; verdict = 'Excellent work! A real scientist in the making.'; }
  else if (score >= 6)  { badge = '🥈'; verdict = 'Good job! A few more study sessions and you\'ll nail it.'; }
  else if (score >= 4)  { badge = '🥉'; verdict = 'Not bad! Science is a journey — keep exploring.'; }
  else                  { badge = '🔬'; verdict = 'Keep studying! Every question is a lesson.'; }

  resultsBadge.textContent  = badge;
  resultsVerdict.textContent = verdict;

  // Build breakdown using createElement (node creation — from PDF)
  resultsBreakdown.innerHTML = '';

  const categories = {};
  activeQuestions.forEach((q, i) => {
    if (!categories[q.category]) categories[q.category] = { total: 0, correct: 0 };
    categories[q.category].total++;
  });

  // Build rows dynamically
  const summaryData = [
    { label: 'Total Questions', value: activeQuestions.length },
    { label: 'Correct Answers', value: score },
    { label: 'Wrong Answers',   value: activeQuestions.length - score },
    { label: 'Accuracy',        value: Math.round((score / activeQuestions.length) * 100) + '%' },
  ];

  summaryData.forEach(item => {
    const row = document.createElement('div');
    row.className = 'breakdown-row';

    const label = document.createElement('span');
    label.className = 'breakdown-row__label';
    label.textContent = item.label;  // textContent — safe

    const value = document.createElement('span');
    value.className = 'breakdown-row__value';
    value.textContent = item.value;

    row.appendChild(label);
    row.appendChild(value);
    resultsBreakdown.appendChild(row);
  });

  // Full progress bar on results
  progressFill.style.width = '100%';
}

/**
 * resetQuiz — resets all state variables to defaults
 */
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answerLocked = false;
  clearInterval(timerInterval);
  updateScoreDisplay();
}

/* ─────────────────────────────────────────────────────
   PHASE 1: WIRING THE NERVES — addEventListener calls
   Connect each DOM node to its event handler function
───────────────────────────────────────────────────── */

/**
 * Theme Toggle — Case Study from PDF
 * INPUT:  click event on theme button
 * PROCESS: check isDarkMode state, flip it
 * OUTPUT: classList.toggle on <body> — CSS handles all visuals
 */
themeToggleBtn.addEventListener('click', function() {
  isDarkMode = !isDarkMode;

  // classList.toggle — professional standard for visual state changes (from PDF)
  appBody.classList.toggle('theme-dark',  isDarkMode);
  appBody.classList.toggle('theme-light', !isDarkMode);

  // Update button label — textContent mutation
  themeLabel.textContent = isDarkMode ? '🌙 Dark' : '☀️ Light';
  themeToggleBtn.setAttribute('aria-pressed', isDarkMode);
});

/**
 * Category Filter Buttons — Buttons/Toggles requirement
 * INPUT:  click on a category button
 * PROCESS: update selectedCategory state
 * OUTPUT: toggle .is-selected class (CSS handles highlight)
 */
catButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove is-selected from all buttons
    catButtons.forEach(b => b.classList.remove('is-selected'));
    // Add is-selected to the clicked one
    this.classList.add('is-selected');
    // Update state
    selectedCategory = this.dataset.cat;
  });
});

/**
 * Start Button — begins the quiz
 */
startBtn.addEventListener('click', function() {
  resetQuiz();
  activeQuestions = filterQuestions(selectedCategory);
  showScreen(screenQuiz);
  renderQuestion();
});

/**
 * Next Button — advance to next question or show results
 */
nextBtn.addEventListener('click', function() {
  currentQuestionIndex++;

  if (currentQuestionIndex < activeQuestions.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

/**
 * Restart Button — resets and starts again with same category
 */
restartBtn.addEventListener('click', function() {
  resetQuiz();
  activeQuestions = filterQuestions(selectedCategory);
  showScreen(screenQuiz);
  renderQuestion();
});

/**
 * Home Button — goes back to welcome screen
 */
homeBtn.addEventListener('click', function() {
  resetQuiz();
  showScreen(screenWelcome);
});

/* ─────────────────────────────────────────────────────
   INIT — System Triggers (page load)
   Set initial dark mode class on body
───────────────────────────────────────────────────── */
appBody.classList.add('theme-dark');
