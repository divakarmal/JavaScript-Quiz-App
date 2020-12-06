const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledMCQs, currentMCQIndex
let shuffledSRQs, currentSRQIndex
let currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  if (currentQuestionIndex >= MCQs.length) {
      currentSRQIndex++;ƒ
  } else {
      currentMCQIndex++;
  }
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide');
  shuffledMCQs = MCQs.sort(() => Math.random() - .5);
  shuffledSRQs = SRQs.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  currentMCQIndex = 0;
  currentSRQIndex = 0;
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  if (currentQuestionIndex >= MCQs.length) {
      showQuestion("SRQ", shuffledMCQs[currentMCQIndex]);
  } else {
      showQuestion("MCQ", shuffledSRQs[currentSRQIndex]);
  }
}

function showQuestion(type, question) {
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
          const questionText = document.createElement('blockquote');
          questionText.innerText = question;
          const response = document.createElement('textarea');
      });
  }
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledMCQs.length > currentMCQIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
