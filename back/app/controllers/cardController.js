// ~ IMPORTATIONS
import { Card, List } from '../models/index.js';
import _404, { _500 } from './errorController.js';
import assert from 'assert';
import {isValidHexadecimalColor} from './utils.js';

// ~ FUNCTIONS
// ~ ------------------------------------------------ FETCH ALL CARDS

async function fetchAllCards(req, res){

    try {

        const allCards = await Card.findAll({
            attributes : { exclude: ['created_at', 'updated_at'] },
            order: [['order', 'ASC']]
        });
        res.json(allCards);

    } catch (err) {
        _500(err, req, res);
    }

}

// ~ ------------------------------------------------ CREATE CARD
async function createCard(req, res){

    try {

        let {title, description, color} = req.body;

        assert.ok(title, `Le titre ou la position de la carte doit être précisée` )
        // assert.ok(title && order, `Le titre ou la position de la carte doit être précisée` )
        assert.ok(description, `La description de la carte doit être précisée`);
        // assert.ok(!isNaN(order), `Invalid body parameter 'order'. Should provide a number.`);
        
        await Card.create({ ...req.body });

        res.json(`La carte à bien été crée`);

    } catch (err) {
        _404(err, req, res);
    }
}

// ~ ------------------------------------------------ FETCH ONE CARD
async function fetchOneCard(req, res){

    try {
        
        const oneCardId = Number(req.params.id);
        
        assert.ok(!isNaN(oneCardId), `Please verify the provided id, it's not a number`)
       
        const oneCard = await Card.findOne({
            where : {id: oneCardId},
            attributes : {
                exclude : ['created_at', 'updated_at']
            }
            
        });
        
        assert.ok(oneCard, "La carte n'existe pas")
     
        res.json(oneCard)

    } catch (err) {
        _404(err, req, res);
    }

}

// ~ ------------------------------------------------ UPDATE CARD
async function updateCard(req, res){

    try {

        let {title, order, description, color} = req.body;
        const cardId = Number(req.params.id);

        assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`)
        const cardExist = await Card.findOne({
            where: { id : cardId }
        });

        assert.ok(cardExist, `La carte n'existe pas`)
        assert.ok(isValidHexadecimalColor(color ? color : '#FFFFFF'), 'Invalid type: color should be a valid hexadecimal code (string)')

        console.log(req.body)
     
        await Card.update( 

        { ...req.body },
        { where : {...req.params} }

          );

        res.json( `Les informations ont été mis à jour` );

    } catch (err) {
        _404(err, req, res);
    }
}


// ~ ------------------------------------------------ DELETE CARD

async function deleteCard(req, res){

    try {
        
        const cardId = Number(req.params.id);

        assert.ok(!isNaN(cardId), `Please verify the provided id, it's not a number`)
        const cardExist = await Card.findOne({
            where: { id : cardId }
        });

        assert.ok(cardExist, `La carte n'existe pas`);

        await Card.destroy({ where: { ...req.params } });

        res.json(`La carte à bien été supprimé !`);

    } catch (err) {
        _404(err,req,res);
    }
}


// ~ ------------------------------------------------ FETCH ALL CARDS BY LIST ID
async function fetchAllCardsByListId(req, res){

    try {

        const listId = Number(req.params.id);

        assert.ok(!isNaN(listId), `Please verify the provided id, it's not a number`);
            
        const fetchOneList = await List.findOne({
            where: { id : listId }
        });

        assert.ok(fetchOneCard, `La liste n'existe pas`);

        const allCards = await fetchOneList.getCards()

        res.json(allCards);

  
    } catch (err) {
        _404(err, req, res);
    }
};

// on export toutes nos fonctions
export {fetchAllCards, createCard, fetchOneCard, updateCard, deleteCard, fetchAllCardsByListId};