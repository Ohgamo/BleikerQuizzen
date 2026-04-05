var questions = [
  {
    category: "Helse og oppvekst",
    question: "Hva betyr taushetsplikt i helsefag?",
    options: [
      "Man må være stille på jobb",
      "Man kan ikke dele private opplysninger om pasienter",
      "Man må skrive rapporter",
      "Man må snakke med pasienter"
    ],
    answer: 1
  },
  {
    category: "Helse og oppvekst",
    question: "Se videoen og svar: Hva handler videoen om?",
    options: [
      "En presentasjon av Bleiker skole",
      "En quiz om Bleiker Quizzen",
      "En omvisning på skolen",
      "En idrettsdag på Bleiker"
    ],
    answer: 1,
    hasVideo: true
  },
  {
    category: "Helse og oppvekst",
    question: "Hva er et viktig prinsipp i smittevern?",
    options: ["Håndhygiene", "Mørke rom", "Mindre mat", "Mindre søvn"],
    answer: 0
  },
  {
    category: "Idrettsfag",
    question: "Hva er kroppens viktigste energikilde under hard trening?",
    options: ["Protein", "Karbohydrater", "Vann", "Vitaminer"],
    answer: 1
  },
  {
    category: "Idrettsfag",
    question: "Hva er restitusjon?",
    options: [
      "Oppvarming",
      "Nedtrapping etter trening",
      "Kroppens gjenoppbygging etter belastning",
      "Maksimal trening"
    ],
    answer: 2
  },
  {
    category: "Elektro og datateknologi",
    question: "Hva måles i Ohm (Ω)?",
    options: ["Strøm", "Motstand", "Spenning", "Effekt"],
    answer: 1
  },
  {
    category: "Informasjonsteknologi",
    question: "Hva betyr HTML?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Media Link",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    category: "Medier og kommunikasjon",
    question: "Hva er en storyboard?",
    options: [
      "En liste over skuespillere",
      "En plan med tegninger av scener i en film",
      "En kameratype",
      "Et redigeringsprogram"
    ],
    answer: 1
  },
  {
    category: "Demokrati og medborgerskap",
    question: "Hva betyr inkludering?",
    options: [
      "Å holde noen utenfor",
      "Å la alle få være med og føle tilhørighet",
      "Å konkurrere",
      "Å jobbe alene"
    ],
    answer: 1
  },
  {
    category: "Kombinasjonsklasse",
    question: "Hva er Stortinget?",
    options: [
      "Norges regjering",
      "Norges parlament (nasjonalforsamling)",
      "Norges høyesterett",
      "Norges kongehus"
    ],
    answer: 1
  }
];
 
// Variabler
var currentQuestion = 0;
var score = 0;
var playerName = "";
 
function startQuiz() {
  var nameInput = document.getElementById("name-input").value.trim();
  if (nameInput === "") {
    alert("Skriv inn navnet ditt!");
    return;
  }
  playerName = nameInput;
 
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
 
  currentQuestion = 0;
  score = 0;
  showQuestion();
}
 
function showQuestion() {
  var q = questions[currentQuestion];
 
  // Oppdater header
  document.getElementById("question-counter").textContent =
    "Spørsmål " + (currentQuestion + 1) + " / " + questions.length;
  document.getElementById("score-display").textContent = "Poeng: " + score;
 
  // Oppdater progress bar
  var percent = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progress-fill").style.width = percent + "%";
 
  // Sett spørsmålet
  document.getElementById("category-label").textContent = q.category;
  document.getElementById("question-text").textContent = q.question;
 
  // Video
  var videoContainer = document.getElementById("video-container");
  if (q.hasVideo) {
    videoContainer.classList.remove("hidden");
  } else {
    videoContainer.classList.add("hidden");
  }
 
  // Skjul feedback og neste-knapp
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");
 
  // Lag alternativ-knapper
  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
 
  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = q.options[i];
    btn.setAttribute("data-index", i);
    btn.onclick = function() { checkAnswer(parseInt(this.getAttribute("data-index"))); };
    optionsContainer.appendChild(btn);
  }
}
 
function checkAnswer(chosenIndex) {
  var q = questions[currentQuestion];
  var buttons = document.querySelectorAll(".option-btn");
  var feedback = document.getElementById("feedback");
 
  // Deaktiver alle knapper
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
 
  // Vis riktig/galt
  buttons[q.answer].classList.add("correct");
 
  if (chosenIndex === q.answer) {
    score++;
    feedback.textContent = "✅ Riktig! Bra jobba!";
    feedback.className = "riktig";
    document.getElementById("score-display").textContent = "Poeng: " + score;
  } else {
    buttons[chosenIndex].classList.add("wrong");
    feedback.textContent = "❌ Feil! Riktig svar var: " + q.options[q.answer];
    feedback.className = "feil";
  }
 
  feedback.classList.remove("hidden");
  document.getElementById("next-btn").classList.remove("hidden");
}
 
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}
 
function showResult() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
 
  var percent = Math.round((score / questions.length) * 100);
  var emoji = percent >= 80 ? "🏆" : percent >= 50 ? "👍" : "😅";
 
  document.getElementById("result-title").textContent = "Quiz ferdig! " + emoji;
  document.getElementById("result-score").textContent =
    playerName + " fikk " + score + " av " + questions.length + " riktige (" + percent + "%)";
 
  // Lagre i localStorage
  var highscores = JSON.parse(localStorage.getItem("bleiker_highscores")) || [];
  highscores.push({ name: playerName, score: score });
 
  // Sorter og behold topp 5
  highscores.sort(function(a, b) { return b.score - a.score; });
  highscores = highscores.slice(0, 5);
 
  localStorage.setItem("bleiker_highscores", JSON.stringify(highscores));
 
  // Vis highscore-liste
  var listHTML = "<h3>🏅 Topp 5 Highscores</h3>";
  var medals = ["🥇", "🥈", "🥉", "4.", "5."];
 
  for (var i = 0; i < highscores.length; i++) {
    listHTML += '<div class="highscore-item">';
    listHTML += '<span><span class="rank">' + medals[i] + '</span>' + highscores[i].name + '</span>';
    listHTML += '<span>' + highscores[i].score + "/" + questions.length + "</span>";
    listHTML += "</div>";
  }
 
  document.getElementById("highscore-list").innerHTML = listHTML;
}
 
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("name-input").value = "";
}