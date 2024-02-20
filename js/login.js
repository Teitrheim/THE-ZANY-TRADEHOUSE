import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  // Only add the event listener if the loginForm exists on the page
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
      // Adjust the following line based on the actual structure of your API response
      const accessToken = data.accessToken; // This might need adjustment based on your API's response structure

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
      alert("Login failed: Invalid email or password.");
    });
}
