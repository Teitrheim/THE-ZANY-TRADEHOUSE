document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createListingForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("listingTitle").value;
    const description = document.getElementById("listingDescription").value;
    const endsAt = document.getElementById("listingEndsAt").value;
    const mediaUrl = document.getElementById("listingMediaUrl").value;
    const mediaAlt = document.getElementById("listingMediaAlt").value;

    const listingData = {
      title,
      description,
      endsAt,
      media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
    };

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const apiKey = sessionStorage.getItem("apiKey");
      if (!accessToken || !apiKey) {
        alert("You must be logged in to create a listing.");
        return;
      }

      const response = await fetch(
        "https://v2.api.noroff.dev/auction/listings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
          body: JSON.stringify(listingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      await response.json();

      alert("Listing created successfully!");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Error creating listing. Please try again.");
    }
  });
});
