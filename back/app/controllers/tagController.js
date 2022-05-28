//~import modules
import _404, { _500 } from './errorController.js';
import assert from 'assert';
import { isValidHexadecimalColor } from './utils.js';
import { Tag, Card } from '../models/index.js';

//~controller
//~ ------------------------------------------------------------------- ALL TAGS
async function fetchAllTags(req, res) {
    try {
        const tags = await Tag.findAll({
            attributes:{
                exclude: [ 'created_at', 'updated_at'],
            }
        });

        res.json(tags);

    } catch (err) {
        _500(err, req, res);
    }
};

//~ ------------------------------------------------------------------- CREATE TAG
async function createTag(req, res) {

    try {

        assert.ok(req.body.name, 'Le nom du tag doit être précisé');
        await Tag.create({ ...req.body });

        res.json(`Le tag ${req.body.name} a bien été crée`);

    } catch (err) {
        _404(err, req, res);
    }
};

//~ ------------------------------------------------------------------- ONE TAG
async function fetchOneTag(req, res) {

    try {

        const tagId = Number(req.params.id);
        assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`)

        const oneTag = await Tag.findByPk(tagId, {
            attributes: ['name', 'color']
        });

        assert.ok(oneTag, "Le tag n'existe pas")

        res.json(oneTag);

    } catch (err) {
        _500(err, req, res);
    }
};

//~ ------------------------------------------------------------------- UPDATE TAG (PATCH)
async function updateTag(req, res) {
    try {

        const {name, color} = req.body;
        
        const tagExist = await Tag.findOne({
            where: { ...req.params }
        });

        assert.ok(tagExist, `Le tag n'existe pas`);
        assert.ok(isValidHexadecimalColor(color ? color : '#FFFFFF'), 'Invalid type: color should be a valid hexadecimal code (string)');
       

        await Tag.update(

            { ...req.body }, 
            { where: { ...req.params } }
        );

        return res.json(`Les informations du label a bien été mis à jour`);

    } catch (err) {
        _500(err, req, res);
    }
};

//~ ------------------------------------------------------------------- DELETE TAG 
async function deleteTag(req, res) {
    try {

        const tagId = Number(req.params.id);

        assert.ok(!isNaN(tagId), `Please verify the provided id, it's not a number`)
        const tagExist = await Tag.findOne({
            where: { id : tagId }
        });

        assert.ok(tagExist, `Le tag n'existe pas`);


        await Tag.destroy({
            where: { ...req.params }
        });

        res.json(`Le tag a bien été supprimé !`);

    } catch (err) {
        _500(err, req, res);
    }
};


//~ ------------------------------------------------------------------- FIND OR CREATE TAG
async function upsertTag(req, res) {
    try {

        const cardId = Number(req.params.cardId); 
        const tagName = (req.params.tagName).toString();
        const tagColor = req.body.color;
       
        assert.ok(!isNaN(cardId), 'Chemin non conforme'); 
        
        let oneTag = await Tag.findOne({where : { name : tagName}})
        oneTag === null ? oneTag = tagColor : oneTag;

      

        assert.ok(tagColor.length < 8, "Le nombre de caractère rentré doit être inférieur à 16")
       
        const myCard = await Card.findOne({where : { id : cardId}});
        
        assert.ok(myCard, `La carte n'existe pas`);
        
        await Tag.findOrCreate({
            where: {name : tagName},
            defaults : {
                    name: `${tagName}`,
                    color: `${oneTag}`
                }
            });


        const myTag = await Tag.findOne({where:{name : tagName}})

        myCard.addTags(myTag);

        res.json(`Le tag à bien été lié`);
    
    } catch (err) {
        _500(err, req, res);
    }
};


//~ ------------------------------------------------------------------- ADD AS WITH TAG

async function addAsWithTag(req,res){
    try {
        
        const cardId = Number(req.params.cardId);
        const tagId = Number(req.params.tagId);

        assert.ok(!isNaN(cardId), 'Chemin non conforme');
        assert.ok(!isNaN(tagId), 'Chemin non conforme');

        const fetchOneCard = await Card.findOne( {where: { id : cardId }} );
        const fetchOneTag = await Tag.findOne( {where: { id : tagId }} );
        
        assert.ok(fetchOneCard, `La carte n'existe pas`);
        assert.ok(fetchOneTag, `Le tag n'existe pas`);
        assert.ok(!await fetchOneCard.hasTags(fetchOneTag), `L'association existe déjà`)

        fetchOneCard.addTags(fetchOneTag);
        
        res.json(` Le tag "${fetchOneTag.name}" à bien été associé !`)

    } catch (err) {
       _500(err, req, res)
    }
 };


 //~ ------------------------------------------------------------------- FETCH ALL TAGS BY CARD ID

async function fetchAllTagsByCardId(req,res){

    try {
        
        const cardId = Number(req.params.id);

        assert.ok(!isNaN(cardId), 'Chemin non conforme');
            
        const fetchOneCard = await Card.findOne({
            where: { id : cardId }
        });

        assert.ok(fetchOneCard, `La carte n'existe pas`);

        const allTags = await fetchOneCard.getTags({
            attributes: {
                exclude: ['created_at','updated_at']
            }
        })

        res.json(allTags);

    } catch (err) {
        _500(err, req, res)
    }

};


//~ ------------------------------------------------------------------- DELETE TAG BY CARD ID
async function deleteAsWithTag(req,res){
    try {
        

        const cardId = Number(req.params.cardId);
        const tagId = Number(req.params.tagId);

        assert.ok(!isNaN(cardId), 'Chemin non conforme');
        assert.ok(!isNaN(tagId), 'Chemin non conforme');

        const fetchOneCard = await Card.findOne( {where: { id : cardId }} );
        const fetchOneTag = await Tag.findOne( {where: { id : tagId }} );
     
        assert.ok(fetchOneCard, `La carte n'existe pas`);
        assert.ok(fetchOneTag, `Le tag n'existe pas`);

        fetchOneCard.removeTags(fetchOneTag);
        
        res.json(`Le tag "${fetchOneTag.name}" à bien été dissocié !`)

    } catch (err) {
       _500(err, req, res)
    }
 };


export { fetchAllTags, fetchOneTag, createTag, updateTag, addAsWithTag, deleteTag, deleteAsWithTag, fetchAllTagsByCardId, upsertTag };