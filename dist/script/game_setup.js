// // Get body id 
// var bodyId = document.body.id;

// Global variables
let category = 9;
let length = 10;
let difficulty = 'easy';

// Get setup choices
const choicesCategory = Array.from(document.getElementsByClassName('category'));
const choicesLength = Array.from(document.getElementsByClassName('length'));
const choicesDifficulty = Array.from(document.getElementsByClassName('difficulty'));

for (choice of choicesCategory) {
  choice.addEventListener('click', selected => {
    const mouseTarget = selected.target;
    for (item of choicesCategory) {
      item.classList.remove('btn-selected');
    }
    mouseTarget.classList.add('btn-selected');
    category = mouseTarget.dataset['category'];
    sessionStorage.setItem('category', category);
    // console.log(mouseTarget);
    // console.log(category);
    
  })
}
for (choice of choicesLength) {
  choice.addEventListener('click', selected => {
    const mouseTarget = selected.target;
    for (item of choicesLength) {
      item.classList.remove('btn-selected');
    }
    mouseTarget.classList.add('btn-selected');
    length = mouseTarget.dataset['length'];
    sessionStorage.setItem('length', length);
    // console.log(mouseTarget);
    // console.log(length);
  })
}
for (choice of choicesDifficulty) {
  choice.addEventListener('click', selected => {
    const mouseTarget = selected.target;
    for (item of choicesDifficulty) {
      item.classList.remove('btn-selected');
    }
    mouseTarget.classList.add('btn-selected');
    difficulty = mouseTarget.dataset['difficulty'];
    sessionStorage.setItem('difficulty', difficulty);
    // console.log(mouseTarget);
    // console.log(difficulty);
  })
}
// console.log(choicesCategory);