document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
  });

  // Get all FAQ accordion headers
  var accordionHeaders = document.querySelectorAll(".faq-header");

  // Loop through each header and attach click event listener
  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      // Toggle the 'hidden' class on the next sibling element with class 'faq-body'
      this.nextElementSibling.classList.toggle("h-0");

      // Toggle the '-' or '+' sign based on the 'hidden' class
      var plusMinusIcon = this.querySelector(".faq-plus");
      if (plusMinusIcon.textContent === "+") {
        plusMinusIcon.textContent = "-";
      } else {
        plusMinusIcon.textContent = "+";
      }
    });
  });
});
