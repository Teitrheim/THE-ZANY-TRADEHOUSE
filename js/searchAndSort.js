document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  // Fetch and display all auction items
  fetchAllAuctionItems().then(displayAuctionItems);

  // Event listener for search input
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value;
    const sortBy = sortSelect.value;
    fetchAllAuctionItems().then((items) => {
      const filteredAndSortedItems = filterAndSortItems(
        items,
        searchTerm,
        sortBy
      );
      displayAuctionItems(filteredAndSortedItems);
    });
  });

  // Event listener for sort select
  sortSelect.addEventListener("change", () => {
    const searchTerm = searchInput.value;
    const sortBy = sortSelect.value;
    fetchAllAuctionItems().then((items) => {
      const filteredAndSortedItems = filterAndSortItems(
        items,
        searchTerm,
        sortBy
      );
      displayAuctionItems(filteredAndSortedItems);
    });
  });
});

async function fetchAllAuctionItems() {
  let url = `https://v2.api.noroff.dev/auction/listings`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching auction items:", error);
    return []; // Return an empty array in case of error
  }
}

function filterAndSortItems(items, searchTerm = "", sortBy = "latest") {
  // Filter items based on partial match of the searchTerm
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort items based on the sortBy criteria
  if (sortBy === "popular") {
    filteredItems.sort((a, b) => b.popularity - a.popularity);
  } else {
    filteredItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  return filteredItems;
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
            item.media[0] ? item.media[0].url : "default-image.jpg"
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
