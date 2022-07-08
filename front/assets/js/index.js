//~ IMPORTATIONS
import { list } from "./list.js";
import { user } from "./user.js";

//*------------------------------------------------------------------
//*---------------------------------------------------------- API ---
//*------------------------------------------------------------------
// export const base_url = `http://helene-nguyen-server.eddi.cloud`;
export const base_url = `http://localhost:5000`;
export const lists_url = `/lists/`;
export const cards_url = `/cards/`;
export const tags_url = `/tags/`;
export const users_url = `/users/`

//~ INITIALISATION
list.init();
user.init();


// TODO - Quand une carte n'existe pas dans la list il est impossible de faire un drag & drop sur la list avec une carte
// TODO - CSS virée tout les !importants
