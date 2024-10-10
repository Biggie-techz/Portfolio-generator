import CONFIG from "./config.js";

const token = CONFIG.GITHUB_TOKEN;
const apiUrl = CONFIG.API_URL;
const apiKey = CONFIG.API_KEY;

const techSkillInput = document.getElementById("techSkill");
const suggestionsBox = document.getElementById("suggestions");
const professionInput = document.getElementById("profession");
const professionSuggestionsBox = document.getElementById(
  "professionSuggestions"
);
let skillArr = [];
let fullName;
let description;

const allTechTechnologies = [
  // Programming Languages
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Go",
  "Kotlin",
  "TypeScript",
  "Rust",
  "Dart",
  "R",
  "Objective-C",
  "Scala",
  "Shell Script",
  "Perl",
  "Haskell",
  "MATLAB",
  "Elixir",
  "Lua",

  // Web Technologies
  "HTML",
  "CSS",
  "XML",
  "Sass",
  "LESS",
  "JSON",
  "Bootstrap",
  "Tailwind CSS",
  "Materialize",

  // Frontend Frameworks/Libraries
  "React",
  "Angular",
  "Vue.js",
  "Svelte",
  "jQuery",
  "Backbone.js",
  "Ember.js",
  "Preact",

  // Backend Frameworks
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Spring Boot",
  "Laravel",
  "ASP.NET",
  "Koa",
  "FastAPI",

  // Mobile Development
  "React Native",
  "Flutter",
  "Ionic",
  "Xamarin",
  "SwiftUI",

  // Databases
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "SQLite",
  "Redis",
  "OracleDB",
  "Cassandra",
  "Firebase",
  "MariaDB",

  // Cloud Platforms
  "AWS",
  "Google Cloud Platform",
  "Microsoft Azure",
  "Heroku",
  "DigitalOcean",
  "IBM Cloud",
  "Oracle Cloud",

  // DevOps Tools
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Git",
  "GitLab",
  "CircleCI",
  "Travis CI",
  "Terraform",
  "Ansible",
  "Puppet",
  "Chef",

  // Cybersecurity Tools
  "Wireshark",
  "Nmap",
  "Metasploit",
  "Burp Suite",
  "Snort",
  "Splunk",

  // Data Science & Machine Learning
  "Pandas",
  "NumPy",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Keras",
  "Matplotlib",
  "Seaborn",
  "OpenCV",
  "NLTK",

  // UI/UX Design Tools
  "Figma",
  "Adobe XD",
  "Sketch",
  "InVision",
  "Photoshop",
  "Illustrator",
  "CorelDRAW",

  // Testing Frameworks
  "Jest",
  "Mocha",
  "Cypress",
  "Selenium",
  "JUnit",
  "RSpec",
  "Postman",
  "SoapUI",

  // Content Management Systems (CMS)
  "WordPress",
  "Drupal",
  "Joomla",
  "Shopify",

  // Version Control
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",

  // Communication & Collaboration Tools
  "Slack",
  "Microsoft Teams",
  "Trello",
  "JIRA",
  "Asana",
  "Notion",
  "Zoom",

  // Other Tools
  "Visual Studio Code",
  "Eclipse",
  "IntelliJ IDEA",
  "Sublime Text",
  "Vim",
  "Emacs",
  "Notepad++",
];

let selectedSkills = []; // To store selected skills

techSkillInput.addEventListener("input", function () {
  const input = techSkillInput.value.toLowerCase();
  suggestionsBox.innerHTML = ""; // Clear previous suggestions
  suggestionsBox.style.display = "block";

  if (input.trim() === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  // Filter technologies array based on the input, excluding already selected skills
  const filteredTechs = allTechTechnologies
    .filter((tech) => tech.toLowerCase().includes(input))
    .filter((tech) => !selectedSkills.includes(tech)); // Prevent duplicates

  // Display the filtered technologies
  filteredTechs.forEach((tech) => {
    const div = document.createElement("div");
    div.textContent = tech;
    div.addEventListener("click", () => {
      // Check if the skill is already selected
      if (!selectedSkills.includes(tech)) {
        selectedSkills.push(tech); // Add skill to selected list
        techSkillInput.value = tech; // Set input value to the selected skill
        suggestionsBox.innerHTML = ""; // Clear suggestions
        suggestionsBox.style.display = "none"; // Hide suggestions
      }
    });
    suggestionsBox.appendChild(div);
  });

  // If no results are found
  if (filteredTechs.length === 0) {
    const noResultsDiv = document.createElement("div");
    noResultsDiv.textContent = "No matches found";
    suggestionsBox.appendChild(noResultsDiv);
  }
});

// Close suggestions when clicking outside the input box
document.addEventListener("click", function (e) {
  if (
    !techSkillInput.contains(e.target) &&
    !suggestionsBox.contains(e.target)
  ) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
  }
});

