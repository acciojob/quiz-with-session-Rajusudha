const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
    answer: 2
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: 2
  }
];

function loadQuiz() {
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = '';
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    const optionsList = document.createElement('ul');
    optionsList.classList.add('options');
    
    question.options.forEach((option, i) => {
      const optionItem = document.createElement('li');
      
      const optionRadio = document.createElement('input');
      optionRadio.type = 'radio';
      optionRadio.name = `question${index}`;
      optionRadio.value = i;
      optionRadio.id = `question${index}_option${i}`;
      optionRadio.checked = getSavedAnswer(index) === i;

      optionRadio.addEventListener('change', () => saveAnswer(index, i));
      
      const optionLabel = document.createElement('label');
      optionLabel.htmlFor = `question${index}_option${i}`;
      optionLabel.textContent = option;

      optionItem.appendChild(optionRadio);
      optionItem.appendChild(optionLabel);
      optionsList.appendChild(optionItem);
    });

    questionDiv.appendChild(optionsList);
    quizContainer.appendChild(questionDiv);
  });
}

function saveAnswer(questionIndex, optionIndex) {
  let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  progress[questionIndex] = optionIndex;
  sessionStorage.setItem('progress', JSON.stringify(progress));
}

function getSavedAnswer(questionIndex) {
  let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  return progress[questionIndex];
}

function submitQuiz() {
  let score = 0;
  questions.forEach((question, index) => {
    const savedAnswer = getSavedAnswer(index);
    if (savedAnswer == question.answer) {
      score++;
    }
  });
  document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
}

window.onload = function() {
  loadQuiz();
  const savedScore = localStorage.getItem('score');
  if (savedScore !== null) {
    document.getElementById('score').textContent = `Your last score was ${savedScore} out of 5.`;
  }
};
