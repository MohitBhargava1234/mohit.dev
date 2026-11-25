
document.addEventListener("DOMContentLoaded", () => {

  // =================================
  // 1. DARK / LIGHT THEME
  // =================================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

function updateThemeIcon() {
    const isLight = document.body.classList.contains("light-theme");

    themeIcon.className = isLight
        ? "fa-regular fa-sun"
        : "fa-regular fa-moon";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateThemeIcon();
});



  // =================================
  // 2. MOBILE NAVIGATION
  // =================================

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

      });

    });

  }


  // =================================
  // 3. TYPING ANIMATION
  // =================================

  const typingText = document.getElementById("typing-text");

  if (typingText) {

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

      characterIndex += deleting ? -1 : 1;

      typingText.textContent =
        currentRole.slice(0, characterIndex);

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

  }


  // =================================
  // 4. SCROLL REVEAL
  // =================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

      (entries, observerInstance) => {

        entries.forEach(entry => {

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

    // Enable animation only after observer is initialized
    document.body.classList.add("js-enabled");

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  // =================================
  // 5. AUTOMATIC COPYRIGHT YEAR
  // =================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
