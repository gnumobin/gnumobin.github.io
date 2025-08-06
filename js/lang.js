const langSelect = document.getElementById("langSelect");
const savedLang = localStorage.getItem("preferredLang");
const currentLang = window.location.pathname.split("/")[1]; // مثلا 'fa' یا 'en'

// 1️⃣ بار اول: اگر زبان ذخیره‌شده نداری، از مرورگر تشخیص بده
if (!savedLang) {
  const userLang = navigator.language || navigator.userLanguage;
  const initialLang = userLang.startsWith("fa") ? "fa" : "en";
  localStorage.setItem("preferredLang", initialLang);

  if (currentLang !== initialLang) {
    window.location.replace(`/${initialLang}/`);
  }
}
// 2️⃣ اگر زبان ذخیره شده هست ولی مسیر فعلی متفاوت است → هدایت کن
else if (savedLang && currentLang !== savedLang) {
  window.location.replace(`/${savedLang}/`);
}

// 3️⃣ ست کردن انتخابگر روی زبان فعلی
langSelect.value = savedLang || currentLang;

// 4️⃣ وقتی کاربر زبان رو عوض کرد
langSelect.addEventListener("change", function () {
  const lang = this.value;
  localStorage.setItem("preferredLang", lang);
  window.location.replace(`/${lang}/`);
});
