// Core Game State
let count = 0;
let clickPower = 1;
let autoClickers = 0;
let multiplier = 1;
let baseClickPower = 1;


let clickUpgradeCost = 10;
let autoClickerCost = 50;
let multiplierCost = 200;

const WORKOUT_COSTS = {
  stamina: 1000,
  bench: 2000,
  squat: 3000
};

let clickUpgradeLevel = 0;
let autoClickerLevel = 0;
let multiplierLevel = 0;

const MAX_CLICK_UPGRADES = 10;
const MAX_AUTOCLICKERS = 10;
const MAX_MULTIPLIERS = 2;

let unlockedWorkouts = {
  stamina: false,
  bench: false,
  squat: false
};

const countDisplay = document.getElementById('count');
const clickImg = document.getElementById('cookie');
const clickUpgradeCostDisplay = document.getElementById('clickUpgradeCost');
const autoClickerCostDisplay = document.getElementById('autoClickerCost');
const multiplierCostDisplay = document.getElementById('multiplierCost');
const staminaLink = document.getElementById("stamina-link");
const benchLink = document.getElementById("bench-link");
const squatLink = document.getElementById("squat-link");
const autoBtn = document.getElementById('auto-btn');

// Click Logic
clickImg.addEventListener('click', () => {
  count += clickPower;
  updateDisplay();
  unlockPages();
});

function buyClickUpgrade() {
  if (clickUpgradeLevel >= MAX_CLICK_UPGRADES) {
    alert("Max click upgrades reached!");
    return;
  }
  if (count >= clickUpgradeCost) {
    count -= clickUpgradeCost;
    clickUpgradeLevel++;
    baseClickPower += 1;
    clickPower = baseClickPower * multiplier;
    clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
    updateDisplay();
  } else {
    alert("You are poor, grind a bit and return");
  }
}

function buyAutoClicker() {
  if (autoClickerLevel >= MAX_AUTOCLICKERS) {
    alert("Max auto clickers reached!");
    return;
  }
  if (count >= autoClickerCost) {
    count -= autoClickerCost;
    autoClickerLevel++;
    autoClickers += 1;
    autoClickerCost = Math.floor(autoClickerCost * 1.7);
    updateDisplay();
  } else {
    alert("You need more power");
  }
}

function buyMultiplier() {
  if (multiplierLevel >= MAX_MULTIPLIERS) {
    alert("Multiplier maxed out!");
    return;
  }
  if (count >= multiplierCost) {
    count -= multiplierCost;
    multiplierLevel++;
    multiplier *= 1.5;

    // Ensure baseClickPower is at least 1
    if (baseClickPower < 1) baseClickPower = 1;

    clickPower = baseClickPower * multiplier;

    multiplierCost = Math.floor(multiplierCost * 2.5);
    updateDisplay();
  } else {
    alert("You need more power");
  }
}


function updateDisplay() {
  countDisplay.textContent = count;
  clickUpgradeCostDisplay.textContent = clickUpgradeLevel >= MAX_CLICK_UPGRADES ? "MAX" : clickUpgradeCost;
  autoClickerCostDisplay.textContent = autoClickerLevel >= MAX_AUTOCLICKERS ? "MAX" : autoClickerCost;
  multiplierCostDisplay.textContent = multiplierLevel >= MAX_MULTIPLIERS ? "MAX" : multiplierCost;

  if (count >= WORKOUT_COSTS.stamina || unlockedWorkouts.stamina) {
    unlockedWorkouts.stamina = true;
    unlockLink(staminaLink);
  }
  if (count >= WORKOUT_COSTS.bench || unlockedWorkouts.bench) {
    unlockedWorkouts.bench = true;
    unlockLink(benchLink);
  }
  if (count >= WORKOUT_COSTS.squat || unlockedWorkouts.squat) {
    unlockedWorkouts.squat = true;
    unlockLink(squatLink);
  }
}

