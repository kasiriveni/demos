export function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function onClick(event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (!target) {
        return;
      }

      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}

export function initMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!mobileToggle || !navMenu) {
    return;
  }

  mobileToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
    mobileToggle.classList.toggle("active");
  });
}

export function initScrollEffects() {
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const heroBackground = document.querySelector(".hero-background");

  const onScroll = () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
      navbar.style.boxShadow =
        currentScroll > 100
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    }

    let currentSection = "";
    sections.forEach((section) => {
      if (window.pageYOffset >= section.offsetTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`,
      );
    });

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
