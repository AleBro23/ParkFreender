import Utente from "./utente.js";

class UtenteAuth extends Utente{
    constructor(id_utente, username, email, password){
        super(id_utente);
        this.username = username;
        this.email = email;
        this.password = password;
        this.veicoli = new Set();
    }
    logout(){
        //!!!
    }
    addVeicolo(veicolo){ //aggiunge un veicolo alla lista dell'utente
        if(!this.veicoli.has(veicolo)){
            this.veicoli.add(veicolo);
        }
    }
    rmVeicolo(veicolo){
        if(this.veicoli.has(veicolo)){
            this.veicoli.delete(veicolo);
        }
    }
    buyTicket(){
        //!!!
    }
    viewTicket(){
        //!!!
    }
}