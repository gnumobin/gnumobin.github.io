"use strict";

const hamMenuBtn = document.getElementById("hamMenuBtn");
const hamMenu = document.getElementById("hamMenu");
const overlay = document.getElementById("overlay");

hamMenuBtn.addEventListener("click", () => {
  hamMenu.style.visibility = "visible";
  hamMenu.style.transform = "translateX(0%)";

  overlay.style.visibility = "visible";
  overlay.style.transform = "translateX(0%)";

  hamMenuBtn.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  hamMenu.style.visibility = "hidden";
  hamMenu.style.transform = "translateX(-100%)";

  overlay.style.visibility = "hidden";
  overlay.style.transform = "translateX(200%)";

  hamMenuBtn.classList.toggle("active");
});

const header = document.querySelector(".header");
const heroSection = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observer.observe(heroSection);
