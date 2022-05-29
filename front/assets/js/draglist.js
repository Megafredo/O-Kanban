import { list } from "./list.js";
const draglist = {


    //* CONCERNE TOUT LES ELEMENTS ORIGINEL
   //^ ----------------------------------------------------------------------------------------------- DRAG START LIST
    dragStartList(event){
        // event.stopPropagation();
        //~ DESIGN EFFECT
        this.style.opacity = '0.5';
        
        //~ ELEMENT ORIGIN ID
        const originId = event.target.dataset.listId;
        
        //~ ELEMENT ORIGIN ORDER
        const originOrder = event.target.closest(`[data-list-order]`).dataset.listOrder;
        
        //~ SAUVEGARDE D'UN DATATRANSFER
        event.dataTransfer.setData("application/json", JSON.stringify({ originOrder, originId }));
        
    },

    //^ ----------------------------------------------------------------------------------------------- DRAG END LIST
    
     //* CONCERNE TOUT LES ELEMENTS CIBLES
    //^ ------------------------------------------------------------------ DRAG OVER LIST
    dragOver(event){
        //~ EVENT PREVENT DEFAULT
        event.preventDefault();
        //~ DESIGN EFFECT
        this.style.opacity = '0.5';
    },

    //^ ------------------------------------------------------------------ DRAG LEAVE LIST
    dragLeave(event){
        //~ EVENT PREVENT DEFAULT
        event.preventDefault();

        //~ DESIGN EFFECT
        this.style.opacity = '1';
        this.style.transition = '0.5s ease'
    },

    //^ ------------------------------------------------------------------ DRAG DROP LIST
    dragDrop(event){

        //~ EVENT PREVENT DEFAULT
        event.preventDefault();

        //~ DESIGN EFFECT
        this.style.transition = '0.5s ease'
        this.style.opacity = '1';

        //~ RECUPERATION D'UN DATATRANSFER
        const getDataTransferOrigin = JSON.parse(event.dataTransfer.getData("application/json"));
        let { originOrder, originId } = getDataTransferOrigin;

        //~ ELEMENT TARGET ID
        let targetId = event.target.closest(`[data-list-id]`).dataset.listId;
        
        //~ ELEMENT TARGET ORDER
        let targetOrder = event.target.closest(`[data-list-order]`).dataset.listOrder;

        //~ GET ELEMENT ORIGIN HTML
        const getElemOriginOrder = document.querySelector(`[data-list-order="${originOrder}"]`);
        
        //~ GET ELEMENT TARGET HTML
        const getElemTargetOrder = document.querySelector(`[data-list-order="${targetOrder}"]`);

        //~ CONVERT NUMBER
        originId = +originId;
        originOrder = +originOrder;

        const dataTempOrder = originOrder;
        
        targetId = +targetId;
        targetOrder = +targetOrder;
        
        //~ SWAP DATA
        const swapOrderOriginTarget = (getElemOriginOrder.dataset.listOrder = targetOrder); //Origin modif
        const swapOrderTargetOrigin = (getElemTargetOrder.dataset.listOrder = dataTempOrder); //Target modif
        
        //~ ON RECUPERE LES CONTAINER
        const containerStartList = getElemOriginOrder.parentNode;
        const containerEndList = event.target.closest('.container-list');

        //~ ON APPENDCHILD POUR LE VISUEL
        containerStartList.appendChild(getElemTargetOrder)
        containerEndList.appendChild(getElemOriginOrder)
       
        //~ ENVOI LES INFOS SUR PATCH
        list.patchEditListDragAndDrop(targetId, swapOrderTargetOrigin);
        list.patchEditListDragAndDrop(originId, swapOrderOriginTarget);

        // event.stopPropagation();
        event.dataTransfer.clearData();
    },

   

}

export {draglist};