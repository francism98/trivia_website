const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const alertBox = document.getElementById('alertBox');
const alertBgOverlay = document.getElementById('alertBgOverlay');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// Audio
const endChime = new Audio();
endChime.src = './audio/complete.mp3';
endChime.play();

const highScores = JSON.parse(localStorage.getItem('highScores'))  || [];
const MAX_HIGH_SCORES = 20;

var winW = window.innerWidth;
var winH = window.innerHeight;
finalScore.innerText = mostRecentScore;

// Position results container
const endContainer = document.getElementById('endContainer');
console.log(endContainer);

username.addEventListener('keyup', () => {
  console.log(username.value.toLowerCase());
  saveScoreBtn.disabled = !username.value;
  ;})
  
saveHighScore = e => {
  console.log("Clicked the save button!");
  e.preventDefault();
  
  const score = {
    score: mostRecentScore,
    name: username.value.toLowerCase()
  };
  highScores.push(score);
  highScores.sort( (a,b) => b.score - a.score)
  highScores.splice(5);
  
  
  localStorage.setItem('highScores', JSON.stringify(highScores));
  console.log(localStorage);

  // Display Alert box and transparent bg
  alertBox.style.left = (winW/2) - (320/2) + 'px';
  alertBox.style.top = (350 + 'px');
  alertBox.style.display = 'flex';
  alertBgOverlay.style.display = 'inline';
  alertBgOverlay.style.transform = 'scale(1)';
  console.log(`alert`);
  console.log(alertBox);
  setTimeout(() => {
    window.location.assign('./');
  }, 3000);

  
};