const darkBtn = document.querySelector(".dark");
// const header = document.querySelector("header");
// const btn1 = document.querySelector(".dark");
// const btn2 = document.querySelector(".fav");
// const welcoming = document.querySelector(".welcoming-section");
// const welP = document.querySelector(".welP");
// const main = document.querySelector("main");

function setTheme(theme) {
  return document.getElementById("theme").setAttribute("href", theme);
}

darkBtn.addEventListener("click", function () {
  const theme = document.getElementById("theme").getAttribute("href");
  switch (theme) {
    case "light.css": {
      return setTheme("dark.css");
    }
    case "dark.css": {
      return setTheme("light.css");
    }
  }
});
