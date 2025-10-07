const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// Load saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
}

// Toggle theme when button clicked
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ===============================
// Typewriter + "ls" command logic
// ===============================

const lines = document.querySelectorAll(".typing-line");
const userInput = document.getElementById("user-input");
const projects = document.querySelector(".projects");
const aboutPanel = document.querySelector(".about-panel");
const terminalBody = document.querySelector(".terminal-body");

// Hide projects and about initially
projects.classList.remove("show");
aboutPanel.classList.remove("show");

// Typewriter animation
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
    document.querySelector(".input-line").style.display = "block";
    userInput.focus();
}

let lastCommandLine = null; // track last "> ls" command
let cat = null;             // reference to cat element
let catInterval = null;     // reference to cat animation interval

// ===============================
// CAT FUNCTIONS
// ===============================

function showCat() {
    if (!cat) {
        cat = document.createElement("pre");
        cat.classList.add("ascii-cat");
        terminalBody.insertBefore(cat, projects);

        const frames = [
            `   _____
  | Hi! |
   -----
  /\\__/\\  
 ( o.o ) 
  > ^ <  
/    \\
(     )`,
            `   _____
  | Hi! |
   -----
  /\\__/\\  
 ( o.o ) 
  > ^ <  
/    \\
(     )`,
            `   _____
  | Hi! |
   -----
  /\\__/\\  
 ( -.- ) 
  > ^ <  
/    \\
(     )`
        ];

        let frameIndex = 0;
        catInterval = setInterval(() => {
            if (cat) cat.textContent = frames[frameIndex];
            frameIndex = (frameIndex + 1) % frames.length;
        }, 600);
    }
}

function hideCat() {
    if (cat) {
        cat.remove();
        cat = null;
    }
    if (catInterval) {
        clearInterval(catInterval);
        catInterval = null;
    }
}

// ===============================
// INITIAL SETUP
// ===============================

// Run typing only the first time per session
if (!sessionStorage.getItem("hasVisited")) {
    startTyping().then(() => {
        sessionStorage.setItem("hasVisited", "true");
    });
} else {
    // Skip typing animation — show everything immediately
    lines.forEach(line => {
        line.textContent = line.dataset.text;
        line.style.borderRight = "none";
    });
    document.querySelector(".input-line").style.display = "flex";
    userInput.focus();

    // Show projects if "ls" was previously typed
    if (sessionStorage.getItem("ranLS") === "true") {
        projects.classList.add("show");
        aboutPanel.classList.add("show");

        lastCommandLine = document.createElement("p");
        lastCommandLine.textContent = "> ls";
        lastCommandLine.style.color = "inherit";
        lastCommandLine.style.marginBottom = "0.3em";
        terminalBody.insertBefore(lastCommandLine, document.querySelector(".input-line"));
    } else {
        // Show cat if "ls" not typed
        showCat();
    }
}

// ===============================
// USER INPUT HANDLING
// ===============================

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        const command = userInput.textContent.trim();
        userInput.textContent = "";

        // Remove old error messages
        terminalBody.querySelectorAll(".error").forEach(el => el.remove());

        if (command === "ls") {
            projects.classList.add("show");
            aboutPanel.classList.add("show");
            hideCat();

            if (lastCommandLine) lastCommandLine.remove();

            lastCommandLine = document.createElement("p");
            lastCommandLine.textContent = "> ls";
            lastCommandLine.style.color = "inherit";
            lastCommandLine.style.marginBottom = "0.3em";
            terminalBody.insertBefore(lastCommandLine, document.querySelector(".input-line"));

            sessionStorage.setItem("ranLS", "true");
        }
        else if (command === "clear") {
            projects.classList.remove("show");
            aboutPanel.classList.remove("show");

            if (lastCommandLine) {
                lastCommandLine.remove();
                lastCommandLine = null;
            }

            sessionStorage.removeItem("ranLS");
            showCat();
        }
        else if (command !== "") {
            const error = document.createElement("p");
            error.textContent = `${command}: command not found. Type ls or clear`;
            error.style.color = "#ff5c8d";
            error.classList.add("error");
            terminalBody.insertBefore(error, userInput.parentNode.nextSibling);
        }
    }
});

// Focus user input when clicking anywhere on the line
document.querySelector(".input-line").addEventListener("click", () => {
    userInput.focus();
});
