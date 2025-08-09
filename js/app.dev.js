"use strict";

// ########## Elements ##########
const $ = (sel, all = false) =>
  all ? document.querySelectorAll(sel) : document.querySelector(sel);

const els = {
  hamMenuBtn: $("#hamMenuBtn"),
  hamMenu: $("#hamMenu"),
  overlay: $("#overlay"),
  header: $(".header"),
  stickyBtn: $("#stickyBtn"),
  heroSection: $(".section-hero"),
  allImages: $("img", true),
  allBtns: $(".btn", true),
  toggleThemeBtn: $("#toggleThemeBtn"),
};

// ########## State ##########
let darkMode = JSON.parse(localStorage.getItem("darkTheme")) ?? true;

// ########## Helpers ##########
const setCSSVars = (vars) =>
  Object.entries(vars).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );

const disableContextMenu = (elements) =>
  elements.forEach((el) =>
    el.addEventListener("contextmenu", (e) => e.preventDefault())
  );

const preventDefault = (e) => e.preventDefault();

const preventDefaultForScrollKeys = (e) => {
  if ([37, 38, 39, 40].includes(e.keyCode)) preventDefault(e);
};

const supportsPassive = (() => {
  let passive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: () => (passive = true),
      })
    );
  } catch {}
  return passive;
})();

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// ########## Scroll Lock ##########
const disableScroll = () => {
  [
    ["DOMMouseScroll", preventDefault],
    [wheelEvent, preventDefault],
    ["touchmove", preventDefault],
    ["keydown", preventDefaultForScrollKeys],
  ].forEach(([ev, fn]) => window.addEventListener(ev, fn, wheelOpt));
};

const enableScroll = () => {
  [
    ["DOMMouseScroll", preventDefault],
    [wheelEvent, preventDefault],
    ["touchmove", preventDefault],
    ["keydown", preventDefaultForScrollKeys],
  ].forEach(([ev, fn]) => window.removeEventListener(ev, fn, wheelOpt));
};

// ########## UI Actions ##########
const toggleMenu = (close) => {
  els.hamMenuBtn.classList.toggle("active");
  els.hamMenu.classList.toggle("header-nav__list--active");
  els.overlay.classList.toggle("overlay--active");

  setTimeout(
    () => els.header.classList.toggle("header--active"),
    close ? 180 : 0
  );

  els.hamMenuBtn.classList.contains("active")
    ? disableScroll()
    : enableScroll();
};

const updateTheme = () => {
  els.toggleThemeBtn.checked = darkMode;
  setCSSVars({
    "--color-bg": darkMode ? "#161513" : "#f9f9f9",
    "--color-bg-dark": darkMode ? "#191919" : "#f3f3f3",
    "--color-bg-thin": darkMode ? "#222" : "#cccccc",
    "--color-bg-extra-thin": darkMode ? "#2a2a2a" : "#e2e2e2",
    "--color-text": darkMode ? "#c5c5c5" : "#1a1a1a",
    "--color-grey": darkMode ? "#8491a0" : "#5a5a5a",
    "--color-text-bold": darkMode ? "#fff" : "#000",
    "--color-neon": darkMode ? "#e0e0e0" : "#7a7a7a",
    "--color-neon-tint": darkMode ? "#e3e3e3" : "#888888",
    "--color-neon-tinter": darkMode ? "#e6e6e6" : "#999999",
  });

  els.allBtns.forEach(
    (btn) =>
      btn.classList.toggle("dark", darkMode) ||
      btn.classList.toggle("light", !darkMode)
  );
};

// ########## Events ##########
els.hamMenuBtn.addEventListener("click", () => toggleMenu(false));
els.overlay.addEventListener("click", () => toggleMenu(true));
els.stickyBtn.addEventListener("click", () => window.scrollTo({ top: 0 }));

disableContextMenu(els.allImages);
if (window.innerWidth < 480) disableContextMenu(els.allBtns);

els.toggleThemeBtn.addEventListener("change", (e) => {
  darkMode = e.target.checked;
  localStorage.setItem("darkTheme", darkMode);
  updateTheme();
});
updateTheme();

// Disable default Ctrl+S, Ctrl+U, F12, DevTools shortcuts
document.addEventListener("keydown", (e) => {
  const blockKeys = [
    (e.ctrlKey || e.metaKey) && ["KeyS", "KeyU"].includes(e.code),
    e.code === "F12",
    (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      ["KeyI", "KeyJ", "KeyC"].includes(e.code),
  ];
  if (blockKeys.some(Boolean)) {
    e.preventDefault();
    alert("Do you work with the browser or with us? 🙂");
  }
});

// ########## Sticky Header ##########
new IntersectionObserver(
  ([entry]) => {
    els.header.classList.toggle("sticky", !entry.isIntersecting);
    els.stickyBtn.classList.toggle("active", !entry.isIntersecting);
  },
  { rootMargin: "-80px" }
).observe(els.heroSection);

// ########## ServiceWorker ##########
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
      .catch((err) => console.error("❌ SW registration failed:", err))
  );
}

// ########## Block Translators ##########
const blockList = [
  "translate.googleusercontent.com",
  "translatetheweb.com",
  "bing.com",
  "translate.yandex.com",
];
if (
  blockList.some((domain) => location.hostname.includes(domain)) ||
  window.top !== window.self
) {
  document.body.innerHTML =
    "<h2 style='text-align:center;margin-top:50px;'>Why do you want translate that?</h2>";
}
