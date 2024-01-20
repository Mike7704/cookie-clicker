// Game variables
let cookies = 0; // Total cookies count
let cps = 0; // Total cookies produced per second
let itemsCPS = 0; // Cookies produced per second by items
let clicksPerSecond = 0; // Clicks per second
let clickPower = 1; // Cookies produced per click
let totalCookiesProduced = 0; // Total cookies produced
let totalClicks = 0; // Total cookie clicks

// Store items
let items = [
  { owned: 0, name: "Grandma", production: 1, cost: 10 },
  { owned: 0, name: "Oven", production: 5, cost: 50 },
  { owned: 0, name: "Baker", production: 20, cost: 200 },
  { owned: 0, name: "Robot", production: 50, cost: 500 },
  { owned: 0, name: "Farm", production: 100, cost: 1000 },
  { owned: 0, name: "Mine", production: 200, cost: 2000 },
  { owned: 0, name: "Factory", production: 500, cost: 5000 },
  { owned: 0, name: "Alchemy Lab", production: 1000, cost: 10000 },
  { owned: 0, name: "Bank", production: 2000, cost: 20000 },
  { owned: 0, name: "Time Machine", production: 5000, cost: 50000 },
];
// Store start/base costs of each item to reset to
let itemsStartCost = [];
for (let item of items) {
  itemsStartCost.push(item.cost);
}

// Document elements to interact with
const cookieCounter = document.getElementById("cookie-counter");
const cookieCPS = document.getElementById("cookie-cps");
const cookieButton = document.getElementById("cookie-button");
const resetButton = document.getElementById("reset");
const storeItems = document.querySelectorAll(".store .item");
const totalCookiesProducedCounter = document.getElementById("total-cookies-produced");
const totalClicksCounter = document.getElementById("total-clicks");

// Button listeners
cookieButton.addEventListener("click", cookieClicked);
resetButton.addEventListener("click", reset);
// Assign each buy button to its item (Ignoring click power item)
for (let i = 0; i < items.length; i++) {
  storeItems[i].querySelector("button").addEventListener("click", function () {
    buyItem(i);
  });
}

// Update all display counters
function updateDisplay() {
  cookieCounter.textContent = `${cookies.toLocaleString()} Cookies`;
  cookieCPS.textContent = `${cps.toLocaleString()} cps`;

  totalCookiesProducedCounter.textContent = `Total Cookies Produced: ${totalCookiesProduced.toLocaleString()}`;
  totalClicksCounter.textContent = `Total Clicks: ${totalClicks.toLocaleString()}`;

  for (let index = 0; index < items.length; index++) {
    storeItems[index].querySelector("#owned").textContent = `${items[index].owned.toLocaleString()}`;
    storeItems[index].querySelector("#cost").textContent = `${items[index].cost.toLocaleString()}`;
  }
}

// Increase cookies when cookie button is clicked
function cookieClicked() {
  cookies += clickPower; // Increase cookies by click power
  clicksPerSecond++; // Track number of clicks for CPS
  totalClicks++; // Track number of total cookie clicks
  updateDisplay(); // We want to see the change as we click
}

// Update cookie counter
function updateCookieCounter() {
  cookies += itemsCPS; // Add cookies produced by items
  totalCookiesProduced += cps; // Update total cookies produced
}

// Calulate CPS produced
function updateCookieCPS() {
  // Reset CPS to recalculate
  cps = 0;
  itemsCPS = 0;
  // Calculate cps produced by items
  for (let item of items) {
    itemsCPS += item.owned * item.production;
  }
  cps += itemsCPS; // Add CPS from items
  cps += clicksPerSecond * clickPower; // Add CPS from clicks
  clicksPerSecond = 0; // Reset clicks every second to be recounted
}

// Buy item from the store
function buyItem(index) {
  // Can afford the item?
  if (cookies >= items[index].cost) {
    // Buy the item and remove cookies
    cookies -= items[index].cost;
    items[index].owned++; // Increase item owned amount
    items[index].cost = Math.floor(items[index].cost * 1.25); // Increase cost by 25% (ignore decimal place)
    updateDisplay();

    // Set button to green
    storeItems[index].querySelector("button").style.backgroundColor = "Green";
    storeItems[index].querySelector("button").style.color = "white";
    storeItems[index].querySelector("button").style.textShadow = "none";
  } else {
    // Not enough cookies, set button to red
    storeItems[index].querySelector("button").style.backgroundColor = "Red";
    storeItems[index].querySelector("button").style.color = "white";
    storeItems[index].querySelector("button").style.textShadow = "none";
  }

  // Reset button styling after 1 second
  setTimeout(function () {
    storeItems[index].querySelector("button").style.backgroundColor = "";
    storeItems[index].querySelector("button").style.color = "";
    storeItems[index].querySelector("button").style.textShadow = "";
  }, 1000);
}

// Reset game
function reset() {
  cookies = 0;
  clickPower = 1;
  totalCookiesProduced = 0;
  totalClicks = 0;
  for (let i = 0; i < items.length; i++) {
    items[i].owned = 0;
    items[i].cost = itemsStartCost[i];
  }
  updateLocalStorage();
  updateDisplay();
}

// Save progress in local storage
function updateLocalStorage() {
  localStorage.setItem("cookies", JSON.stringify(cookies));
  localStorage.setItem("clickPower", JSON.stringify(clickPower));
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("totalCookiesProduced", JSON.stringify(totalCookiesProduced));
  localStorage.setItem("totalClicks", JSON.stringify(totalClicks));
}

// Load progress from local storage
function getLocalStorage() {
  if (localStorage.getItem("cookies")) {
    cookies = JSON.parse(localStorage.getItem("cookies"));
  }
  if (localStorage.getItem("clickPower")) {
    clickPower = JSON.parse(localStorage.getItem("clickPower"));
  }
  if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"));
  }
  if (localStorage.getItem("totalCookiesProduced")) {
    totalCookiesProduced = JSON.parse(localStorage.getItem("totalCookiesProduced"));
  }
  if (localStorage.getItem("totalClicks")) {
    totalClicks = JSON.parse(localStorage.getItem("totalClicks"));
  }
}

// Load progress on page load/refresh
getLocalStorage();
updateDisplay();

// Run every second and update cookies
setInterval(function () {
  updateCookieCPS();
  updateCookieCounter();
  updateLocalStorage();
  updateDisplay();
}, 1000);
