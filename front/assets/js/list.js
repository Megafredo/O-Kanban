// ~ IMPORTATIONS
import { card } from './card.js';
import { draglist } from './draglist.js';
import * as select from './selector.js';
import { base_url, lists_url } from './index.js';

const list = {


    //^ ---------------------------------------------------- INITIALISATION DES FONCTIONS
    /**
     *  Initialisation global des fonctions
     */
     init() {
     
        list.addListenerToActions();
        list.fetchListsFromAPI();
    },


    //^ ---------------------------------------------------- ADD LISTENER TO ACTIONS
    /**
     * On ajoute les écouteurs aux actions
     */
    addListenerToActions() {

        select.btnAddList.addEventListener('click', list.showAddListModal);

        // permet de lancer au click ( quand on click sur tout les btn qui ont la class closes ) la fonction hidenModal 
        for (const btnClose of select.allBtnCloses) {
            
            btnClose.addEventListener('click', list.hideModal);
        };
        select.addListModalForm.addEventListener('submit', list.handleAddListForm);

        for (const btnClose of select.allDataLists()) {
            btnClose.addEventListener('click', card.showAddCardModal);
        };
        select.addCardModalForm.addEventListener("submit", card.handleAddCardForm);

    },

    // ~ ---------------------------------------------------------------------------------
    // ~ ----------------------------------------------------------------------------- API
    // ~ ---------------------------------------------------------------------------------

    /* 
    - Fetch All Lists
    - Create List
    - Update List
    - Delete List
    */

    // & -----------------------------------------------------------------------------------------------
    // ~ ----------------------------------------------------------------------------------------------- FETCH LISTS
    async fetchListsFromAPI() {

        const url = `${base_url}${lists_url}`;

        const response = await fetch(url);

        if (response.ok) {

            const resultLists = await response.json();

            for (const list of resultLists) {
                this.makeListInDOM(list.id, list.title, list.order, list.description, list.user_id);
               
            }
            
            for (const button of select.buttonsAddCard()) {
                button.addEventListener('click', card.showAddCardModal);
            }
            card.fetchAllCards();
        } else {
            throw new Error(`Impossible d'afficher les listes, problème serveur`);
        }

    },

    // & -----------------------------------------------------------------------------------------------
    // ~ ----------------------------------------------------------------------------------------------- POST LISTS

    async postList(listTitle, listDescription, listOrder, listUserId) {

        const listURL = `${base_url}${lists_url}`;      
       
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "title": listTitle, 
                // "order": listOrder, 
                "description" : listDescription, 
                "user_id": 1 
            }),
        }

        const response = await fetch(listURL, options);
        
        if(response.ok){
         
            console.log(await response.json());
            location.reload(); 
        } else {
            throw new Error(`Impossible de créer une liste, problème serveur`);
        }
    },


    // & -----------------------------------------------------------------------------------------------
    // ~ ----------------------------------------------------------------------------------------------- DELETE LIST

    async DeleteList(listId){

        const listURL = `${base_url}${lists_url}${listId}`;

        const options = {
            method: 'DELETE',
        }
        const response = await fetch(listURL, options);
        
        if(response.ok){
            await response.json();  
            location.reload();
        }
        else{
            throw new Error(`Impossible de supprimer la liste, problème serveur`);
        }
    },


    // & -----------------------------------------------------------------------------------------------
    // ~ ----------------------------------------------------------------------------------------------- PATCH EDIT LIST

    async patchEditList(listId, editListTitle, editListOrder, editListDescription, editListUserId, listEditForm){

        const urlListEdit = `${base_url}${lists_url}${listId}`;

        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "title": editListTitle,
                "order": editListOrder,
                "description": editListDescription,
                "user_id": editListUserId 
            }),
        }

        const response = await fetch(urlListEdit, options);

        if(response.ok){
            console.log(await response.json());
            // location.reload();
            listEditForm.querySelector('.editTitle').textContent = editListTitle;
            listEditForm.querySelector('.listDescription').textContent = editListDescription;

        } else {
            throw new Error(`Impossible d'éditer la liste, problème serveur`);
        }
    },


    // & -----------------------------------------------------------------------------------------------
    // ~ ----------------------------------------------------------------------------------------------- PATCH EDIT LIST DRAG AND DROP

    async patchEditListDragAndDrop(listId, editListOrder){

        const urlListEdit = `${base_url}${lists_url}${listId}`;

        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
               
                "order": editListOrder,
                "user_id": 1 

            }),
        }

        const response = await fetch(urlListEdit, options);

        if(response.ok){
            console.log(await response.json());

        }else {
            throw new Error(`Impossible d'éditer la liste (Drag&Drop), problème serveur`);
        }
    },


    //~ ------------------------------------------------------------------------------------------------------------ MAKE LIST IN DOM
    //~ ------------------------------------------------------------------------------------------------------------ MAKE LIST IN DOM
    //~ ------------------------------------------------------------------------------------------------------------ MAKE LIST IN DOM   
   /**
    * 
    * @param {*} listId L'id de la liste 
    * @param {*} listTitle Le titre de la liste
    * @param {*} listOrder L'ordre de la liste
    * @param {*} listDescription La description de la liste
    * @param {*} listUserId L'utilisateur de la liste 
    */
    async makeListInDOM(listId, listTitle, listOrder, listDescription, listUserId) {
        
  
        const clone = document.importNode(select.template.content, true);
        
        clone.querySelector('.listDescription').textContent = listDescription;
        clone.querySelector('.editTitle').textContent = listTitle;
        clone.querySelector('[data-list-id]').dataset.listId = listId;
        clone.querySelector('[data-list-order').dataset.listOrder = listOrder;
        clone.querySelector('.list-order').setAttribute('value', `${listOrder}`);
        clone.querySelector('.list-user-id').setAttribute('value', `${listUserId}`);
        
        clone.querySelector('#listId').addEventListener('dragstart', draglist.dragStartList);
        clone.querySelector('#listId').addEventListener('dragover', draglist.dragOver);
        clone.querySelector('#listId').addEventListener('dragleave', draglist.dragLeave);
        clone.querySelector('#listId').addEventListener('drop', draglist.dragDrop);
          

        clone.querySelector(".is-pulled-left").addEventListener("click", card.showAddCardModal);
        select.cardLists.append(clone);

        list.hideModal();

        // evenement au click LIST TITLE
        for (const elem of select.editListTitle()) {
            elem.addEventListener('click', list.showAndHideFormListTitle);
        };

        // Evenement submit LIST TITLE
        for (const btnSubmitEditListTitle of select.allSubmitEditListTitle()) {
            btnSubmitEditListTitle.addEventListener('submit', list.handleListEdit);
        };

        // EVENEMENT CLICK BTN REMOVE LIST
        for (const btnRemove of select.allDataListsRight()){
    
        btnRemove.addEventListener('click', list.showRemoveListModalAndDelete);
        }

        select.removeListModalForm.addEventListener('submit', list.removeListModal);

    },




    //~ ----------------------------------------------------------------------------------------------- SHOW REMOVE LIST MODAL AND DELETE VALIDATION
    /**
     * Ouvre la modal remove List
     * @param {*} event 
     */
     async showRemoveListModalAndDelete(event) {

        select.removeListModal.classList.add('is-active');
        const listId = event.target.closest("[data-list-id]").dataset.listId;

        //* DELETE VALIDATION LIST
        // on récupere la bonne liste à supprimé
        const listDelete = document.querySelector(`[data-list-id="${listId}"]`);

        select.removeListModalForm.addEventListener('submit', () =>{
            event.preventDefault();
            listDelete.remove();
            list.DeleteList(listId);
        });
    },


    //~ ----------------------------------------------------------------------------------------------- SHOW ADD LIST MODAL
    /**
     * Ouvre la modal List
     * @param {*} event 
     */
     showAddListModal(event) {
        select.addListModalInputHidden.value = "";
        select.addListModal.classList.add('is-active');
    },


    //~ ----------------------------------------------------------------------------------------------- HIDE MODAL
    /**
     * Cache une modale
     */
    hideModal() {

        for (const modal of select.allModals) {
            modal.classList.remove('is-active');
        }
    },



    //~ ----------------------------------------------------------------------------------------------- HANDLE ADD LIST FORM
    /**
     * Gestion du formulaire d'ajout d'une liste
     * @param {*} event 
     */
    async handleAddListForm(event) {

        event.preventDefault();
        const data = new FormData(event.target);

        const listTitle = data.get('listTitle');
        const listDescription = data.get('listDescription');
        const listOrder = data.get('listOrder');
      
        list.postList(listTitle, listDescription, listOrder, '' );
    },



    //~ ----------------------------------------------------------------------------------------------- REMOVE LIST MODAL
    removeListModal(event){
        event.preventDefault();
        select.removeListModal.classList.remove('is-active');
    },


    //~ ----------------------------------------------------------------------------------------------- CLICK LIST EDIT
      
        showAndHideFormListTitle(event){

            for (const resetTitle of select.resetEditTitleAllListInput()) {
                resetTitle.value ="";
            };

            for (const resetDescription of select.resetEditDescriptionAllListInput()) {               
                resetDescription.value ="";
            };

            const listId = event.target.closest("[data-list-id]").dataset.listId; 
            const editListTitleForm = document.querySelector("[data-list-id='" + listId + "'] .edit-title-form");
            editListTitleForm.classList.toggle('is-hidden');

        },

    //~ ----------------------------------------------------------------------------------------------- HANDLE LIST EDIT
        // PATCH
        async handleListEdit(event){
            event.preventDefault();

            const data = new FormData(event.target);
            
            const listEditForm = event.target.closest("[data-list-id]");
            const listId = listEditForm.dataset.listId;

            let editListTitle = data.get('list-name');
            let editListDescription = data.get('list-description');
            const editListOrder = data.get('list-order');
            const editListUserId = data.get('list-user-id');
            
            const currentTitleList = listEditForm.querySelector('.editTitle').textContent;
            const currentDescriptionList = listEditForm.querySelector('.listDescription').textContent;

            editListTitle === '' ? editListTitle = currentTitleList : editListTitle;
            editListTitle !== currentTitleList ? editListTitle : currentTitleList;
            editListDescription === '' ? editListDescription = currentDescriptionList : editListDescription;
            editListDescription !== currentDescriptionList ? editListDescription : currentDescriptionList;

            list.patchEditList( listId, editListTitle, editListOrder, editListDescription, editListUserId, listEditForm);
            
            const editListTitleForm = document.querySelector("[data-list-id='" + listId + "'] .edit-title-form");
            editListTitleForm.classList.add('is-hidden');
        },
}

export {list};