# Mon Portfolio

Un portfolio moderne et dynamique, construit avec un frontend React et un backend Node.js/Express, évoluant vers une architecture sécurisée et conteneurisée avec Docker et Nginx pour l'hébergement sur un serveur privé.

## Architecture du Projet

Le projet est organisé en plusieurs parties principales :

- **Frontend** : Construit avec React, situé dans le répertoire `client/`, il fournit une interface utilisateur moderne et responsive.
- **Backend** : Basé sur Node.js et Express, situé dans le répertoire `server/`, il gère les API et la logique côté serveur.
- **Docker et Nginx** : Gèrent la conteneurisation et le reverse-proxy pour l'hébergement, permettant une configuration multi-site.

## Hébergement sur un Serveur Privé

Le projet est déployé sur un serveur OVH utilisant Docker Compose pour gérer les conteneurs et Nginx comme reverse-proxy.

### Configuration des Conteneurs avec Docker Compose

Voici la structure de `docker-compose.yml` :

```yaml
services:
  site:
    image: /*******/:latest
    container_name: portfolio_site
    environment:
      VIRTUAL_HOST: ysportfolio.fr,www.ysportfolio.fr
      LETSENCRYPT_HOST: ysportfolio.fr,www.ysportfolio.fr
      LETSENCRYPT_EMAIL: /******************/
    env_file:
      - ./portfolio/.env
    networks:
      - server_network

  nginx-proxy:
    image: jwilder/nginx-proxy
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs:ro
      - ./vhost.d:/etc/nginx/vhost.d
      - ./html:/usr/share/nginx/html
    networks:
      - server_network

  acme-companion:
    image: nginxproxy/acme-companion
    container_name: acme-companion
    environment:
      NGINX_PROXY_CONTAINER: nginx-proxy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./certs:/etc/nginx/certs:rw
      - ./vhost.d:/etc/nginx/vhost.d
      - ./html:/usr/share/nginx/html
    networks:
      - server_network

networks:
  server_network:
    external: true
```

### Fonctionnalités Clés de l'Hébergement

- **Nginx** : Gère les redirections et agit comme reverse-proxy.
- **HTTPS** : Assuré par Let's Encrypt pour des échanges sécurisés.
- **Gestion Multi-Site** : Permet d'héberger plusieurs sites grâce à Docker.

## Fonctionnalités Clés du Projet

- **Authentification Sécurisée** :
  - Utilisation de JWT pour gérer les sessions.
  - Hachage des mots de passe avec bcrypt.

- **Gestion des Projets** :
  - CRUD complet (ajout, modification, suppression et récupération des projets).
  - Stockage des projets dans une base MongoDB.

- **Formulaire de Contact** :
  - Captcha ALTCHA pour éviter les spams.
  - Envoi d'e-mails via nodemailer.

- **Performance et Sécurité** :
  - Limitation des requêtes avec express-rate-limit.
  - Optimisation de la livraison des contenus statiques.

## Instructions pour le Développement Local

### Prérequis
- Node.js et npm installés localement.
- Docker et Docker Compose pour la conteneurisation.

### Installation

1. Cloner le dépôt :
   ```bash
   git clone <URL-du-dépôt>
   cd <répertoire-du-projet>
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Créer un fichier `.env` dans `portfolio/` :
   ```env
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   EMAIL_USER=your-email-user
   EMAIL_PASS=your-email-password
   REACT_APP_ALTCHA_API_KEY=your-altcha-api-key
   ```

4. Lancer les conteneurs Docker :
   ```bash
   docker-compose up -d
   ```

### Accès au Site

- **Frontend** : Disponible sur [http://localhost:3000](http://localhost:3000).
- **Backend** : Disponible sur [http://localhost:5000](http://localhost:3001).

## Auteur

Créé par Yoann Sousa.
Pour toute question ou suggestion, contactez-moi à : contacter-moi@ysportfolio.fr.