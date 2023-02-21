("use strict");

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function some() {
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
}

if (isMobile.any()) {
  document.body.classList.add("_touch");
  some();
} else {
  document.body.classList.add("_pc");
  some();
}

// Burger
const burgerIcon = document.querySelector(".header__burger");
const menuWrapper = document.querySelector(".menu");
if (burgerIcon) {
  burgerIcon.addEventListener("click", (e) => {
    document.body.classList.toggle("_lock");
    burgerIcon.classList.toggle("_active");
    menuWrapper.classList.toggle("_active");
  });
}

// Slider
const swiper = new Swiper(".product__slider", {
  // Optional parameters
  loop: true,
  // slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 1,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      centeredSlides: true,
      spaceBetween: 10,
    },
    576: {
      slidesPerGroup: 1,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// GoTo
const menuSubLinks = document.querySelectorAll(".menu__sub-link[data-goto]");
if (menuSubLinks.length > 0) {
  menuSubLinks.forEach((menuSubLink) => {
    menuSubLink.addEventListener("click", onMenuSubLinkClick);
  });

  function onMenuSubLinkClick(e) {
    const menuSubLink = e.target;
    if (
      menuSubLink.dataset.goto &&
      document.querySelector(menuSubLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuSubLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight;

      if (burgerIcon.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        burgerIcon.classList.remove("_active");
        menuWrapper.classList.remove("_active");
      }

      window.scroll({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
AOS.init({
  disable: "mobile",
  // once: true,
});
