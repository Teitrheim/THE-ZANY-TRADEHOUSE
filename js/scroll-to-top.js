// Get the button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
scrollTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
