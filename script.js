document.addEventListener("DOMContentLoaded", function () {
    var projectContent = document.getElementById("project-content");
    var projectThumbnails = document.querySelectorAll('.project-thumbnail');

    // Masquer toutes les vignettes au chargement de la page
    projectThumbnails.forEach(function (thumbnail) {
        // Exclure l'élément avec l'ID 'project-info' et la classe 'project-category' de la logique de masquage
        if (!((thumbnail.id == 'project-info') || (thumbnail.className == 'project-category'))) {
            thumbnail.style.display = 'none';
        }
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

    var projectData = [{
        name: "Projet 1",
        description: "Description du Projet 1...",
        category: "scenography"
    }, {
        name: "Ton désir me transforme en cheval",
        description: "Ton désir me transforme en cheval",
        category: "drawings",
        image: "https://maxdcrd.com/content/Dessins/ton_desir_me_transforme.jpg"
    }, {
        name: "Projet 3",
        description: "Description du Projet 3...",
        category: "drawings"
    }, {
        name: "Projet 4",
        description: "Description du Projet 4...",
        category: "scenography"
    }];

    function showThumbnails(categoryName) {
        projectContent.innerHTML = "";
        projectData.forEach(function (project) {
            if (project.category === categoryName) {
                var projectThumbnail = document.createElement("div");
                projectThumbnail.classList.add("project-thumbnail");
                projectThumbnail.innerHTML = "<h2>" + project.name + "</h2><p>" + project.description + "</p>";
                projectContent.appendChild(projectThumbnail);
                projectThumbnail.addEventListener("click", function () {
                    showProject(project);
                    loadProjectInfo(project.name);
                });
            }
        });
        projectThumbnails.forEach(function (thumbnail) {
            thumbnail.style.display = "block";
        });
    }

    // Déclaration de textMenu pour la partie "Textes"
    var textMenu = document.querySelector(".project-category[data-category=\"texts\"]");

    // Ajout de l'écouteur d'événements pour la partie "Textes"
    textMenu.addEventListener("click", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://maxdcrd.com/content/Textes/Ce_qui_s_entasse.txt", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var content = xhr.responseText;
                var textContainer = document.getElementById("project-info");
                textContainer.innerHTML = content;
            }
        };
        xhr.send();
    });

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
    contactFooter.addEventListener('click', function (event) {
        // Empêcher le comportement par défaut du lien
        event.preventDefault();

        // Vérifier si le clic a été effectué sur le lien "Contact"
        if (event.target.classList.contains('footer__item')) {
            // Afficher une vignette de contact
            var contactThumbnail = document.createElement("div");
            contactThumbnail.classList.add("contact-thumbnail");
            contactThumbnail.innerHTML = "<p>maxdcrd@protonmail.com</p>";
            projectContent.innerHTML = ''; // Effacer le contenu actuel
            projectContent.appendChild(contactThumbnail);
        }
    });
});
