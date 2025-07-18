const quotes = {
  success: [
    "Erfolg beginnt, wenn du an dich glaubst.",
    "Groß denken, mutig handeln, stark bleiben."
  ],
  courage: [
    "Mut bedeutet, weiterzumachen, auch wenn du Angst hast.",
    "Wachse, indem du deine Komfortzone verlässt."
  ],
  happiness: [
    "Glück ist eine Entscheidung, kein Zufall.",
    "Ein Lächeln ist der kürzeste Weg zwischen zwei Menschen."
  ],
  creativity: [
    "Kreativität schläft nicht – nutze sie täglich.",
    "Deine Ideen sind wertvoller, als du denkst."
  ],
  love: [
    "Liebe beginnt in deinem Herzen – teile sie.",
    "Liebe ist die stärkste Energie im Universum."
  ],
  endurance: [
    "Kraft entsteht im Durchhalten.",
    "Ausdauer ist Erfolg in Zeitlupe."
  ],
  fun: [
    "Nur wer lacht, lebt wirklich.",
    "Spaß ist der Turbo des Lebens."
  ]
};

function getRandomQuote(theme) {
  const arr = quotes[theme] || [];
  return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById('generate-btn').addEventListener('click', () => {
  const name = document.getElementById('user-name').value || "Freund";
  const theme = document.getElementById('motivation-theme').value;
  const quote = getRandomQuote(theme);
  const message = `Hey ${name}! ${quote}`;
  showMessage(message);
});

document.getElementById('random-btn').addEventListener('click', () => {
  const themes = Object.keys(quotes);
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const quote = getRandomQuote(theme);
  showMessage(quote);
});

function showMessage(msg) {
  document.getElementById('motivation-message').textContent = msg;
  saveMessage(msg);
}

function saveMessage(msg) {
  const saved = JSON.parse(localStorage.getItem('saved') || "[]");
  saved.push({ date: new Date().toLocaleString(), text: msg });
  localStorage.setItem('saved', JSON.stringify(saved));
  renderSaved();
}

function renderSaved() {
  const saved = JSON.parse(localStorage.getItem('saved') || "[]");
  const div = document.getElementById('saved-messages');
  div.innerHTML = saved.map(s => `<p>${s.date}: ${s.text}</p>`).join('');
}

document.getElementById('clear-saved-btn').addEventListener('click', () => {
  localStorage.removeItem('saved');
  renderSaved();
});
renderSaved();

// Sharing
document.getElementById('share-btn').addEventListener('click', () => {
  const msg = document.getElementById('motivation-message').textContent;
  navigator.clipboard.writeText(msg).then(() => alert("Motivation copied!"));
});
