const introPanel = document.querySelector(".intro-panel");
const introToggle = document.querySelector(".intro-toggle");
const introBody = document.querySelector(".intro-body");
const introClose = document.querySelector(".intro-close");
const root = document.documentElement;

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const setMarbleTexture = () => {
  const angle = `${Math.round(randomInRange(120, 160))}deg`;
  const driftX = `${randomInRange(-1.5, 1.5).toFixed(2)}%`;
  const driftY = `${randomInRange(-1.5, 1.5).toFixed(2)}%`;
  const veil = randomInRange(0.12, 0.26).toFixed(2);
  root.style.setProperty("--marble-angle", angle);
  root.style.setProperty("--marble-drift-x", driftX);
  root.style.setProperty("--marble-drift-y", driftY);
  root.style.setProperty("--marble-veil", veil);
};

setMarbleTexture();

const updateIntroMaxHeight = () => {
  const viewportLimit = window.innerHeight * 0.65;
  const contentHeight = introBody.scrollHeight + 32;
  const maxHeight = Math.min(viewportLimit, contentHeight);
  introBody.style.setProperty("--intro-max-height", `${maxHeight}px`);
};

const toggleIntro = () => {
  const isExpanded = introPanel.getAttribute("aria-expanded") === "true";
  introPanel.setAttribute("aria-expanded", String(!isExpanded));
  introToggle.setAttribute("aria-expanded", String(!isExpanded));
  introBody.setAttribute("aria-hidden", String(isExpanded));
  if (!isExpanded) {
    updateIntroMaxHeight();
  }
};

introToggle.addEventListener("click", toggleIntro);
introToggle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleIntro();
  }
});

introClose.addEventListener("click", toggleIntro);

window.addEventListener("resize", () => {
  if (introPanel.getAttribute("aria-expanded") === "true") {
    updateIntroMaxHeight();
  }
});

document.querySelectorAll(".interactive-item").forEach((link) => {
  link.addEventListener("mousemove", (event) => {
    const rect = link.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    link.style.setProperty("--glow-x", `${x}%`);
    link.style.setProperty("--glow-y", `${y}%`);
  });
});
