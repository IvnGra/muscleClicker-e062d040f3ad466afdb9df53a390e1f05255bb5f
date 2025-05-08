let count = 0;
    let clickPower = 1;
    let autoClickers = 0;
    let clickUpgradeCost = 10;
    let autoClickerCost = 50;
    let multiplierCost = 200;
    let multiplier = 1;


    const countDisplay = document.getElementById('count');
    const clickImg = document.getElementById('cookie');
    const clickUpgradeCostDisplay = document.getElementById('clickUpgradeCost');
    const autoClickerCostDisplay = document.getElementById('autoClickerCost');
    const multiplierCostDisplay = document.getElementById('multiplierCost')

    clickImg.addEventListener('click', () => {
      count += clickPower;
      updateDisplay();
    });

    function buyClickUpgrade() {
      if (count >= clickUpgradeCost) {
        count -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateDisplay();
      }
      else{
        alert("you are poor, grind a bit and return")
      }
    }

    function buyAutoClicker() {
      if (count >= autoClickerCost) {
        count -= autoClickerCost;
        autoClickers += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.7);
        updateDisplay();
      }else{
        alert("you are poor, grind a bit and return")
      }
    }
    function buyMultyplier() {
      if (count >= multiplierCost) {
        count -= multiplierCost;
        multiplier *= 1.5; 
        clickPower *= matchMedia.floor(multiplier); // apply multiplier to clickPower
        multiplierCost = Math.floor(multiplierCost * 2.5);
        updateDisplay();
      } else {
        alert("you are poor, grind a bit and return");
      }
    }
    
    function updateDisplay() {
      countDisplay.textContent = count;
      clickUpgradeCostDisplay.textContent = clickUpgradeCost;
      autoClickerCostDisplay.textContent = autoClickerCost;
      multiplierCostDisplay.textContent = multiplierCost;
    }

    // Auto-click every second
    setInterval(() => {
      count += autoClickers;
      updateDisplay();
    }, 1000);

    function saveGame() {
      const saveData = {
        count,
        clickPower,
        autoClickers,
        clickUpgradeCost,
        autoClickerCost,
        multiplierCost,
        multiplier
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
        updateDisplay();
      }
    }
    
    // Auto-save every 5 seconds
    setInterval(saveGame, 5000);
    
    // Save on window close
    window.addEventListener('beforeunload', saveGame);
    
    // Load on page load
    window.addEventListener('load', loadGame);
    
const countSpan = document.getElementById("count");
const staminalink = document.getElementById("stamina-link");
const benchlink = document.getElementById("bench-link");
const squatslink = document.getElementById("squat-link");

cookie.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;

    if (count >= 1000) {
        staminalink.classList.remove("disabled-link");
        staminalink.style.pointerEvents = "auto";
        staminalink.style.color = ""; // restore default style if needed
        staminalink.style.opacity = "";
    } else if (count >= 2000)  {
      benchlink.classList.remove("disabled-link");
      benchlink.style.pointerEvents = "auto";
      benchlink.style.color = ""; // restore default style if needed
      benchlink.style.opacity = "";
    } else if (count >= 3000) {
      squatslink.classList.remove("disabled-link");
      squatslink.style.pointerEvents = "auto";
      squatslink.style.color = ""; // restore default style if needed
      squatslink.style.opacity = "";      
    }
});
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (["bench.html", "squat.html", "stamina.html"].includes(href)) {
      localStorage.removeItem('strengthClickerSave');
    }
  });
});

function resetClicks() {
  count = 0;
  document.getElementById("clickCount").textContent = count;
} 

function resetUpgrades() {
  clickPower = 1;
  autoClickers = 0;
  clickUpgradeCost = 10;
  autoClickerCost = 50;
  multiplierCost = 200;
  multiplier = 1;

  localStorage.removeItem('strengthClickerSave'); // clear saved progress
  updateDisplay(); // refresh UI
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
    const sponsorName = button.textContent.trim();
    const imgId = sponsorImages[sponsorName];

    if (!imgId) return;

    if (purchasedSponsors.has(imgId)) {
      return; // already bought
    }

    if (count >= 250) {
      count -= 250;
      purchasedSponsors.add(imgId);
      document.getElementById(imgId).style.display = "inline-block"; // reveal sponsor image

      // Disable the button
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

    function saveGame() {
      const saveData = {
        count,
        clickPower,
        autoClickers,
        clickUpgradeCost,
        autoClickerCost
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
        updateDisplay();
      }
    }
    
    // Auto-save every 5 seconds
    setInterval(saveGame, 5000);
    
    // Save on window close
    window.addEventListener('beforeunload', saveGame);
    
    // Load on page load
    window.addEventListener('load', loadGame);
    