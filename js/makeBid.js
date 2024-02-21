/* eslint-disable no-undef */
// Assuming api-urls.js is correctly set up and imported
import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", () => {
  // Example trigger for opening the bid modal with a specific listing ID
  // This part needs to be integrated with your actual listing elements
  document.querySelectorAll(".bid-button").forEach((button) => {
    button.addEventListener("click", function () {
      const listingId = this.getAttribute("data-listing-id");
      openBidModalForListing(listingId);
    });
  });

  const createBidForm = document.getElementById("createBidForm");

  createBidForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const listingId = createBidForm.getAttribute("data-listing-id");
    const bidAmount = document.getElementById("bidAmount").value;
    const accessToken = sessionStorage.getItem("accessToken");
    const apiKey = sessionStorage.getItem("apiKey");

    if (!accessToken || !apiKey) {
      console.error("Missing credentials: Please log in.");
      return;
    }

    if (!listingId) {
      console.error("Missing listing ID: Please select a listing to bid on.");
      return;
    }

    placeBid(listingId, bidAmount, accessToken, apiKey);
  });
});

function placeBid(listingId, amount, accessToken, apiKey) {
  fetch(`${API_BASE_URL}/auction/listings/${listingId}/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({ amount: Number(amount) }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            `Failed to place bid: ${error.message || "Unknown error"}`
          );
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Bid placed successfully:", data);
      alert("Bid placed successfully!");
      // Consider closing the modal here if the bid is successful
    })
    .catch((error) => {
      console.error("Error placing bid:", error);
      alert("Error placing bid: " + error.message);
    });
}

function openBidModalForListing(listingId) {
  const createBidForm = document.getElementById("createBidForm");
  createBidForm.setAttribute("data-listing-id", listingId); // Set the listing ID
  var bidModal = new bootstrap.Modal(document.getElementById("placeBidModal"));
  bidModal.show();
}
