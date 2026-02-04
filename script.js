document.addEventListener("DOMContentLoaded", () => {

  /* ================= AUDIO ================= */
  const bgMusic = new Audio("./music/opening_music.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.5;

  const frogSound = new Audio("./music/frog_hop.mp3");
  frogSound.volume = 0.7;

  /* ================= ELEMENTS ================= */
  const envelope = document.getElementById("envelope");
  const envelopeScreen = document.getElementById("envelope-screen");
  const letterScreen = document.getElementById("letter-screen");
  const questionScreen = document.getElementById("question-screen");
  const yesCat = document.getElementById("yesCat");
  const noFrog = document.getElementById("noFrog");
  const tauntBox = document.getElementById("taunt-box");
  const finalScreen = document.getElementById("final-screen");
  const counter = document.getElementById("frog-counter");

  /* ================= STATE ================= */
  let frogClicks = 0;
  let yesScale = 1;

  const phrases = [
    "Don’t touch me!",
    "Beep beep move!",
    "Why don’t you pick me?",
    "You’re persistent huh?",
    "HEY—personal space!!"
  ];

  /* ================= LOCK ENVELOPE ================= */
  envelope.classList.remove("unlocked");
  envelope.style.pointerEvents = "none";

  /* ================= FROG GUARD ================= */
  noFrog.addEventListener("mouseover", () => {
    frogClicks++;

    // move frog
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 180 - 90;
    noFrog.style.transform = `translate(${x}px, ${y}px)`;

    // sound
    frogSound.currentTime = 0;
    frogSound.play();

    // phrase
    tauntBox.textContent =
      phrases[Math.floor(Math.random() * phrases.length)];

    // counter
    counter.textContent = `🐸 clicks: ${frogClicks}`;

    // grow yes cat
    yesScale += 0.12;
    yesCat.style.transform = `scale(${yesScale})`;

    // unlock envelope
    if (frogClicks === 3) {
      tauntBox.textContent = "ok ok… you can open it 💌";
      envelope.classList.add("unlocked");
      envelope.style.pointerEvents = "auto";
    }

    // secret message 👀
    if (frogClicks === 10) {
      tauntBox.textContent = "BRO 😭 IT WAS NEVER THIS DEEP";
    }
  });

  /* ================= ENVELOPE CLICK ================= */
  envelope.addEventListener("click", () => {
    if (frogClicks < 3) return;

    envelopeScreen.style.display = "none";
    letterScreen.classList.remove("hidden");

    bgMusic.currentTime = 0;
    bgMusic.play();
  });

  /* ================= CONTINUE ================= */
  document.getElementById("continueBtn").onclick = () => {
    letterScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
  };

  /* ================= YES ================= */
  yesCat.onclick = () => {
    questionScreen.style.display = "none";
    finalScreen.classList.remove("hidden");
    confetti();
    spawnFinalGifs();
  };

  /* ================= CONFETTI ================= */
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

  /* ================= FINAL GIFS ================= */
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
