class CalorieCalculatorPage {
  constructor() {
    const mainElement = document.querySelector(".caloriecalculator");

    const titleElement = document.createElement("h1");
    titleElement.classList.add("caloriecalculator__title");
    titleElement.textContent = "Calorie Calculator";
    mainElement.appendChild(titleElement);

    const paragraphElement = document.createElement("p");
    paragraphElement.classList.add("caloriecalculator__paragraph");
    paragraphElement.textContent = "Please enter the following information:";
    mainElement.appendChild(paragraphElement);

    const formElement = document.createElement("form");
    formElement.classList.add("caloriecalculator__form");
    mainElement.appendChild(formElement);

    const measurementLabelElement = document.createElement("label");
    measurementLabelElement.setAttribute("for", "measurement-system");
    measurementLabelElement.textContent = "Measurement System:";
    formElement.appendChild(measurementLabelElement);

    const measurementSelectElement = document.createElement("select");
    measurementSelectElement.setAttribute("id", "measurement-system");
    measurementSelectElement.setAttribute("name", "measurement-system");
    measurementSelectElement.setAttribute("required", true);
    formElement.appendChild(measurementSelectElement);

    const metricOptionElement = document.createElement("option");
    metricOptionElement.setAttribute("value", "metric");
    metricOptionElement.textContent = "Metric (cm & kg)";
    measurementSelectElement.appendChild(metricOptionElement);

    const usOptionElement = document.createElement("option");
    usOptionElement.setAttribute("value", "us");
    usOptionElement.textContent = "US (ft, inch & lbs)";
    measurementSelectElement.appendChild(usOptionElement);

    const ageLabelElement = document.createElement("label");
    ageLabelElement.setAttribute("for", "age");
    ageLabelElement.textContent = "Age:";
    formElement.appendChild(ageLabelElement);

    const ageInputElement = document.createElement("input");
    ageInputElement.setAttribute("type", "number");
    ageInputElement.setAttribute("id", "age");
    ageInputElement.setAttribute("name", "age");
    ageInputElement.setAttribute("min", "15");
    ageInputElement.setAttribute("max", "80");
    ageInputElement.setAttribute("required", true);
    ageInputElement.setAttribute(
      "oninvalid",
      "this.setCustomValidity('Ages 15 to 80 are supported')"
    );
    ageInputElement.setAttribute("oninput", "this.setCustomValidity('')");
    formElement.appendChild(ageInputElement);

    const genderLabelElement = document.createElement("label");
    genderLabelElement.setAttribute("for", "gender");
    genderLabelElement.textContent = "Gender:";
    formElement.appendChild(genderLabelElement);

    const genderSelectElement = document.createElement("select");
    genderSelectElement.setAttribute("id", "gender");
    genderSelectElement.setAttribute("name", "gender");
    genderSelectElement.setAttribute("required", true);
    formElement.appendChild(genderSelectElement);

    const maleOptionElement = document.createElement("option");
    maleOptionElement.setAttribute("value", "male");
    maleOptionElement.textContent = "Male";
    genderSelectElement.appendChild(maleOptionElement);

    const femaleOptionElement = document.createElement("option");
    femaleOptionElement.setAttribute("value", "female");
    femaleOptionElement.textContent = "Female";
    genderSelectElement.appendChild(femaleOptionElement);

    const heightLabelElement = document.createElement("label");
    heightLabelElement.setAttribute("for", "height");
    heightLabelElement.textContent = "Height (cm):";
    formElement.appendChild(heightLabelElement);

    const heightInputElement = document.createElement("input");
    heightInputElement.setAttribute("type", "number");
    heightInputElement.setAttribute("id", "height");
    heightInputElement.setAttribute("name", "height");
    heightInputElement.setAttribute("required", true);
    formElement.appendChild(heightInputElement);

    const weightLabelElement = document.createElement("label");
    weightLabelElement.setAttribute("for", "weight");
    weightLabelElement.textContent = "Weight (kg):";
    formElement.appendChild(weightLabelElement);

    const weightInputElement = document.createElement("input");
    weightInputElement.setAttribute("type", "number");
    weightInputElement.setAttribute("id", "weight");
    weightInputElement.setAttribute("name", "weight");
    weightInputElement.setAttribute("required", true);
    formElement.appendChild(weightInputElement);

    const activityLabelElement = document.createElement("label");
    activityLabelElement.setAttribute("for", "activity-level");
    activityLabelElement.textContent = "Activity Level:";
    formElement.appendChild(activityLabelElement);

    const activitySelectElement = document.createElement("select");
    activitySelectElement.setAttribute("id", "activity-level");
    activitySelectElement.setAttribute("name", "activity-level");
    activitySelectElement.setAttribute("required", true);
    formElement.appendChild(activitySelectElement);

    const sedentaryOptionElement = document.createElement("option");
    sedentaryOptionElement.setAttribute("value", "1.2");
    sedentaryOptionElement.textContent = "Sedentary (little or no exercise)";
    activitySelectElement.appendChild(sedentaryOptionElement);

    const lightlyActiveOptionElement = document.createElement("option");
    lightlyActiveOptionElement.setAttribute("value", "1.375");
    lightlyActiveOptionElement.textContent =
      "Lightly Active (1-3 days per week)";
    activitySelectElement.appendChild(lightlyActiveOptionElement);

    const moderatelyActiveOptionElement = document.createElement("option");
    moderatelyActiveOptionElement.setAttribute("value", "1.55");
    moderatelyActiveOptionElement.textContent =
      "Moderately Active (3-5 days per week)";
    activitySelectElement.appendChild(moderatelyActiveOptionElement);

    const veryActiveOptionElement = document.createElement("option");
    veryActiveOptionElement.setAttribute("value", "1.725");
    veryActiveOptionElement.textContent = "Very Active (6-7 days per week)";
    activitySelectElement.appendChild(veryActiveOptionElement);

    const superActiveOptionElement = document.createElement("option");
    superActiveOptionElement.setAttribute("value", "1.9");
    superActiveOptionElement.textContent =
      "Super Active (twice per day, extra heavy workouts)";
    activitySelectElement.appendChild(superActiveOptionElement);

    const submitButtonElement = document.createElement("button");
    submitButtonElement.setAttribute("type", "submit");
    submitButtonElement.classList.add("caloriecalculator__button");
    submitButtonElement.textContent = "Calculate";
    formElement.appendChild(submitButtonElement);

    const resultParagraphElement = document.createElement("p");
    resultParagraphElement.classList.add("caloriecalculator__result");
    mainElement.appendChild(resultParagraphElement);
  }
}

