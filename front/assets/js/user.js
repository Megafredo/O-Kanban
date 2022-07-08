import { base_url, users_url } from './index.js';

const user ={

    init(){
        this.signIn()
      
    },

    async signIn(){
        
        //! TEMPORAIRE
        // document.querySelector('#zone-lists').style.display = "none";
        // document.querySelector('#addListButton').style.display= "none";

        console.log('ICI USER')

        document.querySelector('#sign-in').addEventListener('click', (event)=>{
            event.preventDefault();
           
            document.querySelector('.container--signin').style.display = "block";
            document.querySelector('.container--signup').style.display = "none";
            
        })

        document.querySelector('#form2').addEventListener('submit', (event)=>{
            event.preventDefault();
            user.signInUser()
        });

        document.querySelector('#sign-up').addEventListener('click', (event)=>{
            event.preventDefault();
            document.querySelector('.container--signup').style.display = "block";
            document.querySelector('.container--signin').style.display = "none";
            
        })
       
    },

    // & -------------------------------------------------------------------------------------------------------------------------
    // * ----------------------------------------------------------------------------------------------- SIGN IN USER
    // ( requête POST /users/signin )
    async signInUser() {

        const url = `${base_url}${users_url}signin`;
        console.log("url: ", url);

        const email = document.querySelector('#email_connexion').value;
        const password = document.querySelector('#password_connexion').value;

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                "email": email, 
                "password" : password, 
            }),
        }

        const response = await fetch(url, options);
        console.log("response: ", response);
        
        if (response.ok) {

            const users = await response.json();
            console.log("users: ", users);
            
        } else {
            throw new Error(`Impossible d'afficher l'user, problème serveur`);
        }
    },

    

}

export {user}