
const bgMusic = new Audio("music/opening-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;
const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelope-screen");
const letterScreen = document.getElementById("letter-screen");
const continueBtn = document.getElementById("continueBtn");
const questionScreen = document.getElementById("question-screen");
const noMusic = new Audio("music/no-froggy.mp3");
const noFrog = document.getElementById("noFrog");
const yesCat = document.getElementById("yesCat");
const taunt = document.getElementById("taunt");
const finalScreen = document.getElementById("final-screen");

const phrases = [
  "Don’t touch me!",
  "Beep beep move!",
  "Why don’t you pick me?",
  "Ha! Ha! You can’t catch me!"
];

let yesScale = 1;

envelope.onclick = () => {
  envelopeScreen.style.display = "none";
  letterScreen.classList.remove("hidden");
  startHearts();
  bgMusic.play();
};

continueBtn.onclick = () => {
  letterScreen.style.display = "none";
  questionScreen.classList.remove("hidden");
};

noFrog.onmouseover = () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 200 - 100;
  noFrog.style.transform = `translate(${x}px, ${y}px)`;

  document.getElementById("taunt-box").textContent =
  phrases[Math.floor(Math.random() * phrases.length)];


  yesScale += 0.15;
  yesCat.style.transform = `scale(${yesScale})`;

  const frogSound = new Audio("music/frog-hop.mp3");
frogSound.volume = 0.7;
frogSound.play();


yesCat.onclick = () => {
  questionScreen.style.display = "none";
  finalScreen.classList.remove("hidden");
  confetti();
};

function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = "24px";
    document.body.appendChild(heart);

    let fall = setInterval(() => {
      heart.style.top = heart.offsetTop + 2 + "px";
      if (heart.offsetTop > window.innerHeight) {
        heart.remove();
        clearInterval(fall);
      }
    }, 16);
  }, 300);
}

function confetti() {
  for (let i = 0; i < 100; i++) {
    const conf = document.createElement("div");
    conf.textContent = "🎉";
    conf.style.position = "absolute";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.top = "-20px";
    document.body.appendChild(conf);

    let fall = setInterval(() => {
      conf.style.top = conf.offsetTop + 4 + "px";
      if (conf.offsetTop > window.innerHeight) {
        conf.remove();
        clearInterval(fall);
      }
    }, 16);
  }
}
