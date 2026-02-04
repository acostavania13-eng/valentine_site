document.addEventListener("DOMContentLoaded", () => {

  // ===== AUDIO =====
  const bgMusic = new Audio("./music/opening_music.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.5;

  const frogSound = new Audio("./music/frog_hop.mp3");
  frogSound.volume = 0.7;

  // ===== ELEMENTS =====
  const envelope = document.getElementById("envelope");
  const envelopeScreen = document.getElementById("envelope-screen");
  const letterScreen = document.getElementById("letter-screen");
  const questionScreen = document.getElementById("question-screen");
  const yesCat = document.getElementById("yesCat");
  const noFrog = document.getElementById("noFrog");
  const tauntBox = document.getElementById("taunt-box");
  const finalScreen = document.getElementById("final-screen");

  // ===== STATE =====
  let yesScale = 1;
  let frogUnlocks = 0;

  const phrases = [
    "Don’t touch me!",
    "Beep beep move!",
    "Why don’t you pick me?",
    "Ha! Ha! You can’t catch me!"
  ];

  // LOCK envelope at start
  envelope.style.pointerEvents = "none";
  envelope.style.opacity = "0.6";

  // ===== FROG GUARD LOGIC =====
  noFrog.onmouseover = () => {
    frogUnlocks++;

    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    noFrog.style.transform = `translate(${x}px, ${y}px)`;

    frogSound.currentTime = 0;
    frogSound.play();

    tauntBox.textContent =
      phrases[Math.floor(Math.random() * phrases.length)];

    yesScale += 0.15;
    yesCat.style.transform = `scale(${yesScale})`;

    if (frogUnlocks >= 3) {
      tauntBox.textContent = "ok fine… open it 💌🐸";
      envelope.style.pointerEvents = "auto";
      envelope.style.opacity = "1";
    }
  };

  // ===== ENVELOPE =====
  envelope.onclick = () => {
    if (frogUnlocks < 3) return;

    envelopeScreen.style.display = "none";
    letterScreen.classList.remove("hidden");

    bgMusic.currentTime = 0;
    bgMusic.play();
  };

  // ===== YES CLICK =====
  yesCat.onclick = () => {
    questionScreen.style.display = "none";
    finalScreen.classList.remove("hidden");
    confetti();
    spawnFinalGifs();
  };

  // ===== CONFETTI =====
  function confetti() {
    for (let i = 0; i < 80; i++) {
      const conf = document.createElement("div");
      conf.textContent = "🎉";
      conf.style.position = "absolute";
      conf.style.left = Math.random() * 100 + "vw";
      conf.style.top = "-20px";
      document.body.appendChild(conf);

      const fall = setInterval(() => {
        conf.style.top = conf.offsetTop + 4 + "px";
        if (conf.offsetTop > window.innerHeight) {
          conf.remove();
          clearInterval(fall);
        }
      }, 16);
    }
  }

  // ===== FINAL GIFS =====
  function spawnFinalGifs() {
    const gifList = [
      "confetti.gif",
      "giphy.gif",
      "cute-frog.gif",
      "small_frog.gif",
      "three.gif",
      "lil.gif",
      "cute.gif",
      "dancing.gif",
      "love.gif",
      "vibing.gif",
      "froggy.gif",
      "around.gif"
    ];

    gifList.forEach(gif => {
      const img = document.createElement("img");
      img.src = `gifs/${gif}`;
      img.classList.add("final-gif");
      img.style.left = Math.random() * 85 + "vw";
      img.style.top = Math.random() * 80 + "vh";
      finalScreen.appendChild(img);
    });
  }

});
