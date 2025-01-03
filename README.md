Mon Portfolio

Un portfolio moderne et dynamique construit avec un frontend React et un backend Node.js/Express, conçu pour être déployé sur Render en tant qu'application monolithique ou hébergée séparément.
Architecture du Projet

Le projet est organisé en trois parties principales :

    Root : Configuration globale pour le déploiement, incluant les scripts de démarrage et de build.
    Client : Frontend construit avec React, situé dans le répertoire client/.
    Server : Backend basé sur Node.js et Express, situé dans le répertoire server/.

Déploiement sur Render

L'application est configurée pour un déploiement monolithique où le backend sert les fichiers statiques du frontend. Voici les directives utilisées sur Render :
Directives Render
Paramètre	Valeur
Root Directory	/server
Build Command	npm install && npm run heroku-postbuild
Start Command	npm start
Explication des Commandes

    Build Command :
        Installe toutes les dépendances nécessaires.
        Exécute heroku-postbuild, qui installe les dépendances backend et construit le frontend dans client/build.

    Start Command :
        Démarre le backend, qui sert également les fichiers construits du frontend.

Scripts Disponibles

Les principaux scripts définis dans le fichier package.json facilitent le développement et le déploiement :
Script	Description
npm start	Lance simultanément le frontend et le backend en mode local.
npm run server	Lance uniquement le backend avec nodemon pour le développement.
npm run client	Démarre uniquement le frontend en mode développement.
npm run build	Construit le frontend dans client/build pour le déploiement.
heroku-postbuild	Installe les dépendances backend et construit le frontend pour la production.
Démarrage en Local

Pour exécuter le projet localement, suivez ces étapes :

    Cloner le dépôt :

git clone <URL-du-dépôt>
cd <répertoire-du-projet>

Installer les dépendances :

npm install

Créer un fichier .env dans le répertoire server/ avec les variables nécessaires :

MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email-user
EMAIL_PASS=your-email-password
ALTCHA_API_SECRET=your-altcha-secret

Lancer le projet en mode développement :

    npm start

        Le frontend sera accessible sur http://localhost:3000.
        Le backend répondra sur le même port grâce à un proxy configuré.

Détails du Serveur Express
Fichiers Statistiques

Le backend est configuré pour servir les fichiers construits du frontend depuis client/build :

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

Gestion des Routes

Pour gérer les routes non reconnues côté backend, le serveur redirige vers l'application React :

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

Séparation Frontend et Backend pour Hébergement Indépendant

Si vous souhaitez déployer le frontend et le backend séparément :

    Backend :
        Commentez ou supprimez cette ligne dans le fichier server/app.js :

        app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    Frontend :
        Hébergez le frontend sur une plateforme comme Netlify ou Vercel.
        Configurez une URL d'API ou un proxy pour pointer vers le backend.

Cela permet de déployer, maintenir et mettre à jour chaque partie indépendamment.
Fonctionnalités Clés

    Authentification Sécurisée :
        Utilisation de JWT pour gérer les tokens.
        Hashing sécurisé des mots de passe avec bcrypt.

    Gestion des Projets :
        CRUD complet (ajout, modification, suppression et récupération des projets).
        Récupération dynamique des projets depuis MongoDB.

    Formulaire de Contact :
        Sécurisé avec ALTCHA Captcha pour éviter les abus.
        Envoi d'emails via nodemailer et SMTP.

    Sécurisation et Performance :
        Limitation des requêtes avec express-rate-limit.
        Gestion des CORS pour des requêtes cross-origin (si besoin).

Auteur

Créé par Yoann Sousa.
Pour toute question ou suggestion, contactez-moi à : contacter-moi@ysportfolio.fr