function unlockLink(link) {
  if (!link) return;
  link.classList.remove("disabled-link");
  link.style.pointerEvents = "auto";
  link.style.color = "";
  link.style.opacity = "";
  const costText = link.querySelector(".cost");
  if (costText) costText.remove();
}

// Auto Click Logic
setInterval(() => {
  count += autoClickers;
  updateDisplay();
}, 1000);

// Game Save/Load
function saveGame() {
  const saveData = {
    count,
    clickPower,
    autoClickers,
    clickUpgradeCost,
    autoClickerCost,
    multiplierCost,
    clickUpgradeLevel,
    autoClickerLevel,
    multiplierLevel,
    multiplier,
    unlockedWorkouts
  };
  localStorage.setItem('strengthClickerSave', JSON.stringify(saveData));
}

function loadGame() {
  const saved = localStorage.getItem('strengthClickerSave');
  if (saved) {
    const saveData = JSON.parse(saved);
    count = saveData.count || 0;
    clickPower = saveData.clickPower || 1;
    autoClickers = saveData.autoClickers || 0;
    clickUpgradeCost = saveData.clickUpgradeCost || 10;
    autoClickerCost = saveData.autoClickerCost || 50;
    multiplierCost = saveData.multiplierCost || 500;
    multiplier = saveData.multiplier || 1;
    clickUpgradeLevel = saveData.clickUpgradeLevel || 0;
    autoClickerLevel = saveData.autoClickerLevel || 0;
    multiplierLevel = saveData.multiplierLevel || 0;
    unlockedWorkouts = saveData.unlockedWorkouts || {};
    updateDisplay();
    unlockPages();
  }
}

function resetGame() {
  count = 0;

  baseClickPower = 1;
  multiplier = 1;
  clickPower = baseClickPower * multiplier;
  autoClickers = 0;

  clickUpgradeCost = 10;
  autoClickerCost = 50;
  multiplierCost = 200;

  clickUpgradeLevel = 0;
  autoClickerLevel = 0;
  multiplierLevel = 0;

  unlockedWorkouts = {
    stamina: false,
    bench: false,
    squat: false
  };

  localStorage.removeItem('strengthClickerSave');

  // Manually reset the cost displays
  clickUpgradeCostDisplay.textContent = clickUpgradeCost;
  autoClickerCostDisplay.textContent = autoClickerCost;
  multiplierCostDisplay.textContent = multiplierCost;

  // If buttons were disabled or text changed, re-enable & reset them
  autoBtn.disabled = false;
  autoBtn.textContent = `Buy AutoClicker (Cost: ${autoClickerCost})`;
  autoBtn.style.opacity = "1";
  autoBtn.style.cursor = "pointer";

  const multiplierBtn = document.getElementById('multiplier-btn');
  if (multiplierBtn) {
    multiplierBtn.disabled = false;
    multiplierBtn.textContent = `Buy Multiplier (Cost: ${multiplierCost})`;
    multiplierBtn.style.opacity = "1";
    multiplierBtn.style.cursor = "pointer";
  }

  updateDisplay();
}




setInterval(saveGame, 5000);
window.addEventListener('beforeunload', saveGame);
window.addEventListener('load', loadGame);

function unlockPages() {
  if (count >= WORKOUT_COSTS.stamina) unlockLink(staminaLink);
  if (count >= WORKOUT_COSTS.bench) unlockLink(benchLink);
  if (count >= WORKOUT_COSTS.squat) unlockLink(squatLink);
} 

function applyWorkoutPerk(workout) {
  switch (workout) {
    case "stamina":
      autoClickers += 2;
      break;
    case "bench":
      clickPower += 2;
      break;
    case "squat":
      setInterval(() => count += 5, 2000);
      break;
  }
}
function resetClicks() {
  count = 0;
  updateDisplay();
}

