const question = document.getElementById('question');
const choicesContainer = Array.from(document.getElementsByClassName('choice-container'));
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// Audio
const bleepRight = new Audio();
bleepRight
const bleepWrong = new Audio();
bleepRight.src = './audio/correct.wav';
bleepWrong.src = './audio/incorrect_choice.wav';

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let fetchCategory = sessionStorage.getItem('category');
let fetchLength = sessionStorage.getItem('length');
let fetchDifficulty = sessionStorage.getItem('difficulty');

let questions = [];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = fetchLength;

// Generate url from variables category, length, and difficulty
opentdbLink = `https://opentdb.com/api.php?amount=${fetchLength}&category=${fetchCategory}&difficulty=${fetchDifficulty}&type=multiple`

// Get questions from OpenTriviaDB API URL
fetch(opentdbLink).then(res => {
  console.log(res); // get and log response from json file
  return res.json();
  })
  .then (loadedQuestions => {
    questions = loadedQuestions.results.map( loadedQuestion => {
      const formattedQuestion = {
        question: decodeHtml(loadedQuestion.question)
      };
      const answerChoices = [...loadedQuestion.incorrect_answers];
      console.log('answerChoices')
      console.log(answerChoices)
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

      // Decode all choices from 
      answerChoices.forEach((choice, index) => {
        formattedQuestion['choice' + (index + 1)] = decodeHtml(choice);
      })

      return formattedQuestion;
      // console.log('formattedQuestion');
      // console.log(formattedQuestion);
    })
    startGame();
  })
  .catch( err => {
    console.error(err);
  });

// Function to decode encoded text from json/API
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
}

getNewQuestion = () => {
  // If there are no available questions
  if (!availableQuestions || availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    setTimeout(() => {
      return window.location.assign('./end.html');
    }, 1000);
  }
  // Do not count if no more questions. this is not necessary but added because setTimeout for return window causes the questionCounter to increment 
  if (questionCounter != MAX_QUESTIONS) {
    questionCounter++;
  }
  // Display the question number
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Choose a question by random order
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  if (currentQuestion.question.length > 80) {
    question.style.fontSize = '3.4rem';
  } else if (currentQuestion.question.length > 60) {
    question.style.fontSize = '3.7rem';
  }
  question.innerText = currentQuestion.question;
  // Display the current question choices to the four choices div
  for (choice of choices) {
    const choiceNumber = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + choiceNumber];
  }
  // Remove the current question from the availableQuestions
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

// Click listener
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
    // Look at the choice-text and get its dataset number
    selectedChoice = selectedChoice.children[1];
    const selectedAnswer = selectedChoice.dataset['number'];
    // Update the progress bar
    selectedChoice = selectedChoice.parentElement;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    // Check if selected answer is correct or incorrect
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    // Apply styles & animation of correct/incorrect choices
    applyAnswerStyles(classToApply, selectedChoice);
    
    setTimeout(() => {
      getNewQuestion();
    }, 800);
  })
};

// Increment Score if the answer is correct
incrementScore = num => {
  console.log(scoreText.style.color);
  score += num;
  const scoreUpdate = () => {
    count = +scoreText.innerText;
    if (count < score) {
      scoreText.style.color = '#77dd77';
      scoreText.innerText = count + 1;
      setTimeout(scoreUpdate, 40);
    } else {
      scoreText.style.color = '#56a5eb';
      scoreText.innerText  = score;
    }
  }
  scoreUpdate();
}

// Apply styles/animation to the corresponding result
applyAnswerStyles = (result, selectedChoice) => {
  
  // Change color to green if correct, red if incorrect. Update score at the same time
  if (result == 'correct') {
    selectedChoice.style.backgroundColor = '#77dd77';
    selectedChoice.children[0].style.backgroundColor = '#4ed34e';
    bleepRight.play();
    incrementScore(CORRECT_BONUS);
  } else if (result == 'incorrect') {
    selectedChoice.style.animation = 'shake 0.42s';
    selectedChoice.children[0].style.backgroundColor = '#ff392e';
    selectedChoice.style.backgroundColor = '#ff6961';
    bleepWrong.play();
  }
  setTimeout(() => {
    selectedChoice.style.animation = 0;
    selectedChoice.children[0].style.backgroundColor = '#56a5eb';
    selectedChoice.style.backgroundColor = '#fff';
  }, 600);
}
