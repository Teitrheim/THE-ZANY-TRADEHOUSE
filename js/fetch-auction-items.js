/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  fetchAuctionItems();
  attachSwitchModalEventListener();
});

function fetchAuctionItems() {
  fetch(`https://v2.api.noroff.dev/auction/listings`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayAuctionItems(data.data.slice(0, 25)); // Display the first 25 items
    })
    .catch((error) => console.error("Error fetching auction items:", error));
}

function displayAuctionItems(items) {
  const container = document.getElementById("auction-items-container");
  container.innerHTML = ""; // Clear existing items

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "col-md-4 mb-4";
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
          <button type="button" class="btn btn-primary mt-auto bid-now-btn" data-bs-toggle="modal" data-bs-target="#registerModal">Bid Now</button>
        </div>
      </div>
    `;
    container.appendChild(itemElement);
  });

  attachBidNowEventListeners();
}

function attachBidNowEventListeners() {
  document
    .getElementById("auction-items-container")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("bid-now-btn")) {
        event.preventDefault(); // Prevent the default action
        // Open the register modal
        var registerModal = new bootstrap.Modal(
          document.getElementById("registerModal"),
          {}
        );
        registerModal.show();
      }
    });
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
