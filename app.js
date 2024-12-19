let currentQuestion = 0;
let points = 0;
let questionTimer;
let gameTimer;
let gameTimeRemaining = 900; // 15 minutes in seconds
let questionTimeRemaining = 10; // 10 seconds per question

// Define Questions including the new question about Korvah Harper Tarnue
const questions = [
    {
        question: "What year did Liberia declare its independence?",
        options: ["1847", "1857", "1837", "1867"],
        answer: 0, // Correct answer: 1847
    },
    {
        question: "Who was the first president of Liberia?",
        options: ["Joseph Jenkins Roberts", "William Tubman", "Samuel Doe", "Ellen Johnson Sirleaf"],
        answer: 0, // Correct answer: Joseph Jenkins Roberts
    },
    {
        question: "What is the capital city of Liberia?",
        options: ["Monrovia", "Buchanan", "Harper", "Ganta"],
        answer: 0, // Correct answer: Monrovia
    },
    {
        question: "Which country supported Liberia’s founding?",
        options: ["United States", "United Kingdom", "France", "Germany"],
        answer: 0, // Correct answer: United States
    },
    {
        question: "What does the single star on Liberia's flag represent?",
        options: ["Freedom and independence", "Unity", "Wealth", "Peace"],
        answer: 0, // Correct answer: Freedom and independence
    },
    {
        question: "Who is Korvah Harper Tarnue currently?",
        options: ["Graphic Designer", "Software Engineer", "Politician", "Businessman"],
        answer: 0, // Correct answer: Graphic Designer and Software Engineer
    }
];

// UI Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const pointsEl = document.getElementById("score");
const timeRemainingEl = document.getElementById("time-remaining");
const nextBtn = document.getElementById("next");

// Load the current question
function loadQuestion() {
    resetQuestionTimer();
    const currentQ = questions[currentQuestion];
    questionEl.textContent = currentQ.question;
    optionsEl.innerHTML = "";
    currentQ.options.forEach((option, index) => createOptionButton(option, index));

    nextBtn.style.display = "none"; // Hide next button initially
    startQuestionTimer();
}

// Create buttons for each option
function createOptionButton(option, index) {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index, button);
    optionsEl.appendChild(button);
}

// Check if the selected answer is correct
function checkAnswer(selected, button) {
    const currentQ = questions[currentQuestion];
    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach((btn) => {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
    });

    if (selected === currentQ.answer) {
        points += 10; // Correct answer, award points
        pointsEl.textContent = points;
        button.style.background = "#28a745"; // Green for correct
    } else {
        button.style.background = "#dc3545"; // Red for wrong
        buttons[currentQ.answer].style.background = "#28a745"; // Highlight correct answer
        alert(`Incorrect! The correct answer is: ${currentQ.options[currentQ.answer]}`);
    }

    clearInterval(questionTimer);
    setTimeout(moveToNextQuestion, 3000); // 3-second delay before the next question
}

// Move to the next question or end the game
function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

// Start the question timer
function startQuestionTimer() {
    questionTimer = setInterval(() => {
        questionTimeRemaining--;
        if (questionTimeRemaining <= 0) {
            clearInterval(questionTimer);
            alert("Time's up! Moving to the next question.");
            showCorrectAnswerAndProceed();
        }
    }, 1000);
}

// Show correct answer after time runs out and proceed
function showCorrectAnswerAndProceed() {
    const currentQ = questions[currentQuestion];
    const buttons = optionsEl.querySelectorAll("button");

    buttons[currentQ.answer].style.background = "#28a745"; // Highlight correct answer
    buttons.forEach((btn) => btn.disabled = true); // Disable all buttons

    setTimeout(moveToNextQuestion, 3000); // 3-second delay before moving to next question
}

// Start the game timer
function startGameTimer() {
    gameTimer = setInterval(() => {
        gameTimeRemaining--;
        const minutes = Math.floor(gameTimeRemaining / 60);
        const seconds = gameTimeRemaining % 60;
        timeRemainingEl.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (gameTimeRemaining <= 0) {
            clearInterval(gameTimer);
            alert("Game Over! Please wait 5 minutes to restart.");
            setTimeout(restartGame, 300000); // Restart game after 5 minutes
        }
    }, 1000);
}

// End the game and display results
function endGame() {
    alert(`Game Over! Your total score is: ${points}`);
    currentQuestion = 0;
    points = 0;
    pointsEl.textContent = points;
    clearInterval(questionTimer);
    clearInterval(gameTimer);
    setTimeout(restartGame, 300000); // Wait 5 minutes before restarting
}

// Reset the game to its initial state
function restartGame() {
    gameTimeRemaining = 900; // 15 minutes
    currentQuestion = 0;
    points = 0;
    pointsEl.textContent = points;
    loadQuestion();
    startGameTimer();
}

// Redeem points (example: for rewards or virtual currency)
document.getElementById("redeem").addEventListener("click", () => {
    alert(`You have redeemed ${points} points.`);
    points = 0;
    pointsEl.textContent = points;
});

// Reset question timer
function resetQuestionTimer() {
    if (questionTimer) clearInterval(questionTimer);
    questionTimeRemaining = 10;
}

// Initialize the game
loadQuestion();
startGameTimer();
