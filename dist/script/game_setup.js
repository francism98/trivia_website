// // Get body id 
// var bodyId = document.body.id;

// Set default values for category, length, and difficulty in session storage
sessionStorage.setItem('category', 9);
sessionStorage.setItem('length', 10);
sessionStorage.setItem('difficulty', 'easy');

// Get setup choices
const choicesCategory = Array.from(document.getElementsByClassName('category'));
const choicesLength = Array.from(document.getElementsByClassName('length'));
const choicesDifficulty = Array.from(document.getElementsByClassName('difficulty'));
const infoTooltip = Array.from(document.getElementsByClassName('info'));
const tooltipText = Array.from(document.getElementsByClassName('tooltip-text'));

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
for (elemt of infoTooltip) {
  elemt.addEventListener('mouseenter', evt => {
    mouseTarget = evt.target;
    console.log('evt');
    console.log(evt.target);
    var x = evt.clientX;
    var y = evt.clientY;
    let tooltipNumber = mouseTarget.dataset['tooltip'];
    tooltipText[tooltipNumber].style.top = (y + 20) + 'px';
    tooltipText[tooltipNumber].style.left = (x + 20) + 'px';
  })
}

// let setUpToolTip = () => {
//   let tooltip = '', 
//   toolTipDiv = document.querySelector('.div-tooltip'),
//   toolTipElements = Array.from(document.querySelectorAll('.hover-reveal'));

//   let displayToolTip = (e, obj) => {
//     tooltip = obj.dataset['tooltip'];
//   }

//   for (elem of toolTipElements) {
//     elem.addEventListener('mouseenter', evt => { // evt = event object
//       displayToolTip(evt, this);
//     })
//   }
// };