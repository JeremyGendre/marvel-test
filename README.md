# Marvel Test

Bienvenue sur ce projet Marvel :D 

*Réalisé par Jérémy Gendre*

Application déployée sur heroku : https://jg-marvel-api-test.herokuapp.com/

## Installation

- Copiez-collez le fichier `.env` et créez un fichier `.env.local` dans lequel vous renseignez  les valeurs de `REACT_APP_API_KEY` (clé publique de l'API Marvel) et `REACT_APP_HASH` (le hash créé à partir des clés publique et privée et du timestamp (1 ici, comme indiqué dans le fichier `src/config/config.ts`))
- `yarn install` ou `npm install`
- `yarn start` ou `npm run start` => démarre de serveur de développement local
- Allez sur http://localhost:3000/, où l'url que l'invite que commande vous indique après le lancement de la commande précédente

## Technologies

Pour ce projet, j'utilise le framework front **React** avec **Typescript**. J'utilise le framework CSS **Tailwind** pour le style. Les appels API sont réalisés à l'aide de la librairie **axios**.

## Structure

Concernant la structure de fichier que j'ai appliqué :

- `src/components` : tous les composants réutilisables un peu partout dans l'appli
- `src/config/config.ts` : le fichier de config, avec notamment l'url de base de l'API ainsi que les clés (se basant sur un fichier d'environnement .env ou .env.local)
- `src/context` : les contextes de l'appli, permettant d'utiliser des états partout
- `src/helpers` : les fichiers permettant d'apporter des fonctions utiles, tels que des `hook` personnalisés.
- `src/models` : les interfaces des différents objets et types utilisés dans l'appli
- `src/pages` : les différentes pages de l'appli 

## Réalisation

J'ai voulu aller un peu plus loin que le sujet demandé. J'ai géré 3 listings différents : Personnages (Characters), Comics (Comics) et Séries (Series).
L'application est en anglais. Je suis parti sur une partie front car l'API Marvel est utilisable telle quelle. Une autre solution aurait pu être une surcouche API à celle de Marvel.
 
Il y a 4 lien dans le Header : 

- Home : page d'accueil où l'on retrouve les listings simplifiés des 6 premiers éléments de chaque listing
- Characters : page de listing des personnages
- Comics : page de listing des comics
- Series : page de listing des séries

Pour chaque page de listing, on retrouve les éléments avec un système de pagination. Par défaut, la limite d'éléments de chaque page est de 20 mais cette valeur peut évidemment être modifiée dans le fichier `/src/models/Pagination.ts` (`DEFAULT_LIMIT`). La pagination est inscrite dans l'url, de façon à permettre de retrouver la page où on était si besoin. Exemple : `http://localhost:3000/characters?page=3&limit=20`

De plus, j'ai ajouté un système de recherche à la saisie (avec un système de debounce pour faire le moins de requêtes API possible = j'attends 500ms après que l'utilisateur ait fini de saisir pour lancer la recherche).

Ensuite, que ce soit sur la page Home ou et les pages de listing, on retrouve un composant `Card` permettant d'accéder, lors d'un clic, à la page de détail de l'élément cliqué.

La page de détail reprend certains éléments pertinents de l'élément choisi (nom, description, image, etc.)

J'ai géré les différentes erreurs pouvant survenir lors des requêtes et affiché un message d'erreur dans ce cas.

Temps approximatif passé sur la réalisation du projet : plus ou moins une journée.
Je n'ai pas rencontré de problèmes significatifs.

## Pour aller plus loin

Si je devais aller plus loin, voici quelques pistes sur lesquelles j'avancerais :

- Améliorer le style global
- Gérer plus de filtres dans les listing
- Gérer plus d'éléments venant de l'API Marvel (events, stories, etc.)
- Continuer en profondeur les fiches de détails de chaque "item" (personnage, comic, etc.)
- Mieux gérer le cache.
- Faire une PWA (progressive web app), notamment grâce au point précédent.

