//~ IMPORTATIONS
import { list } from "./list.js";

//*------------------------------------------------------------------
//*---------------------------------------------------------- API ---
//*------------------------------------------------------------------
// export const base_url = `http://helene-nguyen-server.eddi.cloud`;
export const base_url = `http://localhost:5000`;
export const lists_url = `/lists/`;
export const cards_url = `/cards/`;
export const tags_url = `/tags/`;

//~ INITIALISATION
list.init();

// TODO  - Finir le Drag and Drop carte
// TODO  - Reporter tout les changements sur l'ancien code (non refacto)
// TODO  - CSS virée tout les !importants
