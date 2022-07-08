// * IMPORTATIONS
import * as select from './selector.js';
import { utils } from './utils.js';
import { base_url, tags_url, cards_url } from './index.js';

const tag = {

    // * ---------------------------------------------------------------------------------
    // * ----------------------------------------------------------------------------- API
    // * ---------------------------------------------------------------------------------

    /* 
    - Fetch All Tags
    - Find or Create Tag
    - Update Tag
    - Delete Tag
    */
    // & -------------------------------------------------------------------------------------------------------------------------
    // * ----------------------------------------------------------------------------------------------- FETCH ALL TAGS BY CARD ID
    // ( requête GET http://[adress]/cards/[:id]/tags )
    async fetchAllTagsByCardId(cardId) {
    
        const url = `${base_url}${cards_url}${cardId}${tags_url}`;
        const response = await fetch(url);
        
        if (response.ok) {

            const tags = await response.json();
            for (const tag of tags) {
                this.makeTagInDOM(cardId, tag.id, tag.name , tag.color)
            }   
        } else {
            throw new Error(`Impossible d'afficher les tags en fonction de l'id de la carte, problème serveur`);
        }
    },


    // &  ----------------------------------------------------------------------------------
    // * ---------------------------------------------------------------- FIND OR CREATE TAG
    // API: id/name/color
    // PATH cards/:cardId/tags/:tagName
    async putTag(cardId, tagName, tagColor) {

        // Les 16 couleurs autorisées par W3C
        const colorW3C = {
            'black' : '#000000',
            'silver' : '#C0C0C0',
            'gray' : '#808080',
            'white' : '#FFFFFF',
            'maroon' : '#800000',
            'red' : '#FF0000',
            'purple' : '#800080',
            'fuchsia' : '#FF00FF',
            'green' : '#008000',
            'lime' : '#00FF00',
            'olive' : '#808000',
            'yellow' : '#FFFF00',
            'navy' : '#000080',
            'blue' : '#0000FF',
            'teal' : '#008080',
            'aqua' : '#00FFFF',
        }
        
        for (const [key, value] of Object.entries(colorW3C)) {
            tagColor === key ? tagColor = value : tagColor;
        }

        const tagUrl = `${base_url}${cards_url}${cardId}${tags_url}${tagName}`;
        
    
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "name": tagName,
                "color": tagColor,
            }),
        }

        const response = await fetch(tagUrl, options);
        
        
        if( response.ok ){

            console.log(await response.json());
            location.reload(); 
        }
        else{
            throw new Error(`Impossible d'afficher ou créer un tag, problème serveur`);
        }

    },

    // &  -------------------------------------------------------------------------
    // * ---------------------------------------------------------------- PATCH TAG
    // API: id/name/color
    // UPDATE TAG
    // PATCH /tags/:idTag
    async patchTag(tagId, tagName, tagColor) {

        const tagUrl = `${base_url}${tags_url}${tagId}`;
        
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "name": tagName,
                "color": tagColor,
            }),
        }

        const response = await fetch(tagUrl, options);
        
        if(response.ok){
            console.log(await response.json());
            location.reload(); 
        }
        else{
            throw new Error(`Impossible d'éditer le tag, problème serveur`);
        }
    },

    // & -----------------------------------------------------------------------------------------------
    // * ----------------------------------------------------------------------------------------------- DELETE TAG
    //DELETE /cards/1/tags/2
    async deleteTag(cardId, tagId){

        const tagUrl = `${base_url}${cards_url}${cardId}${tags_url}${tagId}`;
        
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(tagUrl, options);
        
        if(response.ok){
            
            await response.json();
            
           
        }
        else{
            throw new Error(`Impossible de supprimer le tag, problème serveur`);
        }
       
    },



    //* ------------------------------------------------------------------------------------------------------------------- MAKE TAG IN DOM
    //* ------------------------------------------------------------------------------------------------------------------- MAKE TAG IN DOM
    //* ------------------------------------------------------------------------------------------------------------------- MAKE TAG IN DOM


    async makeTagInDOM(cardId, tagId, tagName , tagColor){
        
        

        const clone = document.importNode(select.tagTemplate().content, true);

        clone.querySelector('.tag span').textContent = tagName;
        clone.querySelector('[data-tag-id]').dataset.tagId = tagId;

        // Vérification
        if(utils.isValidHexadecimalColor(tagColor) === false) tagColor = '#361974';

        
        // convertir du Hex en rgb
        const red = parseInt(tagColor[1]+tagColor[2],16);
        const green = parseInt(tagColor[3]+tagColor[4],16);
        const blue = parseInt(tagColor[5]+tagColor[6],16);

        const brightness = ((( red * 299) + (green * 200) + (blue * 100)) / 1000);

        const textColor = (brightness > 125) ? '#333333' : '#ffffff';
        clone.querySelector(`[data-tag-id] #title-tag`).style.color = `${textColor}`;


        clone.querySelector(`[data-tag-id="${tagId}"] .tag`).style.backgroundColor = tagColor;

        clone.querySelector(`[data-tag-color]`).dataset.tagColor = tagColor;
        clone.querySelector('.remove-tag').addEventListener('click', tag.removeTag);

        clone.querySelector('.content-tag .tag').addEventListener('click', (event)=>{
        

            // On récupère la couleur désiré en RGB
            const selectTagColor = event.target.closest('.tag').style.backgroundColor;
     

            // On récupère seulement les nombres dans le rgb(250, 250, 250)
            let valueRGB = selectTagColor.split("(")[1].split(")")[0];  


            // Utilisation d'une fonction qui permet de convertir du RGB en HEX
            const final = utils.convertColor(valueRGB)

            // On insére la nouvelle valeur HEX dans l'input editTagColor
            select.editCardColor.value = final;


            select.editTagModal.classList.add('is-active');
            select.inputEditTagId.value = tagId;
            select.editTagForm.addEventListener('submit', tag.handleEditTagForm);
        })
        document.querySelector(`[data-card-id="${cardId}"] #tags`).append(clone);
    },


    async handleEditTagForm(event){

        event.preventDefault();
        const data = new FormData(event.target)
    
        let editTagName = data.get('editTagName');
        let editTagColor = data.get('editTagColor');
        let editTagId = data.get('edit-tag-id');

        let currentTagName = document.querySelector(`[data-tag-id="${editTagId}"] li`).textContent;
        let currentTagColor = select.currentDataTagColor().dataset.tagColor;

        
        select.editTagModal.classList.remove('is-active');
 
        editTagName === '' ? editTagName = currentTagName : editTagName;
        editTagColor === '' ? editTagColor = currentTagColor : editTagColor;

        tag.patchTag(editTagId, editTagName, editTagColor)

    },

    //* ------------------------------------------------------------------------------------------------------------------- REMOVE TAG
    removeTag(event){
   
        const removeTagId = event.target.closest(`[data-tag-id]`).dataset.tagId;
        const removeCardId = event.target.closest(`[data-card-id]`).dataset.cardId;

        const selectTagId = event.target.closest('[data-tag-id]');  
        selectTagId.remove();

        tag.deleteTag(removeCardId, removeTagId);

    },


    //* ----------------------------------------------------------------------------------------------- HANDLE ADD TAG FORM
    /**
     * Gestion du formulaire d'ajout d'un tag dans un carte
     * fetchAllTags(tagId, tagName , tagColor, cardId) 
     */
     async handleAddTagForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const cardId = event.target.closest(`[data-new-tag-id]`).dataset.newTagId;
        const tagName = data.get('new-tag');
        const tagColor = data.get('color-tag');


        tag.putTag(cardId, tagName, tagColor);

        const allInputNewTag = document.querySelectorAll(`[data-new-tag-id="${cardId}"] input`);
        for (const inputNewTag of allInputNewTag) {
            inputNewTag.value ="";
        }
       
    },

}
export {tag};