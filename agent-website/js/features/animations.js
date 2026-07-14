export function initRevealAnimations() {
  const fadeElements = document.querySelectorAll(
    ".card, .topic-group, .example-card, .timeline-item, .project-card",
  );

  if (!fadeElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  fadeElements.forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });
}

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = window.setInterval(() => {
    start += increment;

    if (start >= target) {
      element.textContent = target;
      window.clearInterval(timer);
      return;
    }

    element.textContent = Math.floor(start);
  }, 16);
}

export function initStatCounters() {
  const heroSection = document.querySelector(".hero");
  const heroStats = document.querySelectorAll(".stat-number");

  if (!heroSection || !heroStats.length) {
    return;
  }

  let statsAnimated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || statsAnimated) {
          return;
        }

        heroStats.forEach((stat) => {
          const target = Number.parseInt(stat.textContent, 10);

          if (!Number.isNaN(target)) {
            animateCounter(stat, target);
          }
        });

        statsAnimated = true;
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(heroSection);
}

export function initCardHoverEffects() {
  document.querySelectorAll(".project-card, .example-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

export function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (!timelineItems.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) {
          return;
        }

        window.setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 100);
      });
    },
    { threshold: 0.2 },
  );

  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-50px)";
    item.style.transition = "all 0.6s ease";
    observer.observe(item);
  });
}
