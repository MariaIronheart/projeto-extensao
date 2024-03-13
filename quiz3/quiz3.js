const questions = [
    {
        question: "Qual o significado de 'Libras'?",
        answers:[
            {text:"Lingua Brasileira de Sinais", correct: true },
            {text:"Linguagem Nacional de Sinais", correct: false },
            {text:"Língua Sul-Americana de Sinais", correct: false },
            {text: "Língua Sinalizada do Brasil ", correct: false },
                ]
},
{
    question: "Melhor jogador'?" ,
    answers:[
        {text:"Messi", correct: true },
        {text:"x", correct: false },
        {text:"xy", correct: false },
        {text:"quiz3/A.png", correct: false },
            ]
},
{
    question: "Diga oi",
    answers:[
        {text:"oi", correct: true },
        {text:"dasdsa", correct: false },
        {text:"czxczx", correct: false },
        {text:"ewqeqw", correct: false },
            ]
},
{
    question: "Diga tchau",
    answers:[
        {text:"tchau", correct: true },
        {text:"wq", correct: false },
        {text:"sa", correct: false },
        {text:"s", correct: false },
            ]
},
];

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}




function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ; //Somou 1 porque o indice começa do zero
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
        //button.innerHTML=answer.Image; // SE DER ERRO VOLTAR AQUUUIIIIII. essa linha nao existe no exemplo
            button.innerHTML=answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    nextButton.innerHTML = "Tente Novamente!";
    nextButton.style.display = "block";
    if(score<=2){
        questionElement.innerHTML = `Você acertou ${score} das ${questions.length} questões!<br/> Estude mais em nossa página e tente novamente!`;
    } else{
        questionElement.innerHTML = `Você acertou ${score} das ${questions.length} questões!<br/> Parabéns pelo esforço! `;
        
    }
        
        
};



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
;    }else{
    startQuiz();
}
});

startQuiz();