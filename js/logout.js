document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Clear user session or token
    sessionStorage.removeItem("accessToken"); // or localStorage.removeItem("accessToken") if you're using localStorage

    // Redirect to the homepage or login page
    window.location.href = "../index.html"; // Adjust the path as needed
  });
});
