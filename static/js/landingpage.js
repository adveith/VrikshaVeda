// Import Google Fonts
import googleFonts from "https://esm.sh/google-fonts";

// Function to toggle visibility of the scroll-to-top button
const toggleScrollTopButton = () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll-to-top functionality
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Wait for the page to load, hide preloader
const hidePreloaderOnLoad = () => {
  document.getElementById("preloader").style.display = "none";
};

// Event listeners
window.addEventListener("scroll", toggleScrollTopButton);
window.addEventListener("load", hidePreloaderOnLoad);
document.getElementById("scrollTopBtn").addEventListener("click", scrollToTop);
