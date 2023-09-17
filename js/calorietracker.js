class PopularFoodSearch {
  constructor(calorietracker) {
    this.calorietracker = calorietracker;
    this.searchButton = document.getElementById("popularFoodSearchButton");
    this.searchButton.addEventListener("click", this.search.bind(this));
    this.searchResultsContainer = document.getElementById(
      "popularFoodSearchResults"
    );
    this.modal = document.getElementById("popularFoodSearchModal");
    this.closeButton = document.getElementById("popularFoodSearchClose");
    this.closeButton.addEventListener("click", () => {
      this.modal.style.display = "none";

      this.modal_content = document.getElementsByClassName("modal-content")[0];
    });
  }

  async search() {
    const query = prompt("Enter a keyword to search for popular food items:");
    if (!query) return;

    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1`
    );
    const data = await response.json();
    const results = data.products;

    this.displayResults(results);
  }

  displayResults(results) {
    this.searchResultsContainer.innerHTML = "";

    results.forEach(
      ({ product_name, image_url, serving_quantity, nutriments }) => {
        if (product_name && image_url) {
          // Check if product_name and image_url are defined
          const result = document.createElement("div");
          result.classList.add("popular-food-search-results__item");

          const img = document.createElement("img");
          img.classList.add("popular-food-search-results__item__image");
          img.src = image_url;
          img.alt = product_name;

          const foodName = document.createElement("span");
          foodName.classList.add("popular-food-search-results__item__name");
          foodName.textContent = product_name;

          const foodCalories = document.createElement("span");
          foodCalories.classList.add(
            "popular-food-search-results__item__calories"
          );
          const calories = nutriments.energy_value
            ? nutriments.energy_value.toFixed(0)
            : "Unknown";
          foodCalories.textContent = `${calories} kcal`;

          const caloriesWrapper = document.createElement("div");
          caloriesWrapper.classList.add(
            "popular-food-search-results__itemCaloriesWrapper"
          );
          caloriesWrapper.appendChild(foodName);
          caloriesWrapper.appendChild(foodCalories);

          const addButton = document.createElement("button");
          addButton.classList.add("popular-food-search-results__item__add");
          addButton.textContent = "Add";
          addButton.addEventListener("click", () => {
            if (calories !== "Unknown") {
              this.calorietracker.addFood(product_name, calories);
            } else {
              alert("Cannot add an item with unknown calories.");
            }
            this.searchResultsContainer.hidden = true;
            this.closeButton.click();
          });

          const cancelButton = document.createElement("button");
          cancelButton.classList.add(
            "popular-food-search-results__item__cancel"
          );
          cancelButton.textContent = "Cancel";
          cancelButton.addEventListener("click", () => {
            this.searchResultsContainer.hidden = true;
            this.closeButton.click();
          });

          const buttonWrapper = document.createElement("div");
          buttonWrapper.classList.add(
            "popular-food-search-results__item__button-wrapper"
          );
          buttonWrapper.appendChild(addButton);
          buttonWrapper.appendChild(cancelButton);

          result.appendChild(img);
          result.appendChild(caloriesWrapper);
          result.appendChild(buttonWrapper);

          this.searchResultsContainer.appendChild(result);
        }
      }
    );

    this.searchResultsContainer.hidden = false;
    this.modal.style.display = "block";
  }
}

class CalorieTracker {
  constructor() {
    this.header = document.querySelector(".calorietracker__h1");
    this.form = document.querySelector(".calorietracker__form");
    this.quickAddButtons = document.querySelectorAll(
      ".calorietracker__quickadd__button"
    );
    this.list = document.querySelector(".calorietracker__list");
    this.total = document.querySelector(".calorietracker__total--value");
    this.calories = [];

    this.addFood = this.addFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.resetDate = this.resetDate.bind(this);

    this.date = new Date();

    this.header.textContent = `Calorie Tracker (${this.formatDate(this.date)})`;

    this.quickAddButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const food = "Quick added";
        const calories = button.dataset.calories;
        this.addFood(food, calories);
      });
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const food = this.form.elements["food"].value.trim();
      const calories = this.form.elements["calories"].value.trim();

      if (food && calories) {
        this.addFood(food, calories);
        this.form.reset();
      }
    });

    this.list.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("calorietracker__list__item__delete")
      ) {
        const item = event.target.closest("li");
        const index = item.dataset.index;
        this.deleteFood(index);
      }
    });

    this.resetButton = document.querySelector(
      ".calorietracker__form__button[type='reset']"
    );
    this.resetButton.addEventListener("click", () => {
      this.reset();
      this.resetDate();
    });

    this.initBarcodeScanner = this.initBarcodeScanner.bind(this);
    this.onBarcodeDetected = this.onBarcodeDetected.bind(this);

    this.barcodeScannerButton = document.getElementById("barcodeScannerButton");
    this.barcodeScannerButton.addEventListener("click", () => {
      this.initBarcodeScanner();
    });

    this.loadFromLocalStorage();
  }

  initBarcodeScanner() {
    const scannerElement = document.getElementById("barcodeScanner");

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerElement,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (error) => {
        if (error) {
          console.log(error);
          return;
        }
        scannerElement.style.display = "block";
        Quagga.start();
      }
    );

    Quagga.onDetected(this.onBarcodeDetected);
  }

  async onBarcodeDetected(result) {
    Quagga.stop();
    document.getElementById("barcodeScanner").style.display = "none";
    const barcode = result.codeResult.code;

    // Fetch product information using barcode
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await response.json();

    if (data.status === 1) {
      const food = data.product.product_name;
      const servingSize = parseFloat(data.product.serving_size);
      const energyPer100g = parseFloat(data.product.nutriments.energy_value);

      console.log("Energy value per 100g:", energyPer100g);

      const grams = parseFloat(
        prompt("How many grams of the product did you consume?")
      );

      if (isNaN(grams)) {
        alert("Invalid input. Please enter a valid number of grams.");
      } else {
        const calories = (energyPer100g * grams) / 100;
        console.log(`Calories for ${grams} grams of ${food}:`, calories);

        this.addFood(food, calories);
      }
    } else {
      alert("Product not found.");
    }
  }

  formatDate = (date) => {
    const dayOfMonth = date.getDate();
    const suffix =
      dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31
        ? "st"
        : dayOfMonth === 2 || dayOfMonth === 22
        ? "nd"
        : dayOfMonth === 3 || dayOfMonth === 23
        ? "rd"
        : "th";
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${dayOfMonth}${suffix}, ${date.getFullYear()}`;
  };

  addFood(food, calories) {
    const index = this.calories.length;
    const date = new Date().toISOString();

    this.calories.push({
      food,
      calories,
      date,
    });

    this.updateTotal();
    this.saveToLocalStorage(index);
    this.addToList(food, calories, date, index);
  }

  deleteFood(index) {
    this.calories.splice(index, 1);
    const item = this.list.querySelector(`li[data-index="${index}"]`);
    this.list.removeChild(item);
    this.updateTotal();
    this.updateIndexes();
    this.saveToLocalStorage();
  }

  updateTotal() {
    const totalCalories = this.calories.reduce(
      (sum, item) => sum + parseInt(item.calories),
      0
    );
    this.total.textContent = totalCalories;
  }

  saveToLocalStorage(index) {
    if (index !== undefined) {
      localStorage.setItem(`calorieFood${index}`, this.calories[index].food);
      localStorage.setItem(
        `calorieAmount${index}`,
        this.calories[index].calories
      );
      localStorage.setItem(`calorieDate${index}`, this.calories[index].date);
    } else {
      localStorage.clear();
      this.calories.forEach((calorie, index) => {
        localStorage.setItem(`calorieFood${index}`, calorie.food);
        localStorage.setItem(`calorieAmount${index}`, calorie.calories);
        localStorage.setItem(`calorieDate${index}`, calorie.date);
      });
    }
  }

  loadFromLocalStorage() {
    let index = 0;
    let calorieFood, calorieAmount, calorieDate;
    while (true) {
      calorieFood = localStorage.getItem(`calorieFood${index}`);
      if (calorieFood === null) {
        break;
      }
      calorieAmount = localStorage.getItem(`calorieAmount${index}`);
      calorieDate = localStorage.getItem(`calorieDate${index}`);
      this.calories.push({
        food: calorieFood,
        calories: calorieAmount,
        date: calorieDate,
      });
      index++;
    }
    this.calories.forEach((calorie, index) => {
      this.addToList(calorie.food, calorie.calories, calorie.date, index);
    });
    this.updateTotal();
  }

  updateIndexes() {
    this.list.querySelectorAll("li").forEach((item, index) => {
      item.dataset.index = index;
    });
  }

  reset() {
    this.list.innerHTML = "";
    this.calories = [];
    this.updateTotal();
    this.updateIndexes();
    this.saveToLocalStorage();
  }

  addToList(food, calories, date, index) {
    const item = document.createElement("li");
    item.classList.add("calorietracker__list__item");
    item.dataset.index = index;
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("calorietracker__list__item__name");
    nameSpan.textContent = food;

    const caloriesSpan = document.createElement("span");
    caloriesSpan.classList.add("calorietracker__list__item__calories");
    caloriesSpan.textContent = calories;

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("calorietracker__list__item__time");
    const time = new Date(date)
      .toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
    timeSpan.textContent = time;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("calorietracker__list__item__delete");
    deleteButton.textContent = "Delete";

    item.appendChild(nameSpan);
    item.appendChild(caloriesSpan);
    item.appendChild(timeSpan);
    item.appendChild(deleteButton);

    this.list.appendChild(item);
  }

  resetDate() {
    this.date = new Date();
    this.header.textContent = `Calorie Tracker (${this.formatDate(this.date)})`;
  }
}

class App {
  constructor() {
    this.warning = document.getElementsByClassName("main")[0];
    this.warning.remove();
    this.render();
    const header = document.getElementsByTagName("header")[0];
    const main = document.getElementsByTagName("main")[0];
    if (header) {
      document.body.insertBefore(header, main);
    }
  }

  render() {
    new Header();
    new HamburgerMenu();
    const CalorieTrackerInstance = new CalorieTracker();
    new PopularFoodSearch(CalorieTrackerInstance);
    new Footer();
  }
}
new App();
