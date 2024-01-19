// Game variables
let cookies = 0; // Total cookies count
let cps = 0; // Total cookies produced per second
let itemsCPS = 0; // Cookies produced per second by items
let clicksPerSecond = 0; // Clicks per second
let clickPower = 1; // Cookies produced per click

// Document elements
let cookieCounter = document.getElementById("cookie-counter");
let cookieCPS = document.getElementById("cookie-cps");
let cookieButton = document.getElementById("cookie-button");

// Button listeners
cookieButton.addEventListener("click", cookieClicked);
resetButton.addEventListener("click", reset);

// Run every second and update cookies
setInterval(function () {
  updateCookieCPS();
  updateCookieCounter();
  updateLocalStorage();
}, 1000);

// Increase cookies on cookie clicked
function cookieClicked() {
  clicksPerSecond++; // Track number of clicks for CPS
  cookies += clickPower; // Increase cookies with click power
  cookieCounter.textContent = `${cookies} Cookies`; // Update display counter
}

// Update total cookies
function updateCookieCounter() {
  cookieCounter.textContent = `${cookies} Cookies`; // Update display counter
}

// Calulate CPS produced
function updateCookieCPS() {
  cps = 0; // Reset CPS
  cps += itemsCPS; // Add CPS by items
  cps += clicksPerSecond * clickPower; // Add CPS by clicks
  clicksPerSecond = 0; // Reset every second

  cookieCPS.textContent = `${cps} cps`; // Update display counter
}

// Reset game
function reset() {}

// Save progress in local storage
function updateLocalStorage() {
  localStorage.setItem("cookies", JSON.stringify(cookies));
  localStorage.setItem("clickPower", JSON.stringify(clickPower));
}

// Load progress from local storage
function getLocalStorage() {
  if (localStorage.getItem("cookies")) {
    cookies = JSON.parse(localStorage.getItem("cookies"));
  }
  if (localStorage.getItem("clickPower")) {
    clickPower = JSON.parse(localStorage.getItem("clickPower"));
  }
}
getLocalStorage();
