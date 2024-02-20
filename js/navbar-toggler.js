document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarNav = document.getElementById("navbarNav");

  navbarToggler.addEventListener("click", function () {
    navbarNav.classList.toggle("show");
  });
});
