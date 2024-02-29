import { API_BASE_URL } from "./api-urls.js";
import { openBidModalForListing } from "./makeBid.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchAuctionItems();
  attachSwitchModalEventListener();
});

function fetchAuctionItems() {
  fetch(`${API_BASE_URL}/auction/listings`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch auction items");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.data) {
        displayAuctionItems(data.data);
      } else {
        console.error("No items data found");
      }
    })
    .catch((error) => console.error("Error fetching auction items:", error));
}

function displayAuctionItems(items) {
  const itemsGrid = document.getElementById("items-grid");
  itemsGrid.innerHTML = ""; // Clear existing items

  items.forEach((item) => {
    fetchListingWithHighestBid(item.id); // Fetch and display each item with its highest bid
  });
}

function fetchListingWithHighestBid(listingId) {
  fetch(`${API_BASE_URL}/auction/listings/${listingId}?_bids=true`)
    .then((response) => response.json())
    .then((data) => {
      const listing = data.data;
      let highestBid = "No bids yet";
      if (listing.bids && listing.bids.length > 0) {
        highestBid = listing.bids.reduce(
          (max, bid) => (bid.amount > max.amount ? bid : max),
          { amount: 0 }
        ).amount;
      }
      displayListingItem(listing, highestBid); // Display the listing with the highest bid
    })
    .catch((error) =>
      console.error("Error fetching listing with bids:", error)
    );
}

function displayListingItem(item, highestBid) {
  const itemsGrid = document.getElementById("items-grid");
  const now = new Date();
  const itemEndsAt = new Date(item.endsAt);
  const hasEnded = itemEndsAt < now;

  const itemElement = document.createElement("div");
  itemElement.className = "col-md-3 mb-4";
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
        <p class="card-text"><strong>Current Bid:</strong> ${highestBid}</p>
        <button type="button" class="btn btn-primary mt-auto bid-now-btn" ${
          hasEnded ? "disabled" : ""
        } data-bs-toggle="modal" data-bs-target="#placeBidModal" data-listing-id="${
    item.id
  }">${hasEnded ? "Bidding Ended" : "Bid Now"}</button>
      </div>
    </div>
  `;
  itemsGrid.appendChild(itemElement);

  attachBidNowEventListeners();
}

function attachBidNowEventListeners() {
  document.querySelectorAll(".bid-now-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      const listingId = event.target.getAttribute("data-listing-id");
      openBidModalForListing(listingId);
    });
  });
}

function attachSwitchModalEventListener() {
  const switchToLoginButton = document.getElementById("switchToLogin");
  if (switchToLoginButton) {
    switchToLoginButton.addEventListener("click", function (event) {
      event.preventDefault();
      // Logic to switch modals goes here
    });
  }
}
