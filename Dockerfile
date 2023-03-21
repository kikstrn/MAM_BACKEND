#L’image docker sera basé sur node en version 16
FROM node:16

#On se place dans un dossier ou toute l’application sera installé
WORKDIR /usr/src/app

#On copie le package.json dans le dossier /usr/src/app
COPY package*.json ./

#On lance le téléchargement des module présent dans le package.json
RUN npm install

#On copie les fichier présent dans le dossier /usr/src/app
COPY . .

#On build le projet
RUN npm run build

#Cette commande sera exécutée au lancement du container
CMD ["npm", "run", "start:prod"]
