import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const updateAvatarForm = document.getElementById("updateAvatarForm");

  updateAvatarForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const avatarUrl = document.getElementById("avatarUrlInput").value;
    const avatarAltText =
      document.getElementById("avatarAltTextInput").value || "";

    const profileData = {
      avatar: {
        url: avatarUrl,
        alt: avatarAltText,
      },
    };

    updateProfile(profileData);
  });
});

function updateProfile(profileData) {
  const username = sessionStorage.getItem("username");
  const accessToken = sessionStorage.getItem("accessToken");
  const apiKey = sessionStorage.getItem("apiKey");

  // Check each credential individually and log specific missing items
  if (!username) console.error("Missing credential: username");
  if (!accessToken) console.error("Missing credential: access token");
  if (!apiKey) console.error("Missing credential: API key");

  // Proceed only if all credentials are present
  if (!username || !accessToken || !apiKey) {
    return;
  }

  const apiUrl = `${API_BASE_URL}/auction/profiles/${username}`;

  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(profileData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update profile");
      return response.json();
    })
    .then((data) => {
      console.log("Profile updated successfully:", data);
      alert("Avatar updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("Error updating avatar.");
    });
}
