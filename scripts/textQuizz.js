

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function loadQuestions() {
    try {
        const response = await fetch('../json/questions.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        questions = await response.json();
        shuffleArray(questions);
        questions = questions.slice(0, 10);
        displayQuestions(); 
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function displayQuestions() {
    displayQuestion(0, '#question-1');
    displayQuestion(1, '#question-2');
}

function displayQuestion(offset, containerId) {
    const questionContainer = document.querySelector(`${containerId} .question`);
    const optionsContainer = document.querySelector(`${containerId} .options`);

    // Clear previous options
    optionsContainer.innerHTML = '';

    const questionIndex = currentQuestionIndex + offset;

    if (questionIndex < questions.length) {
        const question = questions[questionIndex];
        questionContainer.textContent = question.question;

        const optionsHTML = question.options.map((option, optionIndex) => `
            <div>
                <input type="radio" id="q${questionIndex}-option${optionIndex}" name="q${questionIndex}-option">
                <label for="q${questionIndex}-option${optionIndex}">${option}</label>
            </div>
        `).join('');

        optionsContainer.innerHTML = optionsHTML;
    } else {
        displayScore();
    }
}

function checkAnswers() {
    let allQuestionsAnswered = true;

    for (let i = 0; i < 2; i++) {
        const questionIndex = currentQuestionIndex + i;
        const selectedOption = document.querySelector(`input[name="q${questionIndex}-option"]:checked`);

        if (selectedOption) {
            const selectedAnswer = selectedOption.nextElementSibling.textContent;
            if (selectedAnswer === questions[questionIndex].correctAnswer) {
                score++;
            }
        } else {
            allQuestionsAnswered = false;
            alert(`Please select an answer for Question ${questionIndex + 1}`);
        }
    }

    if (allQuestionsAnswered) {
        currentQuestionIndex += 2; 
        if (currentQuestionIndex < questions.length) {
            displayQuestions();
        } else {
            displayScore();
        }
    }
}

function displayScore() {
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.innerHTML = `<p>Your score: ${score} out of ${questions.length}</p>`;

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.addEventListener('click', resetQuiz);
    scoreContainer.appendChild(restartButton);

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Score';
    downloadButton.addEventListener('click', function() {
        saveScoreToFile(username, score); 
    });
    scoreContainer.appendChild(downloadButton);
}

function saveScoreToFile(username, score) {
    const data = {
        username: username, 
        score: score
    };

    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${username}_score.json`; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score-container').innerHTML = '<p>Score: 0</p>'; 
    loadQuestions(); 
}

loadQuestions();
document.querySelector('.submitAnswer').addEventListener('click', checkAnswers);
