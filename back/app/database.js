import { Sequelize } from 'sequelize';

//~ CONNEXION DB
function getConnexion(){

    return new Sequelize(

        {
            
            define: {
                timestamps: false,
                createdAt : "created_at",
                updatedAt : "updated_at"
            },
            
            dialect: process.env.DB_ENV,
            logging: false
        }
    )

};

export default getConnexion;