document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://v2.api.noroff.dev/auction/listings";

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      const items = responseData.data; // Assuming the array is nested under responseData.data
      const container = document.getElementById("auction-items-container");
      items.slice(0, 15).forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "col-md-4 mb-4";
        itemDiv.innerHTML = `
            <div class="card h-100">
              <img src="${
                item.media.length > 0
                  ? item.media[0].url
                  : "placeholder-image-url"
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
        container.appendChild(itemDiv);
      });
    })

    .catch((error) => console.error("Error fetching auction items:", error));
});
