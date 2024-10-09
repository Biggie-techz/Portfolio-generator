let formData = JSON.parse(localStorage.getItem("formData"));
console.log(formData);
let repos = [];
let user;

async function getRepos() {
  let url = `https://api.github.com/users/${formData.gitHubUsername}/repos`;
  let response = await fetch(url);
  repos = await response.json();
  console.log(repos);
  displayRepos(); // Call displayRepos after repos data is fetched
}

async function getUser() {
  let url = `https://api.github.com/users/${formData.gitHubUsername}`;
  let response = await fetch(url);
  user = await response.json();
  console.log(user);
  displayDashboard();
  await getRepos(); // Ensure getRepos completes before moving on
}

function displayDashboard() {
  let avatar = document.getElementById("avatar");
  let username = document.getElementById("username");
  let githubBio = document.getElementById("githubBio");
  let following = document.getElementById("following");
  let followers = document.getElementById("followers");
  let publicRepos = document.getElementById("publicRepos");

  avatar.src = user.avatar_url;
  username.innerHTML = user.name || formData.gitHubUsername;
  githubBio.innerHTML = user.bio || "No bio available.";
  following.innerHTML = user.following;
  followers.innerHTML = user.followers;
  publicRepos.innerHTML = user.public_repos;
}

function displayRepos() {
  let reposContainer = document.getElementById("reposContainer");
  reposContainer.innerHTML = ""; // Clear previous content

  repos.forEach((repo) => {
    let repoDiv = document.createElement("div");
    repoDiv.classList.add("repo");
    repoDiv.innerHTML = `
    <div href="${repo.html_url}" target="_blank">
        <a href="${repo.html_url}" target="_blank"  class="link">${repo.name}</a>
        <p>${repo.description ? repo.description : "No description"}</p>
    </div>
    `;
    reposContainer.appendChild(repoDiv);
  });

  // If no repositories found
  if (repos.length === 0) {
    reposContainer.innerHTML = "<p>No repositories found</p>";
  }
}

// Initialize
getUser();
