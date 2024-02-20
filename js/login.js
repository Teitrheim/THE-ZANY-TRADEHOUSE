import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      const email = document.getElementById("emailInput").value;
      const password = document.getElementById("passwordInput").value;

      loginUser(email, password);
    });
  }
});

function loginUser(email, password) {
  fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful:", data);
      const accessToken = data.data.accessToken; // Correctly accessing the accessToken

      if (accessToken) {
        console.log("Access Token:", accessToken);
        sessionStorage.setItem("accessToken", accessToken);
        // Redirect the user to the profile page or another page as needed
        window.location.href = "/profile.html"; // Adjust the URL as needed
      } else {
        console.error("Login successful but accessToken is missing");
        alert("Login was successful but unable to retrieve access token.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
}
