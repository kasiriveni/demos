export function initAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const accordion = accordionItem?.parentElement;

      if (!accordionItem || !accordion) {
        return;
      }

      const isActive = accordionItem.classList.contains("active");

      accordion.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });

      if (!isActive) {
        accordionItem.classList.add("active");
      }
    });
  });
}

export function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", function onClick() {
      const codeId = this.getAttribute("data-copy");
      const codeElement = document.getElementById(codeId);

      if (!codeElement) {
        return;
      }

      navigator.clipboard
        .writeText(codeElement.textContent)
        .then(() => {
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          this.style.background = "#10b981";

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = "";
          }, 2000);
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    });
  });
}

export function initScrollToTop() {
  const scrollButton = document.getElementById("scrollToTop");

  if (!scrollButton) {
    return;
  }

  const showOffset = 300;

  const onScroll = () => {
    scrollButton.classList.toggle("visible", window.pageYOffset > showOffset);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  scrollButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  onScroll();
}
