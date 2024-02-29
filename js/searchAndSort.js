document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  // Initial fetch of auction items
  fetchAuctionItems();

  // Event listener for search input
  searchInput.addEventListener("input", () => {
    fetchAuctionItems(searchInput.value, sortSelect.value);
  });

  // Event listener for sort select
  sortSelect.addEventListener("change", () => {
    fetchAuctionItems(searchInput.value, sortSelect.value);
  });
});

function fetchAuctionItems(searchTerm = "", sortBy = "latest") {
  let url = `https://v2.api.noroff.dev/auction/listings`;

  // Add query parameters for search and sort
  const params = new URLSearchParams();
  if (searchTerm) params.append("q", searchTerm);
  if (sortBy === "popular") params.append("_sort", "popularity");

  // Fetch data from the API
  fetch(`${url}?${params.toString()}`)
    .then((response) => response.json())
    .then((data) => displayAuctionItems(data.data))
    .catch((error) => console.error("Error fetching auction items:", error));
}

function displayAuctionItems(items) {
  const container = document.getElementById("auction-items-container");
  container.innerHTML = ""; // Clear existing items

  items.forEach((item) => {
    // Create and append item elements to the container
    const itemElement = document.createElement("div");
    itemElement.className = "col-md-4 mb-4";
    itemElement.innerHTML = `
            <div class="card">
                <img src="${
                  item.media[0]?.url || "default-image.jpg"
                }" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
        `;
    container.appendChild(itemElement);
  });
}
