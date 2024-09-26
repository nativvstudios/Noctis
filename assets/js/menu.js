document.addEventListener("DOMContentLoaded", function () {
  const rightMenuToggle = document.querySelector(".menu-toggle.right");
  const rightSidebar = document.querySelector(".right-sidebar");
  const main = document.querySelector("main");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const darkModeIcon = document.querySelector(".dark-mode-toggle i");
  const darkModeText = document.createElement("span");

  // Insert the text span before the icon
  darkModeToggle.appendChild(darkModeText);

  // Function to update dark mode toggle text and icon
  function updateDarkModeToggle() {
    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.className = "bx bx-sun";

      darkModeText.textContent = " Light Mode";
    } else {
      darkModeIcon.className = "bx bx-moon";

      darkModeText.textContent = " Dark Mode";
    }
  }

  // Toggle right sidebar
  rightMenuToggle.addEventListener("click", function () {
    rightSidebar.classList.toggle("active");
  });

  // Close right sidebar when clicking outside
  main.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      rightSidebar.classList.remove("active");
    }
  });

  // Dark mode toggle functionality
  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode"),
    );
    updateDarkModeToggle();
  });

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Initial update of dark mode toggle text and icon
  updateDarkModeToggle();

  // Adjust layout on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      if (rightSidebar == null) {
        //do nothing
      } else {
        rightSidebar.classList.remove("active");
      }
    }
  });
});
