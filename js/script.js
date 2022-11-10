const slider = document.querySelector(".slider__container");
const rangeSlider = document.querySelector(".catalog-filters__range-slider");

// Инициализируем range-слайдер
noUiSlider.create(rangeSlider, {
  start: [0, 900],
  connect: true,
  step: 1,
  range: {
    min: 0,
    max: 1000,
  },
});

// Инициализируем слайдер
new Swiper(slider, {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    speed: 1000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Инициализируем карту
const map = L.map("map").setView(
  {
    lat: 59.96826,
    lng: 30.31657,
  },
  10
);

// Добавляем слой с картой из OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  // maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Создаем главный маркер
const mainPinIcon = L.icon({
  iconUrl: "img/main-marker.svg",
  iconSize: [38, 50],
  iconAnchor: [17, 52],
});

// Добавляем главный маркер на карту
const marker = L.marker(
  {
    lat: 59.96826,
    lng: 30.31657,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

marker.addTo(map);

const navMain = document.querySelector(".navigation_main");
const navToggle = document.querySelector(".navigation__toggle");
const navigationUser = document.querySelector(".navigation-user")

navMain.classList.remove("navigation_main--nojs");
navigationUser.classList.remove("navigation-user--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("navigation_main--closed")) {
    navMain.classList.remove("navigation_main--closed");
    navMain.classList.add("navigation_main--opened");
  } else {
    navMain.classList.add("navigation_main--closed");
    navMain.classList.remove("navigation_main--opened");
  }
});

const link = document.querySelector(".js-login");
const popup = document.querySelector(".modal");
const close = popup.querySelector(".modal__button--close");
const form = popup.querySelector("form");
const login = popup.querySelector("[name=login]");
const password = popup.querySelector("[name=password]");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal--show");

  if (storage) {
    login.value = storage;
    password.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal--show");
  popup.classList.remove("modal--error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !password.value) {
    evt.preventDefault();
    popup.classList.remove("modal--error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal--error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popup.classList.contains("modal--show")) {
      popup.classList.remove("modal--show");
      popup.classList.remove("modal--error");
    }
  }
});
