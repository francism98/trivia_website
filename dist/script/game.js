const question = document.getElementById('question');
const choicesContainer = Array.from(document.getElementsByClassName('choice-container'));
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the Javascript?",
    choice1: "<script>",
    choice2: "<javacsript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called xxx.js?",
    choice1: "<script href='xxx.js>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
]

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
}

getNewQuestion = () => {
  // If there are no available questions
  if (!availableQuestions || availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('./end.html');
    return;
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  
  for (choice of choices) {
    const choiceNumber = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + choiceNumber];
  }
  
  availableQuestions.splice(questionIndex, 1);
  
  acceptingAnswers = true;
}
for (choice of choices) {
  choice.parentElement.addEventListener('click', e => {
    const mouseTarget = e.target;
    console.log(mouseTarget);
    if (!acceptingAnswers) return; // Go to the end of page
    
    acceptingAnswers = false;
    var selectedChoice = e.target;
    // If the selected element is not the parent div, change target to parent div.
    if (selectedChoice.tagName.toLowerCase() != 'div') {
      selectedChoice = selectedChoice.parentElement;
    }
    selectedChoice = selectedChoice.children[1];
    // Get the number of the chosen answer
    const selectedAnswer = selectedChoice.dataset['number'];
    // Compare selected choice to the right answer
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    // Update the progress bar
    selectedChoice = selectedChoice.parentElement;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    // Change color to green if correct, red if incorrect. Update score at the same time
    if (classToApply == 'correct') {
      selectedChoice.style.backgroundColor = '#77dd77 ';
      selectedChoice.children[0].style.backgroundColor = '#4ed34e';
      incrementScore(CORRECT_BONUS);
    } else if (classToApply == 'incorrect') {
      selectedChoice.children[0].style.backgroundColor = '#ff392e';
      selectedChoice.style.backgroundColor = '#ff6961';
    }
    // selectedChoice.classList.add(classToApply);
    
    setTimeout(() => {
      selectedChoice.children[0].style.backgroundColor = '#56a5eb';
      selectedChoice.style.backgroundColor = '#fff';
      getNewQuestion();
    }, 500);
  })
};
incrementScore = num => {
  score += num;
  scoreText.innerText  = score;
}

startGame();
console.log(choices);
console.log(choicesContainer);