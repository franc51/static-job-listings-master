let jobListings = []; // Store fetched job data globally

let filter_frontend = document.getElementById("filter_frontend");
let filter_css = document.getElementById("filter_css");
let filter_js = document.getElementById("filter_js");

document.addEventListener("DOMContentLoaded", async () => {
  const jobContainer = document.getElementById("job-listings");
  const loadingIndicator = document.getElementById("loading");

  try {
    // Show loading text and hide job listings
    loadingIndicator.style.display = "block";
    jobContainer.style.display = "none";

    const response = await fetch("files/data.json"); // Fetch external JSON file
    jobListings = await response.json(); // Store globally

    displayJobs(jobListings); // Display all jobs initially
  } catch (error) {
    console.error("Error loading jobs:", error);
    jobContainer.innerHTML = `<p class="error-message">Error loading jobs. Please try again later.</p>`;
  } finally {
    // Hide loading text and show job listings
    loadingIndicator.style.display = "none";
    jobContainer.style.display = "block";
  }
});

// Function to display jobs
function displayJobs(jobs) {
  const jobContainer = document.getElementById("job-listings");
  jobContainer.innerHTML = ""; // Clear previous content

  if (jobs.length === 0) {
    jobContainer.innerHTML = `<p class="no-results">No jobs found.</p>`;
    return;
  }

  jobs.forEach((job) => {
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
}

function filterJobs(languages) {
  const filteredJobs = jobListings.filter((job) =>
    job.languages.includes(languages)
  );
  displayJobs(filteredJobs);
}

filter_frontend.addEventListener("click", () => filterJobs("Frontend"));
filter_css.addEventListener("click", () => filterJobs("CSS"));
filter_js.addEventListener("click", () => filterJobs("JavaScript"));
