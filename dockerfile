# Étape 1 : Utiliser une image Node.js pour construire et exécuter le projet
FROM node:18 AS runtime

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour le backend et le frontend
COPY server/package*.json ./server/
COPY client/package*.json ./client/
COPY . .

# Installer les dépendances du backend et construire le frontend
WORKDIR /app/server
RUN npm install
RUN npm run heroku-postbuild

# Définir les variables d'environnement pour le mode production
ENV NODE_ENV=production

# Exposer le port utilisé par le backend
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
