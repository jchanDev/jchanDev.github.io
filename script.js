const terminal = document.querySelector('.terminal');
const terminalBody = document.querySelector('.terminal-body')
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// ===============================
// Theme Toggle Logic (Dark Mode Default)
// ===============================
if (!localStorage.getItem('theme')) {
    // No saved theme — default to dark
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
} else if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
} else {
    body.classList.remove('dark');
}

// ===============================
// Toggle Button
// ===============================
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// ===============================
// Typing + Command Logic
// ===============================
const lines = document.querySelectorAll('.typing-line');
const userInput = document.getElementById('user-input');
const projects = document.querySelector('.projects');
const aboutPanel = document.querySelector('.about-panel');

projects.classList.remove('show');
aboutPanel.classList.remove('show');

// Default to compact (small) terminal at start
terminal.classList.add('compact');

async function typeLine(line, delay = 200) {
  const text = line.dataset.text;
  let i = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      line.textContent = text.slice(0, i++);
      if (i > text.length) {
        clearInterval(interval);
        line.style.borderRight = 'none';
        setTimeout(resolve, delay);
      }
    }, 40);
  });
}

async function startTyping() {
  for (let i = 0; i < lines.length; i++) {
    await typeLine(lines[i]);
  }
  document.querySelector('.input-line').style.display = 'block';
  userInput.focus();
}

let lastCommandLine = null;
let cat = null;
let catInterval = null;

// ===============================
// CAT ANIMATION (with small speech text)
// ===============================
function showCat(animated = true) {
  if (!cat) {
    cat = document.createElement('pre');
    cat.classList.add('ascii-cat');
    if (animated) cat.classList.add('fade-in');
    terminalBody.insertBefore(cat, projects);

    const catFaces = ["( -.- )", "( O.O )", "( O.O )"];
    const catText = "Hi! Type ls to view my projects and type clear to see me again!";

    function wrapText(text, maxLen) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      words.forEach(word => {
        if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxLen) {
          currentLine += (currentLine ? ' ' : '') + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines;
    }

    function buildFrame(face) {
      const terminalWidth = terminalBody.clientWidth;
      // Calculate font size based on terminal width
      const baseFontSize = 20; // default cat font size in px
      const minFontSize = 12;  // smallest font size on mobile
      const maxCharsPerLine = 40;
      const scale = Math.max(minFontSize, Math.min(baseFontSize, terminalWidth / 30));
      cat.style.fontSize = scale + 'px';

      const approxCharWidth = scale * 0.5; // roughly half font size in px
      const maxChars = Math.max(10, Math.floor((terminalWidth - 40) / approxCharWidth));
      const wrapped = wrapText(catText, Math.min(maxChars, maxCharsPerLine));
      const actualLongest = Math.max(...wrapped.map(l => l.length));

      const top = " " + "_".repeat(actualLongest + 2);
      const bubble = wrapped.map(line => {
        const padding = actualLongest - line.length;
        return "| " + line + " ".repeat(padding) + " |";
      }).join("\n");
      const bottom = "V" + "-".repeat(actualLongest + 1);

      const catArt = `
 /\\_/\\  
${face} 
 >   <  
 /   \\
(     )`;

      return `${top}\n${bubble}\n${bottom}\n${catArt}`;
    }

    let frameIndex = 0;

    function updateCat() {
      if (!cat) return;
      cat.innerText = buildFrame(catFaces[frameIndex]);
      frameIndex = (frameIndex + 1) % catFaces.length;
    }

    updateCat();
    catInterval = setInterval(updateCat, 800);

    terminal.classList.add('compact');

    window.addEventListener('resize', () => {
      if (cat) updateCat();
    });
  }
}

function hideCat() {
  if (cat) {
    cat.classList.add('fade-out');
    setTimeout(() => {
      if (cat) cat.remove();
      cat = null;
    }, 300);
  }
  if (catInterval) {
    clearInterval(catInterval);
    catInterval = null;
  }
  terminal.classList.remove('compact'); // expand terminal when showing projects
}

// ===============================
// INITIAL SETUP
// ===============================
if (!sessionStorage.getItem('hasVisited')) {
  startTyping().then(() => {
    sessionStorage.setItem('hasVisited', 'true');
    showCat();
  });
} else {
  lines.forEach(line => {
    line.textContent = line.dataset.text;
    line.style.borderRight = 'none';
  });
  document.querySelector('.input-line').style.display = 'flex';
  userInput.focus();

  if (sessionStorage.getItem('ranLS') === 'true') {
    projects.classList.add('show');
    aboutPanel.classList.add('show');
    terminal.classList.remove('compact');

    lastCommandLine = document.createElement('p');
    lastCommandLine.textContent = '> ls';
    lastCommandLine.style.color = 'inherit';
    lastCommandLine.style.marginBottom = '0.3em';
    terminalBody.insertBefore(lastCommandLine, document.querySelector('.input-line'));
  } else {
    showCat(false);
  }
}

// ===============================
// USER INPUT HANDLING
// ===============================
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const command = userInput.textContent.trim();
    userInput.textContent = '';
    terminalBody.querySelectorAll('.error').forEach(el => el.remove());

    if (command === 'ls') {
      projects.classList.add('show');
      aboutPanel.classList.add('show');
      hideCat();

      if (lastCommandLine) lastCommandLine.remove();

      lastCommandLine = document.createElement('p');
      lastCommandLine.textContent = '> ls';
      lastCommandLine.style.color = 'inherit';
      lastCommandLine.style.marginBottom = '0.3em';
      terminalBody.insertBefore(lastCommandLine, document.querySelector('.input-line'));

      sessionStorage.setItem('ranLS', 'true');
    } 
    else if (command === 'clear') {
      projects.classList.remove('show');
      aboutPanel.classList.remove('show');

      if (lastCommandLine) {
        lastCommandLine.remove();
        lastCommandLine = null;
      }

      sessionStorage.removeItem('ranLS');
      showCat();
    } 
    else if (command !== '') {
      const error = document.createElement('p');
      error.textContent = `${command}: command not found. Type ls or clear`;
      error.style.color = '#ff5c8d';
      error.classList.add('error');
      terminalBody.insertBefore(error, userInput.parentNode.nextSibling);
    }
  }
});

document.querySelector('.input-line').addEventListener('click', () => {
  userInput.focus();
});
