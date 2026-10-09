
/* ==========================================
   ARUN'S LOVE ANNIVERSARY WEBSITE
   Complete JavaScript
========================================== */

// Check whether reduced motion is enabled
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


// ==========================================
// 1. FLOATING HEART ANIMATIONS
// ==========================================

const heartLayer = document.querySelector(".floating-hearts");

function createFloatingHeart(position) {
  if (!heartLayer || prefersReducedMotion) return;

  const heart = document.createElement("span");

  heart.className = "floating-heart";

  heart.textContent = Math.random() > 0.45 ? "♡" : "♥";

  heart.style.left = `${position}%`;

  heart.style.setProperty(
    "--duration",
    `${7 + Math.random() * 6}s`
  );

  heart.style.setProperty(
    "--size",
    `${12 + Math.random() * 20}px`
  );

  heartLayer.appendChild(heart);

  // Remove heart after animation finishes
  window.setTimeout(() => {
    heart.remove();
  }, 14000);
}


// Start floating hearts
if (!prefersReducedMotion && heartLayer) {
  for (let i = 0; i < 12; i++) {
    window.setTimeout(() => {
      createFloatingHeart(Math.random() * 100);
    }, i * 250);
  }

  window.setInterval(() => {
    createFloatingHeart(Math.random() * 100);
  }, 950);
}


// ==========================================
// 2. SCROLL REVEAL ANIMATIONS
// ==========================================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}


// ==========================================
// 3. LOVE LETTER MODAL
// ==========================================

const letterModal = document.getElementById("letterModal");

const openLetterButton = document.getElementById("openLetter");

const closeLetterButton = document.getElementById("closeLetter");


function openLoveLetter() {
  if (!letterModal) return;

  letterModal.classList.add("open");

  letterModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  if (closeLetterButton) {
    closeLetterButton.focus();
  }

  // Romantic heart celebration
  for (let i = 0; i < 16; i++) {
    window.setTimeout(() => {
      createFloatingHeart(25 + Math.random() * 50);
    }, i * 60);
  }
}


function closeLoveLetter() {
  if (!letterModal) return;

  letterModal.classList.remove("open");

  letterModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (openLetterButton) {
    openLetterButton.focus();
  }
}


// Open letter
if (openLetterButton) {
  openLetterButton.addEventListener(
    "click",
    openLoveLetter
  );
}


// Close letter using close button
if (closeLetterButton) {
  closeLetterButton.addEventListener(
    "click",
    closeLoveLetter
  );
}


// Close letter by clicking backdrop
if (letterModal) {
  const backdropElements =
    letterModal.querySelectorAll("[data-close-letter]");

  backdropElements.forEach((element) => {
    element.addEventListener(
      "click",
      closeLoveLetter
    );
  });
}


// Close letter using Escape key
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    letterModal &&
    letterModal.classList.contains("open")
  ) {
    closeLoveLetter();
  }
});


// ==========================================
// 4. FINAL YES BUTTON
// ==========================================

const yesButton = document.getElementById("yesButton");

const answerMessage = document.getElementById("answerMessage");


if (yesButton) {
  yesButton.addEventListener("click", () => {

    if (answerMessage) {
      answerMessage.textContent =
        "Then it's a yes to more memories, more growth, " +
        "and more tomorrows. I choose us. ♡";
    }

    // Celebrate with floating hearts
    for (let i = 0; i < 28; i++) {
      window.setTimeout(() => {
        createFloatingHeart(15 + Math.random() * 70);
      }, i * 75);
    }

    yesButton.textContent = "OUR STORY CONTINUES ♡";

    yesButton.disabled = true;

    yesButton.setAttribute("aria-pressed", "true");
  });
}


// ==========================================
// 5. PLAYFUL NO BUTTON
// ==========================================

const noButton = document.getElementById("noButton");

if (noButton) {
  noButton.addEventListener("click", () => {

    if (answerMessage) {
      answerMessage.textContent =
        "Hehe, take your time, my love. " +
        "The question isn't going anywhere. 😌♡";
    }

    noButton.textContent = "Okay, one more hug first ♡";
  });
}


// ==========================================
// 6. OPTIONAL BACKGROUND MUSIC
// ==========================================

// Music is optional. No copyrighted music is included.
//
// To add your own music:
// 1. Place a music file named "music.mp3" beside index.html.
// 2. Uncomment the audio line below.
//
// const audio = new Audio("music.mp3");

let audio = null;

const musicButton = document.getElementById("musicButton");


function showMusicMessage(message) {
  const note = document.querySelector(".tiny-note");

  if (note) {
    note.textContent = message;
  }
}


if (musicButton) {
  musicButton.addEventListener("click", async () => {

    // Tell the user when music has not been configured
    if (!audio) {
      showMusicMessage(
        "Add your chosen music file to play our little melody. ♡"
      );

      return;
    }

    try {
      if (audio.paused) {
        await audio.play();

        musicButton.textContent =
          "Ⅱ Pause our little melody";

        musicButton.setAttribute(
          "aria-pressed",
          "true"
        );

      } else {
        audio.pause();

        musicButton.textContent =
          "♫ Play our little melody";

        musicButton.setAttribute(
          "aria-pressed",
          "false"
        );
      }

    } catch (error) {
      showMusicMessage(
        "Sorry, the music couldn't play. Please try again. ♡"
      );
    }
  });
}


// ==========================================
// 7. SMOOTH SCROLL FOR INTERNAL LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  });
});


// ==========================================
// 8. INITIALIZE WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // Make sure reveal items are visible if animation
  // support is unavailable.
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((item) => {
      item.classList.add("visible");
    });
  }

  console.log(
    "♡ Arun's Love Anniversary Website is ready!"
  );
});
