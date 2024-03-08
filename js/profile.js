// profile.js
import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const username = sessionStorage.getItem("username"); // Ensure this is retrieved
  const apiKey = sessionStorage.getItem("apiKey");

  if (!accessToken || !username || !apiKey) {
    console.error("Missing credentials: Please log in.");
    return; // Exit if any credentials are missing
  }

  // Use these credentials to make API request
  fetchUserProfile(username, accessToken, apiKey);
});

function fetchUserProfile() {
  const accessToken = sessionStorage.getItem("accessToken");
  const apiKey = sessionStorage.getItem("apiKey");
  // Assuming the username or user ID is stored in sessionStorage after login
  const username = sessionStorage.getItem("username");

  if (!accessToken || !apiKey || !username) {
    console.error("Missing credentials: Please log in.");
    return;
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("X-Noroff-API-Key", apiKey);

  fetch(`${API_BASE_URL}/auction/profiles/${username}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    })
    .then((data) => {
      displayProfile(data.data);
    })
    .catch((error) => console.error("Error fetching profile:", error));
}

function displayProfile(profile) {
  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileEmail").textContent = profile.email;
  // Check if bio is available and display it; otherwise, hide the bio section or display a default message
  const bioText = profile.bio || "No bio available";
  const bioElement = document.getElementById("profileBio");
  if (profile.bio) {
    bioElement.textContent = bioText;
    bioElement.style.display = ""; // Ensure it's visible if bio exists
  } else {
    bioElement.style.display = "none";
  }
  // Set avatar image or a default placeholder if the URL is missing
  const avatarUrl =
    profile.avatar && profile.avatar.url
      ? profile.avatar.url
      : "https://via.placeholder.com/150";
  document.getElementById("profileAvatar").src = avatarUrl;
  document.getElementById("profileAvatar").alt =
    profile.avatar && profile.avatar.alt
      ? profile.avatar.alt
      : "Default avatar";

  // Set banner image or a default placeholder if the URL is missing
  const bannerUrl =
    profile.banner && profile.banner.url
      ? profile.banner.url
      : "https://via.placeholder.com/600x200";
  document.getElementById("profileBanner").src = bannerUrl;
  document.getElementById("profileBanner").alt =
    profile.banner && profile.banner.alt
      ? profile.banner.alt
      : "Default banner";

  document.getElementById(
    "credits"
  ).textContent = `Credits: ${profile.credits}`;
  document.getElementById(
    "listingsCount"
  ).textContent = `Listings: ${profile._count.listings}`;
  document.getElementById(
    "winsCount"
  ).textContent = `Wins: ${profile._count.wins}`;
}
