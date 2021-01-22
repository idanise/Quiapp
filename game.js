const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const ProgressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0 
let questionCounter = 0 
let availableQuestion = []

let questions = [
	{
		question: "Holland is also referred to as", 
		choice1: "Netherland",
		choice2: "Belguim",
		choice3: "Turkey",
		choice4: "Ireland",
		answer: 1,
	},
	{
		question: "The fastest land animal is the", 
		choice1: "Antelope",
		choice2: "Horse",
		choice3: "Fox",
		choice4: "Cheetah",
		answer: 4,
	},
	{
		question: "What percent of American adults believe that chocolate milk comes from brown cows", 
		choice1: "20%",
		choice2: "18%",
		choice3: "7%",
		choice4: "33%",
		answer: 3,
	},
	{
		question: "Approximately what percent of U.S. power outages are caused by squirrels?", 
		choice1: "10-20%",
		choice2: "5-10%",
		choice3: "15-20%",
		choice4: "30-40%",
		answer: 1,
    },
    {
        question: "How many countries are in Africa",
        choice1: "51",
        choice2: "52", 
        choice3: "53",
        choice4: "54",
        answer: 2,
    },
    {
        question: "How many colors does the Spanish flag have",
        choice1: "4",
        choice2: "3", 
        choice3: "2",
        choice4: "1",
        answer: 2,
    },
    {
        question: "Who was the 44th president of the United States of America",
        choice1: "Donald Trump",
        choice2: "George Bush", 
        choice3: "Bill Clinton",
        choice4: "Barack Obama",
        answer: 4,
    },
    {
        question: "The biggest country by land mass is",
        choice1: "Canada",
        choice2: "USA", 
        choice3: "Russia",
        choice4: "United kingdom",
        answer: 3,
    },
    {
        question: "A group of Dolphin is referred to as?",
        choice1: "School",
        choice2: "Army", 
        choice3: "College",
        choice4: "Herd",
        answer: 1,
    },
    {
        question: "What country won the 2014 World Cup",
        choice1: "France",
        choice2: "Germany", 
        choice3: "Brazil",
        choice4: "Spain",
        answer: 2,
    },
]

const SCORE_POINTS = 100 
const MAX_QUESTIONS = 10 

startGame = () => {
    questionCounter = 0 
    score = 0 
    availableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("end.html")
    }

    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    ProgressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true 
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false 
        const selectedChoice = e.target 
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === "correct"){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num 
    scoreText.innerText = score
}

startGame()