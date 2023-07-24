/* Afficher les projets */
// envoie une requête pour récupérer le contenu du fichier "travaux.json"
fetch("travaux.json")
  // extrait les données JSON de la réponse.
  .then((response) => response.json())
  // les données sont passées pour être manipulées et affichées
  .then((data) => {
    console.log(data);
    // Récupère l'élément HTML "gallery", utilisé pour afficher la galerie des travaux
    const galleryDiv = document.getElementById("gallery");

    // Parcourt chaque élément dans les données JSON récupérées
    data.forEach((item) => {
      // Pour chaque travail, crée une structure HTML et l'ajoute à l'élément de la galerie
      galleryDiv.innerHTML += `<article class="article">
        <div class="image-portfolio">
          <img src="${item.cover}" alt="${item.title}">
        </div>
        <div class="content-portfolio">
          <div class="detail-content">
            <div class="detail-1">
              <h5>${item.title}</h5>
              <p>${item.role}</p>
              <p>
                <ul class="tech">
                  ${item.technologie.map((tech) => `<li>${tech}</li>`).join("")}
                </ul>
              </p>
              <p>${item.year}</p>
            </div>
            <div class="detail-2">
              <p>${item.description}</p>
            </div>
          </div>
          <aside>
            <a href="${item.website}">Visiter le site</a>
            <a href="${item.github}">Consulter le code</a>
          </aside>
        </div>
      </article>`;
    });
  })
  .catch((error) => {
    // En cas d'erreur lors de la requête
    console.error("Erreur lors de la récupération du fichier JSON :", error);
  });

/* Geolocalisation */
const googleMap = document.querySelector(".googlemap");

googleMap.addEventListener("click", () => {
  // Utilisation de l'API de géocodage pour obtenir les coordonnées de "60160 Montataire"
  const location = "60160 Montataire";
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=AIzaSyAI7uZ7Gx8ZEnVPK3VEuZ6N_XPWPTCVZow`;

  fetch(geocodingApiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        window.location.href = googleMapsLink;
      } else {
        console.error(
          "Erreur lors de la récupération des coordonnées géographiques."
        );
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête à l'API de géocodage.", error);
    });
});

/* Fonction pour le défilement en douceur vers une ancre */
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: "smooth", // Utilise une animation de défilement en douceur
  });
}

// Gestionnaire d'événement pour chaque lien avec une ancre
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le comportement de clic par défaut

    const target = this.getAttribute("href"); // Récupère la valeur de l'attribut href (l'ancre cible)
    smoothScroll(target); // Appelle la fonction pour faire défiler en douceur jusqu'à l'ancre cible
  });
});

/* Switcher titre & texte compétences */

const competenceItems = document.querySelectorAll(".competence-item");

competenceItems.forEach((item) => {
  const survolDiv = item.querySelector(".survol");
  const texteAfficherDiv = item.querySelector(".texte-afficher");

  item.addEventListener("mouseover", function () {
    survolDiv.style.opacity = "0";
    texteAfficherDiv.style.opacity = "1";
    texteAfficherDiv.style.background = "white";
  });

  item.addEventListener("mouseout", function (event) {
    // Vérifie si le curseur se trouve en dehors de l'élément li
    if (!item.contains(event.relatedTarget)) {
      survolDiv.style.opacity = "1";
      texteAfficherDiv.style.opacity = "0";
    }
  });
});

/* Modale menu navigation */
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalLinks = document.querySelectorAll(".modal-link");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

modalLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    // Empêche le comportement par défaut du lien (aller à l'ancre)
    event.preventDefault();

    // Ferme la modale
    modalContainer.classList.remove("active");

    // Détermine la cible de l'ancre (l'ID de l'élément)
    const target = link.getAttribute("href");

    // Scrolle jusqu'à l'ancre
    document.querySelector(target).scrollIntoView({
      behavior: "smooth",
    });
  })
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}

// Fonction pour retirer le focus après le clic sur un lien
function removeFocusAfterClick() {
  const focusedElement = document.activeElement;
  focusedElement.blur();
}

// Récupérer tous les liens du site
const allLinks = document.querySelectorAll("a");

// Ajouter l'événement onclick à chaque lien pour retirer le focus après le clic
allLinks.forEach((link) => {
  link.addEventListener("click", removeFocusAfterClick);
});
