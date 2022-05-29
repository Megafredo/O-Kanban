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
        
        
        //& CONSOLE LOG
        
        // console.log('------------------------- DRAG');
        // console.log("originId: ", originId);
        // console.log("originOrder: ", originOrder);
        // console.log("originListId: ", originListId);
        // console.log('-------------------------');
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
        this.style.transition = '0.5s ease';
    },


    //~ --------------------------------------------------------- DRAG DROP CARD

    dragDropCard(event){
        event.stopPropagation();
        //& ------------------------ EVENT PREVENT DEFAULT
        event.preventDefault();
        //& ------------------------ DESIGN EFFECT
        this.style.opacity = '1';
        this.style.transition = '0.5s ease'

        //& ------------------------ GET DATA TRANSFERT
        const dataTransfer = JSON.parse(event.dataTransfer.getData("application/json"));
        let {originId, originOrder, originListId } = dataTransfer;
        
        //& ------------------------ ELEMENT ORIGIN CARD
        let getElemOriginCard = document.querySelector(`[data-card-id="${originId}"]`)
        
        //& ------------------------ TARGET ID CARD
        let targetId = this.dataset.cardId;
        
        //& ------------------------ TARGET ORDER CARD
        let targetOrder = this.dataset.cardId;

        //& ------------------------ TARGET ID LIST
        let targetListId = event.target.closest('[data-list-id]').dataset.listId;
        
        //& ------------------------ ELEMENT TARGET CARD
        const getElemTargetCard = document.querySelector(`[data-card-id="${targetId}"]`);
 


        //& CONVERT NUMBER
        originId = +originId;
        originOrder = +originOrder;
        originListId = +originListId;

        const dataTempOrder = originOrder;
        
        targetId = +targetId;
        targetOrder = +targetOrder;
        targetListId = +targetListId;
        
        //& SWAP ORDER
        const swapOrderOriginTarget = (getElemOriginCard.dataset.cardOrder = targetOrder); //Origin modif
        const swapOrderTargetOrigin = (getElemTargetCard.dataset.cardOrder = dataTempOrder); //Target modif

        //& ------------------------ DROP CONTAINER        
        const containerStartCard = getElemOriginCard.parentNode;
        const containerEndCard = event.target.closest('.container-drop-card');

        containerStartCard.append(getElemTargetCard)
        containerEndCard.append(getElemOriginCard)


        // SI LIST ID ORIGIN ET DIFFERENT DE TARGET ALORS ON FAIT PAS DE SWAP
        



        
        //& CONSOLE LOG
        // console.log('------------------------- DROP');
        // console.log("originId: ", originId);
        // console.log("originOrder: ", originOrder);
        // console.log("originListId: ", originListId);
        // console.log("elemOriginCard: ", elemOriginCard);
        // console.log('-------------------------');
        // console.log("targetId: ", targetId);
        // console.log("targetOrder: ", targetOrder);
        // console.log("targetListId: ", targetListId);
        // console.log("elemTargetCard: ", elemTargetCard);
        // console.log('-------------------------');
        // console.log("zoneCards: ", zoneCards);
        // console.log('-------------------------');


 
        // cardId, order, cardListId)
        // card.patchEditCardDragAndDrop(targetId, swapOrderTargetOrigin);



    },

}

export {dragCard};