class CalorieCalculator {
  constructor() {
    this.calculatorForm = document.querySelector(".caloriecalculator__form");
    this.calculatorResult = document.querySelector(
      ".caloriecalculator__result"
    );
    this.bindEvents();
  }

  bindEvents() {
    const measurementSystemSelect = this.calculatorForm.querySelector(
      "#measurement-system"
    );
    measurementSystemSelect.addEventListener("change", () => {
      const selectedOption =
        measurementSystemSelect.options[measurementSystemSelect.selectedIndex];
      const heightLabel = document.querySelector('label[for="height"]');
      const weightLabel = document.querySelector('label[for="weight"]');
      let heightDiv = null;

      if (selectedOption.value === "us") {
        heightLabel.textContent = "Height (ft, inch):";
        weightLabel.textContent = "Weight (lbs):";
        heightDiv = document.createElement("div");
        heightDiv.classList.add("caloriecalculator__usHeight");

        const heightFtInput = document.createElement("input");
        heightFtInput.setAttribute("type", "number");
        heightFtInput.setAttribute("id", "heightFt");
        heightFtInput.setAttribute("name", "heightFt");
        heightFtInput.setAttribute("required", "");
        heightFtInput.setAttribute("min", "0");
        heightFtInput.setAttribute("max", "9");
        heightFtInput.setAttribute("step", "1");
        heightDiv.appendChild(heightFtInput);

        const heightInInput = document.createElement("input");
        heightInInput.setAttribute("type", "number");
        heightInInput.setAttribute("id", "heightIn");
        heightInInput.setAttribute("name", "heightIn");
        heightInInput.setAttribute("required", "");
        heightInInput.setAttribute("min", "0");
        heightInInput.setAttribute("max", "11");
        heightInInput.setAttribute("step", "1");
        heightDiv.appendChild(heightInInput);

        const heightInput = this.calculatorForm.querySelector(
          'input[name="height"]'
        );
        if (heightInput) {
          heightInput.parentNode.insertBefore(heightDiv, heightInput);
          heightInput.remove();
        }
      } else if (selectedOption.value === "metric") {
        heightLabel.textContent = "Height (cm):";
        weightLabel.textContent = "Weight (kg):";
        const heightFtInput = this.calculatorForm.querySelector(
          'input[name="heightFt"]'
        );
        const heightInInput = this.calculatorForm.querySelector(
          'input[name="heightIn"]'
        );
        if (heightFtInput && heightInInput) {
          parseInt(heightFtInput.value), parseInt(heightInInput.value);
          const newHeightInput = document.createElement("input");
          newHeightInput.setAttribute("type", "number");
          newHeightInput.setAttribute("id", "height");
          newHeightInput.setAttribute("name", "height");
          newHeightInput.setAttribute("required", "");
          heightFtInput.parentNode.insertBefore(newHeightInput, heightFtInput);
          heightFtInput.remove();
          heightInInput.remove();
        }
      }
    });

    this.calculatorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.calculatorForm);
      const measurementSystemValue = formData.get("measurement-system");
      let height = parseInt(formData.get("height"));
      let weight = parseInt(formData.get("weight"));

