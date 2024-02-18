function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("emailInput").value;
    const passwordInput = document.getElementById("passwordInput").value;

    if (!emailInput || !passwordInput) {
      alert("Email and password are required.");
      return;
    }

    if (!validateEmail(emailInput)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Proceed with the login request
  });
const emailInput = document.getElementById("emailInput").value;
const passwordInput = document.getElementById("passwordInput").value;

const loginData = {
  email: emailInput,
  password: passwordInput,
};

fetch(`${API_BASE_URL}/auction/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(loginData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Login successful:", data);
    // Store the accessToken in localStorage or handle it as needed
    localStorage.setItem("accessToken", data.accessToken);
    // Redirect to profile page or another page as needed
    window.location.href = "profile.html";
  })
  .catch((error) => {
    console.error("Error:", error);
  });
