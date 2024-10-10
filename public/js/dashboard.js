import CONFIG from "./config.js";

const { GITHUB_TOKEN: token, API_URL: apiUrl } = CONFIG; // Destructuring CONFIG

// Retrieve form data from local storage
let formData = JSON.parse(localStorage.getItem("formData"));
if (!formData) {
  window.location.href = "form.html";
}
console.log(formData);

let repos = [];
let user;

// Fetch the user's repositories from GitHub API
async function getRepos() {
  try {
    const url = `${apiUrl}/users/${formData.gitHubUsername}/repos`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching repositories: ${response.status}`);
    }

    repos = await response.json();
    console.log(repos);
    displayRepos();
  } catch (error) {
    console.error(error);
    alert("There was a problem retrieving the repositories.");
  }
}

// Fetch user details from GitHub API
async function getUser() {
  try {
    const url = `${apiUrl}/users/${formData.gitHubUsername}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.status}`);
    }

    user = await response.json();

    if (user.message === "Not Found") {
      throw new Error("User not found");
    }

    console.log(user);
    displayDashboard();
    await getRepos(); // Fetch repositories after user data
  } catch (error) {
    console.error(error);
    // alert("There was a problem retrieving the user data.");
  }
}

// Display the user information on the dashboard
function displayDashboard() {
  const avatar = document.getElementById("avatar");
  const username = document.getElementById("username");
  const githubBio = document.getElementById("githubBio");
  const following = document.getElementById("following");
  const followers = document.getElementById("followers");
  const publicRepos = document.getElementById("publicRepos");

  avatar.src = user.avatar_url || "../public/assets/images/profile_default.png"; // Fallback avatar
  username.innerHTML = user.name || formData.gitHubUsername; // Fallback to username
  githubBio.innerHTML = user.bio || "No bio available.";
  following.innerHTML = user.following;
  followers.innerHTML = user.followers;
  publicRepos.innerHTML = user.public_repos;
}

// Display the user's repositories
let selectedRepos = []; // Array to store selected repository URLs

// Display the user's repositories
function displayRepos() {
  const reposContainer = document.getElementById("reposContainer");
  reposContainer.innerHTML = ""; // Clear any existing repositories

  repos.forEach((repo) => {
    const repoDiv = document.createElement("div");
    repoDiv.classList.add("repo");
    repoDiv.innerHTML = `
      <div class="repo-details">
        <a href="${repo.html_url}" target="_blank" class="link">${repo.name}</a>
        <p>${
          repo.description ? repo.description : "No description available"
        }</p>
      </div>
    `;

    // Add click event listener to select/deselect repositories
    repoDiv.addEventListener("click", () =>
      toggleRepoSelection(repo.html_url, repoDiv)
    );
    reposContainer.appendChild(repoDiv);
  });

  // If no repositories are found, display a message
  if (repos.length === 0) {
    reposContainer.innerHTML = "<p>No repositories found</p>";
  }
}

// Toggle repository selection
function toggleRepoSelection(repoUrl, repoDiv) {
  const isSelected = selectedRepos.includes(repoUrl);

  if (isSelected) {
    // Deselect the repository by removing it from the array
    selectedRepos = selectedRepos.filter((url) => url !== repoUrl);
    repoDiv.classList.remove("selected"); // Remove visual indication of selection
  } else {
    // Select the repository by adding its URL to the array
    selectedRepos.push(repoUrl);
    repoDiv.classList.add("selected"); // Add visual indication of selection
  }

  console.log("Selected Repositories:", selectedRepos);
}

// Add scroll behavior for navigation
const wrapper = document.querySelector(".wrapper");
const navigateScroll = document.querySelector(".navigate-scroll");

wrapper.addEventListener("scroll", () => {
  const scrollPosition = wrapper.scrollTop;
  if (scrollPosition > 250) {
    navigateScroll.classList.add("scrolled");
  } else {
    navigateScroll.classList.remove("scrolled");
  }
});

// Check GitHub API rate limit
function checkRateLimit() {
  fetch(`${apiUrl}/rate_limit`, {
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Rate limit data:", data))
    .catch((error) => console.error("Error fetching rate limit:", error));
}

// Initialize the dashboard by fetching user data and repositories
getUser();

// Check rate limit on page load
checkRateLimit();
