// profile.js
import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
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
  document.getElementById("profileBio").textContent =
    profile.bio || "No bio available";
  document.getElementById("profileAvatar").src = profile.avatar.url;
  document.getElementById("profileAvatar").alt = profile.avatar.alt;
  document.getElementById("profileBanner").src = profile.banner.url;
  document.getElementById("profileBanner").alt = profile.banner.alt;
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
