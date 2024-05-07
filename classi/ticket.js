import Veicolo from "./veicolo.js";
import Pagamento from "./pagamento.js";

class Ticket{
    constructor(id_Ticket, durata, parcheggio, veicolo, tariffaH, statoT, pagamento, data_init, data_end){
        this.id_Ticket = id_Ticket;
        this.durata = durata; //in minuti
        this.parcheggio = parcheggio;
        this.veicolo = veicolo;
        this.tariffaH = tariffaH;
        this.statoT = statoT;
        this.pagamento = pagamento;
        this.data_init = data_init;
        this.data_end = data_end;
    }
    validTicket(){ //ritorna true se valido e false altrimenti
        const isValid = (this.data_end - this.data_init) < this.durata; //se minore di durata è valido se no no
        return isValid;
    }
    checkTicket(){ //ritorna il tempo rimanente
        const now = new Date(); //data e ora attuale
        const difference = now - this.data_init; //differenza tra la data attuale e data_init in millisecondi
        const differenceInMinutes = Math.floor(difference / (1000 * 60)); // Converti la differenza in minuti arrotondando per difetto
        return differenceInMinutes;
    }
    extendTicket(){
        //!!!
    }
    getCostoTot(){
        const costo = this.tariffaH * (this.durata / 60);
        return costo;
    }
}