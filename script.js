document.addEventListener("DOMContentLoaded", () => {

  /* ========== AUDIO ========== */
  const bgMusic = new Audio("./music/opening_music.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.5;

  const frogSound = new Audio("./music/frog_hop.mp3");
  frogSound.volume = 0.7;

  /* ========== ELEMENTS ========== */
  const envelope = document.getElementById("envelope");
  const envelopeScreen = document.getElementById("envelope-screen");
  const letterScreen = document.getElementById("letter-screen");
  const questionScreen = document.getElementById("question-screen");
  const finalScreen = document.getElementById("final-screen");

  const frog = document.getElementById("frog");
  const frogCounter = document.getElementById("frog-counter");

  const continueBtn = document.getElementById("continueBtn");
  const yesCat = document.getElementById("yesCat");
  const noFrog = document.getElementById("noFrog");
  const tauntBox = document.getElementById("taunt-box");

  /* ========== STATE ========== */
  let frogClicks = 0;
  let yesScale = 1;

  const phrases = [
    "Don’t touch me!",
    "Beep beep move!",
    "Why don’t you pick me?",
    "HEY—personal space!!",
    "You’re persistent huh?"
  ];

  /* ========== LOCK ENVELOPE INITIALLY ========== */
  envelope.style.pointerEvents = "none";
  envelope.classList.remove("unlocked");

  /* ========== FROG UNLOCK LOGIC ========== */
  frog.addEventListener("click", () => {
    frogClicks++;
    frogCounter.textContent = `🐸 ${frogClicks} / 10`;

    frogSound.currentTime = 0;
    frogSound.play();

    // shake envelope
    envelope.style.animation = "shake 0.4s";
    setTimeout(() => envelope.style.animation = "", 400);

    // unlock at 3
    if (frogClicks === 3) {
      envelope.style.pointerEvents = "auto";
      envelope.classList.add("unlocked");
      frogCounter.textContent = "Ok fine you win! I unlocked it!🙄😒";
    }

    // secret 👀
    if (frogClicks === 10) {
      alert("Ok ok chill bro you being annoying🤨");
    }
  });

  /* ========== ENVELOPE CLICK ========== */
  envelope.addEventListener("click", () => {
  if (frogClicks < 3) return;

  envelopeScreen.classList.add("hidden");
  letterScreen.classList.remove("hidden");

  bgMusic.currentTime = 0;
  bgMusic.play();
});



  /* ========== CONTINUE BUTTON ========== */
  continueBtn.addEventListener("click", () => {
  console.log("CONTINUE CLICKED");
  letterScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
});


  /* ========== NO FROG TAUNTS ========== */
  noFrog.addEventListener("mouseover", () => {
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 180 - 90;
    noFrog.style.transform = `translate(${x}px, ${y}px)`;

    frogSound.currentTime = 0;
    frogSound.play();

    tauntBox.textContent =
      phrases[Math.floor(Math.random() * phrases.length)];

    yesScale += 0.12;
    yesCat.style.transform = `scale(${yesScale})`;
  });

  /* ========== YES CLICK ========== */
  yesCat.addEventListener("click", () => {
  questionScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");
  confetti();
  spawnFinalGifs();
});

  /* ========== CONFETTI ========== */
  function confetti() {
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("div");
      c.textContent = "🎉";
      c.style.position = "absolute";
      c.style.left = Math.random() * 100 + "vw";
      c.style.top = "-20px";
      document.body.appendChild(c);

      const fall = setInterval(() => {
        c.style.top = c.offsetTop + 4 + "px";
        if (c.offsetTop > window.innerHeight) {
          c.remove();
          clearInterval(fall);
        }
      }, 16);
    }
  }

  /* ========== FINAL GIFS ========== */
  function spawnFinalGifs() {
  const gifs = [
    "confetti.gif","giphy.gif","cute-frog.gif","small_frog.gif",
    "three.gif","lil.gif","cute.gif","dancing.gif",
    "love.gif","vibing.gif","froggy.gif","around.gif"
  ];

  const positions = [
    { top: "5%", left: "10%" },
    { top: "10%", right: "10%" },
    { bottom: "10%", left: "12%" },
    { bottom: "12%", right: "12%" },
    { top: "50%", left: "5%" },
    { top: "50%", right: "5%" }
  ];

  gifs.forEach((gif, i) => {
    const img = document.createElement("img");
    img.src = `gifs/${gif}`;
    img.className = "final-gif";

    const pos = positions[i % positions.length];
    Object.assign(img.style, pos);

    finalScreen.appendChild(img);
  });
}
