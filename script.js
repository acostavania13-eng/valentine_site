document.addEventListener("DOMContentLoaded", () => {

  /* ========= AUDIO ========= */
  const bgMusic = new Audio("./music/opening_music.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.5;

  const frogSound = new Audio("./music/frog_hop.mp3");
  frogSound.volume = 0.7;

  /* ========= ELEMENTS ========= */
  const envelopeScreen = document.getElementById("envelope-screen");
  const letterScreen = document.getElementById("letter-screen");
  const questionScreen = document.getElementById("question-screen");
  const finalScreen = document.getElementById("final-screen");

  const envelope = document.getElementById("envelope");
  const frog = document.getElementById("frog");
  const frogCounter = document.getElementById("frog-counter");

  const continueBtn = document.getElementById("continueBtn");
  const yesCat = document.getElementById("yesCat");
  const noFrog = document.getElementById("noFrog");
  const tauntBox = document.getElementById("taunt-box");

  /* ========= STATE ========= */
  let frogClicks = 0;
  let yesScale = 1;
  let noCount = 0;

  const phrases = [
    "Don’t touch me!",
    "Beep beep move!",
    "Why are you trying to touch me?🤨",
    "HEY! personal space!!",
    "You’re persistent huh?",
    "Just pick the cat already",
    "I'm literally running out of places to jump!"
    
  ];

  /* ========= INIT ========= */
  envelope.style.pointerEvents = "none";
  envelope.classList.remove("unlocked");

  /* ========= FROG UNLOCK ========= */
 frog.addEventListener("click", () => {
  frogClicks++;
  frogCounter.textContent = `🐸 ${frogClicks} / 10`;

  frogSound.currentTime = 0;
  frogSound.play();

  envelope.style.animation = "shake 0.4s";
  setTimeout(() => envelope.style.animation = "", 400);

  if (frogClicks === 3) {
    envelope.style.pointerEvents = "auto";
    envelope.classList.add("unlocked");
    frogCounter.textContent = "Ok fine you win 😒";
  }

  if (frogClicks === 10) {
    alert("OK OK DAMN 😭 you win, stop bullying the frog");
  }
});


  /* ========= OPEN ENVELOPE ========= */
  envelope.addEventListener("click", () => {
    if (frogClicks < 3) return;

    envelopeScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");

    bgMusic.currentTime = 0;
    bgMusic.play();
  });

  /* ========= CONTINUE ========= */
  continueBtn.addEventListener("click", () => {
    letterScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    spawnHearts();
  });

  /* ========= NO FROG ========= */
/* ========== NO FROG TAUNTS ========== */
let alert5Shown = false;
let alert10Shown = false;

noFrog.addEventListener("mouseover", () => {
  // move the no frog
  const x = Math.random() * 260 - 130;
  const y = Math.random() * 180 - 90;
  noFrog.style.transform = `translate(${x}px, ${y}px)`;

  // sound
  frogSound.currentTime = 0;
  frogSound.play();

  // count hovers
  noCount++;

  // always change phrase
  tauntBox.textContent =
    phrases[Math.floor(Math.random() * phrases.length)];

  // easter egg alerts
  if (noCount === 5 && !alert5Shown) {
    alert("bestie… it’s not an option 🤨");
    alert5Shown = true;
  }

  if (noCount === 10 && !alert10Shown) {
    alert("BRO JUST CLICK YES 😭");
    alert10Shown = true;
  }

  // yes button grows
  yesScale += 0.12;
  yesCat.style.transform = `scale(${yesScale})`;
});


  /* ========= YES ========= */
  yesCat.addEventListener("click", () => {
    questionScreen.classList.add("hidden");
    finalScreen.classList.remove("hidden");
    confetti();
    spawnFinalGifs();
  });

  /* ========= HEARTS ========= */
  function spawnHearts() {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.position = "absolute";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "-30px";
      heart.style.fontSize = "22px";
      heart.style.zIndex = "5";
      document.body.appendChild(heart);

      let rise = -30;
      const floatUp = setInterval(() => {
        rise += 2;
        heart.style.bottom = rise + "px";
        if (rise > window.innerHeight) {
          heart.remove();
          clearInterval(floatUp);
        }
      }, 16);
    }, 900);
  }

  /* ========= CONFETTI ========= */
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

  /* ========= FINAL GIFS ========= */
  function spawnFinalGifs() {
  const gifs = [
    "confetti.gif","giphy.gif","cute-frog.gif","small_frog.gif",
    "three.gif","lil.gif","cute.gif","dancing.gif",
    "love.gif","vibing.gif"
  ];

  gifs.forEach(gif => {
    const img = document.createElement("img");
    img.src = `gifs/${gif}`;
    img.className = "final-gif";

    img.style.top = Math.random() * 70 + 10 + "%";
    img.style.left = Math.random() * 70 + 10 + "%";

    finalScreen.appendChild(img);
  });
}


});
