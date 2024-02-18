import { API_BASE_URL } from "./api-urls.js";
import $ from "jquery";
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("fullNameInput").value;
    const email = document.getElementById("emailInputRegister").value;
    const password = document.getElementById("passwordInputRegister").value;
    const avatarUrl = document.getElementById("profileImageUrlInput").value;

    const userData = {
      name: name,
      email: email,
      password: password,
      avatar: {
        url: avatarUrl,
        alt: name + "'s avatar",
      },
    };

    fetch(`${API_BASE_URL}/auth/register`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
        .then((response) => {
          if (!response.ok) {
            throw new Error("Registration failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Registration successful:", data);
          // Handle success, e.g., show a success message, redirect, etc.
          alert("Registration successful!");
          $("#registerModal").modal("hide");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Registration failed: " + error.message);
        });
  });
});
