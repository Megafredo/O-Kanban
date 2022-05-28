# oKanban

## Jour 3 : Mise en place API

### Archi

Mettre en place l'architecture "classique" d'une projet express :

- installer les dépendances nécessaires avec npm.
- dossier `app/controllers`.
- fichier `app/router.js`.
- point d'entrée `index.js`.

### Le Train-train Express

Mettre en place le fichier `index.js`. Oui c'est vrai, c'est un peu toujours la même chose...

Note: pensez qu'on va faire des routes POST ! (donc avec des body ...)

### Premiers controller, premières routes

En respectant au maximum les principes de l'architecture REST, et [le tableau de routes fait ensemble](./doc/routes_REST.md), implémentez tout ce que vous pouvez !

- commencez plutôt par les routes GET
- puis les POST
- puis les PATCH
- et enfin les DELETE
- ceci n'est qu'un conseil ! si vous préférez faire toutes les "/list" d'abord, libre à vous !

Pour tester toutes ces routes, il existe plusieurs solutions, mais la plus simple reste d'utiliser un petit logiciel :

- [Insomnia](https://support.insomnia.rest/article/23-installation#ubuntu)
- [POSTMAN](https://www.getpostman.com/)
- [VSC REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- y'en a probablement d'autres...

---

| URL | GET | POST | PATCH | DELETE | PUT |
|---|---|---|---|---|---|
| /lists | récupérer toutes les listes | créer une liste | mettre à jour toutes les listes (❌) | supprimer toutes les listes (❌) | remplacer toutes les listes (❌) |
| /lists/:id | récupérer UNE liste via son ID | créer une listes en fixant son id d'avance (❌) | mettre à jour une liste via son ID | supprimer une liste via son ID | remplacer entièrement liste (❌) |
| |
| /cards | récupérer toutes les cartes | créer une carte | mettre à jour toutes les cartes (❌) | supprimer toutes les cartes (❌) | remplacer toutes les cartes (❌)
| /cards/:id | récupérer UNE carte via son ID | créer une carte en fixant son id d'avance (❌) | mettre à jour une carte via son ID | supprimer une carte via son ID | remplacer entièrement une carte (❌) |
| |
| /tags| récupérer tous les labels | créer un label | mettre à jour tous les labels (❌) | supprimer tous les labels (❌) | remplacer tous les labels (❌)
| /tags/:id | récupérer UN label via son ID | créer un label en fixant son id d'avance (❌) | mettre à jour un label via son ID | supprimer un label via son ID | remplacer entièrement un label


(❌) = ne pas faire


### Cartes

En vous inspirant des spécifications sur les listes, mettre en place les routes suivantes :

| VERB | PATH | DESCRIPTION |
|--|--|--|
| GET | /cards | renvoie toutes les cartes existantes. |
| GET | /cards/:id | renvoie les détails de la carte demandée, avec les tags qui lui sont associés. |
| POST | /cards | crée une nouvelle carte (sans tags) et la retourne. |
| PATCH | /cards/:id | modifie une carte (ne modifie pas les tags). |
| DELETE | cards/:id | supprime une carte. |
| |
| GET | /lists/:id/cards | renvoie toutes les cartes d'une liste. Chaque carte doit porter les tags qui lui sont associés. |

### Tags

En vous inspirant des spécifications sur les listes, mettre en place les routes suivantes :

| VERB | PATH | DESCRIPTION |
|--|--|--|
| GET | /tags | renvoie tous les tags.
| POST | /tags | crée un nouveau tag.
| PATCH | /tags/:id | modifie un tag.
| DELETE | /tags/:id | supprime un tag.
| |
| PUT | /cards/:card_id/tags/:tag_id | associe un tag à la carte ciblée. Note : si on appelle plusieurs fois cette route, l'association ne doit être présent qu'une fois en base.
| DELETE | /cards/:card_id/tags/:tag_id | supprime l'as



## JOUR 2

### De "concept" à "logique"

En se basant sur le MCD et en utilisant [les règles basiques de transformation en MLD](https://kourou.oclock.io/ressources/fiche-recap/mld/), lister dans le fichier `doc/tables.md` les tables à créer ainsi que les champs qu'elles vont contenir.

Ne pas oublier de typer chaque champ de chaque table ! [Ici, la liste des types supportés par postgresl](https://www.postgresql.org/docs/9.2/datatype.html#DATATYPE-TABLE).

### Pas de fondations, pas de palais

Commencer par créer un utilisateur et une base de données pour notre projet.

[La fiche récap est ici](https://kourou.oclock.io/ressources/fiche-recap/postgresql/).

### Fichier de Définit

    {define:
       underscored:true, // passe du camelCase au snake_case (attention ne marche que dans un sens)
       createdAt:"created_at", // il est préférable de priviligié cette écriture
       updatedAt:"updated_at",  // car cette methode fonctionne dans les deux sens 
 
   } ,
   logging: false


module.exports = sequelize; crire des commentaires en SQL, `/* Comme ceci */`.

### Seeding

Le seeding est une opération qui consiste à insérer des données fictive dans la base de données afin de pouvoir tester son bon fonctionnement et mettre la logique de notre conception à l'épreuve du feu.

Dans le même fichier SQL que précédemment, après la définition des tables, écrire des instructions SQL pour insérer des données cohérentes dans toutes les tables. Ne pas oublier de remplir AUSSI les tables de liaison !!

### Run SQL, run !

Une fois le fichier complet, il est temps de l'executer. On peut se servir de la ligne de commande, ou d'un outil graphique type DBeaver, peu importe.

Rappel, pour executer un fichier SQL en ligne de commande dans PostGres : `psql -U user -f chemin/vers/fichier.sql`

### Models

Maintenant que la base de données est prête et qu'elle contient des données de test, on peut créer nos modèles Sequelize.

- Installer les packages nécessaires
- Créer les dossier habituels (`app` et `app/models`)
- Créer les modèles "façon Sequelize" (s'inspirer des projets précédents - OQuizz)
- Ne pas oublier les associations !

### Test

C'est l'heure de jouer ! Créer un fichier `test.js`, y importer les modèles, et faire quelques requêtes pour vérifier que tout fonctionne !

---

## Atelier Conception

### Description du projet

On refait Trello !

- On souhaite créer une application de type Kanban où il est possible de créer des cartes à l'intérieur de listes.
- L'utilisateur peut créer autant de listes qu'il désire et mettre autant de cartes à l'intérieur de ces listes.
- Chaque liste dispose d'un nom.
- Chaque carte dispose d'un titre, d'une position au sein de la liste, d'une couleur (optionnelle) et d'un ou plusieurs label(s) (optionnel(s))

On se base sur ce besoin pour créer le MCD de l'application.

**Important** : Pas question d'écrire la moindre ligne de SQL ! On s'arrête à la conception aujourd'hui. La mise en place effective de la BDD, c'est pour demain.

### Étape 1 : MCD

Déssinez le MCD en utilisant l'outils de votre choix : un papier et un crayon, [draw.io](https://draw.io), [Mocodo](http://mocodo.wingi.net/) ([fiche recap](https://kourou.oclock.io/ressources/fiche-recap/mocodo/)), [Whimsical](https://whimsical.com/), etc.

N'hésitez pas à faire un tour sur la [fiche recap du MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/).


### Étape 2 : User Stories

En tant que _client_, je veux _un document_ dans le but de _comprendre les fonctionnalités de mon application_.

Complètez le tableau dans le fichier [user_stories.md](./user_stories.md).
