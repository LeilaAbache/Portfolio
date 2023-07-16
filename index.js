/* Sidebar */
/*const sidebar = document.getElementById("side-bar");
const content = document.querySelector(".fiche-accueil");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

content.addEventListener("click", () => {
  sidebar.classList.remove("active");
});*/

/* Afficher les projets */

fetch("travaux.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Les données du fichier JSON sont disponibles ici
    const galleryDiv = document.getElementById("gallery");

    // Manipulez les données et affichez-les dans la balise <div>
    data.forEach((item) => {
      galleryDiv.innerHTML += `<article class="article">
        <div class="image-portfolio">
          <img src="${item.cover}" alt="${item.title}">
        </div>
        <div class="content-portfolio">
          <div class="detail-content">
            <div class="detail-1">
              <h5>${item.title}</h5>
              <p>${item.role}</p>
              <p>${item.technologie}</p>
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
    behavior: "smooth", // Utiliser une animation de défilement en douceur
  });
}

// Gestionnaire d'événement pour chaque lien avec une ancre
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Empêcher le comportement de clic par défaut

    const target = this.getAttribute("href"); // Récupérer la valeur de l'attribut href (l'ancre cible)
    smoothScroll(target); // Appeler la fonction pour faire défiler en douceur jusqu'à l'ancre cible
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
    // Vérifier si le curseur se trouve en dehors de l'élément li
    if (!item.contains(event.relatedTarget)) {
      survolDiv.style.opacity = "1";
      texteAfficherDiv.style.opacity = "0";
    }
  });
});

/* modale menu navigation */

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}
