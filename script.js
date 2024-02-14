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
            name: "Ton désir me transforme en cheval",
            description: "Ton désir me transforme en cheval",
            category: "drawings",
            image: "https://maxdcrd.com/content/Dessins/ton_desir_me_transforme.jpg"
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
                    loadProjectInfo(project.name);
                });
            }
        });

        // Afficher les vignettes
        projectThumbnails.forEach(function (thumbnail) {
            thumbnail.style.display = 'block';
        });
    }

    function loadProjectInfo(projectName) {
    // Faire une requête AJAX pour charger les informations depuis le fichier texte
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://maxdcrd.com/content/Dessins/ton_desir_desc.txt', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Séparer les informations pour chaque projet
                var projectsInfo = xhr.responseText.split('#');
                projectsInfo.forEach(function (info) {
                    var lines = info.trim().split('\n');
                    if (lines[0].trim() === '#' + projectName) {
                        var projectInfo = lines.slice(1).join('\n');
                        displayProjectInfo(projectInfo);
                    }
                });
            }
        }
    };
    xhr.send();
}

    function displayProjectInfo(info) {
        // Afficher les informations supplémentaires dans la page HTML
        var projectInfoElement = document.getElementById('project-info');
            projectInfoElement.innerHTML = '<h3>Informations supplémentaires</h3><p>' + info + '</p>';
}

    // Fonction pour afficher le contenu du projet
    function showProject(project) {
        // Effacer le contenu précédent de projectContent
        projectContent.innerHTML = '';

        // Créer une div pour contenir les détails du projet
        var projectDetails = document.createElement('div');
        projectDetails.classList.add('project-details');

        // Créer et ajouter l'image du projet
        var image = document.createElement('img');
        image.src = project.image;
        image.alt = project.name;
        image.style.maxWidth = '100%';
        image.style.height = 'auto';
        projectDetails.appendChild(image);

        // Créer et ajouter la description du projet
        var description = document.createElement('p');
        description.style.marginTop = '10px';
        description.textContent = project.description;
        projectDetails.appendChild(description);

        // Ajouter les détails du projet à la section principale
        projectContent.appendChild(projectDetails);

        // Charger les informations supplémentaires du projet
        loadProjectInfo(project.name);
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
