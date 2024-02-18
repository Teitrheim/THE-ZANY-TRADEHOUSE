import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchAuctionItems();
  setInterval(fetchAuctionItems, 10000); // Auto-refresh every 10 seconds
});

function fetchAuctionItems() {
  fetch(`${API_BASE_URL}/auction/listings`) // Corrected API endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Assuming the API returns an array directly. Adjust accordingly.
      const randomItems = getRandomItems(data.data, 4);
      displayAuctionItems(randomItems);
    })
    .catch((error) => console.error("Error fetching auction items:", error));
}

function displayAuctionItems(items) {
  const itemsGrid = document.getElementById("items-grid");
  itemsGrid.innerHTML = ""; // Clear existing items

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "col-md-3 mb-4"; // Bootstrap grid class for 4 items per row
    itemElement.innerHTML = `
        <div class="card h-100">
          <img src="${
            item.media.length > 0 ? item.media[0].url : "placeholder-image-url"
          }" class="card-img-top" alt="${
      item.media.length > 0 ? item.media[0].alt : "Placeholder"
    }">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <a href="#" class="btn btn-primary">Bid Now</a>
          </div>
        </div>
      `;
    itemsGrid.appendChild(itemElement);
  });
}

function getRandomItems(items, num) {
  // Shuffle array
  const shuffled = items.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, num);
}
