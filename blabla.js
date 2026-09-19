/* ==================================================
   CRÉER LE COMPTE
================================================== */

function creerCompte() {

    // On récupère ce que l'élève a écrit
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const classe = document.getElementById("classe").value.trim();
    const email = document.getElementById("email").value.trim();


    // NOM obligatoire
    if (nom === "") {

        alert("Veuillez entrer votre nom.");

        return;
    }


    // PRÉNOM obligatoire
    if (prenom === "") {

        alert("Veuillez entrer votre prénom.");

        return;
    }


    // On crée le profil
    const profil = {

        nom: nom,

        prenom: prenom,

        classe: classe,

        email: email

    };


    // On enregistre le profil dans le navigateur
    localStorage.setItem(
        "profilEJM",
        JSON.stringify(profil)
    );


    // On affiche la page d'assistance
    afficherAssistance();

}


/* ==================================================
   AFFICHER LA PAGE D'ASSISTANCE
================================================== */

function afficherAssistance() {

    // Cacher la page de création du compte
    document.getElementById("pageCompte").style.display = "none";


    // Afficher la page d'assistance
    document.getElementById("pageAssistance").style.display = "block";


    // Afficher les informations du profil
    afficherProfil();


    // Afficher les anciennes demandes
    afficherDemandes();

}


/* ==================================================
   AFFICHER LE PROFIL
================================================== */

function afficherProfil() {

    // On récupère le profil
    const donnees = localStorage.getItem("profilEJM");


    // S'il n'y a pas de profil
    if (!donnees) {

        return;

    }


    // Transformer les données en objet
    const profil = JSON.parse(donnees);


    // Bonjour + prénom
    document.getElementById("bonjour").textContent =
        "Bonjour " + profil.prenom + " 👋";


    // Prénom dans le menu en haut
    document.getElementById("nomDansMenu").textContent =
        profil.prenom;


    // Nom + prénom dans le profil
    document.getElementById("profilNom").textContent =
        profil.prenom + " " + profil.nom;


    // Email
    document.getElementById("profilEmail").textContent =
        profil.email || "Email non renseigné";

}


/* ==================================================
   OUVRIR LE MENU DU PROFIL
================================================== */

function ouvrirMenu() {

    const menu =
        document.getElementById("menuProfil");


    menu.classList.toggle("actif");

}


/* ==================================================
   MODIFIER LE PROFIL
================================================== */

function modifierProfil() {

    // Récupérer le profil
    const donnees =
        localStorage.getItem("profilEJM");


    if (!donnees) {

        return;

    }


    const profil = JSON.parse(donnees);


    // Mettre les informations dans les champs
    document.getElementById("modifierNom").value =
        profil.nom;

    document.getElementById("modifierPrenom").value =
        profil.prenom;

    document.getElementById("modifierClasse").value =
        profil.classe || "";

    document.getElementById("modifierEmail").value =
        profil.email || "";


    // Fermer le menu
    document.getElementById("menuProfil")
        .classList.remove("actif");


    // Ouvrir la fenêtre
    document.getElementById("fenetreProfil")
        .classList.add("actif");

}


/* ==================================================
   SAUVEGARDER LA MODIFICATION DU PROFIL
================================================== */

function sauvegarderModification() {

    const nom =
        document.getElementById("modifierNom").value.trim();

    const prenom =
        document.getElementById("modifierPrenom").value.trim();

    const classe =
        document.getElementById("modifierClasse").value.trim();

    const email =
        document.getElementById("modifierEmail").value.trim();


    // Nom obligatoire
    if (nom === "") {

        alert("Le nom est obligatoire.");

        return;

    }


    // Prénom obligatoire
    if (prenom === "") {

        alert("Le prénom est obligatoire.");

        return;

    }


    // Nouveau profil
    const profil = {

        nom: nom,

        prenom: prenom,

        classe: classe,

        email: email

    };


    // Enregistrer
    localStorage.setItem(
        "profilEJM",
        JSON.stringify(profil)
    );


    // Fermer la fenêtre
    fermerProfil();


    // Mettre à jour l'écran
    afficherProfil();


    alert("Votre profil a été modifié.");

}


/* ==================================================
   FERMER LA FENÊTRE DU PROFIL
================================================== */

function fermerProfil() {

    document.getElementById("fenetreProfil")
        .classList.remove("actif");

}


/* ==================================================
   CHOISIR UNE PHOTO
================================================== */

function photoChoisie() {

    const fichier =
        document.getElementById("photo").files[0];


    if (fichier) {

        document.getElementById("photoNom").textContent =
            "✓ " + fichier.name;

    }

}


/* ==================================================
   ENVOYER UNE DEMANDE
================================================== */

