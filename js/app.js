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
// Toggle Theme Btn
const toggleThemeBtn = document.querySelector("#toggleThemeBtn");
// Theme
let darkMode = true;

// CSS Variables
const bg = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-bg-thin"
);

// Functions

// Open & Close Mobile Menu
const toggleShowMenu = (open) => {
  // toggle classLists
  hamMenuBtn.classList.toggle("active");
  hamMenuEl.classList.toggle("header-nav__list--active");
  overlayEl.classList.toggle("overlay--active");

  // if we are close menu change background with subtle delay
  if (open) {
    setTimeout(() => headerEl.classList.toggle("header--active"), 180);
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

// Unset longPress on mobiles (annoying vibrate)
const preventLongPress = (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
  this.longPressTimer = setTimeout(() => e.preventDefault(), 500);
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

// When Site not focus: just blur everything!
// window.addEventListener("blur", () => document.body.classList.add("blurred"));
// window.addEventListener("focus", () =>
//   document.body.classList.remove("blurred")
// );

// if screen are touchable just disable longPress
window.addEventListener("touchstart", preventLongPress, { passive: false });
window.addEventListener("touchend", () => clearTimeout(this.longPressTimer));

// Change Theme
toggleThemeBtn.addEventListener("change", () => {
  // change theme scheme
  darkMode = !darkMode;
  // change colors
  document.documentElement.style.setProperty(
    "--color-bg",
    darkMode ? "#161513" : "#f9f9f9"
  );
  document.documentElement.style.setProperty(
    "--color-bg-dark",
    darkMode ? "#191919" : "#e0e0e0"
  );
  document.documentElement.style.setProperty(
    "--color-bg-thin",
    darkMode ? "#222" : "#d1d1d1"
  );
  document.documentElement.style.setProperty(
    "--color-bg-extra-thin",
    darkMode ? "#2a2a2a" : "#c2c2c2"
  );
  document.documentElement.style.setProperty(
    "--color-text",
    darkMode ? "#c5c5c5" : "#333333"
  );
  document.documentElement.style.setProperty(
    "--color-grey	",
    darkMode ? "#8491a0" : "#6b6b6b"
  );
  document.documentElement.style.setProperty(
    "--color-text-bold",
    darkMode ? "#fff" : "#000000"
  );
});

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

// ########## Block Translators ##########

const blockList = [
  "translate.googleusercontent.com",
  "translatetheweb.com",
  "bing.com",
  "translate.yandex.com",
];

const isTranslatedPage =
  blockList.some((domain) => location.hostname.includes(domain)) ||
  window.top !== window.self;

if (isTranslatedPage) {
  document.body.innerHTML =
    "<h2 style='text-align:center;margin-top:50px;'>Why do you want translate that?</h2>";
}
