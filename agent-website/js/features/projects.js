let projectsData = [];

export function initProjectData() {
  const projectCards = document.querySelectorAll(".project-card");
  projectsData = Array.from(projectCards).map((card) => ({
    element: card,
    title: card.querySelector("h3")?.textContent.toLowerCase() ?? "",
    description: card.querySelector("p")?.textContent.toLowerCase() ?? "",
    tags: Array.from(card.querySelectorAll(".project-tag")).map((tag) =>
      tag.textContent.toLowerCase(),
    ),
  }));
}

export function addSearchBox() {
  const projectsSection = document.querySelector("#projects .container");
  const header = projectsSection?.querySelector(".section-header");

  if (!projectsSection || !header) {
    return;
  }

  const searchHTML = `
        <div class="search-box" style="max-width: 600px; margin: 0 auto 3rem; position: relative;">
            <input type="text"
                   id="project-search"
                   placeholder="Search projects..."
                   style="width: 100%; padding: 1rem 3rem 1rem 1.5rem; border-radius: 50px; border: 2px solid var(--border-color); font-size: 1rem;">
            <i class="fas fa-search" style="position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary);"></i>
        </div>
    `;

  header.insertAdjacentHTML("afterend", searchHTML);

  const searchInput = document.getElementById("project-search");
  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();

    projectsData.forEach((project) => {
      const matches =
        project.title.includes(query) ||
        project.description.includes(query) ||
        project.tags.some((tag) => tag.includes(query));

      project.element.style.display = matches ? "block" : "none";
    });
  });
}

export function addTagFilter() {
  const allTags = new Set();
  document.querySelectorAll(".project-tag").forEach((tag) => {
    allTags.add(tag.textContent);
  });

  console.log("Available tags:", Array.from(allTags));
}

export function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  if (!images.length) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const image = entry.target;
      image.src = image.dataset.src;
      image.classList.add("loaded");
      observer.unobserve(image);
    });
  });

  images.forEach((image) => {
    imageObserver.observe(image);
  });
}
