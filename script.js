document.addEventListener("DOMContentLoaded", () => {

  /* ===== AUDIO ===== */
  const bgMusic = new Audio("./music/opening_music.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.5;

  const frogSound = new Audio("./music/frog_hop.mp3");
  frogSound.volume = 0.7;

  /* ===== ELEMENTS ===== */
  const envelope = document.getElementById("envelope");
  const envelopeScreen = document.getElementById("envelope-screen");
  const letterScreen = document.getElementById("letter-screen");
  const questionScreen = document.getElementById("question-screen");
  const yesCat = document.getElementById("yesCat");
  const noFrog = document.getElementById("noFrog");
  const tauntBox = document.getElementById("taunt-box");
  const finalScreen = document.getElementById("final-screen");

  const frog = document.getElementById("frog");
  const frogCounter = document.getElementById("frog-counter");

  /* ===== STATE ===== */
  let frogClicks = 0;
  let yesScale = 1;

  const phrases = [
    "Don’t touch me!",
    "Beep beep move!",
    "Why don’t you pick me?",
    "HEY—personal space!!",
    "You’re persistent huh?"
  ];

  /* ===== LOCK ENVELOPE ===== */
  envelope.style.pointerEvents = "none";
  envelope.classList.remove("unlocked");

  /* ===== UNLOCK FROG (CLICK) ===== */
  frog.addEventListener("click", () => {
    frogClicks++;
    frogCounter.textContent = `🐸 ${frogClicks} / 10`;

    frogSound.currentTime = 0;
    frogSound.play();

    // shake envelope
    if (frogClicks < 3) {
      envelope.style.animation = "shake 0.4s";
      setTimeout(() => envelope.style.animation = "", 400);
    }

    // unlock
    if (frogClicks === 3) {
      envelope.style.pointerEvents = "auto";
      envelope.classList.add("unlocked");
      frogCounter.textContent = "ok ok… you can open it 💌🙄";
    }

    // secret 👀
    if (frogClicks === 10) {
      alert("BRO 😭 IT WAS NEVER THIS DEEP");
    }
  });

  /* ===== NO FROG (HOVER) ===== */
  noFrog.addEventListener("mouseover", () => {
    frogClicks++;

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

  /* ===== ENVELOPE CLICK ===== */
  envelope.addEventListener("click", () => {
    if (frogClicks < 3) return;

    envelopeScreen.style.display = "none";
    letterScreen.classList.remove("hidden");

    bgMusic.play();
  });

  /* ===== CONTINUE ===== */
  document.getElementById("continueBtn").onclick = () => {
    letterScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
  };

  /* ===== YES ===== */
  yesCat.onclick = () => {
    questionScreen.style.display = "none";
    finalScreen.classList.remove("hidden");
    confetti();
    spawnFinalGifs();
  };

  /* ===== CONFETTI ===== */
  function confetti() {
    for (let i = 0; i < 70; i++) {
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

  /* ===== FINAL GIFS ===== */
  function spawnFinalGifs() {
    const gifs = [
      "confetti.gif","giphy.gif","cute-frog.gif","small_frog.gif",
      "three.gif","lil.gif","cute.gif","dancing.gif",
      "love.gif","vibing.gif","froggy.gif","around.gif"
    ];

    gifs.forEach(gif => {
      const img = document.createElement("img");
      img.src = `gifs/${gif}`;
      img.className = "final-gif";
      img.style.left = Math.random() * 85 + "vw";
      img.style.top = Math.random() * 80 + "vh";
      finalScreen.appendChild(img);
    });
  }

});

