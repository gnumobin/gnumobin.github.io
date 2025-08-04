"use strict";

const hamMenuBtn = document.getElementById("hamMenuBtn");
const hamMenu = document.getElementById("hamMenu");
const overlay = document.getElementById("overlay");
const header = document.querySelector(".header");
const stickyBtn = document.querySelector("#stickyBtn");

hamMenuBtn.addEventListener("click", () => {
  hamMenu.style.visibility = "visible";
  hamMenu.style.transform = "translateX(0%)";

  overlay.style.visibility = "visible";
  overlay.style.transform = "translateX(0%)";

  hamMenuBtn.classList.toggle("active");

  header.style.backgroundColor = "transparent";
});

overlay.addEventListener("click", () => {
  hamMenu.style.visibility = "hidden";
  hamMenu.style.transform = "translateX(-100%)";

  overlay.style.visibility = "hidden";
  overlay.style.transform = "translateX(200%)";

  hamMenuBtn.classList.toggle("active");

  const bg = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-bg-thin"
  );

  setTimeout(() => {
    header.style.backgroundColor = bg;
  }, 400);
});

const heroSection = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      header.classList.add("sticky");
      stickyBtn.classList.add("active");
    } else {
      header.classList.remove("sticky");
      stickyBtn.classList.remove("active");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observer.observe(heroSection);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("./js/sw.js")
//       .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
//       .catch((err) => console.error("❌ SW registration failed:", err));
//   });
// }

stickyBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
  });
});

const allImages = document.querySelectorAll("img");
const imgsArr = allImages;

imgsArr.forEach((img) => {
  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
});
