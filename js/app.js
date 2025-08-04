"use strict";

// ########## Variables ##########
// Hamburger Menu Btn
const hamMenuBtn = document.getElementById("hamMenuBtn");
// Hamburger Menu
const hamMenuEl = document.getElementById("hamMenu");
// Overlay
const overlayEl = document.getElementById("overlay");
// HeaderElement
const headerEl = document.querySelector(".header");
// Sticky Btn
const stickyBtn = document.querySelector("#stickyBtn");
// Hero Section (First Section User can see!)
const heroSectionEl = document.querySelector(".section-hero");
// All images define in our html
const allImagesEl = document.querySelectorAll("img");
// All buttons define in our html
const allBtnEl = document.querySelectorAll(".btn");

// CSS Variables
const bg = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-bg-thin"
);

// Functions

// Open & Close Mobile Menu
const toggleShowMenu = (open) => {
  // toggle classLists
  hamMenuEl.classList.toggle("header-nav__list--active");
  overlayEl.classList.toggle("overlay--active");
  hamMenuBtn.classList.toggle("active");

  // if we are close menu change background with subtle delay
  if (open) {
    setTimeout(() => {
      headerEl.classList.toggle("header--active");
    }, 180);
  } else {
    // if we are open change background immediately
    headerEl.classList.toggle("header--active");
  }
};

// Disable contextMenu on chain of elements
const disableContextMenuOnChainElements = (els) => {
  els.forEach((el) => {
    el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  });
};

// ########## Events ##########

// Open & Close Menu (Overlay, HamburgerBtn)
hamMenuBtn.addEventListener("click", () => toggleShowMenu(false));
overlayEl.addEventListener("click", () => toggleShowMenu(true));

// StickyBtn => Back to top of page | function in here!
stickyBtn.addEventListener("click", () => window.scrollTo({ top: 0 }));

// Disable RightClick menu on all of image
disableContextMenuOnChainElements(allImagesEl);
// Disable RightClick menu on button just for smaller screens
window.innerWidth < 480 && disableContextMenuOnChainElements(allBtnEl);

// ########## Observer ##########

const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      headerEl.classList.add("sticky");
      stickyBtn.classList.add("active");
    } else {
      headerEl.classList.remove("sticky");
      stickyBtn.classList.remove("active");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observer.observe(heroSectionEl);

// ########## ServiceWorker ##########

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./js/sw.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
      .catch((err) => console.error("❌ SW registration failed:", err));
  });
}
