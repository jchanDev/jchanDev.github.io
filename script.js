// Theme toggle
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Typewriter animation
const lines = document.querySelectorAll(".typing-line");
const projects = document.querySelector(".projects");
const about = document.getElementById("about");

async function typeLine(line, delay = 200) {
  const text = line.dataset.text;
  let i = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      line.textContent = text.slice(0, i++);
      if (i > text.length) {
        clearInterval(interval);
        line.style.borderRight = "none";
        setTimeout(resolve, delay);
      }
    }, 40);
  });
}

async function startTyping() {
  for (let i = 0; i < lines.length; i++) {
    await typeLine(lines[i]);
  }
  projects.classList.add("show");
  setTimeout(() => about.classList.add("show"), 500);
}

startTyping();
