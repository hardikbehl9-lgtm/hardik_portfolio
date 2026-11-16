const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// A restrained typing loop in the introduction.
const typed = document.querySelector(".typed");
const phrases = ["digital experiences.", "thoughtful interfaces.", "ideas into reality."];
let phraseIndex = 0, letterIndex = 0, deleting = false;
function typeLoop() {
  const phrase = phrases[phraseIndex];
  typed.textContent = phrase.slice(0, letterIndex);
  if (!deleting && letterIndex < phrase.length) {
    letterIndex++;
    setTimeout(typeLoop, 75);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1450);
  } else if (letterIndex > 0) {
    letterIndex--;
    setTimeout(typeLoop, 35);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 350);
  }
}
typeLoop();

// Thin reading progress indicator.
const progress = document.querySelector(".progress");
window.addEventListener("scroll", () => {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const amount = available > 0 ? window.scrollY / available : 0;
  progress.style.width = `${amount * 100}%`;
}, { passive: true });
