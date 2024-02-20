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
  // Replace '<name>' with the actual profile name or ID.
  const apiUrl = `${API_BASE_URL}/auction/profiles/<name>`;
  const accessToken = sessionStorage.getItem("accessToken"); // Assuming the access token is stored in sessionStorage

  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
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
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("Error updating avatar.");
    });
}
