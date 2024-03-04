import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const apiKey = sessionStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    console.log(
      "No access token or API key found. Please log in and ensure you have an API key."
    );
    return;
  }

  fetchUserProfile(accessToken, apiKey);
});

function fetchUserProfile(accessToken, apiKey) {
  const username = "my_username"; 

  fetch(`${API_BASE_URL}/auction/profiles/${username}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    })
    .then((data) => {
      updateProfileUI(data.data); // Call a function to update the UI with all profile data
    })
    .catch((error) => console.error("Error fetching user profile:", error));
}

function updateProfileUI(profile) {
  // Update credits
  const creditsElement = document.getElementById("credits");
  if (creditsElement) {
    creditsElement.textContent = `Credits: ${profile.credits}`;
  }

  // Update name, email, bio, avatar, and banner
  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileEmail").textContent = profile.email;
  document.getElementById("profileBio").textContent =
    profile.bio || "No bio provided";

  const avatarElement = document.getElementById("profileAvatar");
  if (avatarElement) {
    avatarElement.src = profile.avatar.url;
    avatarElement.alt = profile.avatar.alt || "User avatar";
  }

  const bannerElement = document.getElementById("profileBanner");
  if (bannerElement) {
    bannerElement.src = profile.banner.url;
    bannerElement.alt = profile.banner.alt || "User banner";
  }

  // Update listings and wins count
  document.getElementById(
    "listingsCount"
  ).textContent = `Listings: ${profile._count.listings}`;
  document.getElementById(
    "winsCount"
  ).textContent = `Wins: ${profile._count.wins}`;
}
