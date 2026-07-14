import "../script.js";
import {
  initCardHoverEffects,
  initRevealAnimations,
  initStatCounters,
  initTimelineAnimations,
} from "./features/animations.js";
import {
  initAccordion,
  initCopyButtons,
  initScrollToTop,
} from "./features/content.js";
import { initKonamiCode } from "./features/easter-egg.js";
import {
  initMobileMenu,
  initScrollEffects,
  initSmoothScrolling,
} from "./features/navigation.js";
import { initProjectData, lazyLoadImages } from "./features/projects.js";

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();
  initAccordion();
  initMobileMenu();
  initScrollEffects();
  initCopyButtons();
  initRevealAnimations();
  initStatCounters();
  initCardHoverEffects();
  initTimelineAnimations();
  initProjectData();
  initKonamiCode();
  initScrollToTop();
  lazyLoadImages();

  console.log("GitHub Copilot Agent Customizations Guide Loaded");
  console.log("Focus on: Agents, Skills, and MCP Servers");
});
