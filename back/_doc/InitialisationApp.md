# Jour 02 - Suite

## Initialisation de l'app

### initialisation et installations des modules
    - npm init -y
    - Installations des modules npm à utiliser
      - npm i express dotenv express-session bcrypt email-validator pg sequelize

### Configuration du .ENV
  - Configuration du .ENV
    - En utilisant les variables d'environnement de postgres nous n'avons plus besoin de spécifier les informations de connexion dans la function getConnexion().
  ```sql
    - PGHOST=localhost
    - PGDATABASE=nomBDD
    - PGUSER=nomUser
    - PGPASSWORD=nomPassword
    - PGPORT=5432
```
### Préparation de l'index.js de notre APP
      - Préparation de l'index (Rajout dans package.json du "type": "module", pour utiliser l'import ES6)
      - importation du dotenv ( Module: import 'dotenv/config'; // CommonsJs : require('dotenv').config())
      - Créations des models

- Le point d'entrée de notre app `index.js`.
```js
    import 'dotenv/config'; // = Méthode ES Module --- Méthode CommunJs = require('dotenv').config()

    import express from 'express';
    const app = express();
    import {router} from './app/router/index.js' // Attention quand on import en ES Module il est important d'indiquer l'extension du fichier ".js" sous peine d'avoir une erreur de chemin

    //? exemple d'importation avec un export default (_404)
    import myError, { _400, _401 ,_403, _500 } from './app/controllers/errorController.js';

    app.use(router)
    app.use(myError);

    // Utilisation de l'opérateur de coalescence des nuls '??'
    const PORT = process.env.PORT ?? 3000
    app.listen(PORT, ()=>{
        console.log(`Server started on http://localhost:${PORT}`);
    });
```

#### Mise en place du CORS ( 2 méthodes )
#### Cors:

Cross Origin Ressource Sharing est une sécurité qui bloque tout appel à notre site, que cet appel soit effectué depuis un navigateur ou un serveur.

https://fr.wikipedia.org/wiki/Cross-origin_resource_sharing

Au sein de mon API, je vais autoriser des origines à venir effectuer des requêtes.

Dans la cadre de l'exercice, nous allons autoriser localhost:5000 à interroger localhost:3200.

Cette sécurité permet notamment de vérifier qui peut utiliser notre API. De plus c'est une protection éventuelle contre les DDOS (https://fr.wikipedia.org/wiki/Attaque_par_d%C3%A9ni_de_service)

Méthode 1 (Module NPM):
```js
// npm i cors
import cors from 'cors';
app.use(cors()); // on laisse tout passer
app.use(cors({
    origin: 'http://localhost:3200'
})); // on accepte seulement l'adresse indiqué

```

Méthode 2 (Sans Module NPM):

```js
// ~ -------------------------------------------- CORS
// on peu aussi autoriser toutes les connexions
// 'Access-Control-Allow-Origin', '*'
app.use((req, res, next) => {
res.set('Access-Control-Allow-Origin', 'http://localhost:3200');
next();
});
```
Documentation officiel :
```js
    res.set(field [, value])
    // Sets the response’s HTTP header field to value. 
    // To set multiple fields at once, pass an object as the parameter.
    // 1)
    res.set('Content-Type', 'text/plain')
    // 2)
    res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '123',
    ETag: '12345'
    })
    // 3)
    // Aliased as res.header(field [, value]).
```

### Créations des Models

#### Deux méthodes pour utilisé Model :

Méthode 1 : sequelize.define

```Javascript
    const { Sequelize, DataTypes } = require('sequelize');

    // permet de crée une instance dans la base de donnée
    const sequelize = new Sequelize('nomBDD', 'nomUSER', 'PASSWORD', {dialect:'postgres'});

    const Tag = sequelize.define('Tag', {
        id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
        },

        name: { 
            type: DataTypes.TEXT,
            allowNull: false,
        },

        color: { 
            type: DataTypes.TEXT,
            allowNull: true,
        },

        ...
    }, {

    // Autres options de model ex :
    tableName: "tag",
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
    });
    // `sequelize.define` return aussi le model
```

Méthode 2 : extends Model

```javascript
    import {Model, DataTypes } from "sequelize";

    import getConnexion from '../database.js';
    const sequelize = getConnexion();

    class Tag extends Model {}

    Tag.init({
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        name: { 
            type: DataTypes.TEXT,
            allowNull: false,
        },
        color: { 
            type: DataTypes.TEXT,
            allowNull: true,
        }
        // ...
    },
    {
        sequelize,
        tableName: "tag",
    });
    export { Tag };
```

[Retour à l'accueil](../README.md)