const techProfessions = [
  // Software Development
  "Software Engineer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Quality Assurance Engineer",
  "Game Developer",
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "AI Engineer",
  "Systems Architect",

  // Web Technologies
  "UI/UX Designer",
  "Graphic Designer",
  "Product Designer",
  "Interaction Designer",
  "Web Designer",
  "SEO Specialist",
  "Content Strategist",

  // Database and Data Management
  "Database Administrator",
  "Data Engineer",
  "Data Warehouse Architect",
  "Big Data Engineer",

  // Cloud Computing
  "Cloud Engineer",
  "Cloud Architect",
  "Cloud Consultant",
  "Cloud Security Specialist",

  // Cybersecurity
  "Security Analyst",
  "Cybersecurity Engineer",
  "Penetration Tester",
  "Information Security Manager",
  "Network Security Engineer",
  "Incident Response Specialist",

  // IT Support and Network
  "IT Support Specialist",
  "System Administrator",
  "Network Administrator",
  "Network Engineer",
  "Help Desk Technician",
  "Technical Support Specialist",

  // Project and Product Management
  "Project Manager",
  "Scrum Master",
  "Product Manager",
  "Agile Coach",

  // Emerging Technologies
  "Blockchain Developer",
  "IoT Developer",
  "AR/VR Developer",
  "Robotics Engineer",
  "Bioinformatics Specialist",

  // Business and Strategy
  "Tech Consultant",
  "Business Analyst",
  "Solutions Architect",
  "IT Project Coordinator",

  // Marketing and Sales
  "Digital Marketing Specialist",
  "Growth Hacker",
  "Sales Engineer",
  "Tech Sales Representative",

  // Education and Training
  "Technical Trainer",
  "Curriculum Developer",
  "eLearning Specialist",

  // Other Roles
  "Technical Writer",
  "DevRel (Developer Relations)",
  "Systems Analyst",
  "Ethical Hacker",
];

professionInput.addEventListener("input", function () {
  const input = professionInput.value.toLowerCase();
  professionSuggestionsBox.innerHTML = ""; // Clear previous suggestions
  professionSuggestionsBox.style.display = "block";
  if (input.trim() === "") {
    professionSuggestionsBox.style.display = "none";
    return;
  }

  const filteredProfession = techProfessions.filter((prof) =>
    prof.toLowerCase().includes(input)
  );

  filteredProfession.forEach((prof) => {
    const div = document.createElement("div");
    div.textContent = prof;
    div.addEventListener("click", () => {
      professionSuggestionsBox.style.display = "none";
      professionInput.value = prof;
      professionSuggestionsBox.innerHTML = "";
    });
    professionSuggestionsBox.appendChild(div);
  });

  if (filteredProfession.length === 0) {
    const noResultsDiv = document.createElement("div");
    noResultsDiv.textContent = "No matches found";
    professionSuggestionsBox.appendChild(noResultsDiv);
  }
});

document.getElementById("addTech").addEventListener("click", addTechnology);

// Function to add the selected technology
function addTechnology(e) {
  e.preventDefault();

  const selectedTech = techSkillInput.value.trim();

  // Check if the input value is in the predefined list of technologies
  if (selectedTech === "" || !allTechTechnologies.includes(selectedTech)) {
    alert("Please select a valid technology from the suggestions.");
    return; // Exit if the value is not in the list
  }

  // Check if the skill is already selected
  if (skillArr.includes(selectedTech)) {
    alert(`"${selectedTech}" has already been selected.`);
    return; // Prevent adding the skill again
  }

  // Add the valid technology to the skill array
  skillArr.push(selectedTech);

  // Display the updated skills list
  displaySkills();

  // Clear the input field
  techSkillInput.value = "";
}

