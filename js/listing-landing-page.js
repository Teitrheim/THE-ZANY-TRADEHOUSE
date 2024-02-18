import { API_BASE_URL } from "./api-urls.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchAuctionItems();
  setInterval(fetchAuctionItems, 10000); // Auto-refresh every 10 seconds
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
              item.media.length > 0
                ? item.media[0].url
                : "placeholder-image-url"
            }" class="card-img-top" alt="${
      item.media.length > 0 ? item.media[0].alt : "Placeholder"
    }" style="height: 200px; object-fit: cover;">
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
