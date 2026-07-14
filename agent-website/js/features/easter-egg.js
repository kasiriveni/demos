export function initKonamiCode() {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (event) => {
    if (event.key === konamiCode[konamiIndex]) {
      konamiIndex += 1;

      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }

      return;
    }

    konamiIndex = 0;
  });
}

function activateEasterEgg() {
  document.body.style.animation = "rainbow 2s linear infinite";

  const style = document.createElement("style");
  style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  window.setTimeout(() => {
    document.body.style.animation = "";
    style.remove();
  }, 5000);

  console.log("Easter Egg Activated! You found the Konami Code!");
}
