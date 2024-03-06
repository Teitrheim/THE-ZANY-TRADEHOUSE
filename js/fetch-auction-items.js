/* eslint-disable no-undef */
import { openBidModalForListing } from "./makeBid.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  searchInput.addEventListener("input", async () => {
    fetchAuctionItems(searchInput.value, sortSelect.value);
  });

  sortSelect.addEventListener("change", () => {
    fetchAuctionItems(searchInput.value, sortSelect.value);
  });

  fetchInitialListings();
  attachBidNowEventListeners();
});

function fetchAuctionItems(searchTerm = "", sortBy = "latest") {
  let url = `https://v2.api.noroff.dev/auction/listings/search`;

  const params = new URLSearchParams();
  if (searchTerm) {
    params.append("q", searchTerm);
  }
  if (sortBy === "popular") {
    params.append("_sort", "popularity");
  }

  // the check after the params definition
  if (!searchTerm) {
    fetchInitialListings();
    return;
  }

  const queryString = params.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.data.length === 0) {
        const container = document.getElementById("auction-items-container");
        container.innerHTML = `<div class="d-flex justify-content-center align-items-center">
                                  <p class="text-center">We couldn't find any matches for "${searchTerm}". Please try something else.</p>
                                </div>`;
      } else {
        displayAuctionItems(data.data);
      }
    })
    .catch((error) => console.error("Error fetching auction items:", error));
}

async function fetchInitialListings() {
  let url = `https://v2.api.noroff.dev/auction/listings`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayAuctionItems(data.data.slice(0, 25));
  } catch (error) {
    console.error("Error fetching auction items:", error);
  }
}

function displayAuctionItems(items) {
  const container = document.getElementById("auction-items-container");
  container.innerHTML = "";

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "col-md-4 mb-4";
    itemElement.innerHTML = `
    <div class="card h-100">
    <img src="${
      item.media[0] ? item.media[0].url : "default-image.jpg"
    }" class="object-fit-cover h-50" alt="${item.title}">
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        <button type="button" class="btn btn-primary mt-auto bid-now-btn">Bid Now</button>
    </div>
</div>`;
    container.appendChild(itemElement);
  });
}

function attachBidNowEventListeners() {
  document
    .getElementById("auction-items-container")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("bid-now-btn")) {
        event.preventDefault();

        const isLoggedIn = sessionStorage.getItem("accessToken");

        if (!isLoggedIn) {
          // Trigger the register/login modal if the user is not logged in
          var registerModal = new bootstrap.Modal(
            document.getElementById("registerModal"),
            {}
          );
          registerModal.show();
        } else {
          const listingId = event.target.getAttribute("data-listing-id");
          openBidModalForListing(listingId);
        }
      }
    });
}
