export default class Parcheggio {
    constructor(id_parcheggio, nome, capacita, disponibilita, posizione){
        this.id_parcheggio = id_parcheggio;
        this.nome = nome;
        this.capacita = capacita;
        this.disponibilita = disponibilita;
        this.posizione = posizione;
    }
    aggiornaDisp(newDisp){
        this.disponibilita = newDisp;  //aggiorna la disponibilità rt
    }
    getDisp(){
        return this.disponibilita;  //ritorna la disponibilità rt
    }
}