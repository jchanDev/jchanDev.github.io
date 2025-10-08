const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;
const terminal = document.querySelector('.terminal');
const terminalBody = document.querySelector('.terminal-body');

// ===============================
// Theme Toggle Logic
// ===============================
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

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

    // Cat animation frames
    const catFaces = ["( -.- )", "( O.O )", "( O.O )"];

    // Predefined bubbles
    const desktopBubble = [
      " ________________________________",
      "| Hi! Type ls to view my projects|",
      "| and type clear to see me again!|",
      "V--------------------------------"
    ];

    const mobileBubble = [
      " ______________________",
      "| Hi! Type ls to view |",
      "| my projects and     |",
      "| type clear to see me|",
      "| again!              |",
      "V---------------------"
    ];

    const useMobile = terminalBody.clientWidth < 480;
    const bubbleLines = useMobile ? mobileBubble : desktopBubble;

    let frameIndex = 0;

    function buildCatFrame(face) {
      // Add cat art below the bubble
      const catArt = [
        " /\\_/\\  ",
        face + " ",
        " >   <  ",
        " /   \\  ",
        "(     ) "
      ];
      return [...bubbleLines, ...catArt].join("\n");
    }

    function updateCat() {
      if (!cat) return;
      cat.innerText = buildCatFrame(catFaces[frameIndex]);
      frameIndex = (frameIndex + 1) % catFaces.length;
    }

    updateCat();
    catInterval = setInterval(updateCat, 800);

    terminal.classList.add('compact');
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
