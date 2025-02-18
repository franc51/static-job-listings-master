let jobListings = [];

let filter_frontend = document.getElementById("filter_frontend");
let filter_css = document.getElementById("filter_css");
let filter_js = document.getElementById("filter_js");
let clear_filters = document.getElementById("clear_filters");

document.addEventListener("DOMContentLoaded", async () => {
  const jobContainer = document.getElementById("job-listings");
  const loadingIndicator = document.getElementById("loading");

  try {
    loadingIndicator.style.display = "block";
    jobContainer.style.display = "none";

    const response = await fetch("files/data.json"); // Fetch external JSON file
    jobListings = await response.json(); // Store globally

    displayJobs(jobListings); // Display all jobs initially
  } catch (error) {
    console.error("Error loading jobs:", error);
    jobContainer.innerHTML = `<p class="error-message">Error loading jobs. Please try again later.</p>`;
  } finally {
    loadingIndicator.style.display = "none";
    jobContainer.style.display = "block";
  }
});

function displayJobs(jobs) {
  const jobContainer = document.getElementById("job-listings");

  const jobCards = document.querySelectorAll(".job-card");
  jobCards.forEach((card) => card.classList.add("hide"));

  setTimeout(() => {
    jobContainer.innerHTML = ""; // Clear previous content

    if (jobs.length === 0) {
      jobContainer.innerHTML = `<p class="no-results">No jobs found.</p>`;
      return;
    }

    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card", "hide");

      jobCard.innerHTML = `
        <img src="${job.logo}" alt="${job.company}">
        <div class="job-details">
            <div class="job-title-new">
            <p class="job-company">${job.company}</p>
            ${job.new ? `<p class="new">NEW!</p>` : ""}
            ${job.featured ? `<p class="featured">FEATURED</p>` : ""}
            </div>
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
    setTimeout(() => {
      document
        .querySelectorAll(".job-card")
        .forEach((card) => card.classList.remove("hide"));
    }, 50);
  }, 100);
}

function filterJobs(languages = null, role = null) {
  const filteredJobs = jobListings.filter((job) => {
    const matchesLanguage = languages
      ? job.languages.includes(languages)
      : true;
    const matchesRole = role ? job.role.includes(role) : true;
    return matchesLanguage && matchesRole;
  });

  displayJobs(filteredJobs);
}
filter_frontend.addEventListener("click", () => filterJobs(null, "Frontend"));
filter_css.addEventListener("click", () => filterJobs("CSS", null));
filter_js.addEventListener("click", () => filterJobs("JavaScript", null));

// Clear filters (Show all jobs)
clear_filters.addEventListener("click", () => displayJobs(jobListings));
