/* eslint-disable no-undef */
import { API_BASE_URL } from "./api-urls.js";

let bidModal;

// Function to open the bid modal
export function openBidModalForListing(listingId) {
  const createBidForm = document.getElementById("createBidForm");
  createBidForm.dataset.listingId = listingId; // Set listing ID

  // Create the modal instance
  if (!bidModal) {
    bidModal = new bootstrap.Modal(document.getElementById("placeBidModal"), {
      keyboard: false,
    });
  }

  bidModal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  const createBidForm = document.getElementById("createBidForm");
  if (createBidForm) {
    // Attach event listeners and other logic here
    createBidForm.addEventListener("submit", handleBidSubmission);
  } else {
    console.warn(
      "Create Bid Form not found. Skipping bid form initialization."
    );
  }

  const itemsGrid = document.getElementById("items-grid");
  if (itemsGrid) {
    itemsGrid.addEventListener("click", function (event) {
      if (event.target.matches(".bid-now-btn")) {
        const listingId = event.target.dataset.listingId;
        openBidModalForListing(listingId);
      }
    });
  }
});

function handleBidSubmission(event) {
  event.preventDefault();

  const listingId = this.dataset.listingId;
  const bidAmount = document.getElementById("bidAmount").value;
  const accessToken = sessionStorage.getItem("accessToken");
  const apiKey = sessionStorage.getItem("apiKey");

  if (!accessToken || !apiKey) {
    console.error("Missing credentials: Please log in.");
    return;
  }

  placeBid(listingId, bidAmount, accessToken, apiKey);
}
export function placeBid(listingId, amount, accessToken, apiKey) {
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
        // If the server response is not ok, throw an error with the response
        return response.json().then((errorResponse) => {
          throw new Error(
            `Failed to place bid: ${
              errorResponse.errors.map((err) => err.message).join(", ") ||
              "Unknown error"
            }`
          );
        });
      }
      return response.json(); // Parse the JSON if the response is ok
    })
    .then((data) => {
      console.log("Bid placed successfully:", data);
      alert("Bid placed successfully!");
      // Close the modal after successful bid
      var bidModal = bootstrap.Modal.getInstance(
        document.getElementById("placeBidModal")
      );
      bidModal.hide();
    })
    .catch((error) => {
      console.error("Error placing bid:", error);
      alert("Error placing bid: " + error.message);
    });
}
