// script.js

document.addEventListener("DOMContentLoaded", function () {
    var hasSubmenus = document.querySelectorAll('.has-submenu');
    
    // Variable pour suivre l'état du sous-menu
    var submenuOpen = false;

    // Variable pour suivre l'état du projet ou sous-projet actuellement affiché
    var currentProject = null;

    // Variable pour stocker le dernier emplacement du projet ou sous-projet
    var lastProjectPosition = null;

    // Gestion de l'affichage au survol
    hasSubmenus.forEach(function (item) {
        item.addEventListener('mouseover', function () {
            if (!submenuOpen) {
                // Ouvrez le sous-menu actuel seulement si le clic n'a pas été effectué
                this.querySelector('.submenu').style.display = 'block';
                shiftMenuDown();
            }
        });

        item.addEventListener('mouseout', function () {
            if (!submenuOpen) {
                // Fermez le sous-menu seulement si le clic n'a pas été effectué
                this.querySelector('.submenu').style.display = 'none';
                shiftMenuUp();
            }
        });
    });

    // Gestion de l'affichage au clic avec maintien
    hasSubmenus.forEach(function (item) {
        item.addEventListener('click', function (event) {
            // Inversez l'état du sous-menu
            submenuOpen = !submenuOpen;

            // Fermez tous les autres sous-menus
            closeAllSubmenus();

            // Ouvrez ou fermez le sous-menu actuel
            var submenu = this.querySelector('.submenu');
            submenu.style.display = submenuOpen ? 'block' : 'none';

            // Faites glisser le reste du menu en dessous ou remontez-le
            if (submenuOpen) {
                shiftMenuDown();
            } else {
                shiftMenuUp();
            }

            // Empêchez la propagation du clic pour éviter la fermeture immédiate
            event.stopPropagation();

            // Récupérez le nom du projet ou sous-projet
            var projectName = this.dataset.project;

            // Affichez le projet ou sous-projet
            showProject(projectName);

            // Mettez à jour l'état du projet ou sous-projet actuellement affiché
            currentProject = projectName;

            // Stockez la position actuelle du projet ou sous-projet
            lastProjectPosition = getProjectPosition();
        });
    });

    // Fermez tous les sous-menus sauf celui actuellement cliqué
    function closeAllSubmenus() {
        hasSubmenus.forEach(function (item) {
            if (item !== event.currentTarget) {
                var submenu = item.querySelector('.submenu');
                submenu.style.display = 'none';
            }
        });
    }

    // Faites glisser le reste du menu en dessous
    function shiftMenuDown() {
        var projectContent = document.getElementById("project-content");
        projectContent.classList.add("shifted");
        projectContent.style.height = 'auto'; // Ajustez la hauteur selon vos besoins
    }

    // Remontez le reste du menu
    function shiftMenuUp() {
        var projectContent = document.getElementById("project-content");
        projectContent.classList.remove("shifted");
    }

    // Fonction pour afficher le projet ou sous-projet
    function showProject(projectName) {
        var projectContent = document.getElementById("project-content");

        // Vérifiez si le projet est déjà affiché
        if (currentProject !== projectName) {
            // Récupérez la référence à l'élément parent du sous-menu
            var submenuParent = document.querySelector('.has-submenu');

            // Ajoutez une classe pour décaler vers la droite
            projectContent.classList.add("shifted");

            // Ajoutez une classe pour ajuster la hauteur du parent du sous-menu
            submenuParent.classList.add("active");

            // Contenu fictif pour chaque projet ou sous-projet (vous pouvez remplacer cela par vos propres données)
            var content = "";
            switch (projectName) {
                case 'Projet 1':
                    content = "<h2>Costumes</h2><p>Description du Projet 1...</p>";
                    break;
                case 'Projet 2':
                    content = "<h2>Dessins</h2><p>Description du Projet 2...</p>";
                    break;
                case 'Projet 3':
                    content = "<h2>Textes</h2><p>Description du Projet 3...</p>";
                    break;
                case 'Sous-Projet 1-1':
                    content = "<h2>Sous-Projet 1-1</h2><p>Description du Sous-Projet 1-1...</p>";
                    break;
                case 'Sous-Projet 1-2':
                    content = "<h2>Sous-Projet 1-2</h2><p>Description du Sous-Projet 1-2...</p>";
                    break;
                // Ajoutez des cas pour d'autres projets ou sous-projets au besoin
                default:
                    content = "<p>Sélectionnez un projet ou sous-projet pour afficher le contenu.</p>";
            }

            // Mettez à jour le contenu de la balise main avec le contenu du projet ou sous-projet sélectionné
            projectContent.innerHTML = content;

            // Replacez le projet ou sous-projet à sa dernière position connue
            if (lastProjectPosition) {
                setProjectPosition(lastProjectPosition);
            }
        }
    }

    // Fonction pour récupérer la position du projet ou sous-projet
    function getProjectPosition() {
        var projectContent = document.getElementById("project-content");
        return {
            top: projectContent.style.top,
            left: projectContent.style.left
        };
    }

    // Fonction pour définir la position du projet ou sous-projet
    function setProjectPosition(position) {
        var projectContent = document.getElementById("project-content");
        projectContent.style.top = position.top;
        projectContent.style.left = position.left;
    }

    // Ajoutez un gestionnaire de clic sur le contenu du projet pour maintenir l'affichage
    var projectContent = document.getElementById("project-content");
    projectContent.addEventListener('click', function (event) {
        event.stopPropagation(); // Empêchez la propagation du clic à la fenêtre principale
    });

    // Fermez les sous-menus lorsqu'on clique ailleurs dans le document
    document.addEventListener('click', function () {
        closeAllSubmenus();
        submenuOpen = false; // Réinitialisez l'état du sous-menu
        shiftMenuUp(); // Remontez le reste du menu
    });

    // Empêchez la fermeture du sous-menu lorsqu'on clique dessus
    hasSubmenus.forEach(function (item) {
        item.querySelector('.submenu').addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});
