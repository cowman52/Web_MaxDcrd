document.addEventListener("DOMContentLoaded", function () {
    var hasSubmenus = document.querySelectorAll('.has-submenu');
    
    // Variable to track the state of the submenu
    var submenuOpen = false;

    // Variable to track the currently displayed project or sub-project
    var currentProject = null;

    // Variable to store the last position of the project or sub-project
    var lastProjectPosition = null;

    // Handling display on hover
    hasSubmenus.forEach(function (item) {
        item.addEventListener('mouseover', function () {
            if (!submenuOpen) {
                // Open the current submenu only if click has not been performed
                this.querySelector('.submenu').style.display = 'block';
                shiftMenuDown();
            }
        });

        item.addEventListener('mouseout', function () {
            if (!submenuOpen) {
                // Close the submenu only if click has not been performed
                this.querySelector('.submenu').style.display = 'none';
                shiftMenuUp();
            }
        });
    });

    // Handling display on click and hold
    hasSubmenus.forEach(function (item) {
        item.addEventListener('click', function (event) {
            // Toggle the state of the submenu
            submenuOpen = !submenuOpen;

            // Close all other submenus
            closeAllSubmenus();

            // Open or close the current submenu
            var submenu = this.querySelector('.submenu');
            submenu.style.display = submenuOpen ? 'block' : 'none';

            // Slide the rest of the menu down or up
            if (submenuOpen) {
                shiftMenuDown();
            } else {
                shiftMenuUp();
            }

            // Prevent click propagation to avoid immediate closure
            event.stopPropagation();

            // Get the name of the project or sub-project
            var projectName = this.dataset.project;

            // Display the project or sub-project
            showProject(projectName);

            // Update the state of the currently displayed project or sub-project
            currentProject = projectName;

            // Store the current position of the project or sub-project
            lastProjectPosition = getProjectPosition();
        });
    });

    // Close all submenus except the one currently clicked
    function closeAllSubmenus() {
        hasSubmenus.forEach(function (item) {
            if (item !== event.currentTarget) {
                var submenu = item.querySelector('.submenu');
                submenu.style.display = 'none';
            }
        });
    }

    // Slide the rest of the menu down
    function shiftMenuDown() {
        var projectContent = document.getElementById("project-content");
        projectContent.classList.add("shifted");
        projectContent.style.height = 'auto'; // Adjust height as needed
    }

    // Slide the rest of the menu up
    function shiftMenuUp() {
        var projectContent = document.getElementById("project-content");
        projectContent.classList.remove("shifted");
    }

    // Function to display the project or sub-project
    function showProject(projectName) {
        var projectContent = document.getElementById("project-content");

        // Check if the project is already displayed
        if (currentProject !== projectName) {
            // Get a reference to the parent element of the submenu
            var submenuParent = document.querySelector('.has-submenu');

            // Add a class to shift right
            projectContent.classList.add("shifted");

            // Add a class to adjust the height of the submenu parent
            submenuParent.classList.add("active");

            // Dummy content for each project or sub-project (replace with your own data)
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
                default:
                    content = "<p>Sélectionnez un projet ou sous-projet pour afficher le contenu.</p>";
            }

            // Update the content of the main tag with the content of the selected project or sub-project
            projectContent.innerHTML = content;

            // Return the project or sub-project to its last known position
            if (lastProjectPosition) {
                setProjectPosition(lastProjectPosition);
            }
        }
    }

    // Function to get the position of the project or sub-project
    function getProjectPosition() {
        var projectContent = document.getElementById("project-content");
        return {
            top: projectContent.style.top,
            left: projectContent.style.left
        };
    }

    // Function to set the position of the project or sub-project
    function setProjectPosition(position) {
        var projectContent = document.getElementById("project-content");
        projectContent.style.top = position.top;
        projectContent.style.left = position.left;
    }

    // Add a click handler on the project content to maintain display
    var projectContent = document.getElementById("project-content");
    projectContent.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click propagation to the main window
    });

    // Close submenus when clicking elsewhere in the document
    document.addEventListener('click', function () {
        closeAllSubmenus();
        submenuOpen = false; // Reset submenu state
        shiftMenuUp(); // Slide the rest of the menu up
    });

    // Prevent closure of submenu when clicking on it
    hasSubmenus.forEach(function (item) {
        item.querySelector('.submenu').addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});
