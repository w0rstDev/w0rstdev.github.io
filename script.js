const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const closeButton = document.querySelector(".modal-close");

const projects = {
  Gamblemon: "A roguelike slot-machine game built around Pokémon-inspired creatures, combinations and escalating choices. This is a portfolio placeholder — replace this text with your real project description.",
  Waifuro: "A roguelike deckbuilder focused on collecting characters and creating powerful combinations. Replace this text with your final project description."
};

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "☾" : "☼";
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
});

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const project = button.dataset.project;
    modalTitle.textContent = project;
    modalText.textContent = projects[project] || "Project information coming soon.";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section, .game-card").forEach(el => observer.observe(el));
