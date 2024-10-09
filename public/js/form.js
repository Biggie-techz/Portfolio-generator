const techSkillInput = document.getElementById("techSkill");
let skillArr = [];
let fullName;

const programmingTechnologies = [
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
  "Scala",
  "R",
  "Objective-C",
  "Perl",
  "Lua",
  "Haskell",
  "MATLAB",
  "Elixir",
  "Shell",
  "VBScript",

  // Web Technologies
  "HTML",
  "CSS",
  "XML",
  "Sass",
  "LESS",

  // Frontend Frameworks/Libraries
  "React",
  "Angular",
  "Vue.js",
  "Svelte",
  "jQuery",
  "Backbone.js",
  "Ember.js",
  "Bootstrap",
  "Material-UI",

  // Backend Frameworks
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "Ruby on Rails",
  "ASP.NET",
  "Koa",
  "FastAPI",
  "Phoenix",
  "Sinatra",
  "Gin",

  // Mobile Development
  "React Native",
  "Flutter",
  "Ionic",
  "SwiftUI",
  "Xamarin",
  "Android SDK",

  // Databases
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "SQLite",
  "Redis",
  "Cassandra",
  "Firebase",
  "OracleDB",
  "MariaDB",
  "DynamoDB",
  "CouchDB",
  "Neo4j",

  // DevOps/Cloud Tools
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Git",
  "GitLab",
  "GitHub",
  "CircleCI",
  "Travis CI",
  "AWS",
  "Azure",
  "Google Cloud",
  "Heroku",
  "Netlify",
  "Vercel",
  "Terraform",
  "Ansible",
  "Chef",
  "Puppet",

  // Version Control & Collaboration Tools
  "Git",
  "GitHub",
  "Bitbucket",
  "GitLab",
  "Subversion",
  "Mercurial",

  // Testing Tools
  "Jest",
  "Mocha",
  "Chai",
  "Selenium",
  "Cypress",
  "Jasmine",
  "Puppeteer",
  "JUnit",
  "RSpec",
  "PyTest",
  "Postman",
  "SoapUI",

  // Package Managers
  "npm",
  "yarn",
  "pip",
  "Composer",
  "Bundler",
  "Maven",
  "Gradle",

  // Build Tools
  "Webpack",
  "Gulp",
  "Grunt",
  "Parcel",
  "Rollup",
  "Babel",

  // Machine Learning/Data Science
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Keras",
  "Theano",
  "OpenCV",
  "NLTK",
  "Seaborn",

  // Other Tools
  "VSCode",
  "Eclipse",
  "IntelliJ IDEA",
  "Sublime Text",
  "Vim",
  "Emacs",
  "Notepad++",
  "JIRA",
  "Trello",
];

const suggestionsBox = document.getElementById("suggestions");

// Event listener for typing in the input
techSkillInput.addEventListener("input", function () {
  const input = techSkillInput.value.toLowerCase();
  suggestionsBox.innerHTML = ""; // Clear previous suggestions

  if (input.trim() === "") {
    return; // If input is empty, do nothing
  }

  // Filter technologies array based on the input
  const filteredTechs = programmingTechnologies.filter((tech) =>
    tech.toLowerCase().includes(input)
  );

  // Display the filtered technologies
  filteredTechs.forEach((tech) => {
    const div = document.createElement("div");
    div.textContent = tech;
    div.addEventListener("click", () => {
      techSkillInput.value = tech;
      suggestionsBox.innerHTML = ""; // Clear suggestions
    });
    suggestionsBox.appendChild(div);
  });

  if (filteredTechs.length === 0) {
    const noResultsDiv = document.createElement("div");
    noResultsDiv.textContent = "No matches found";
    suggestionsBox.appendChild(noResultsDiv);
  }
});

document.addEventListener("click", function (e) {
  if (
    !techSkillInput.contains(e.target) &&
    !suggestionsBox.contains(e.target)
  ) {
    suggestionsBox.innerHTML = ""; // Close suggestions when clicking outside
  }
});

function addSkill(e) {
  if (techSkillInput.value.trim() == "") return;
  e.preventDefault();
  skillArr.push(techSkillInput.value);
  console.log(skillArr);

  let skillsAdded = document.querySelector(".skillsAdded");
  skillsAdded.innerHTML = "";
  skillArr.forEach((skill) => {
    skillsAdded.innerHTML += `<div>${skill}</div>`;
    techSkillInput.value = "";
  });
}

async function fetchGitHubUser(username) {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    console.log(userData); // Logs user data

    fullName = userData.name;
    let skill = skillArr.join(", ");

    let description = document.getElementById("description");
    let previousDescription = description.value;

    description.value = `Hi, I'm ${userData.name}, a passionate [Your Role] with a deep interest in [Your Main Field/Expertise]. Currently, I'm pursuing a degree in [Your Degree] at [Your University]. With hands-on experience in ${skill}, I enjoy building solutions that solve real-world problems and improve the developer experience. I specialize in [Main Technologies or Languages You Work With] and have built projects ranging from [Type of Projects You’ve Worked On]. I’m passionate about [Something You Enjoy in Development: e.g., problem-solving, creating responsive web applications], and I’m always looking for new challenges to further hone my skills.
    When I'm not coding, you can find me [Your Hobbies or Interests]. I believe in continuous learning and am always exploring new technologies, whether it’s [Emerging Technology or Tool You Are Interested In] or honing my skills in [Specific Technology].
    Feel free to explore my work and get in touch if you'd like to collaborate or learn more about what I do!`;

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

function generateDescriptionTemplate() {
  let gitHubUsername = document.getElementById("gitHubUsername").value;
  if (gitHubUsername.trim() == "") {
    alert("Please enter GitHub Username");
    return;
  }
  fetchGitHubUser(gitHubUsername);
}

function submitForm() {
  let gitHubUsername = document.getElementById("gitHubUsername").value;
  let description = document.getElementById("description").value;
  if (
    gitHubUsername.trim() == "" ||
    description.trim() == "" ||
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
  };

  localStorage.setItem("formData", JSON.stringify(formData));
  window.location.href = "dashboard.html";
}
