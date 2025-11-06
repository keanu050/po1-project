// filepath: [software.js](http://_vscodecontentref_/3)
const questions = [
  { q: "What does HTML stand for?", a:["Hypertext Markup Language","High Text Making Language","Hypertext Making Links","High Text Markup Language"], correct:0 },
  { q: "Which language is considered low-level and close to hardware?", a:["Assembly","Python","Ruby","JavaScript"], correct:0 },
  { q: "What does CSS stand for?", a:["Cascading Style Sheets","Computer Style Sheets","Creative Style System","Colorful Style Sheets"], correct:0 },
  { q: "Which of these is NOT a JavaScript framework?", a:["Django","Angular","Vue","React"], correct:0 },
  { q: "What is the primary purpose of SQL?", a:["Database queries and management","Web Design","Mobile Development","Game Development"], correct:0 },
  { q: "Which symbol comments a single line in JavaScript?", a:["//","/*","<!--","#"], correct:0 },
  { q: "What does API stand for?", a:["Application Programming Interface","Advanced Program Integration","Application Process Interface","Advanced Programming Input"], correct:0 },
  { q: "Which data structure is LIFO?", a:["Stack","Queue","Array","Tree"], correct:0 },
  { q: "What is Git primarily used for?", a:["Version control","Web hosting","Database management","Code compilation"], correct:0 },
  { q: "Which is a backend language?", a:["PHP","HTML","CSS","Bootstrap"], correct:0 },
  { q: "What does IDE stand for?", a:["Integrated Development Environment","Interface Development Environment","Integrated Design Environment","Internal Development Engine"], correct:0 },
  { q: "How do you print to console in Python?", a:["print()","console.log()","echo","System.out.println()"], correct:0 },
  { q: "What is the correct extension for JavaScript files?", a:[".js",".javascript",".jsx",".java"], correct:0 },
  { q: "Which HTTP method sends data to the server to create a resource?", a:["POST","GET","DELETE","PUT"], correct:0 },
  { q: "What is the purpose of a constructor in OOP?", a:["Initialize objects","Delete objects","Copy objects","Compare objects"], correct:0 },
  { q: "Which operator is logical AND in most languages?", a:["&&","||","!","&|"], correct:0 },
  { q: "What is JSON mainly used for?", a:["Data exchange","Styling","Programming","Database storage"], correct:0 },
  { q: "Which is a valid JavaScript variable name?", a:["myVariable","2variable","@variable","my-variable"], correct:0 },
  { q: "What does DOM stand for?", a:["Document Object Model","Data Object Model","Document Oriented Model","Digital Object Model"], correct:0 },
  { q: "Which HTML tag creates a link?", a:["<a>","<link>","<href>","<url>"], correct:0 }
];

let index = 0;
let selected = null;
let fiftyUsed = false;
let correctAnswers = 0; // Track correct answers
let wrongAnswers = 0; // Track wrong answers

const qEl = document.getElementById('Vraag');
const answerBtns = Array.from(document.querySelectorAll('.antwoord'));
const resultEl = document.getElementById('resultaat');
const checkBtn = document.getElementById('controleer-antwoord');
const fiftyBtn = document.getElementById('fifty-fifty');

let nextBtn = document.getElementById('volgende-vraag');
if (!nextBtn) {
  nextBtn = document.createElement('button');
  nextBtn.id = 'volgende-vraag';
  nextBtn.textContent = 'Next question';
  nextBtn.style.display = 'none';
  document.getElementById('quiz-container').appendChild(nextBtn);
}

function render() {
  const q = questions[index];
  qEl.textContent = q.q;
  answerBtns.forEach((btn,i)=>{
    btn.textContent = q.a[i] || '';
    btn.disabled = false;
    btn.style.visibility = 'visible';
    btn.style.background = '';
  });
  selected = null;
  resultEl.textContent = '';
  nextBtn.style.display = 'none';
  checkBtn.style.display = 'inline-block';
  fiftyUsed = false;
  if (fiftyBtn) fiftyBtn.disabled = false;
}

answerBtns.forEach((btn,i)=>{
  btn.addEventListener('click', ()=>{
    if (btn.disabled) return;
    selected = i;
    answerBtns.forEach(b=>b.style.background='');
    btn.style.background = '#b3d9ff';
    resultEl.textContent = '';
  });
});

checkBtn.addEventListener('click', ()=>{
  if (selected === null) {
    resultEl.textContent = 'Choose an answer first!';
    resultEl.style.color = 'orange';
    return;
  }
  const q = questions[index];
  if (selected === q.correct) {
    resultEl.textContent = 'Correct!';
    resultEl.style.color = 'green';
    correctAnswers++; // Increment correct answers
  } else {
    resultEl.textContent = 'Wrong answer.';
    resultEl.style.color = 'red';
    wrongAnswers++; // Increment wrong answers
  }
  answerBtns.forEach(b=>b.disabled=true);
  checkBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
  if (index === questions.length -1) nextBtn.textContent = 'Finish';
});

nextBtn.addEventListener('click', ()=>{
  if (index < questions.length -1) {
    index++;
    render();
  } else {
    qEl.textContent = 'Quiz completed!';
    answerBtns.forEach(b=>b.style.display='none');
    nextBtn.style.display='none';
    checkBtn.style.display='none';
    if (fiftyBtn) fiftyBtn.style.display='none';
    
    // Show final score without percentage
    resultEl.innerHTML = `
      <h2>Quiz Results</h2>
      <p>Correct answers: ${correctAnswers}</p>
      <p>Wrong answers: ${wrongAnswers}</p>
    `;
    resultEl.style.color = 'blue';
  }
});

if (fiftyBtn) {
  fiftyBtn.addEventListener('click', ()=>{
    if (fiftyUsed) return;
    const q = questions[index];
    const wrong = [];
    q.a.forEach((_,i)=> { if (i !== q.correct) wrong.push(i); });
    const removed = [];
    while (removed.length < 2 && wrong.length > 0) {
      const pick = wrong.splice(Math.floor(Math.random() * wrong.length),1)[0];
      removed.push(pick);
    }
    removed.forEach(i=>{
      const btn = answerBtns[i];
      if (btn) { btn.style.visibility = 'hidden'; btn.disabled = true; }
    });
    fiftyUsed = true;
    fiftyBtn.disabled = true;
  });
}

render();