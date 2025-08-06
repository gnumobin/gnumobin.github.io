const langSelect = document.getElementById("langSelect");
const savedLang = localStorage.getItem("preferredLang");
const currentLang = window.location.pathname.split("/")[1]; // 'fa' or 'en'

// Get user langs (os lang)
const browserLang = (
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  "en"
).toLowerCase();

// Update lS with URL
if (currentLang === "fa" || currentLang === "en") {
  if (savedLang !== currentLang) {
    localStorage.setItem("preferredLang", currentLang);
  }
}
// Auto redirect (if ls not been define)
else {
  const langToGo = savedLang || (browserLang.startsWith("fa") ? "fa" : "en");
  window.location.replace(`/${langToGo}/`);
}

// Set lang
langSelect.value = currentLang || savedLang || "en";

// change lang manually with select tag
langSelect.addEventListener("change", function () {
  const lang = this.value;
  localStorage.setItem("preferredLang", lang);
  window.location.replace(`/${lang}/`);
});
