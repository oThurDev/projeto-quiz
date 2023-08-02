let questionActual = 0

let correctQuestions = 0

showQuestion()

//events
document.querySelector(".scoreArea button").addEventListener('click', resetEvent)

//functions
function showQuestion() {
    if(questions[questionActual]){
        let q = questions[questionActual]

        //barra
        let pct = Math.floor((questionActual / questions.length) * 100)
        document.querySelector(".progress--bar").style.width = `${pct}%`

        document.querySelector(".scoreArea").style.display = 'none'
        document.querySelector(".questionArea").style.display = 'block'

        document.querySelector(".question").innerHTML = q.question
        document.querySelector(".options").innerHTML = ""

        let optionsHTML = "" 
        for(let i in q.options){
            optionsHTML += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`
        }
        document.querySelector(".options").innerHTML = optionsHTML

        document.querySelectorAll(".options .option").forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        //acabou as questões
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute("data-op"))

    if (questions[questionActual].answer === clickOption) {
        correctQuestions++
    }

    questionActual++
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctQuestions / questions.length) * 100)

    if (points < 30) {
        document.querySelector(".scoreText1").innerHTML = "Estude mais!"
        document.querySelector(".scorePct").style.color = "#ff0000"
    } else if (points >= 30 && points < 70) {
        document.querySelector(".scoreText1").innerHTML = "Não está tão ruim, mas pode melhorar!"
        document.querySelector(".scorePct").style.color = "#ffff00"
    } else if (points >= 70) {
        document.querySelector(".scoreText1").innerHTML = "Parabéns!"
        document.querySelector(".scorePct").style.color = "#0D630D"
    }

    document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`
    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctQuestions}`

    document.querySelector(".scoreArea").style.display = 'block'
    document.querySelector(".questionArea").style.display = 'none'
    document.querySelector(".progress--bar").style.width = "100%"
}

function resetEvent() {
    correctQuestions = 0
    questionActual = 0
    showQuestion()
}