function envoyerDemande() {

    // Récupérer le profil
    const donnees =
        localStorage.getItem("profilEJM");


    // Pas de profil = impossible d'envoyer
    if (!donnees) {

        alert("Vous devez d'abord créer votre compte.");

        return;

    }


    const profil = JSON.parse(donnees);


    // Récupérer le problème
    const probleme =
        document.getElementById("probleme")
        .value
        .trim();


    // Vérifier que le problème existe
    if (probleme === "") {

        alert("Veuillez décrire votre problème.");

        return;

    }


    // Récupérer la photo
    const fichier =
        document.getElementById("photo").files[0];


    // Récupérer les anciennes demandes
    const demandes =
        JSON.parse(
            localStorage.getItem("demandesEJM") || "[]"
        );


    // Créer la nouvelle demande
    const demande = {

        nom: profil.nom,

        prenom: profil.prenom,

        classe: profil.classe,

        email: profil.email,

        probleme: probleme,

        photo: fichier
            ? fichier.name
            : "",

        date: new Date().toLocaleDateString("fr-FR"),

        statut: "En attente",

        reponse:
            "Votre demande a bien été reçue. Nous allons la traiter."

    };


    // Ajouter la demande au début de la liste
    demandes.unshift(demande);


    // Enregistrer les demandes
    localStorage.setItem(
        "demandesEJM",
        JSON.stringify(demandes)
    );


    // Vider la zone de problème
    document.getElementById("probleme").value = "";


    // Enlever la photo
    document.getElementById("photo").value = "";


    document.getElementById("photoNom").textContent = "";


    // Actualiser la liste
    afficherDemandes();


    alert("Votre demande a été envoyée.");

}


/* ==================================================
   AFFICHER LES DEMANDES
================================================== */

function afficherDemandes() {

    const liste =
        document.getElementById("listeDemandes");


    // Récupérer les demandes
    const demandes =
        JSON.parse(
            localStorage.getItem("demandesEJM") || "[]"
        );


    // Aucune demande
    if (demandes.length === 0) {

        liste.innerHTML = `

            <div class="aucune-demande">

                <span>📭</span>

                <p>
                    Vous n'avez encore envoyé
                    aucune demande.
                </p>

            </div>

        `;

        return;

    }


    // Vider la liste avant de la reconstruire
    liste.innerHTML = "";


    // Parcourir toutes les demandes
    demandes.forEach(function(demande, index) {


        // Classe CSS du statut
        let classeStatut = "attente";


        if (demande.statut === "En cours") {

            classeStatut = "en-cours";

        }


        if (demande.statut === "Résolue") {

            classeStatut = "resolue";

        }


        // Créer une nouvelle boîte
        const element =
            document.createElement("div");


        element.className =
            "demande-item";


        element.innerHTML = `

            <div class="demande-top">

                <div>

                    <p class="demande-question">

                        ${texteCourt(demande.probleme)}

                    </p>

                    <div class="date-demande">

                        ${demande.date}

                    </div>

                </div>


                <span class="statut ${classeStatut}">

                    <span class="point"></span>

                    ${demande.statut}

                </span>

            </div>


            <button
                class="voir-demande"
                onclick="voirDemande(${index})"
            >

                Voir la demande

            </button>

        `;


        liste.appendChild(element);

    });

}


/* ==================================================
   VOIR UNE DEMANDE
================================================== */

function voirDemande(index) {

    const demandes =
        JSON.parse(
            localStorage.getItem("demandesEJM") || "[]"
        );


    const demande = demandes[index];


    // Afficher les informations
    document.getElementById("detailDemande").innerHTML = `

        <div class="detail-bloc">

            <h3>
                Mon problème
            </h3>

            <p>
                ${demande.probleme}
            </p>

        </div>


        <div class="detail-bloc">

            <h3>
                Photo / capture
            </h3>

            <p>

                ${
                    demande.photo
                    ? "📷 " + demande.photo
                    : "Aucune photo jointe."
                }

            </p>

        </div>


        <div class="detail-bloc">

            <h3>
                Statut
            </h3>

            <p>
                ${demande.statut}
            </p>

        </div>


        <div class="detail-bloc">

            <h3>
                Réponse
            </h3>

            <p>
                ${demande.reponse}
            </p>

        </div>

    `;


    // Ouvrir la fenêtre
    document.getElementById("fenetreDemande")
        .classList.add("actif");

}


/* ==================================================
   FERMER UNE DEMANDE
================================================== */

function fermerDemande() {

    document.getElementById("fenetreDemande")
        .classList.remove("actif");

}


/* ==================================================
   DÉCONNEXION
================================================== */

function deconnexion() {

    // Supprimer uniquement le profil
    localStorage.removeItem("profilEJM");


    // Revenir à la page de création du compte
    location.reload();

}


/* ==================================================
   COUPER UN TEXTE TROP LONG
================================================== */

function texteCourt(texte) {

    if (texte.length > 55) {

        return texte.substring(0, 55) + "...";

    }

    return texte;

}


/* ==================================================
   AU DÉMARRAGE DU SITE
================================================== */

window.addEventListener("load", function() {

    // Vérifier si un compte existe
    const profil =
        localStorage.getItem("profilEJM");


    if (profil) {

        // Le compte existe :
        // on va directement à l'assistance

        afficherAssistance();

    } else {

        // Pas de compte :
        // on affiche la création du compte

        document.getElementById("pageCompte")
            .style.display = "flex";


        document.getElementById("pageAssistance")
            .style.display = "none";

    }

});
