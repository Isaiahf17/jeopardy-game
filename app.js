const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who wrote the Percy Jackson series?',
                answers: ['JK Rowling', 'Rick Riordan'],
                correct: 'Rick Riordan',
                level: "easy"
            },
            {
                question: 'Who wrote a Series of Unfortunate Events?',
                answers: ['Suzanne Collins', 'Lemony Snicket'],
                correct: 'Lemony Snicket',
                level: 'medium'
            },
            {
                question: 'Who wrote The Journey?',
                answers: ['Billy Graham','Lois Lowry'],
                correct: 'Billy Graham',
                level: 'hard'
            }
        ]
    },
    {
        genre: "WHERE",
        questions:[
            {
                question: "Where do kangaroos live?",
                answers: ['Australia','Antartica'],
                correct: 'Australia',
                level: 'easy'
            },
            {
                question: 'Where is the Statue of Liberty located?',
                answers: ['United States', 'France'],
                correct: 'United States',
                level: 'medium'
            },
            {
                question: 'Where is the Vatican City located?',
                answers: ['England', 'Italy'],
                correct: 'Italy',
                level: 'hard'
            }
        
        ]
    },
    {
        genre: "WHAT",
        questions:[
            {
                question:'What is the national animal of the United States? ',
                answers: ['Dove', 'Eagle'],
                correct: 'Eagle',
                level:'easy'
            },
            {
                question: 'What currency is used in Mexico?',
                answers: ['Peso','Lira'],
                correct: 'Peso',
                level: 'medium'
            },
            {
                question: 'What is the country with highest population?',
                answers: ['China', 'India'],
                correct: 'China',
                level: 'hard'
            }
        ]
    },
    {
        genre:"WHEN",
        questions:[
            {
                question: 'When did the U.S. gain its indepence?',
                answers: ['1864', '1776'],
                correct: '1776',
                level: 'easy'
            },
            {
                question: 'When did Christopher Columbus discover the Americas?',
                answers:['1492', '1482'],
                correct:'1492',
                level: 'medium'
            },
            {
                question: 'When was the United Nations formed?',
                answers:['1965', '1945'],
                correct: '1945',
                level: 'hard'
            }
        ] 
    } ] 
    
    let score = 0

    function addCategory(category){
    const column =  document.createElement('div')
        column.classList.add('genre-column')
    const genreTitle = document.createElement('div')
        genreTitle.classList.add('genre-title')
        genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (question.level === 'easy'){
            card.innerHTML = 100
        }
        if (question.level === 'medium'){
            card.innerHTML = 200
        }
        
        if (question.level === 'hard'){
            card.innerHTML = 300
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())

        card.addEventListener('click', flipCard)

        })
    }

    jeopardyCategories.forEach(category => addCategory(category))

    function flipCard() {
        this.innerHTML = ""
        this.style.fontSize = "15px"
        this.style.lineHeight ="30px"
        const textDisplay = document.createElement('div')
        textDisplay.classList.add('card-text')
        textDisplay.innerHTML = this.getAttribute('data-question')
        const firstButton = document.createElement('button')
        const secondButton = document.createElement('button')
        
        firstButton.classList.add('first-button')
        secondButton.classList.add('second-button')
        firstButton.innerHTML = this.getAttribute('data-answer-1')
        secondButton.innerHTML = this.getAttribute('data-answer-2')
        firstButton.addEventListener('click', getResult)
        secondButton.addEventListener('click', getResult)
        this.append(textDisplay, firstButton, secondButton)

        const allCards = document.querySelectorAll('.card')
        allCards.forEach(card => card.removeEventListener('click', flipCard))
    }

    function getResult(){
        const allCards = Array.from(document.querySelectorAll('.card'))
        allCards.forEach(card => card.addEventListener('click', flipCard))


        const cardOfButton = this.parentElement

        if (cardOfButton.getAttribute('data-correct') == this.innerHTML){
            score = score + parseInt(cardOfButton.getAttribute('data-value'))
            scoreDisplay.innerHTML = score
            cardOfButton.classList.add('correct-answer')
            setTimeout(() =>{
                while (cardOfButton.firstChild){
                    cardOfButton.removeChild(cardOfButton.lastChild)
                }
                card.cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
            }, 100)
        } else {
            cardOfButton.classList.add('wrong-answer')
            setTimeout(() => {
                while (cardOfButton.firstChild){
                    cardOfButton.removeChild(cardOfButton.lastChild) }
                    cardOfButton.innerHTML = 0 
            }, 100)
        }

    cardOfButton.removeEventListener('click', flipCard)


    }