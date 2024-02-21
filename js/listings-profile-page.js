/* eslint-disable no-undef */
import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchAuctionItems();
  setInterval(fetchAuctionItems, 10000); // Auto-refresh every 10 seconds
  attachSwitchModalEventListener();
});

function fetchAuctionItems() {
  fetch(`${API_BASE_URL}/auction/listings`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const uniqueItems = getUniqueItemsByTitleAndImage(data.data);
      const shuffledItems = shuffleArray(uniqueItems); // Shuffle the unique items
      displayAuctionItems(shuffledItems.slice(0, 4)); // Display the first four shuffled items
    })
    .catch((error) => console.error("Error fetching auction items:", error));
}

function getUniqueItemsByTitleAndImage(items) {
  const unique = [];
  const uniqueTitlesAndImages = new Set();

  items.forEach((item) => {
    const identifier = `${item.title}-${
      item.media.length > 0 ? item.media[0].url : ""
    }`;
    if (!uniqueTitlesAndImages.has(identifier)) {
      uniqueTitlesAndImages.add(identifier);
      unique.push(item);
    }
  });

  return unique;
}

function displayAuctionItems(items) {
  const itemsGrid = document.getElementById("items-grid");
  itemsGrid.innerHTML = ""; // Clear existing items

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "col-md-3 mb-4"; // Ensures 4 items per row on medium devices and up
    itemElement.innerHTML = `
        <div class="card h-100">
          <img src="${
            item.media.length > 0 ? item.media[0].url : "placeholder-image-url"
          }" class="card-img-top" alt="${
      item.media.length > 0 ? item.media[0].alt : "Placeholder"
    }">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <button type="button" class="btn btn-primary mt-auto bid-now-btn" data-bs-toggle="modal" data-bs-target="#placeBidModal" data-listing-id="${
              item.id
            }">Bid Now</button>
          </div>
        </div>
      `;
    itemsGrid.appendChild(itemElement);
  });

  attachBidNowEventListeners();
}
function attachBidNowEventListeners() {
  document
    .getElementById("items-grid")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("bid-now-btn")) {
        event.preventDefault(); // Prevent the default action
        const listingId = event.target.getAttribute("data-listing-id");
        openBidModalForListing(listingId);
      }
    });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
function attachSwitchModalEventListener() {
  document
    .getElementById("switchToLogin")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // Close the register modal
      var registerModal = bootstrap.Modal.getInstance(
        document.getElementById("registerModal")
      );
      registerModal.hide();

      // Open the login modal
      var loginModal = new bootstrap.Modal(
        document.getElementById("loginModal"),
        {}
      );
      loginModal.show();
    });
}
