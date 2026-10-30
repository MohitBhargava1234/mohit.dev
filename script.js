
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// ---------- Dark / light theme ----------
function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");

  themeToggle.textContent = isLight ? "🌙" : "☀️";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
}

// Load the saved theme, if available
try {
  if (localStorage.getItem("portfolio-theme") === "light") {
    document.body.classList.add("light-theme");
  }
} catch (error) {
  // The website still works if storage is unavailable.
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const theme = document.body.classList.contains("light-theme")
    ? "light"
    : "dark";

  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // Theme switching still works for this page.
  }

  updateThemeButton();
});

// ---------- Mobile navigation ----------
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// ---------- Typing animation ----------
const typingText = document.getElementById("typing-text");

const roles = [
  "Creative Developer",
  "Python Learner",
  "AI Explorer",
  "Frontend Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typingText.textContent = currentRole.slice(0, characterIndex);

  let delay = deleting ? 45 : 85;

  if (!deleting && characterIndex === currentRole.length) {
    deleting = true;
    delay = 1300;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  setTimeout(typeRole, delay);
}

typeRole();

// ---------- Scroll reveal animation ----------
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => element.classList.add("visible"));
}

// ---------- Automatic copyright year ----------
document.getElementById("year").textContent =
  new Date().getFullYear();
