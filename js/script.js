document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
  });

  // FAQ accordion
  let accordionHeaders = document.querySelectorAll(".faq-header");

  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      let plusMinusIcon = this.querySelector(".faq-plus");
      if (plusMinusIcon.textContent === "+") {
        this.nextElementSibling.classList.add("block")
        this.nextElementSibling.classList.remove("hidden")
        plusMinusIcon.textContent = "-";
      } else {
        this.nextElementSibling.classList.add("hidden")
        this.nextElementSibling.classList.remove("block")
        plusMinusIcon.textContent = "+";
      }
    });
  });

  // Testimonial carousel
  const carousel = document.querySelector(".testimonial-carousel"),
    arrowBtns = document.querySelectorAll(".arrow"),
    firstCardWidth = carousel.querySelector(
      ".testimonial-carousel__card"
    ).offsetWidth,
    carouselChildrens = [...carousel.children],
    wrapper = document.querySelector(".testimonial");

  let isDragging = false,
    startX,
    startScrollLeft,
    timeOutId;

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildrens
    .slice(0, cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
    if (window.innerWidth < 80) return;
    timeOutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
  };
  autoPlay();

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeOutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeOutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Loader
  let loader = document.querySelector(".loader-container");

  setTimeout(() => {
    loader.classList.add("hidden")
    loader.classList.remove("flex")
  }, 1500)
});
