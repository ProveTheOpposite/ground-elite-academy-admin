import { selector } from "recoil";

// Fonction permettant de faire défiler la page jusqu'à un élément spécifique
const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Sélecteur permettant d'aller à un élément HTML lors d'un clic de la navigation
export const scrollToElementSelector = selector({
  key: "scrollToElementSelector",
  get: () => scrollToElement,
});
