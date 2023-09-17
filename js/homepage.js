class HomePage {
  constructor() {
    const mainElement = document.querySelector("main.main");

    const mainTitle = document.createElement("h1");
    mainTitle.classList.add("main__title");
    mainTitle.innerText = "Welcome to GYM Toolz";
    mainElement.appendChild(mainTitle);

    const mainDescription = document.createElement("p");
    mainDescription.classList.add("main__description");
    mainDescription.innerText = `GYM Toolz is a website designed to help you achieve your fitness goals by providing
                easy-to-use Toolz and resources. Whether you're looking to calculate your calorie needs or track them, we've got you covered.`;
    mainElement.appendChild(mainDescription);

    const mainButtons = document.createElement("div");
    mainButtons.classList.add("main__buttons");

    const calorietrackerBtn = document.createElement("a");
    calorietrackerBtn.classList.add("main__button", "main__button--counter");
    calorietrackerBtn.href = "/calorietracker/";
    calorietrackerBtn.innerHTML = `<i class="fa-solid fa-utensils"></i> <span>Calorie Tracker</span>`;
    mainButtons.appendChild(calorietrackerBtn);

    const calorieCalculatorBtn = document.createElement("a");
    calorieCalculatorBtn.classList.add("main__button", "main__button--calorie");
    calorieCalculatorBtn.href = "/caloriecalculator/";
    calorieCalculatorBtn.innerHTML = `<i class="fa-solid fa-calculator"></i> <span>Calorie Calculator</span>`;
    mainButtons.appendChild(calorieCalculatorBtn);

    mainElement.appendChild(mainButtons);

    const mainDescriptions = document.createElement("div");
    mainDescriptions.classList.add("main__descriptions");

    const calorietrackerDescTitle = document.createElement("h2");
    calorietrackerDescTitle.classList.add("main__description-title");
    calorietrackerDescTitle.innerHTML = `<i class="fa-solid fa-utensils"></i> Calorie Tracker`;
    mainDescriptions.appendChild(calorietrackerDescTitle);

    document.body.appendChild(mainElement);
    const calorietrackerDescText = document.createElement("p");
    calorietrackerDescText.classList.add("main__description-text");
    calorietrackerDescText.innerText =
      "Our Calorie Tracker tool allows you to effortlessly monitor your daily caloric intake and gain valuable insights into your dietary habits. With its user-friendly interface, you can make informed decisions about your nutrition and achieve your fitness goals.";
    mainDescriptions.appendChild(calorietrackerDescText);

    const calorieCalculatorDescTitle = document.createElement("h2");
    calorieCalculatorDescTitle.classList.add("main__description-title");
    calorieCalculatorDescTitle.innerHTML = `<i class="fa-solid fa-calculator"></i> Calorie Calculator`;
    mainDescriptions.appendChild(calorieCalculatorDescTitle);

    const calorieCalculatorDescText = document.createElement("p");
    calorieCalculatorDescText.classList.add("main__description-text");
    calorieCalculatorDescText.innerText = `This tool is designed to help you calculate your daily calorie needs with ease. By taking into account your activity level, age, height, and weight, you can determine the number of calories required to reach your fitness goals.`;
    mainDescriptions.appendChild(calorieCalculatorDescText);
    mainElement.appendChild(mainDescriptions);
  }
}

class App {
  constructor() {
    this.body = document.getElementsByTagName("body")[0];
    this.body.innerHTML = "";
    this.render();
  }

  render() {
    new Header();
    new HamburgerMenu();
    new Main("main");
    new HomePage();
    new Footer();
  }
}

new App();
