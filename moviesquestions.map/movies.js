

const questions = [
 { vraag:"wat is de meest verdienende film ooit",
    options: ["avengers Endgame","avatar 2009","titanic","spiderman 2002"],
   juistAntwoord:"avatar 2009"
  }
];

const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answers");
const feedbackElement = document.getElementById("feedbacks");
questionElement.textContent = questions.text;  

questions.options.forEach(option => {
  const button = document.createElement("button");
  button.textcontent = option;
  button.addEventListener("click", () => checkAnswer(option));
  answerContainer.appendchild(button);
});



function checkAnswer(selected){
  if(selected === questions.correctanswer){
    feedbackElement.textContent ="goed gedaan!";
    feedbackElement.style.color ="green";
  } else {
    feedbackElement.textcontent ="fout";
    feedbackElement.style.color ="red";
  }
};











