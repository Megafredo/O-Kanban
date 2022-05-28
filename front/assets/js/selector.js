//~ -------------------------------------------------------- 
//~ ------------------------------------------ ALL SELECTORS
//~ -------------------------------------------------------- 

//? ---------------------------------------- BALISES GLOBAL HTML
export const body = document.querySelector('body');

//? ---------------------------------------- MODAL
export const allModals = document.querySelectorAll('.modal');
export const allBtnCloses = document.querySelectorAll('.close');
export const editCardModalForm = document.querySelector('#edit-card-modal form');
export const allDataListsRight = () => document.querySelectorAll("[data-list-id] .is-pulled-right");
export const allDataLists = () => document.querySelectorAll("[data-list-id] .is-pulled-left");

//? ---------------------------------------- TEMPLATE
export const template = document.querySelector('#listTemplate');
export const cardTemplate = () => document.querySelector("#cardTemplate");
export const tagTemplate = () => document.querySelector('#tagTemplate');

//~ ---------------------------------------- LIST
export const lastList = document.querySelector('.column');
export const btnAddList = document.getElementById("addListButton");
export const addListModal = document.querySelector('#addListModal');
export const removeListModalForm = document.querySelector('#removeListModal form');
export const removeListModal = document.querySelector('#removeListModal');
export const addListModalForm = document.querySelector(`#addListModal form`);
export const addListModalInputHidden = document.querySelector('#addListModal input[name="listTitle"');
export const resetEditTitleAllListInput = () => document.querySelectorAll('.edit-title-form input[name="list-name"]');
export const resetEditDescriptionAllListInput = () => document.querySelectorAll('input[name="list-description"]');
export const editListTitle = () => document.querySelectorAll('.editTitle');
export const allSubmitEditListTitle = () => document.querySelectorAll('.edit-title-form');

//& ---------------------------------------- CARD
export const addCardModal = document.querySelector('#addCardModal');
export const addCardModalForm = document.querySelector("#addCardModal form");
export const addCardModalInput = document.querySelector("#addCardModal input[type='hidden']")
export const editCardModalInputHidden = document.querySelector("#edit-card-modal input[id='edit-card-id']")
export const editCardListIdModalInputHidden = document.querySelector("#edit-card-modal input[id='edit-card-list-id']")
export const titleCardModalInput = document.querySelector("#addCardModal input[name='titleCard']")
export const descriptionCardModalInput = document.querySelector("#addCardModal input[name='descriptionCard']")
export const editCardModal = document.querySelector("#edit-card-modal");
export const cardLists = document.querySelector(".card-lists");
export const btnRemoveAllCards = () => document.querySelectorAll('.remove-card');
export const btnEditAllCards = () => document.querySelectorAll('#edit-card');
export const buttonsAddCard = () => document.querySelectorAll('.addCardButton');
export const dataCardOrder = () => document.querySelector('[data-card-order]');
export const editTitleCard = document.querySelector('#edit-title-card');
export const editDescriptionCard = document.querySelector('#edit-description-card');
export const editColorCard = document.querySelector('#edit-color-card');

//* ----------------------------------------- TAG
export const editTagModal = document.querySelector('#editTagModal');
export const inputEditTagId = document.querySelector('input#edit-tag-id');
export const editTagForm = document.querySelector('#editTagForm');
export const allFormsNewTag = () =>document.querySelectorAll(`[data-new-tag-id]`);
export const currentDataTagColor = () => document.querySelector(`[data-tag-color]`);
export const editCardColor = document.querySelector('#edit-tag-color');



















