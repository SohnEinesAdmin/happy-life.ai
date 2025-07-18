const motivationTemplates = {
    success: [
        "{name}, heute ist dein Tag, um Großes zu erreichen! Dein Weg zum Erfolg beginnt mit einem kleinen Schritt.",
        "{name}, deine Entschlossenheit macht dich unaufhaltsam. Erfolg ist nur eine Frage der Zeit!",
        "{name}, jeder Schritt, den du machst, bringt dich deinem Ziel näher. Bleib dran!"
    ],
    courage: [
        "{name}, hab Mut, deine Träume zu verfolgen! Jeder große Wandel beginnt mit einem mutigen Schritt.",
        "{name}, du bist stärker, als du denkst. Trau dich, über dich hinauszuwachsen!",
        "{name}, Mut bedeutet, trotz Angst voranzugehen. Du schaffst das!"
    ],
    happiness: [
        "{name}, dein Lächeln macht die Welt heller. Finde heute Freude in den kleinen Dingen!",
        "{name}, Glück ist in dir. Lass es heute strahlen!",
        "{name}, jeder Moment ist eine Chance, glücklich zu sein. Nutze ihn!"
    ],
    creativity: [
        "{name}, lass deine Ideen fließen! Deine Kreativität kennt keine Grenzen.",
        "{name}, heute ist der Tag, um etwas Neues zu schaffen. Trau dich, anders zu sein!",
        "{name}, deine Fantasie ist der Schlüssel zu Großem. Entfessle sie!"
    ],
    love: [
        "{name}, deine Liebe macht die Welt schöner. Teile sie heute mit jemandem!",
        "{name}, ein kleines bisschen Liebe kann Großes bewirken. Los, mach jemandem den Tag!",
        "{name}, Liebe ist wie WLAN – unsichtbar, aber überall, wenn du verbunden bist!"
    ],
    endurance: [
        "{name}, du bist wie ein Marathonläufer: Jeder Schritt bringt dich weiter, auch wenn’s anstrengend ist!",
        "{name}, gib nicht auf – deine Ausdauer macht dich unschlagbar!",
        "{name}, auch wenn’s hart wird, du rockst das wie ein Superheld!"
    ],
    fun: [
    "{name}, du bist so einzigartig, sogar Einhörner sind neidisch!",
    "{name}, rock den Tag, als wärst du der Star einer Comedy-Show!",
    "{name}, dein Lächeln ist ansteckender als ein virales Katzenvideo!",
    "{name}, tanze durch den Tag, als ob niemand zuschaut – außer vielleicht ein paar Glitzer-Feen!"
]
};

const savedMessages = JSON.parse(localStorage.getItem('savedMessages') || '[]');

function updateSavedMessages() {
    const savedMessagesDiv = document.getElementById('saved-messages');
    if (savedMessagesDiv) {
        savedMessagesDiv.innerHTML = savedMessages.length ? 
            '<h3>Gespeicherte Motivationen</h3>' + savedMessages.map(msg => `<p>${msg}</p>`).join('') : 
            '';
    }
}

function generateMotivation() {
    const nameInput = document.getElementById('user-name').value.trim();
    const theme = document.getElementById('motivation-theme').value;
    const name = nameInput || "Du";
    const motivationMessageDiv = document.getElementById('motivation-message');
    if (!motivationMessageDiv) return;
    if (!nameInput) {
        motivationMessageDiv.textContent = "Gib deinen Namen ein, um eine persönliche Motivation zu erhalten!";
        return;
    }
    const messages = motivationTemplates[theme];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const personalizedMessage = randomMessage.replace("{name}", name);
    motivationMessageDiv.textContent = personalizedMessage;
    savedMessages.push(personalizedMessage);
    localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
    updateSavedMessages();
}

document.getElementById('generate-btn').addEventListener('click', generateMotivation);
document.getElementById('random-btn').addEventListener('click', () => {
    const themes = Object.keys(motivationTemplates);
    document.getElementById('motivation-theme').value = themes[Math.floor(Math.random() * themes.length)];
    generateMotivation();
});
document.getElementById('share-btn').addEventListener('click', () => {
    const message = document.getElementById('motivation-message').textContent;
    if (message && navigator.share) {
        navigator.share({
            title: 'Happy Life AI Motivation',
            text: message,
            url: window.location.href
        }).catch(error => {
            if (error.name !== 'AbortError') {
                console.error('Fehler beim Teilen:', error);
            }
        });
    } else {
        alert('Teilen wird auf diesem Gerät nicht unterstützt.');
    }
});
document.getElementById('clear-saved-btn').addEventListener('click', () => {
    savedMessages.length = 0;
    localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
    updateSavedMessages();
});
generateMotivation();
updateSavedMessages();