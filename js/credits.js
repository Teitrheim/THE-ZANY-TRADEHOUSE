// JavaScript to fetch and display the user's credits
import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const profileName = "theUserName";
  fetch(`${API_BASE_URL}/auction/profiles/${profileName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      return response.json();
    })
    .then((data) => {
      const credits = data.data.credits; // Adjust according to the actual response structure
      document.getElementById(
        "creditsDisplay"
      ).innerText = `Credits: ${credits}`;
    })
    .catch((error) => console.error("Error fetching user credits:", error));
});
