const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var counter = 0;
highScoresList.innerHTML = highScores.map( score => {
  counter++;
  return `<li class="high-score">${score.name}	&emsp; &emsp; &emsp; ${score.score}</li>`;
})
  .join('');