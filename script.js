const darkBtn = document.querySelector(".dark");
const favBtn = document.querySelector(".fav");
const favourites = document.querySelector(".favourites");
const favouriteTopicsHtml = document.querySelector(".fav-topics");
const header = document.querySelector(".header");
const topics_list = document.querySelector(".topics-details");
const search = document.getElementById("search");
const topicsCount = document.querySelector(".topicsCount");
const sort = document.getElementById("sort");
const filter = document.getElementById("filter");
//.................................................................................................

// fetching data and applying search, sort and filter

const topics = [];

fetch("./topics.json")
  .then((res) => res.json())
  .then((data) => {
    topics.push(...data);
    displayOnHtml(topics);

    search.addEventListener("keyup", (e) => {
      const searchText = e.target.value;
      if (searchText.length > 0) {
        const filteredArr = topics.filter((t) =>
          t.topic.toLowerCase().includes(`${searchText.toLowerCase()}`)
        );
        displayOnHtml(filteredArr);
      } else if (topics.length > 0) {
        displayOnHtml(topics);
      }
    });
    sort.addEventListener("change", (e) => {
      const sortedBy = e.target.value;
      if (sortedBy) {
        if (sortedBy === "topic") {
          let sortedData = topics.sort((a, b) => {
            if (a.topic < b.topic) {
              return -1;
            }
            if (a.topic > b.topic) {
              return 1;
            }
            return 0;
          });
          displayOnHtml(sortedData);
        } else if (sortedBy === "name") {
          let sortedData = topics.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          displayOnHtml(sortedData);
        }
      } else {
        displayOnHtml(topics);
      }
    });

    filter.addEventListener("change", (e) => {
      const filteredBy = e.target.value;
      if (filteredBy) {
        const filteredArr = topics.filter(
          (topic) => topic.category === filteredBy
        );
        displayOnHtml(filteredArr);
      } else {
        displayOnHtml(topics);
      }
    });
  });

const displayOnHtml = (topics) => {
  topicsCount.innerHTML = `${topics.length} Web Topics Found`;
  topics_list.innerHTML = "";
  topics.forEach((topic) => {
    let atopic = document.createElement("a");
    atopic.setAttribute("href", `/details.html?id=${topic.id}`);
    atopic.setAttribute("data-id", `${topic.id}`);
    atopic.innerHTML = `<section class="topic">
            <div class="topic-img">
              <img src="./Logos/${topic.image}" alt="${topic.topic}" />
            </div>
            <div class="topic-details">
              <div class="topic-name">
                <p class="cate">${topic.category}</p>
                <h4 class="name">${topic.topic}</h4>
              </div>
              <div class="topic-review">
                <p class="rate">
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star-outline"></ion-icon>
                </p>
                <h4 class="author">Author: ${topic.name}</h4>
              </div>
            </div>
          </section>`;

    topics_list.appendChild(atopic);
  });
};

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
