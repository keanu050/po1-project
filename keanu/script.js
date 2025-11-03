// Quiz vragen en antwoorden
const vragen = [
    {
        vraag: "Wat is de populairste game ter wereld?",
        antwoorden: ["Minecraft", "Fortnite", "Among Us", "Roblox"],
        juisteIndex: 0
    },
    {
        vraag: "In welk jaar kwam de eerste Mario game uit?",
        antwoorden: ["1981", "1985", "1983", "1980"],
        juisteIndex: 2
    }
    

];

let huidigeVraagIndex = 0;
let geselecteerd = null;

// Elementen ophalen
const vraagDiv = document.getElementById("Vraag");
const antwoordButtons = document.querySelectorAll(".antwoord");
const resultaatDiv = document.getElementById("resultaat");
const controleerBtn = document.getElementById(" controleer antwoord");

// Voeg volgende vraag button toe aan HTML
const volgendeVraagBtn = document.createElement("button");
volgendeVraagBtn.textContent = "Volgende vraag";
volgendeVraagBtn.style.display = "none";
document.getElementById("quiz-container").appendChild(volgendeVraagBtn);

// Functie om vraag te tonen
function toonVraag() {
    const huidigeVraag = vragen[huidigeVraagIndex];
    vraagDiv.textContent = huidigeVraag.vraag;
    antwoordButtons.forEach((btn, idx) => {
        btn.textContent = huidigeVraag.antwoorden[idx];
        btn.style.background = "";
    });
    geselecteerd = null;
    resultaatDiv.textContent = "";
    volgendeVraagBtn.style.display = "none";
    controleerBtn.style.display = "block";
}

// Antwoordknoppen instellen
antwoordButtons.forEach((btn, idx) => {
    btn.onclick = () => {
        geselecteerd = idx;
        antwoordButtons.forEach(b => b.style.background = "");
        btn.style.background = "#b3d9ff";
        resultaatDiv.textContent = "";
    };
});

// Controleer antwoord
controleerBtn.onclick = () => {
    if (geselecteerd === null) {
        resultaatDiv.textContent = "Kies eerst een antwoord!";
        resultaatDiv.style.color = "orange";
        return;
    }
    
    const huidigeVraag = vragen[huidigeVraagIndex];
    if (geselecteerd === huidigeVraag.juisteIndex) {
        resultaatDiv.textContent = "Goed gedaan!";
        resultaatDiv.style.color = "green";
        if (huidigeVraagIndex < vragen.length - 1) {
            volgendeVraagBtn.style.display = "block";
        } else {
            resultaatDiv.textContent += " Quiz voltooid!";
        }
        controleerBtn.style.display = "none";
    } else {
        resultaatDiv.textContent = "Helaas, fout antwoord.";
        resultaatDiv.style.color = "red";
    }
};

// Volgende vraag button
volgendeVraagBtn.onclick = () => {
    huidigeVraagIndex++;
    if (huidigeVraagIndex < vragen.length) {
        toonVraag();
    }
};

// Start met eerste vraag
toonVraag();