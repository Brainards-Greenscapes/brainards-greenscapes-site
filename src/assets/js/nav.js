// Mobile navigation toggle
const nav = document.getElementById("cs-navigation");
const toggle = nav ? nav.querySelector(".cs-toggle") : null;
const body = document.body;

if (toggle) {
  toggle.addEventListener("click", function () {
    nav.classList.toggle("cs-active");
    body.classList.toggle("cs-open");
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
  });
}

// Dropdown toggle for mobile
const dropdowns = document.querySelectorAll(".cs-dropdown");
dropdowns.forEach(function (dropdown) {
  const toggleBtn = dropdown.querySelector(".cs-dropdown-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      dropdown.classList.toggle("cs-active");
    });
  }
});