function resetUpgrades() {
  clickPower = 1;
  autoClickers = 0;
  clickUpgradeCost = 10;
  autoClickerCost = 50;
  multiplierCost = 500;
  multiplier = 1;

  localStorage.removeItem('strengthClickerSave');
  updateDisplay();

  // Reset buttons
  autoBtn.disabled = false;
  autoBtn.textContent = "Buy AutoClicker (Cost: 50)";
  autoBtn.style.opacity = "1";
  autoBtn.style.cursor = "pointer";

  multiplierBtn.disabled = false;
  multiplierBtn.textContent = "Buy Multiplier (cost: 500)";
  multiplierBtn.style.opacity = "1";
  multiplierBtn.style.cursor = "pointer";
}

function resetSponsors() {
  sponsorButtons.forEach(button => {
    button.disabled = false;
    const name = button.textContent.split("✔")[0].trim();
    button.textContent = name;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  });

  Object.values(sponsorImages).forEach(imgId => {
    const img = document.getElementById(imgId);
    if (img) img.style.display = "none";
  });

  purchasedSponsors.clear();
}

function unlockPages() {
  const staminaLink = document.getElementById("stamina-link");
  const benchLink = document.getElementById("bench");
  const squatLink = document.getElementById("squat-link");

  if (count >= 1000) {
    unlockLink(staminaLink);
  }
  if (count >= 2000) {
    unlockLink(benchLink);
  }
  if (count >= 3000) {
    unlockLink(squatLink);
  }
}

function unlockLink(link) {
  if (link) {
    link.classList.remove("disabled-link");
    link.style.pointerEvents = "auto";
    link.style.color = "";
    link.style.opacity = "";
  }
}

document.querySelectorAll('nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (["bench.html", "squat.html", "stamina.html"].includes(href)) {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // stop default navigation

      // Reset all game progress
      count = 0;
      baseClickPower = 1;
      multiplier = 1;
      clickPower = 1;
      autoClickers = 0;

      clickUpgradeCost = 10;
      autoClickerCost = 50;
      multiplierCost = 200;

      clickUpgradeLevel = 0;
      autoClickerLevel = 0;
      multiplierLevel = 0;

      unlockedWorkouts = {
        stamina: false,
        bench: false,
        squat: false
      };

      // Reset sponsors
      purchasedSponsors.clear();
      sponsorButtons.forEach(button => {
        button.disabled = false;
        const name = button.textContent.split("✔")[0].trim();
        button.textContent = name;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
      });

      Object.values(sponsorImages).forEach(imgId => {
        const img = document.getElementById(imgId);
        if (img) img.style.display = "none";
      });

      localStorage.removeItem('strengthClickerSave');

      // Then go to the workout page
      window.location.href = href;
    });
  }
});


// Sponsor logic
const sponsorButtons = document.querySelectorAll(".sponsor-btn");
const sponsorImages = {
  "myFitness": "myfitness",
  "fitness24/7": "fitness24",
  "HC Gym": "hcgym",
  "gymshark": "gymshark",
  "siberia": "siberia",
  "monster": "monster"
};
let purchasedSponsors = new Set();

sponsorButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sponsorName = button.textContent.split("✔")[0].trim();
    const imgId = sponsorImages[sponsorName];

    if (!imgId || purchasedSponsors.has(imgId)) return;

    if (count >= 250) {
      count -= 250;
      purchasedSponsors.add(imgId);

      const img = document.getElementById(imgId);
      if (img) img.style.display = "inline-block";

      button.disabled = true;
      button.textContent = sponsorName + " ✔";
      button.style.opacity = "0.6";
      button.style.cursor = "not-allowed";

      updateDisplay();
    } else {
      alert("Not enough clicks! (Need 250)");
    }
  });
});

function getSponsorNameById(id) {
  for (let name in sponsorImages) {
    if (sponsorImages[name] === id) return name;
  }
  return "";
}

window.addEventListener('beforeunload', saveGame);
window.addEventListener('load', loadGame);
setInterval(saveGame, 5000);