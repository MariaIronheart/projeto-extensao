const questions = [
    {
        question: "Qual o significado de 'Libras'?",
        answers:[
            {text:"Lingua Brasileira de Sinais", correct: true },
            {text:"Língua Sul-Americana de Sinais", correct: false },
            {text: "Língua Sinalizada do Brasil ", correct: false },
                ]
            
},
{
    question: "Assinale qual a opção verdadeira:",
    answers:[
        {text:"Cada sinal pode ser feito com a mão dominante, ou pelas duas mãos dependendo do sinal!", correct: true },
        {text:"Cada sinal tem uma mão pré-determinada para ser utilizada.", correct: false },
            ]
},
{
    question: "Qual dos parâmetros abaixo NÃO é considerado formativo?",
    answers:[
        {text:"Nacionalidade do comunicador.", correct: true },
        {text:"Expressões facias e corporais.", correct: false },
        {text:"Configuração da mão.", correct: false },
            ]
},
{
    question: "Qual das afirmações abaixo é verdadeira?" ,
    answers:[
        {text:"Podemos utilizar Libras somente na América Latina.", correct: false },
        {text:"Libras é universal, podemos utilizar em qualquer país!", correct: false },
        {text:"Libras não é universal, é utilizada somente no Brasil.", correct: true },
        
            ]
},
{
    question: "Escolha a afirmação FALSA:",
    answers:[
        {text:"Libras é a língua oficial da comunidade surda brasileira.", correct: false },
        {text:"As tecnologias atrapalham no processo de conscientização sobre Libras.", correct: true },
        {text:"Libras é uma linguagem dinâmica, apresenta variações regionais.", correct: false },
        {text:"Ela é organizada nos níveis: fonológico, morfológico, sintático e semântico.", correct: false },
            ]
},
{
    question: "Qual das afirmações abaixo é verdadeira ?",
    answers:[
        {text:"Expressões faciais e corporais NÃO agregam nenhum valor à língua.", correct: false },
        {text:"Colocar legenda em vídeos já resolve a questão da acessibilidade.", correct: false },
        {text:"A profissão de interprete NÃO é regulamentada.", correct: false },
        {text:"Quem fala Libras além de outra língua, é bilíngue.", correct: true },
            ]
},
];

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const imgQuestion = document.getElementById("imagem");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Próxima pergunta";
    showQuestion();
}




function showQuestion(){
    resetState();    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ; //Somou 1 porque o indice começa do zero
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    let imageSrc = currentQuestion.imagem;
    let imageAlt = currentQuestion.imagemAlt;


    

    /*if (!!imageSrc && !!imageAlt) {
        const imgTag = document.createElement("img");
        imgTag.src="letraA.png";
        imgTag.width="500";
        imgTag.height="500";
        imgTag.alt=imageAlt;

        document.getElementById("imageContainer").appendChild(imgTag);
        /*
        imgQuestion.src="letraA.png";
        imgQuestion.width="500";
        imgQuestion.height="500";
        imgQuestion.alt=imageAlt;        
        */
    /*} else {
        /*
        imgQuestion.width="0";
        imgQuestion.height="0";
        imgQuestion.alt="";
        */
     /*   document.getElementById("imageContainer").innerHTML = '';
    }*/

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
        questionElement.innerHTML = `Você acertou ${score} das ${questions.length} questões!<br/> <br/>Estude mais em nossa página e tente novamente!`;
    } else{
        questionElement.innerHTML = `Você acertou ${score} das ${questions.length} questões!<br/><br/> Parabéns pelo esforço! `;
        
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