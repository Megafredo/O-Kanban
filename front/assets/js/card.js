// & IMPORTATIONS
import { tag } from './tag.js';
import { list } from './list.js';
import * as select from './selector.js';
import { base_url, cards_url } from './index.js';
import { dragCard } from './dragcard.js';

const card = {


    // & ---------------------------------------------------------------------------------
    // & ----------------------------------------------------------------------------- API
    // & ---------------------------------------------------------------------------------

    /* 
    - Fetch All Cards
    - Create Card
    - Update Card
    - Delete Card
    */

  

    // &  -------------------------------------------------------------------------
    // & ---------------------------------------------------------------- POST CARD
    // API: title/order/description/color/user_id/list_id
    async postCardTest(cardTitle, cardDescription, cardColor, cardUserId, cardListId) {

        const cardURL = `${base_url}${cards_url}`;
        
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "title": cardTitle, 
                // "order": cardOrder,
                "color": cardColor,
                "description" : cardDescription, 
                "list_id": cardListId,
                "user_id": 1 
            }),
        }

        const response = await fetch(cardURL, options);
        
        if(response.ok){
            console.log(await response.json());
            location.reload(); 
        }
        else{
            throw new Error('Impossible de créer une carte, problème serveur');
        }

    },


    // & -----------------------------------------------------------------------------------------------
    // & ----------------------------------------------------------------------------------------------- FETCH ALL CARDS
    async fetchAllCards() {

        const url = `${base_url}${cards_url}`;

        const response = await fetch(url);

        if (response.ok) {

            const result = await response.json();        

            for (const card of result) {
        
                this.makeCardInDOM(card.id, card.title, card.order, card.color, card.description, card.user_id ,card.list_id);
                tag.fetchAllTagsByCardId(card.id);
            }
            
        } else {
            throw new Error(`Impossible d'afficher les cartes, problème serveur`);
        }
    
    },



    // & -----------------------------------------------------------------------------------------------
    // & ----------------------------------------------------------------------------------------------- PATCH EDIT CARD

    async patchEditCard(cardId, editCardTitle, editCardOrder, editCardColor , editCardDescription, editCardUserId, editCardListId, cardEditForm){

        const urlCardEdit = `${base_url}${cards_url}${cardId}`;

        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "title": editCardTitle,
                "color": editCardColor,
                "description": editCardDescription,
                "user_id": 1,
                "list_id": editCardListId
            }),
        }

        const response = await fetch(urlCardEdit, options);

        if(response.ok){
            await response.json();

            cardEditForm.querySelector('.card-name').textContent = editCardTitle;
            cardEditForm.querySelector('.card-description').textContent = editCardDescription;
            cardEditForm.querySelector('.columns').style.borderBottom = `1px solid ${editCardColor}`;
            cardEditForm.style.borderTop = `4px solid ${editCardColor}`;

        } else {
            throw new Error(`Impossible d'éditer la carte, problème serveur`);
        }
    },

    
    // & -----------------------------------------------------------------------------------------------
    // & ----------------------------------------------------------------------------------------------- PATCH EDIT CARD DRAG AND DROP

    async patchEditCardDragAndDrop(cardId, editCardOrder, editCardListId){

        const urlCardEdit = `${base_url}${cards_url}${cardId}`;

        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "order": editCardOrder,
                "list_id": editCardListId
            }),
        }

        const response = await fetch(urlCardEdit, options);

        if(response.ok){
            await response.json();

            cardEditForm.querySelector('.card-name').textContent = editCardTitle;
            cardEditForm.querySelector('.card-description').textContent = editCardDescription;
            cardEditForm.querySelector('.columns').style.borderBottom = `1px solid ${editCardColor}`;
            cardEditForm.style.borderTop = `4px solid ${editCardColor}`;

        } else {
            throw new Error(`Impossible d'éditer la carte, problème serveur`);
        }
    },


    // & -----------------------------------------------------------------------------------------------
    // & ----------------------------------------------------------------------------------------------- DELETE CARD

    async deleteCard(cardId){

        const cardURL = `${base_url}${cards_url}${cardId}`;

        const options = {
            method: 'DELETE',
        }
        const response = await fetch(cardURL, options);
        
        if(response.ok){

            console.log(await response.json());
            location.reload();  
        }
        else{
            throw new Error('Impossible de supprimer la carte, problème serveur');
        }
    },


    //& ------------------------------------------------------------------------------------------------------------------- MAKE CARD IN DOM
    //& ------------------------------------------------------------------------------------------------------------------- MAKE CARD IN DOM
    //& ------------------------------------------------------------------------------------------------------------------- MAKE CARD IN DOM
   /**
    * 
    * @param {*} cardId Id de la carte
    * @param {*} cardTitle Titre de la carte
    * @param {*} cardOrder Position de la carte
    * @param {*} cardColor Couleur de la carte
    * @param {*} cardDescription Description de la carte
    * @param {*} cardUserId User_id lié à la carte
    * @param {*} cardListId List_id lié à la carte
    */
    // card.id, card.title, card.order, card.color, card.description, card.user_id ,card.list_id);
    async makeCardInDOM(cardId, cardTitle, cardOrder, cardColor, cardDescription, cardUserId, cardListId,tagId, tagName , tagColor, event) {

        const clone = document.importNode(select.cardTemplate().content, true);

        clone.querySelector('.card-name').textContent = cardTitle;
        clone.querySelector('.card-description').textContent = cardDescription;
        clone.querySelector('[data-card-id]').dataset.cardId = cardId;
        clone.querySelector(`[data-new-tag-id]`).dataset.newTagId = cardId;  
        clone.querySelector('[data-card-order]').dataset.cardOrder = cardOrder;
     
        clone.querySelector('.cardStart').style.borderTop = `4px solid ${cardColor}`;
        clone.querySelector('.columns').style.borderBottom = `1px solid ${cardColor}`;
        clone.querySelector('[data-card-color]').dataset.cardColor = cardColor;

        clone.querySelector('.cardStart').addEventListener('dragstart', dragCard.dragStartCard)
        clone.querySelector('.cardStart').addEventListener('dragover', dragCard.dragOverCard)
        clone.querySelector('.cardStart').addEventListener('dragleave', dragCard.dragLeaveCard)
        clone.querySelector('.cardStart').addEventListener('drop', dragCard.dragDropCard)
        
        // document.querySelector("[data-list-id='" + cardListId + "'] .panel-block container-drop-card").append(clone);
        document.querySelector("[data-list-id='" + cardListId + "'] .panel-block").append(clone);
        
        //fix refacto
        list.hideModal();
       
        // EVENEMENT CLICK BTN REMOVE CARD (on réutilise la modale (list))
        for (const btnRemoveCard of select.btnRemoveAllCards()){
            btnRemoveCard.addEventListener('click', card.showRemoveCardModalAndDelete)
        }
        
        // EVENEMENT CLICK BTN EDIT CARD
        for (const btnEditCard of select.btnEditAllCards()){
            btnEditCard.addEventListener('click', card.showEditCardModal)
        }
        
        select.editCardModalForm.addEventListener('submit', card.handleEditCardForm);

        for (const formNewTag of select.allFormsNewTag()) {
            formNewTag.addEventListener('submit', tag.handleAddTagForm);
        }
         
    },



    //& ----------------------------------------------------------------------------------------------- HANDLE ADD CARD FORM
    /**
     * Gestion du formulaire d'ajout d'une carte dans une liste
    */
     handleAddCardForm(event) {
     
        event.preventDefault();

        const data = new FormData(event.target);

        const cardTitle = data.get('cardTitle');
        const cardColor = data.get('cardColor');
        const cardListId = data.get('cardListId');
        const cardDescription = data.get('cardDescription');
        // const cardOrder = select.dataCardOrder().dataset.cardOrder;


        card.postCardTest(cardTitle ,cardDescription, cardColor,'', cardListId);

        select.addCardModal.classList.remove('is-active');
    },

    
  
    //& ----------------------------------------------------------------------------------------------- SHOW EDIT CARD MODAL
    /**
     * 
     */
     showEditCardModal(event) {
        console.log('hello')
        event.preventDefault();

        select.editCardModal.classList.add('is-active');
        const cardId = event.target.closest("[data-card-id]").dataset.cardId;
        const cardListId = event.target.closest("[data-list-id]").dataset.listId;
        const currentCardColor = event.target.closest(`[data-card-color]`).dataset.cardColor;
        select.editColorCard.value = currentCardColor;


        select.editCardModalInputHidden.value = cardId;
        select.editCardListIdModalInputHidden.value = cardListId;

    },

     //& ----------------------------------------------------------------------------------------------- HANDLE EDIT CARD FORM

     handleEditCardForm(event) {
        event.preventDefault()

        const data = new FormData(event.target);
        
        let cardTitle = data.get('cardTitle');
        let cardDescription = data.get('cardDescription');
        const cardId = select.editCardModalInputHidden.value;
        const cardOrder = data.get('cardOrder')
        const cardColor = data.get('cardColor');
        const cardListId = data.get('cardListId');

        const cardEditForm = document.querySelector(`[data-card-id="${cardId}"]`);

        // On récuperer les anciennes valeurs 
        const currentTitleCard = cardEditForm.querySelector('.card-name').textContent;
        const currentDescriptionCard = cardEditForm.querySelector('.card-description').textContent;
        const currentColorCard = cardEditForm.dataset.cardColor;
        
        // Vérification permettant de garder les anciennes valeur dans le cas ou l'utilisateur souhaite simplement changer un seul élement
        cardColor !== currentColorCard ? cardColor : currentColorCard;
        cardTitle === '' ? cardTitle = currentTitleCard : cardTitle;
        cardDescription === '' ? cardDescription = currentDescriptionCard : cardDescription;

        card.patchEditCard(cardId, cardTitle, cardOrder, cardColor , cardDescription, '', cardListId, cardEditForm) 
        
        select.editTitleCard.value = "";
        select.editDescriptionCard.value = "";

        select.editCardModal.classList.remove('is-active');

    },


    //& ----------------------------------------------------------------------------------------------- SHOW REMOVE CARD MODAL AND DELETE VALIDATION
    /**
     * Ouvre la modal remove List
     * @param {*} event 
     */
     async showRemoveCardModalAndDelete(event) {

        select.removeListModal.classList.add('is-active');
        const cardId = event.target.closest("[data-card-id]").dataset.cardId;

        const cardDelete = document.querySelector(`[data-card-id="${cardId}"]`);

        select.removeListModalForm.addEventListener('submit', (event) =>{
         
            event.preventDefault();
            cardDelete.remove();
            card.deleteCard(cardId);
        });
    },

    //& ----------------------------------------------------------------------------------------------- SHOW ADD CARD MODAL
    /**
     * Ouvre la modal Card
     * @param {*} event 
     */
    showAddCardModal(event) {

        const listId = event.target.closest("[data-list-id]").dataset.listId;
        select.addCardModalInput.value = listId;
        select.addCardModal.classList.add('is-active');

    },

}

export {card};