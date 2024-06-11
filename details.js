const darkBtn = document.querySelector(".dark");
const favBtn = document.querySelector(".fav");
const favourites = document.querySelector(".favourites");

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

favBtn.addEventListener("click", function () {
  favourites.classList.toggle("hidden");
});

window.onscroll = function () {
  makeSticky();
};

// Get the header
var header = document.querySelector(".header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function makeSticky() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
