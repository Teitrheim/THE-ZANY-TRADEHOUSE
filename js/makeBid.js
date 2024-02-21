import { API_BASE_URL } from "./api-urls.js";

// Function to open the bid modal for a specific listing
function openBidModalForListing(listingId) {
  const createBidForm = document.getElementById("createBidForm");
  // Ensure this data attribute is correctly being set
  createBidForm.dataset.listingId = listingId;
  var bidModal = new bootstrap.Modal(document.getElementById("placeBidModal"));
  bidModal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to "Bid Now" buttons
  document
    .getElementById("items-grid")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("bid-button")) {
        const listingId = event.target.dataset.listingId;
        openBidModalForListing(listingId);
      }
    });

  const createBidForm = document.getElementById("createBidForm");
  createBidForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const listingId = createBidForm.dataset.listingId;
    const bidAmount = document.getElementById("bidAmount").value;
    const accessToken = sessionStorage.getItem("accessToken");
    const apiKey = sessionStorage.getItem("apiKey");

    if (!accessToken || !apiKey) {
      console.error("Missing credentials: Please log in.");
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
