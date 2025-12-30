const introPanel = document.querySelector(".intro-panel");
const introToggle = document.querySelector(".intro-toggle");
const introBody = document.querySelector(".intro-body");
const introClose = document.querySelector(".intro-close");
const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const setMarbleTexture = () => {
  const angle = `${Math.round(randomInRange(120, 165))}deg`;
  const driftX = `${randomInRange(-2.5, 2.5).toFixed(2)}%`;
  const driftY = `${randomInRange(-2.5, 2.5).toFixed(2)}%`;
  const veil = randomInRange(0.12, 0.28).toFixed(2);
  const flow = `${randomInRange(-1.6, 1.6).toFixed(2)}deg`;
  root.style.setProperty("--marble-angle", angle);
  root.style.setProperty("--marble-drift-x", driftX);
  root.style.setProperty("--marble-drift-y", driftY);
  root.style.setProperty("--marble-veil", veil);
  root.style.setProperty("--marble-flow", flow);
};

setMarbleTexture();

let marbleTimer;
if (!prefersReducedMotion) {
  window.setInterval(setMarbleTexture, 9000);
}
const scheduleMarbleRefresh = () => {
  if (prefersReducedMotion) {
    return;
  }
  if (marbleTimer) {
    window.clearTimeout(marbleTimer);
  }
  marbleTimer = window.setTimeout(setMarbleTexture, 7000);
};

const updateIntroHeight = () => {
  const viewportLimit = window.innerHeight * 0.65;
  const contentHeight = introBody.scrollHeight + 24;
  const height = Math.min(viewportLimit, contentHeight);
  introBody.style.setProperty("--intro-height", `${height}px`);
};

const toggleIntro = () => {
  const isExpanded = introPanel.getAttribute("aria-expanded") === "true";
  introPanel.setAttribute("aria-expanded", String(!isExpanded));
  introToggle.setAttribute("aria-expanded", String(!isExpanded));
  introBody.setAttribute("aria-hidden", String(isExpanded));
  if (!isExpanded) {
    updateIntroHeight();
  } else {
    introBody.style.setProperty("--intro-height", "0px");
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
    updateIntroHeight();
  }
  scheduleMarbleRefresh();
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
