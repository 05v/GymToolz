class Header {
  constructor() {
    const header = document.createElement("header");
    header.classList.add("header", "header--main");

    const logoLink = document.createElement("a");
    logoLink.classList.add("header__logo");
    logoLink.href = "/";

    const logoIcon = document.createElement("i");
    logoIcon.classList.add("header__icon", "fa-solid", "fa-dumbbell");

    const logoTitle = document.createElement("span");
    logoTitle.classList.add("header__title");
    logoTitle.innerText = "GYM Toolz";

    logoLink.appendChild(logoIcon);
    logoLink.appendChild(logoTitle);

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("header__toggle");
    toggleBtn.setAttribute("aria-label", "Toggle Navigation");

    const toggleIcon = document.createElement("i");
    toggleIcon.classList.add("header__toggle-icon", "fa-solid", "fa-bars");

    toggleBtn.appendChild(toggleIcon);

    const menuList = document.createElement("ul");
    menuList.classList.add("header__menu");

    const menuItems = [
      {
        label: `<i class="fa-solid fa-utensils"></i> Calorie Tracker`,
        href: "/calorietracker/",
      },
      {
        label: `<i class="fa-solid fa-calculator"></i> Calorie Calculator`,
        href: "/caloriecalculator/",
      },
      {
        label: `<i class="fa-brands fa-discord"></i> Discord Server`,
        href: "https://discord.gg/gym",
        external: true,
      },
    ];

    menuItems.forEach((item) => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("header__menu-item");

      const menuItemLink = document.createElement("a");
      menuItemLink.classList.add("header__menu-link");
      menuItemLink.href = item.href;
      menuItemLink.innerHTML = item.label;

      if (item.external) {
        menuItemLink.classList.add("header__menu-link--external");
        menuItemLink.setAttribute("target", "_blank");
      }

      menuItem.appendChild(menuItemLink);
      menuList.appendChild(menuItem);
    });

    header.appendChild(logoLink);
    header.appendChild(toggleBtn);
    header.appendChild(menuList);

    document.body.appendChild(header);
  }
}

class HamburgerMenu {
  constructor() {
    this.toggleButton = document.querySelector(".header__toggle");
    this.menu = document.querySelector(".header__menu");
    this.menuLinks = document.querySelectorAll(".header__menu-link");
    this.addEventListeners();
  }

  addEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleMenu();
    });

    this.menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    });
  }

  toggleMenu() {
    this.menu.classList.toggle("header__menu--open");
  }

  closeMenu() {
    this.menu.classList.remove("header__menu--open");
  }
}

class Main {
  constructor(className) {
    const mainElement = document.createElement("main");
    mainElement.classList.add(className);
    document.body.appendChild(mainElement);
  }
}

class Footer {
  constructor() {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const poweredByText = document.createTextNode("Powered by");
    const poweredByLink = document.createElement("a");
    poweredByLink.href = "https://discord.gg/gym";
    const poweredByLinkText = document.createTextNode("discord.gg/GYM");
    poweredByLink.appendChild(poweredByLinkText);

    footer.appendChild(poweredByText);
    footer.innerHTML += "&nbsp;";
    footer.appendChild(poweredByLink);

    document.body.appendChild(footer);
  }
}
