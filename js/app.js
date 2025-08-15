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
};

// ########## State ##########

// ########## Helpers ##########

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

// ########## Events ##########
els.hamMenuBtn.addEventListener("click", () => toggleMenu(false));
els.overlay.addEventListener("click", () => toggleMenu(true));
els.stickyBtn.addEventListener("click", () => window.scrollTo({ top: 0 }));

disableContextMenu(els.allImages);
if (window.innerWidth < 480) disableContextMenu(els.allBtns);

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