      if (measurementSystemValue === "us") {
        weight /= 2.2;
        const heightFt = parseInt(formData.get("heightFt"));
        const heightIn = parseInt(formData.get("heightIn"));
        height = heightFt * 30.48 + heightIn * 2.54;
      }

      const calorieNeeds = new CalorieNeeds(
        formData.get("age"),
        formData.get("gender"),
        height,
        weight,
        formData.get("activity-level")
      );

      this.displayResults(calorieNeeds.calculate());
      calorieNeeds.saveToLocalStorage();
    });
  }

  displayResults(calorieNeeds) {
    const rowsMaintain = [
      { goal: "Maintain weight", calories: calorieNeeds },
    ].filter((row) => row.calories >= 0);

    const rowsLose = [
      { goal: "Mild weight loss (0.25 kg/week)", calories: calorieNeeds - 250 },
      { goal: "Weight loss (0.5 kg/week)", calories: calorieNeeds - 500 },
      {
        goal: "Extreme weight loss (1 kg/week)",
        calories: calorieNeeds - 1000,
      },
    ].filter((row) => row.calories >= 0);

    const rowsGain = [
      { goal: "Mild weight gain (0.25 kg/week)", calories: calorieNeeds + 250 },
      { goal: "Weight gain (0.5 kg/week)", calories: calorieNeeds + 500 },
      {
        goal: "Extreme weight gain (1 kg/week)",
        calories: calorieNeeds + 1000,
      },
    ].filter((row) => row.calories >= 0);

    const tableHtml = `
      <h2 class="caloriecalculator__header">Your Daily Calorie Needs:</h2>

      <table class="caloriecalculator__table">
        <thead>
          <tr>
            <th class="caloriecalculator__cellTitle">Weight Goal</th>
            <th class="caloriecalculator__cellTitle">Calories per Day</th>
          </tr>
        </thead>
        <tbody>
          ${rowsMaintain
            .map(
              (row) => `
              <tr>
                <td class="caloriecalculator__cell">${row.goal}</td>
                <td class="caloriecalculator__cell">${row.calories} calories per day</td>
              </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <table class="caloriecalculator__table">
        <thead>
          <tr>
            <th class="caloriecalculator__cellTitle">Weight Goal</th>
            <th class="caloriecalculator__cellTitle">Calories per Day</th>
          </tr>
        </thead>
        <tbody>
          ${rowsLose
            .map(
              (row) => `
              <tr>
                <td class="caloriecalculator__cell">${row.goal}</td>
                <td class="caloriecalculator__cell">${row.calories} calories per day</td>
              </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <table class="caloriecalculator__table">
        <thead>
          <tr>
            <th class="caloriecalculator__cellTitle">Weight Goal</th>
            <th class="caloriecalculator__cellTitle">Calories per Day</th>
          </tr>
        </thead>
        <tbody>
          ${rowsGain
            .map(
              (row) => `
              <tr>
                <td class="caloriecalculator__cell">${row.goal}</td>
                <td class="caloriecalculator__cell">${row.calories} calories per day</td>
              </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
    this.calculatorResult.innerHTML = tableHtml;
  }
}

class CalorieNeeds {
  constructor(age, gender, height, weight, activityLevel) {
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.activityLevel = activityLevel;
  }

  calculate() {
    let bmr;
    if (
      (console.log(Number(this.activityLevel)),
      console.log(Number(this.weight)),
      "male" === this.gender)
    )
      bmr =
        10 * Number(this.weight) +
        6.25 * Number(this.height) -
        5 * Number(this.age) +
        5;
    else {
      if ("female" !== this.gender) throw new Error("Invalid gender value.");
      bmr =
        10 * Number(this.weight) +
        6.25 * Number(this.height) -
        5 * Number(this.age) -
        161;
    }
    return Math.round(bmr * this.activityLevel);
  }
  saveToLocalStorage() {
    localStorage.setItem("calorieNeeds", JSON.stringify(this));
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
    new Main("caloriecalculator");
    new CalorieCalculatorPage();
    new CalorieCalculator();
    new CalorieNeeds();
    new Footer();
  }
}

new App();
