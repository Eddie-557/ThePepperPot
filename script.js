/* The Pepper Pot — navigation and menu interactions */
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (navToggle && navigation) {
    const closeNavigation = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeNavigation();
    });
  }

  const filterButtons = document.querySelectorAll(".menu-tab");
  const menuCards = document.querySelectorAll(".menu-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((tab) => {
        const isSelected = tab === button;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-pressed", String(isSelected));
      });

      menuCards.forEach((card) => {
        const shouldShow =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});