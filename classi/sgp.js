import Parcheggio from "./parcheggio.js";   //import classi esterne al file
import Recensione from "./recensione.js";
import Stat from "./stat.js";

export default class sgp{
    constructor(){
        this.setParcheggio = new Set(); //contiene tutti i parcheggi
        this.mappaRecensioni = new Map(); //mappa (parcheggio, set(recensione))
        this.mappaStat = new Map(); //mappa (parcheggio, set(statistiche))
    }
    addParcheggio(parcheggio){
        if(!this.setParcheggio.has(parcheggio)){ //aggiungo solo se non c'è già
            this.setParcheggio.add(parcheggio);
        }
        else{
            console.log("parcheggio già esistente");
        }
    }
    removeParcheggio(parcheggio){
        if(this.setParcheggio.has(parcheggio)){
            this.setParcheggio.delete(parcheggio);
        }
        else{
            console.log("parcheggio non esistente");
        }
    }

    addRecensione(parcheggio, recensione){
        if(!this.mappaRecensioni.has(parcheggio)){ //ritorna true se il parcheggio non è  ancora stato aggiunto alla mappa
            this.mappaRecensioni.set(parcheggio, new Set()); //in tal caso crea il set
        }
        this.mappaRecensioni.get(parcheggio).add(recensione); //aggiunge la recensione al set
    }
    getRecensione(parcheggio){
        return this.mappaRecensioni.get(parcheggio); //ritorna tutte le recensioni di un determinato park
    }
    removeRecensione(parcheggio, recensione){
        if(this.mappaRecensioni.has(parcheggio)){
            this.mappaRecensioni.get(parcheggio).delete(recensione);
        }
        else{
            console.log("recensione non esistente");
        }
    }
    addStat(parcheggio, stat){
        if(!this.mappaStat.has(parcheggio)){
            this.mappaStat.set(parcheggio, new Set())
        }
        this.mappaStat.get(parcheggio).add(stat)
    }
    getStat(parcheggio){
        return this.mappaStat.get(stat);
    }


}