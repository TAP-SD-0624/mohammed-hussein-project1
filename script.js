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

//in function
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
      console.log(sortedBy);
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
      } else if (sortedBy === "") {
        displayOnHtml(data);
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
        displayOnHtml(data);
      }
    });
  });

const displayOnHtml = (topics) => {
  topicsCount.innerHTML = `${topics.length} Web Topics Found`;
  topics_list.innerHTML = "";
  topics.forEach((topic) => {
    let atopic = document.createElement("a");
    atopic.setAttribute(
      "class",
      "topic card g-col-10 g-col-sm-5 g-col-md-5 g-col-lg-3 g-col-xl-3 g-col-xxl-2"
    );
    atopic.setAttribute("href", `./details.html?id=${topic.id}`);
    atopic.setAttribute("data-id", `${topic.id}`);
    atopic.setAttribute("style", "width: 16rem; height: 300px;");
    atopic.innerHTML = `
              <div>
  <img src="./Logos/${topic.image}" class="card-img-top object-fit-cover" style ="height: 150px" alt="${topic.topic}">
  <div class="card-body p-3 pe-0 pb-0 pt-2" style ="height: 150px">
    <p class="mb-0 w-100 text-truncate" style ="font-size : 14px; font-weight: 600">${topic.category}</hp>
    <h5 class="card-title fs-6 fw-bold text-truncate">${topic.topic}</h5>
    <p class="rate card-text fs-6 w-100 pt-4 mb-0"> <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star"></ion-icon>
                  <ion-icon name="star-outline"></ion-icon></p>
    <p class="author fs-6 w-100  mb-0" >Author: ${topic.name}</p>
  </div>
</div>`;

    topics_list.appendChild(atopic);
  });
};

//.................................................................................................
// to make the header sticky
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
      newTopic.setAttribute(
        "class",
        "fav-topic h-80 g-col-9 g-col-sm-3 g-col-md-3 g-col-lg-3 g-col-xl-2 g-col-xxl-1"
      );
      newTopic.setAttribute("style", "width: 9rem");

      newTopic.innerHTML = `<div class="fav-topic-img h-50">
                  <img src="../Logos/${topic.image}" alt="${topic.topic}" class="w-100 h-100" />
                </div>
                <div class="fav-topic-content h-50 d-flex flex-column justify-content-space-around align-items-center ">
                  <h4 class="fs-6 fw-bold w-100 ps-2 pt-2 mb-0 text-truncate">${topic.topic}</h4>
                  <p class="fs-6 fw-bold w-100 ps-2 pb-2 mb-0 text-truncate">
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
