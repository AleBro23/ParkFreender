export default class Recensione{
    constructor(id_recensione, descrizione, valutazione){
        this.id_recensione = id_recensione;
        this.descrizione = descrizione;
        this.valutazione = valutazione;
    }
    modificaDesc(newDesc){
        this.descrizione = newDesc;
    }
    modificaVal(newVal){
        this.valutazione = newVal;
    }
    getId(){
        return this.id_recensione;
    }
}