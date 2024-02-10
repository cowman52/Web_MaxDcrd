document.addEventListener("DOMContentLoaded", function () {
    var projectContent = document.getElementById("project-content");
    var projectThumbnails = document.querySelectorAll('.project-thumbnail');

    // Masquer toutes les vignettes au chargement de la page
    projectThumbnails.forEach(function (thumbnail) {
        thumbnail.style.display = 'none';
    });

    // Récupérer le titre dans le header
    var headerTitle = document.getElementById("header-left");

    // Ajouter un gestionnaire d'événements pour le clic sur le titre
    headerTitle.addEventListener('click', function () {
        // Masquer tout le contenu du projet
        projectContent.innerHTML = '';
        // Afficher toutes les vignettes des projets
        projectThumbnails.forEach(function (thumbnail) {
            thumbnail.style.display = 'block';
        });
    });

    var projectData = [
        {
            name: "Projet 1",
            description: "Description du Projet 1...",
            category: "scenography"
        },
        {
            name: "Projet 2",
            description: "Description du Projet 2...",
            category: "drawings"
        },
        {
            name: "Projet 3",
            description: "Description du Projet 3...",
            category: "drawings"
        },
        {
            name: "Projet 4",
            description: "Description du Projet 4...",
            category: "scenography"
        },
        // Autres données de projet...
    ];

    // Fonction pour générer et afficher les vignettes correspondant à une catégorie
    function showThumbnails(categoryName) {
        // Réinitialiser le contenu des projets
        projectContent.innerHTML = '';

        // Afficher les vignettes correspondant à la catégorie sélectionnée
        projectData.forEach(function (project) {
            if (project.category === categoryName) {
                // Créer une vignette pour chaque projet de la catégorie
                var projectThumbnail = document.createElement("div");
                projectThumbnail.classList.add("project-thumbnail");
                projectThumbnail.innerHTML = `<h2>${project.name}</h2><p>${project.description}</p>`;
                projectContent.appendChild(projectThumbnail);

                // Ajouter un gestionnaire d'événements pour afficher le contenu du projet lorsque la vignette est cliquée
                projectThumbnail.addEventListener("click", function () {
                    showProject(project);
                });
            }
        });
    }

    // Fonction pour afficher le contenu du projet
    function showProject(project) {
        // Mettre à jour la section principale avec le contenu du projet
        projectContent.innerHTML = `<h2>${project.name}</h2><p>${project.description}</p>`;
        // Ajoutez d'autres éléments HTML pour les images, les liens, etc., si nécessaire
    }

    // Récupérer les éléments du menu
    var projectCategories = document.querySelectorAll('.project-category');

    // Ajouter un gestionnaire d'événements pour chaque élément du menu
    projectCategories.forEach(function (category) {
        category.addEventListener('click', function () {
            var categoryName = category.dataset.category;

            // Appeler la fonction pour afficher les vignettes correspondant à la catégorie sélectionnée
            showThumbnails(categoryName);
        });
    });

    // Ajouter un gestionnaire d'événements pour le clic sur "Contact"
    var contactFooter = document.querySelector('.footer__container.project-category[data-category="contact"]');
    contactFooter.addEventListener('click', function () {
        // Afficher une vignette de contact
        var contactThumbnail = document.createElement("div");
        contactThumbnail.classList.add("contact-thumbnail"); // Ajoutez la classe spécifique
        contactThumbnail.innerHTML = "<p>maxdcrd@protonmail.com</p>";
        projectContent.innerHTML = ''; // Effacer le contenu actuel
        projectContent.appendChild(contactThumbnail);
    });
});
