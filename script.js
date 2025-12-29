const introPanel = document.querySelector(".intro-panel");
const introToggle = document.querySelector(".intro-toggle");
const introBody = document.querySelector(".intro-body");

const toggleIntro = () => {
  const isExpanded = introPanel.getAttribute("aria-expanded") === "true";
  introPanel.setAttribute("aria-expanded", String(!isExpanded));
  introToggle.setAttribute("aria-expanded", String(!isExpanded));
  introBody.setAttribute("aria-hidden", String(isExpanded));
};

introToggle.addEventListener("click", toggleIntro);
introToggle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleIntro();
  }
});

document.querySelectorAll(".action-link").forEach((link) => {
  link.addEventListener("mousemove", (event) => {
    const rect = link.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    link.style.setProperty("--glow-x", `${x}%`);
    link.style.setProperty("--glow-y", `${y}%`);
  });
});
