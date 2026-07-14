// Navigation function
function navigateTo(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Set home as default section
  navigateTo("home");

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const sectionId = href.substring(1);
        navigateTo(sectionId);
      }
    });
  });

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      navigateNext();
    } else if (e.key === "ArrowLeft") {
      navigatePrevious();
    }
  });

  // Copy code functionality
  setupCodeCopy();
});

// Navigation helpers
function navigateNext() {
  const sections = ["home", "beginner", "intermediate", "advanced", "examples"];
  const currentActive = document.querySelector(".section.active");
  const currentId = currentActive.id;
  const currentIndex = sections.indexOf(currentId);
  const nextIndex = (currentIndex + 1) % sections.length;
  navigateTo(sections[nextIndex]);
}

function navigatePrevious() {
  const sections = ["home", "beginner", "intermediate", "advanced", "examples"];
  const currentActive = document.querySelector(".section.active");
  const currentId = currentActive.id;
  const currentIndex = sections.indexOf(currentId);
  const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
  navigateTo(sections[prevIndex]);
}

// Setup code copy functionality
function setupCodeCopy() {
  const codeBlocks = document.querySelectorAll(".code-block");

  codeBlocks.forEach((block, index) => {
    // Create copy button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 Copy";
    copyBtn.className = "copy-btn";
    copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 0.5rem 1rem;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        `;

    // Make block relative for positioning
    block.style.position = "relative";
    block.style.paddingTop = "2.5rem";
    block.appendChild(copyBtn);

    // Copy functionality
    copyBtn.addEventListener("click", () => {
      const code = block.querySelector("code").textContent;
      navigator.clipboard.writeText(code).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✓ Copied!";
        copyBtn.style.backgroundColor = "#10b981";

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = "var(--accent-color)";
        }, 2000);
      });
    });

    // Hover effect
    copyBtn.addEventListener("mouseenter", () => {
      copyBtn.style.transform = "scale(1.05)";
      copyBtn.style.boxShadow = "0 5px 15px rgba(249, 115, 22, 0.3)";
    });

    copyBtn.addEventListener("mouseleave", () => {
      copyBtn.style.transform = "scale(1)";
      copyBtn.style.boxShadow = "none";
    });
  });
}

// Search functionality
function searchContent(query) {
  const sections = document.querySelectorAll(".section");
  const lowercaseQuery = query.toLowerCase();
  let resultCount = 0;

  sections.forEach((section) => {
    const text = section.textContent.toLowerCase();
    if (text.includes(lowercaseQuery)) {
      section.style.display = "block";
      resultCount++;
    } else {
      section.style.display = "none";
    }
  });

  return resultCount;
}

// Tutorial mode - step by step learning
class TutorialMode {
  constructor() {
    this.currentStep = 0;
    this.steps = [
      {
        section: "beginner",
        title: "Step 1: Installation",
        description: "Learn how to install Claude CLI",
      },
      {
        section: "beginner",
        title: "Step 2: First Command",
        description: "Send your first message to Claude",
      },
      {
        section: "beginner",
        title: "Step 3: Flags & Options",
        description: "Learn essential command-line flags",
      },
      {
        section: "intermediate",
        title: "Step 4: Conversations",
        description: "Maintain context across messages",
      },
      {
        section: "advanced",
        title: "Step 5: Advanced Workflows",
        description: "Build sophisticated automations",
      },
    ];
  }

  start() {
    this.currentStep = 0;
    this.showStep();
  }

  showStep() {
    if (this.currentStep < this.steps.length) {
      const step = this.steps[this.currentStep];
      navigateTo(step.section);
      console.log(`Tutorial: ${step.title} - ${step.description}`);
    }
  }

  nextStep() {
    this.currentStep++;
    this.showStep();
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep();
    }
  }

  getProgress() {
    return `${this.currentStep + 1} / ${this.steps.length}`;
  }
}

// Initialize tutorial mode
const tutorial = new TutorialMode();

// CLI Emulator - simulate Claude CLI
class CLIEmulator {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  execute(command) {
    this.history.push(command);
    this.currentIndex = this.history.length;

    // Simple simulation of CLI responses
    const responses = {
      hello: "Hello! I'm Claude, your AI assistant.",
      help: "Available commands:\n  - hello\n  - help\n  - clear\n  - version",
      version: "Claude CLI v1.0.0",
      clear: "cleared",
      status: "Status: Ready",
    };

    return responses[command.toLowerCase()] || `Command executed: ${command}`;
  }

  getPreviousCommand() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return "";
  }

  getNextCommand() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return "";
  }
}

// Initialize CLI emulator
const cli = new CLIEmulator();

// Quick reference
function showQuickReference() {
  const reference = `
    Claude CLI Quick Reference
    ==========================

    Basic Commands:
    - claude "prompt"                    Send a message
    - claude --help                      Show help
    - claude --version                   Show version
    - claude --list-models               List available models

    Model Control:
    - --model NAME                       Use specific model
    - --temperature 0-1                  Creativity level
    - --max-tokens NUM                   Response length

    System Prompts:
    - --system "text"                    Set system prompt
    - --system-file FILE                 Load from file

    Conversations:
    - --conversation NAME                Use conversation
    - --list-conversations               List conversations

    Output:
    - --json                             JSON output
    - --show-tokens                      Show token usage
    - --show-history CONV                View history
    `;
  console.log(reference);
  return reference;
}

// Performance: Lazy load sections on demand
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Section is visible, can optimize if needed
    }
  });
});

// Accessibility enhancements
function improveAccessibility() {
  // Add ARIA labels
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (!btn.getAttribute("aria-label")) {
      btn.setAttribute("aria-label", btn.textContent);
    }
  });

  // Add skip to main content
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "0";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.prepend(skipLink);
}

// Run accessibility improvements
improveAccessibility();

// Export functions for use
window.navigateTo = navigateTo;
window.searchContent = searchContent;
window.tutorial = tutorial;
window.cli = cli;
window.showQuickReference = showQuickReference;
