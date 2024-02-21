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
    .then((response) => response.json())
    .then((data) => {
      if (data.data && data.data.accessToken) {
        const accessToken = data.data.accessToken;
        const username = data.data.name;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("username", username); // Store username for later use

        // Now, request an API Key
        return fetch(`${API_BASE_URL}/auth/create-api-key`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        throw new Error("Login successful but accessToken is missing");
      }
    })
    .then((response) => response.json())
    .then((apiKeyData) => {
      if (apiKeyData.data && apiKeyData.data.key) {
        const apiKey = apiKeyData.data.key;
        console.log("API Key:", apiKey);
        sessionStorage.setItem("apiKey", apiKey); // Store API key for later use

        // Redirect the user to the profile page or another page as needed
        window.location.href = "/profile.html";
      } else {
        throw new Error("API Key retrieval failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
}
