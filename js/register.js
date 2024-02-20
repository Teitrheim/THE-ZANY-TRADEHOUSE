import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  // Only add the event listener if the registerForm exists on the page
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      const name = document.getElementById("fullNameInput").value;
      const email = document.getElementById("emailInputRegister").value;
      const password = document.getElementById("passwordInputRegister").value;
      // Only include the avatar field if an avatar URL is provided
      const avatarUrl = document.getElementById("profileImageUrlInput")
        ? document.getElementById("profileImageUrlInput").value
        : null;

      const userData = {
        name: name,
        email: email,
        password: password,
        ...(avatarUrl && {
          avatar: {
            url: avatarUrl,
            alt: `${name}'s avatar`,
          },
        }),
      };

      registerUser(userData);
    });
  }
});

function registerUser(userData) {
  fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        // If the response is not ok, attempt to parse the error message from the JSON body
        return response.json().then((errorData) => {
          // Throw an error that includes the server-provided error message
          throw new Error(
            `Registration failed: ${errorData.errors
              .map((err) => err.message)
              .join(", ")}`
          );
        });
      }
      // If the response is ok, parse the JSON body as usual
      return response.json();
    })
    .then((data) => {
      console.log("Registration successful:", data);
      alert("Registration successful!");
      // Here, you can redirect the user or close the modal and show a success message
      // For example, to close a Bootstrap modal you might use:
      // $('#registerModal').modal('hide');
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
}
