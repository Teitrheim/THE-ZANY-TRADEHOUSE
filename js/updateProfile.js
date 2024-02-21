import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const updateAvatarForm = document.getElementById("updateAvatarForm");

  if (updateAvatarForm) {
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
  }
});

function updateProfile(profileData) {
  const username = sessionStorage.getItem("username");
  const accessToken = sessionStorage.getItem("accessToken");
  const apiKey = sessionStorage.getItem("apiKey");

  if (!username || !accessToken || !apiKey) {
    console.error("Missing credentials: username, access token, or API key");
    alert("Please log in to update your profile.");
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
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Profile updated successfully:", data);
      alert("Avatar updated successfully!");
      // Optionally, refresh the page or update the UI to reflect the new avatar
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("Error updating avatar.");
    });
}
