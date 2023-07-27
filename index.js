/* Afficher les projets */
// Envoie une requête pour récupérer le contenu du fichier "travaux.json"
fetch("travaux.json")
  // Extrait les données JSON de la réponse.
  .then((response) => response.json())
  // Les données sont passées pour être manipulées et affichées
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
              <p>${item.year}</p>
            </div>
            <div class="detail-2">
              <p>${item.description}</p>
              <p>
                <ul class="tech">
                  ${item.technologie.map((tech) => `<li>${tech}</li>`).join("")}
                </ul>
              </p>
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
// Récupère l'élément qui possède la classe CSS "googlemap"
const googleMap = document.querySelector(".googlemap");

// Ecouteur d'évènement au click sur "googleMap"
googleMap.addEventListener("click", () => {
  // Utilisation de l'API de géocodage pour obtenir les coordonnées géographiques de "60160 Montataire"
  const location = "60160 Montataire";
  // Construit l'URL de l'API de géocodage avec le lieu spécifié. Cela inclut une clé d'API qui permet d'accéder à l'API de Google Maps
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=AIzaSyAI7uZ7Gx8ZEnVPK3VEuZ6N_XPWPTCVZow`;
  // Envoie une requête à l'API de géocodage en utilisant l'URL
  fetch(geocodingApiUrl)
    // Traite et extrait les données json de la réponse
    .then((response) => response.json())
    .then((data) => {
      // Vérifie si des résultats ont été renvoyés par l'API de géocodage
      if (data.results && data.results.length > 0) {
        // Extrait les coordonnées de latitude (lat) et de longitude (lng) du premier résultat renvoyé par l'API de géocodage
        const { lat, lng } = data.results[0].geometry.location;
        // Construit un lien Google Maps en utilisant les coordonnées géographiques obtenues
        const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        // Redirige automatiquement l'utilisateur vers le lien Google Maps construit
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
  // Trouve l'élément correspondant dans le document et le fait défiler en douceur jusqu'à le rendre visible dans la fenêtre du navigateur
  document.querySelector(target).scrollIntoView({
    behavior: "smooth", // Utilise une option animation de défilement en douceur
  });
}
// Gestionnaire d'événement pour chaque lien avec une ancre
// Récupère tous les liens et boucle sur chaque lien
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  // fonction anonyme déclenchée au click
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le comportement de clic par défaut (le déplacement strict)

    const target = this.getAttribute("href"); // Récupère la valeur de l'attribut href (l'ancre cible)
    smoothScroll(target); // Appelle la fonction pour faire défiler en douceur jusqu'à l'ancre cible
  });
});

/* Switcher titre & texte compétences */
const competenceItems = document.querySelectorAll(".competence-item");
// Boucle "forEach" parcourt chaque élément de compétence (item) dans la liste "competenceItems" pour ajouter des effets de survol à chacun d'eux
competenceItems.forEach((item) => {
  // Représente le contenu à afficher lorsque la compétence est survolée
  const survolDiv = item.querySelector(".survol");
  // Représente le texte à afficher lorsque la compétence est survolée
  const texteAfficherDiv = item.querySelector(".texte-afficher");

  // Ajoute écouteur d'événement pour le survol de la souris (mouseover) sur l'élément de compétence.
  item.addEventListener("mouseover", function () {
    // Change l'opacité de l'élément à 0 pour masquer le contenu initial
    survolDiv.style.opacity = "0";
    // Change l'opacité de l'élément à 1 pour afficher le texte
    texteAfficherDiv.style.opacity = "1";
    // Change la couleur d'arrière-plan de l'élément en blanc
    texteAfficherDiv.style.background = "white";
  });

  item.addEventListener("mouseout", function (event) {
    // Vérifie si le curseur se trouve en dehors de l'élément li
    if (!item.contains(event.relatedTarget)) {
      // Si oui,  l'opacité de "survolDiv" est restaurée à 1 (visible) et l'opacité de "texteAfficherDiv" est restaurée à 0 (invisible), cachant ainsi le texte de la compétence.
      survolDiv.style.opacity = "1";
      texteAfficherDiv.style.opacity = "0";
    }
  });
});

/* Modale menu navigation */
// Représente la boîte de dialogue modale qui s'affiche à l'écran
const modalContainer = document.querySelector(".modal-container");
// Représente les éléments déclencheurs qui ouvrent la modale lorsqu'ils sont cliqués
const modalTriggers = document.querySelectorAll(".modal-trigger");
// Représente les liens qui pointent vers des ancres
const modalLinks = document.querySelectorAll(".modal-link");

// Pour chaque élément déclencheur (modalTriggers), un écouteur d'événement surveille le clic
// Lorsque l'utilisateur clique sur l'un de ces déclencheurs, la fonction "toggleModal" est appelée
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

// Pour chaque élément lien, lorsque l'utilisateur clique sur l'un d'eux, une fonction anonyme est exécutée pour gérer l'événement.
modalLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    // Empêche le comportement par défaut du lien (aller à l'ancre)
    event.preventDefault();

    // Cette ligne supprime la classe CSS "active" de l'élément "modalContainer"
    // Masque la modale lorsque l'utilisateur clique sur l'un des liens.
    modalContainer.classList.remove("active");
    // Détermine la cible de l'ancre (l'ID de l'élément)
    const target = link.getAttribute("href");
    // Récupère l'élément correspondant à l'ID de l'ancre (cible) et effectue un défilement en douceur jusqu'à le rendre visible dans la fenêtre du navigateur
    document.querySelector(target).scrollIntoView({
      behavior: "smooth",
    });
  })
);
// Gère l'ouverture et la fermeture de la modale
// Ajoute ou supprime la classe CSS "active" sur l'élément "modalContainer" pour afficher ou masquer la modale
function toggleModal() {
  modalContainer.classList.toggle("active");
}
