$(document).ready(function () {
    console.log('Script initialisé.');

    // Navigation dynamique remplacée par un rechargement complet
    $('.dynamic-link').click(function (event) {
        event.preventDefault();
        window.location.href = $(this).attr('href'); // Redirige vers la page entière
    });

    // Chargement dynamique du header
    $('#header-placeholder').load('/header.html', function (response, status) {
        if (status === "error") {
            console.error("Erreur lors du chargement du header.");
        }
    });

    // Chargement dynamique du footer
    $('#footer-placeholder').load('/footer.html', function (response, status) {
        if (status === "error") {
            console.error("Erreur lors du chargement du footer.");
        }
        $('footer').css({
            left: '0',
            bottom: '0',
            width: '100%',
            position: 'fixed',
        });
    });

    // Fonction pour charger le contenu d'une page
    function loadPageContent(pageUrl) {
        $('#project-content').load(pageUrl + ' #project-content > *', function (response, status, xhr) {
            console.log('Statut de chargement :', status);
            if (status === "error") {
                console.error('Erreur lors du chargement :', xhr.status, xhr.statusText);
            } else {
                console.log('Contenu chargé pour :', pageUrl);
                console.log('HTML chargé :', $('#project-content').html());
                console.log('Nombre de vignettes détectées après chargement :', $('#project-thumbnails .project-thumbnail').length);

                // Réinitialiser les styles ou classes spécifiques
            $('#project-thumbnails').removeClass('dragging');
            $('footer').css('visibility', 'visible'); // Réafficher le footer si masqué
            }
        
            // Attacher les gestionnaires pour les nouvelles vignettes
            setupThumbnailClickHandlers();
        });
    }

    // Gestion de l'historique pour les boutons précédent et suivant du navigateur
    window.onpopstate = function (event) {
        if (event.state) {
            loadPageContent(event.state.path);
        }
    };

    // Gestion des clics pour les liens du menu "Textes"
    $('nav a.load-textes').click(function (event) {
        event.preventDefault();
        var pageUrl = $(this).attr('href');
        $('#project-content').html(''); // Vider le contenu existant
        fetch('content/Textes/Textes.txt' + '?nocache=' + Math.random())
            .then(response => response.text())
            .then(text => {
                $('#project-content').html('<pre class="text-pre">' + text + '</pre>');
                setupThumbnailClickHandlers();
            });
    });

    // Gestion des clics pour les liens du menu "Contact"
    $('.footer__item.dynamic-link').click(function (event) {
        event.preventDefault();
        var pageUrl = $(this).attr('href');
        $('#project-content').empty(); // Vider le contenu existant
        console.log("Clic sur le lien 'Bio / Contact'");
        fetch('content/Bio/biographie.txt' + '?nocache=' + Math.random())
            .then(response => response.text())
            .then(text => {
                $('#project-content').html('<pre class="text-pre">' + text + '</pre>');
                setupThumbnailClickHandlers();
            });
    });

    // Fonction pour gérer les clics sur les vignettes
    function setupThumbnailClickHandlers() {
        console.log('Setup des gestionnaires pour les vignettes.');
        console.log('Nombre de vignettes disponibles :', $('#project-thumbnails .project-thumbnail').length);

        $('#project-thumbnails').on('click', '.project-thumbnail', function (event) {
            event.preventDefault();
            console.log('Clic détecté sur une vignette.');

            var youtubeID = $(this).data('youtube-id');
            var fullImage = $(this).data('full-image');
            var imagePaths = $(this).data('images') ? $(this).data('images').split(',') : [];
            var imageTitle = $(this).data('title');
            var explicativeText = $(this).data('text');
            var containerHTML = '<h2>' + imageTitle + '</h2>';

            console.log({ youtubeID, fullImage, imagePaths, imageTitle, explicativeText });

            if (youtubeID) {
                containerHTML += `<iframe width="1120" height="630" src="https://www.youtube.com/embed/${youtubeID}" frameborder="0" allowfullscreen></iframe>`;
            } else if (fullImage) {
                containerHTML += `<img src="${fullImage}" alt="${imageTitle}">`;
            }

            if (imagePaths.length > 0) {
                imagePaths.forEach(path => {
                    containerHTML += `<img src="${path.trim()}" alt="${imageTitle}">`;
                });
            }

            if (explicativeText) {
                containerHTML += `<div id="explicative-text-container"><p class="explicative-text">${explicativeText}</p></div>`;
            }

            $('#full-image-container').html(containerHTML);
        });
    }

    // Initialiser les gestionnaires de clic sur les vignettes
    setupThumbnailClickHandlers();
});
