const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledMCQs, currentMCQIndex;
let shuffledSRQs, currentSRQIndex;
let currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex >= MCQs.length) {
      currentSRQIndex++;
  } else {
      currentMCQIndex++;
  }
  setNextQuestion();
})

function startGame() {
  startButton.classList.add('hide');
  shuffledMCQs = MCQs.sort(() => Math.random() - .5);
  shuffledSRQs = SRQs.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  currentMCQIndex = 0;
  currentSRQIndex = 0;
  questionContainerElement.classList.remove('hide')
  setNextQuestion(shuffledSRQs, shuffledMCQs);
}

function setNextQuestion(shuffledSRQs, shuffledMCQs) {
  resetState();
  console.log(shuffledMCQs, shuffledSRQs);
  if (currentQuestionIndex >= MCQs.length) {
    showQuestion("SRQ", shuffledSRQs[currentSRQIndex]);
  } else {
    showQuestion("MCQ", shuffledMCQs[currentMCQIndex]);
  }
}

function showQuestion(type, question) {
  console.log(question);
  if (type === "MCQ") {
      questionElement.innerText = question.question;
      question.answers.forEach(answer => {
          const button = document.createElement('button');
          button.innerText = answer.text;
          button.classList.add('btn');
          if (answer.correct) {
              button.dataset.correct = answer.correct
          }
          button.addEventListener('click', selectAnswer);
          answerButtonsElement.appendChild(button);
      });
  } else {
      questionElement.innerText = question.passage;
      question.questions.forEach(question => {
          const questionText = document.createElement('p');
          questionText.innerText = question;
          const response = document.createElement('textarea');
          answerButtonsElement.appendChild(questionText)
          answerButtonsElement.appendChild(response);
      });
  }
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledMCQs.length > currentMCQIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const MCQs = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false }
    ]
  },
  {
    question: "Who is the best YouTuber?",
    answers: [
      { text: "Web Dev Simplified", correct: true },
      { text: "Traversy Media", correct: true },
      { text: "Dev Ed", correct: true },
      { text: "Fun Fun Function", correct: true }
    ]
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false }
    ]
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true }
    ]
  }
];

const SRQs = [
  {
    passage: "A",
    questions: [
      "Could this story be true?",
      "What is the setting of this story?",
      "Who is this story about? Describe him or her.",
      "Identify the characters in the story by making a list of all the characters."
    ]
  },
  {
    passage: "B",
    questions: [
      "Locate the facts in the story and list the main facts.",
      "Summarize the main facts in the story and discuss how they relate to the main idea of the story.",
      "Has anything in your life happened that is similar to the things that happened in the story?",
      "What events in the story could not happen in real life?",
      "What is your opinion of the story? Did you enjoy reading it? Explain."
    ]
  },
  {
    passage: "C",
    questions: [
      "What is the setting of this story?",
      "Who is this story about? Describe him or her.",
      "Summarize the main facts in the story and discuss how they relate to the main idea of the story."
    ]
  }
];