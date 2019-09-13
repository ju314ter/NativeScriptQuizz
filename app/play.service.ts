import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Question {
    id : number,
    label : string,
    answer : boolean,
    sucessText : string,
    failText: string,
    imgPath? : string;
}

class PlayerProfile {
    nbJoker : number;
    nbLife : number;
    mode : string;
    score : number;
    constructor(nbLife: number, nbJoker: number, mode: string, score: number) {
        this.nbJoker = nbJoker
        this.nbLife = nbLife
        this.mode = mode
        this.score = score
    }
}

@Injectable({
    providedIn: 'root',
})
export class PlayService {

    playerProfile = new PlayerProfile(3,2,"easy",0);
    scoreArray : number[]= [];
    questionArray: Question[] = [
        {
            id: 2,
            label :"Le coeur d'une crevette est logé dans sa tête.",
            answer : true,
            sucessText : "Et pas seulement le cœur, en effet, pour les crevettes, les principaux organes internes, le cerveau, le cœur, l’estomac, l’ovaire et les testicules sont situés au niveau de leur tête.",
            failText : "raté dommage !"
        },
        {
            id: 1,
            label :"Ceci est le drapeau de la Turquie",
            answer : false,
            imgPath : "https://images-na.ssl-images-amazon.com/images/I/31s65UrXsZL.jpg",
            sucessText : "Bien joué tu n'es pas tombé dans le piège",
            failText : "Et non c'est le drapeau de la tunisie...Echec !"
        },
        {
            id: 3,
            label :"Les rats se multiplient si rapidement qu'en 24 mois, un couple de rat peut avoir plus d'un million de descendants.",
            answer : true,
            sucessText : "Et plus d'un demi milliard en 3ans",
            failText : "Les chiffres c'est pas ton truc"
        },
        {
            id: 4,
            label :"Le briquet a été inventé avant l'allumette.",
            answer : true,
            sucessText : "Incroyable mais vrai !",
            failText : "On s'en serait pas douté hein ?"
        },
        {
            id: 5,
            label :"À travers le monde, 23% des problèmes aux photocopieurs sont causés par des gens qui s'assoient sur l'appareil pour photocopier leur derrière.",
            answer : true,
            sucessText : "On sent l'expérience",
            failText : "Et si. Peu de foi dans la fiabilité des photocopieurs tu-as ?"
        },
        {
            id: 6,
            label :'La plupart des "rouges à lèvres" contiennent des écailles de poisson.',
            answer : true,
            sucessText : "Y parait...",
            failText : "Go vegan !"
        },
        {
            id: 7,
            label :"À l'origine, le Coca-Cola était vert.",
            answer : true,
            sucessText : "Comme tout bon remède !",
            failText : "Revoit ta pop culture"
        },
        {
            id: 8,
            label :"Le plus jeune Pape était âgé de 11 ans.",
            answer : false,
            sucessText : "Bien le catéchisme ?",
            failText : "Il avait 16/18ans (selon les sources) et est considéré comme l'un des papes les plus scandaleux. Parjure, meurtre, sacrilège, adultère, ..."
        },
        {
            id: 9,
            label :"Les gilets pare-balles, les escaliers de secours, les essuie-glace, les imprimantes laser ont tous été inventés par des femmes.",
            imgPath : "data:image/jpeg;base64,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",
            answer : true,
            sucessText : "Ca t'en bouche un coin n'est-ce pas ?",
            failText : "Pas trop choqué ?"
        },
        {
            id: 10,
            label :"G.O.L.F signifie Gentlemen Only, Ladies Forbidden.",
            answer : false,
            sucessText : 'Derive du Scottish "goulf", frapper. Lui même dérivé du Néerlandais "kolf" qui signifie "baton" ou "club"',
            failText : "Franchement...Plus c'est gros..."
        },

    ]
    
    constructor() { }

    getQuestion(id: number): Observable<Question> {
        return of(this.questionArray.find(question => question.id === id));
      }
    getPlayerProfile(): Observable<PlayerProfile> {
        return of(this.playerProfile);
      }
      
    reset() {
        this.playerProfile = new PlayerProfile(3,2,"easy",0);
    }

}