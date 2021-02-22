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
    console.log(mouseTarget);
  })
}
for (choice of choicesLength) {
  choice.addEventListener('click', selected => {
    const mouseTarget = selected.target;
    for (item of choicesLength) {
      item.classList.remove('btn-selected');
    }
    mouseTarget.classList.add('btn-selected');
    console.log(mouseTarget);
  })
}
for (choice of choicesDifficulty) {
  choice.addEventListener('click', selected => {
    const mouseTarget = selected.target;
    for (item of choicesDifficulty) {
      item.classList.remove('btn-selected');
    }
    mouseTarget.classList.add('btn-selected');
    console.log(mouseTarget);
  })
}


console.log(choicesCategory);