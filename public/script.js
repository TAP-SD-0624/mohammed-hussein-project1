const darkBtn = document.querySelector(".dark");
const favBtn = document.querySelector(".fav");
const favourites = document.querySelector(".favourites");
const favouriteTopicsHtml = document.querySelector(".fav-topics");
const header = document.querySelector(".header");
//.................................................................................................

//to make the header sticky
window.onscroll = function () {
  makeSticky();
};

// Get the offset position of the navbar
let sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function makeSticky() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//...................................................................................................

// Dark mood functionality

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

//.....................................................................................................

// favorite functionality

//1- to show and hide favorite section:
favBtn.addEventListener("click", function () {
  favourites.classList.toggle("hidden");
  if (!favourites.classList.contains("hidden")) {
    const topics = JSON.parse(localStorage.getItem("favTopic")) || [];
    addTopicsToHtml(topics);
  }
});

// 2 - add the topics to Html:
const addTopicsToHtml = (topics) => {
  favouriteTopicsHtml.innerHTML = "";
  if (topics.length > 0) {
    topics.forEach((topic) => {
      let newTopic = document.createElement("div");
      newTopic.classList.add("fav-topic");

      newTopic.innerHTML = `<div class="fav-topic-img">
                  <img src="../Logos/${topic.image}" alt="${topic.topic}" />
                </div>
                <div class="fav-topic-content">
                  <h4>${topic.topic}</h4>
                  <p>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                  </p>
                </div>
              </div>
                </div>`;
      favouriteTopicsHtml.appendChild(newTopic);
    });
  }
};
