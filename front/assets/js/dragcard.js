//~IMPORTATIONS
import { card } from './card.js'
const dragCard = {

    //~ --------------------------------------------------------- DRAG START CARD

    dragStartCard(event){
        event.stopPropagation();
      
        //& ------------------------ DESIGN EFFECT
        setTimeout(() =>( this.style.opacity = '0.5'), 0);

        //& ------------------------ ORIGIN ID CARD
        const originId = this.dataset.cardId;
        
        //& ------------------------ ORIGIN ORDER CARD
        const originOrder = this.dataset.cardOrder;

        //& ------------------------ ORIGIN ORDER CARD
        const originListId = event.target.closest('[data-list-id]').dataset.listId;
        
        //& ------------------------ SET DATA TRANSFERT
        event.dataTransfer.setData("application/json", JSON.stringify({ originId, originOrder, originListId }));
        
    },

     //~ --------------------------------------------------------- DRAG END CARD

     dragEndCard(event){
        this.style.opacity = '1';
        this.style.transition = '0.3s ease';
     },




    //~ --------------------------------------------------------- DRAG OVER CARD


    dragOverCard(event){
        event.stopPropagation();
        //& ------------------------ EVENT PREVENT DEFAULT
        event.preventDefault();
        //& ------------------------ DESIGN EFFECT
        this.style.opacity = '0.5';

    },


    //~ --------------------------------------------------------- DRAG LEAVE CARD

    dragLeaveCard(event){
        event.stopPropagation();
        //& ------------------------ EVENT PREVENT DEFAULT
        event.preventDefault();
        //& ------------------------ DESIGN EFFECT
        this.style.opacity = '1';
        this.style.transition = '0.3s ease';
    },


    //~ --------------------------------------------------------- DRAG DROP CARD

    dragDropCard(event){
        event.stopPropagation();
        //& ------------------------ EVENT PREVENT DEFAULT
        event.preventDefault();
        //& ------------------------ DESIGN EFFECT
        this.style.opacity = '1';
        this.style.transition = '0.3s ease'


        //& ------------------------ GET DATA TRANSFERT
        const dataTransfer = JSON.parse(event.dataTransfer.getData("application/json"));
        let {originId, originOrder, originListId } = dataTransfer;
        
        //& ------------------------ ELEMENT ORIGIN CARD
        let getElemOriginCard = document.querySelector(`[data-card-id="${originId}"]`)
        
        //& ------------------------ TARGET ID CARD
        let targetId = this.dataset.cardId;
        
        //& ------------------------ TARGET ORDER CARD
        let targetOrder = this.dataset.cardOrder;

        //& ------------------------ TARGET ID LIST
        let targetListId = event.target.closest('[data-list-id]').dataset.listId;
        
        //& ------------------------ ELEMENT TARGET CARD
        const getElemTargetCard = document.querySelector(`[data-card-id="${targetId}"]`);
 


        //& CONVERT STRING EN NUMBER
        originId = +originId;
        originOrder = +originOrder;
        originListId = +originListId;

        const dataTempOrder = originOrder;
        
        targetId = +targetId;
        targetOrder = +targetOrder;
        targetListId = +targetListId;
        
      
        
        //& ------------------------ DROP CONTAINER        
        const containerStartCard = getElemOriginCard.parentNode;
        const containerEndCard = event.target.closest('.container-drop-card');
        const zoneCards = event.target.closest('.panel-block');
        console.log("zoneCards: ", zoneCards);
        
        
        
        // SI LIST ID ORIGIN ET DIFFERENT DE TARGET
        // Dans le cas ou la liste est différente alors on fait un patch pour intégrer la nouvelle carte
        // Et seulement après on peut swap l'ordre des cartes

        if( originListId !== targetListId){

            // containerEndCard.before(containerStartCard);
            zoneCards.insertAdjacentElement("afterbegin", containerStartCard)

            const allCardsTarget = zoneCards.querySelectorAll('.cardStart');
            let cardsElement = [];
            
            for (const elem of allCardsTarget) {
                const cardOrder = elem.getAttribute('data-card-order');
                cardsElement.push(cardOrder);
            }
            
            cardsElement.sort((a, b) => a - b);
            console.log("cardsElement: ", cardsElement);

            for (let index = 0; index < allCardsTarget.length; index++) {

                const newCardOrder = cardsElement[index];
                const cardElement = allCardsTarget[index];
                const getCardId = cardElement.getAttribute('data-card-id');
                cardElement.setAttribute('data-card-order', `${newCardOrder}`);

                //& MISE A JOUR VERS L'API
                card.patchEditCardDragAndDrop(getCardId, targetListId, newCardOrder);
                
            }
          

        } else {


            //& SWAP ORDER
            const swapOrderOriginTarget = (getElemOriginCard.dataset.cardOrder = targetOrder); //Origin modif
            const swapOrderTargetOrigin = (getElemTargetCard.dataset.cardOrder = dataTempOrder); //Target modif

            // On swap les cartes entre elles
            containerStartCard.append(getElemTargetCard);
            containerEndCard.append(getElemOriginCard);

            //& MISE A JOUR VERS L'API (Info swap des cartes)
            card.patchEditCardDragAndDrop(originId, originListId, swapOrderOriginTarget);
            card.patchEditCardDragAndDrop(targetId, targetListId, swapOrderTargetOrigin);

        }
        
        
        
        
        
        // //& CONSOLE LOG
        // console.log('------------------------- DROP');
        // console.log("originId: ", originId);
        // console.log("originOrder: ", originOrder);
        // console.log("originListId: ", originListId);
        // console.log("getElemOriginCard: ", getElemOriginCard);
        // console.log('-------------------------');
        // console.log("targetId: ", targetId);
        // console.log("targetOrder: ", targetOrder);
        // console.log("targetListId: ", targetListId);
        // console.log("getElemTargetCard: ", getElemTargetCard);
        // console.log('-------------------------');
        // console.log("zoneCards: ", zoneCards);
        // console.log("swapOrderOriginTarget: ", swapOrderOriginTarget);
        // console.log("swapOrderTargetOrigin: ", swapOrderTargetOrigin);
        // console.log('-------------------------');
        // console.log('------------------------- SWAP');
        // console.log("swapOrderOriginTarget: ", swapOrderOriginTarget);
        // console.log("swapOrderTargetOrigin: ", swapOrderTargetOrigin);
        // console.log('-------------------------');


    },

}

export {dragCard};