// Function to display the skills and set up the click listener for deselection
function displaySkills() {
  let skillsAdded = document.querySelector(".skillsAdded");
  skillsAdded.innerHTML = ""; // Clear the previous list

  // Display each skill in the DOM and add a click listener to deselect it
  skillArr.forEach((skill) => {
    const skillDiv = document.createElement("div");
    skillDiv.textContent = skill;
    skillDiv.classList.add("skill-item");
    skillsAdded.appendChild(skillDiv);

    // Add click event listener to deselect the skill when clicked
    skillDiv.addEventListener("click", () => deselectSkill(skill));
  });
}

// Function to remove a skill when clicked in the DOM
function deselectSkill(skill) {
  // Remove the skill from the array
  skillArr = skillArr.filter((selectedSkill) => selectedSkill !== skill);
  // remove he skill from the selectedSkills array
  selectedSkills = selectedSkills.filter(
    (selectedSkill) => selectedSkill !== skill
  );
  // Update the displayed list of skills
  displaySkills();
}

async function fetchGitHubUser(username) {
  const url = `${apiUrl}/users/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();

    if (!userData.name) {
      alert("User not found: Ensure the GitHub username is correct.");
      return;
    }

    fullName = userData.name;
    let skill = skillArr.join(", ");

    let description = document.getElementById("description");
    let previousDescription = description.value;

    description.value = `I am a skilled ${professionInput.value} with a passion for crafting innovative and user-friendly digital experiences. With a strong foundation in ${skill}, I excel in [What you do e.g. building responsive and visually appealing websites]. I have experience working with popular frameworks like [React, Angular, Vue.js] and am proficient in [server-side languages like Python, PHP, or Node.js]. My ability to optimize code for performance, integrate with APIs and manage databases allow me to deliver high-quality solutions that meet client needs and exceed expectations.`;

    let revert = document.createElement("button");
    revert.innerHTML = "Revert";
    revert.classList.add("revert");
    revert.onclick = () => {
      description.value = previousDescription;
      revert.remove();
    };
    document.querySelector(".btn").appendChild(revert);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

document
  .getElementById("generateDescription")
  .addEventListener("click", function () {
    let gitHubUsername = document.getElementById("gitHubUsername");
    if (gitHubUsername.value.trim() === "") {
      gitHubUsername.style.borderColor = "red";
      gitHubUsername.focus();
      return;
    }
    if (professionInput.value.trim() === "") {
      professionInput.style.borderColor = "red";
      professionInput.focus();
      return;
    }
    if (skillArr.length === 0) {
      techSkillInput.style.borderColor = "red";
      techSkillInput.focus();
      return;
    }
    fetchGitHubUser(gitHubUsername.value);
  });

  document.getElementById("gitHubUsername").addEventListener("input", function () {
    document.getElementById("gitHubUsername").style.borderColor = "var(--clr-clear)";
  });

  professionInput.addEventListener("input", function () {
    professionInput.style.borderColor = "var(--clr-clear)";
  });

  techSkillInput.addEventListener("input", function () {
    techSkillInput.style.borderColor = "var(--clr-clear)";
  });

document.getElementById("submitButton").addEventListener("click", submitForm);
function submitForm() {
  let gitHubUsername = document.getElementById("gitHubUsername").value;
  let description = document.getElementById("description").value;

  if (
    gitHubUsername.trim() === "" ||
    description.trim() === "" ||
    skillArr.length === 0
  ) {
    alert("Please fill all the mandatory fields");
    return;
  }

  let formData = {
    gitHubUsername: gitHubUsername,
    description: description,
    usersSkill: skillArr,
    fullName: fullName,
    instagram: document.getElementById("instagram").value,
    linkedin: document.getElementById("linkedin").value,
    twitter: document.getElementById("twitter").value,
    profession: document.getElementById("profession").value,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
  window.location.href = "dashboard.html";
}
