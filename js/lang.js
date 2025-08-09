const langSelect = document.getElementById("langSelect");
const savedLang = localStorage.getItem("preferredLang");
const pathLang = window.location.pathname.split("/")[1];
const supportedLangs = ["fa", "en"];

const browserLang = (
  navigator.languages?.[0] ||
  navigator.language ||
  navigator.userLanguage ||
  "en"
).toLowerCase();

const currentLang = supportedLangs.includes(pathLang) ? pathLang : null;

if (currentLang) {
  if (savedLang !== currentLang)
    localStorage.setItem("preferredLang", currentLang);
} else {
  const fallback = savedLang || (browserLang.startsWith("fa") ? "fa" : "en");
  if (window.location.pathname !== `/${fallback}/`) {
    window.location.replace(`/${fallback}/`);
  }
}

langSelect.value = currentLang || savedLang || "en";

langSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  if (savedLang !== lang) {
    localStorage.setItem("preferredLang", lang);
    window.location.replace(`/${lang}/`);
  }
});
