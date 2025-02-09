document.addEventListener("DOMContentLoaded", async () => {
  const jobContainer = document.getElementById("job-listings");
  const loadingIndicator = document.getElementById("loading");

  try {
    // Show loading text
    loadingIndicator.style.display = "block";
    jobContainer.style.display = "none";

    const response = await fetch("files/data.json"); // Fetch external JSON file
    const jobListings = await response.json(); // Convert response to JSON

    jobContainer.innerHTML = ""; // Clear previous content (if any)

    jobListings.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");

      jobCard.innerHTML = `
                <img src="${job.logo}" alt="${job.company}">
                <div class="job-details">
                    <p class="job-company">${job.company}</p>
                    <h2>${job.position}</h2>

                    <div class="job-time">
                        <p class="job-postedAt">${job.postedAt}</p>
                        <ul>
                            <li>${job.contract}</li>
                            <li>${job.location}</li>
                        </ul>
                    </div>
                </div>
                <div class="tags">
                    ${[job.role, job.level, ...job.languages, ...job.tools]
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join("")}
                </div>
            `;

      jobContainer.appendChild(jobCard);
    });
  } catch (error) {
    console.error("Error loading jobs:", error);
    jobContainer.innerHTML =
      "<p>Error loading jobs. Please try again later.</p>";
  } finally {
    // Hide loading text and show job listings
    loadingIndicator.style.display = "none";
    jobContainer.style.display = "block";
  }
});
