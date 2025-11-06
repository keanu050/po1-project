
const questions = [
  { q: "What is the most popular game in the world?", a: ["Minecraft","Fortnite","Among Us","Roblox"], correct: 0 },
  { q: "In what year was the first Mario game released?", a: ["1981","1985","1983","1980"], correct: 2 },
  { q: "Which studio developed The Legend of Zelda?", a: ["Nintendo","Sega","Square Enix","Konami"], correct: 0 },
  { q: "What is the best-selling console ever?", a: ["PlayStation 2","Nintendo DS","Game Boy","PlayStation 4"], correct: 0 },
  { q: "Which game popularized the Battle Royale genre?", a: ["PUBG","Fortnite","H1Z1","Apex Legends"], correct: 0 },
  { q: "Who is the main character in the Halo series?", a: ["Master Chief","Cortana","The Arbiter","Guilty Spark"], correct: 0 },
  { q: "In which game does the enemy 'Creeper' appear?", a: ["Minecraft","Terraria","Roblox","Fortnite"], correct: 0 },
  { q: "In which year did Fortnite officially release?", a: ["2017","2016","2018","2019"], correct: 0 },
  { q: "What color is Pac-Man?", a: ["Yellow","Blue","Red","Green"], correct: 0 },
  { q: "Which franchise uses the phrase 'War. War never changes.'?", a: ["Fallout","Doom","Skyrim","Bioshock"], correct: 0 },
  { q: "Which franchise features Lara Croft?", a: ["Tomb Raider","Uncharted","Metroid","Assassin's Creed"], correct: 0 },
  { q: "Which studio made Half-Life?", a: ["Valve","id Software","Bungie","Epic Games"], correct: 0 },
  { q: "Which studio made Minecraft?", a: ["Mojang","Rare","Naughty Dog","Bethesda"], correct: 0 },
  { q: "On which platform do you find exclusives like God of War and Uncharted?", a: ["PlayStation","Xbox","Nintendo Switch","PC"], correct: 0 },
  { q: "Which developer made Doom (1993)?", a: ["id Software","Valve","Bethesda","Capcom"], correct: 0 },
  { q: "Which game franchise is about catching and training creatures?", a: ["Pokémon","Digimon","Monster Hunter","Yo-kai Watch"], correct: 0 },
  { q: "Which studio developed Skyrim?", a: ["Bethesda Game Studios","Rockstar","Ubisoft","BioWare"], correct: 0 },
  { q: "Which indie game was made by Jonathan Blow?", a: ["Braid","Limbo","Fez","Inside"], correct: 0 },
  { q: "In which game do you build and automate factories with conveyor belts?", a: ["Factorio","Satisfactory","Minecraft","Terraria"], correct: 0 },
  { q: "Which game is known for its speedrun community and classic platform levels?", a: ["Super Mario Bros.","The Sims","Civilization","Farming Simulator"], correct: 0 }
];

let index = 0;
let selected = null;
let fiftyUsed = false;

// Elements
const qEl = document.getElementById("Vraag");
const answerBtns = Array.from(document.querySelectorAll(".antwoord"));
const resultEl = document.getElementById("resultaat");
const checkBtn = document.getElementById("controleer-antwoord");
const fiftyBtn = document.getElementById("fifty-fifty");

// Create next button if missing
let nextBtn = document.getElementById("volgende-vraag");
if (!nextBtn) {
  nextBtn = document.createElement("button");
  nextBtn.id = "volgende-vraag";
  nextBtn.textContent = "Next question";
  nextBtn.style.display = "none";
  document.getElementById("quiz-container").appendChild(nextBtn);
}

// Render current question
function render() {
  const q = questions[index];
  qEl.textContent = q.q;
  answerBtns.forEach((btn, i) => {
    btn.textContent = q.a[i] || "";
    btn.disabled = false;
    btn.style.visibility = "visible";
    btn.style.background = "";
  });
  selected = null;
  resultEl.textContent = "";
  nextBtn.style.display = "none";
  checkBtn.style.display = "inline-block";
  fiftyUsed = false;
  if (fiftyBtn) fiftyBtn.disabled = false;
}

// Answer selection
answerBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    selected = i;
    answerBtns.forEach(b => b.style.background = "");
    btn.style.background = "#b3d9ff";
    resultEl.textContent = "";
  });
});

// Check answer
checkBtn.addEventListener("click", () => {
  if (selected === null) {
    resultEl.textContent = "Choose an answer first!";
    resultEl.style.color = "orange";
    return;
  }
  const q = questions[index];
  if (selected === q.correct) {
    resultEl.textContent = "Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = "Wrong answer.";
    resultEl.style.color = "red";
  }

  // disable answers and show next (always)
  answerBtns.forEach(b => b.disabled = true);
  checkBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  if (index === questions.length - 1) nextBtn.textContent = "Finish";
});

// Next question
nextBtn.addEventListener("click", () => {
  if (index < questions.length - 1) {
    index++;
    render();
  } else {
    qEl.textContent = "Quiz completed!";
    answerBtns.forEach(b => b.style.display = "none");
    nextBtn.style.display = "none";
    checkBtn.style.display = "none";
    if (fiftyBtn) fiftyBtn.style.display = "none";
    resultEl.textContent = "You answered all questions.";
    resultEl.style.color = "blue";
  }
});

// 50/50 powerup: hide two wrong answers
if (fiftyBtn) {
  fiftyBtn.addEventListener("click", () => {
    if (fiftyUsed) return;
    const q = questions[index];
    const wrong = [];
    q.a.forEach((_, i) => { if (i !== q.correct) wrong.push(i); });
    // pick two wrongs
    const removed = [];
    while (removed.length < 2 && wrong.length > 0) {
      const pick = wrong.splice(Math.floor(Math.random() * wrong.length), 1)[0];
      removed.push(pick);
    }
    removed.forEach(i => {
      const btn = answerBtns[i];
      if (btn) {
        btn.style.visibility = "hidden";
        btn.disabled = true;
      }
    });
    fiftyUsed = true;
    fiftyBtn.disabled = true;
  });
}

// Start quiz
render();
// ...existing code...