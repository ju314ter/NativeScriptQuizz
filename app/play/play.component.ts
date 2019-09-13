import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { PlayService } from "~/play.service";
import { Subscription } from "rxjs";

interface Question {
    id : number,
    label : string,
    answer : boolean,
    sucessText : string,
    failText: string
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

@Component({
	selector: "Play",
	moduleId: module.id,
	templateUrl: "./play.component.html",
	styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
	
	playerProfile : PlayerProfile;
	question: Question;

	subcriptionQuestion : Subscription;
	subcriptionPlayerProfile : Subscription;

	id: number;
	labelQuestion : string;
	lifes : number[];
	jokers : number[];
	score : number;
	isAlive : boolean;
	isOver : boolean;

	hasAnswered : boolean = false;
	goodAnswer : boolean = false;

	constructor(
		private playService : PlayService,
		private route: ActivatedRoute,
		private routerExtensions: RouterExtensions){
			this.id = 0;
			this.isAlive = true;
			this.isOver = false;
		}

	ngOnInit(): void {
		this.id++;
		this.id == this.playService.questionArray.length ? this.isOver = true : this.isOver = false;
		this.getQuizzPage()
	}

	getQuizzPage() {
		//this.id = +this.route.snapshot.paramMap.get('id');
		this.subcriptionQuestion = this.playService.getQuestion(this.id).subscribe((question) => {
			this.question = question
		});
		this.subcriptionPlayerProfile = this.playService.getPlayerProfile().subscribe((playerProfile)=>{
			this.playerProfile = playerProfile;
			this.lifes = Array(playerProfile.nbLife)
			this.jokers = Array(playerProfile.nbJoker);
			this.score = playerProfile.score;
		})
	}

	checkAnswer(bool : Boolean){

		if(bool == this.question.answer) {
			this.playService.playerProfile.score++;
			this.goodAnswer = true;
		} else {
			this.playService.playerProfile.nbLife--
			this.goodAnswer = false;
			if(this.playService.playerProfile.nbLife == 0){
				this.isAlive = false;
			}
		}

		this.hasAnswered = true;
	}

	nextQuestion(joker? : Boolean){
		if(joker){
			this.playService.playerProfile.nbJoker--
			this.hasAnswered = true;
			this.goodAnswer = false;
			setTimeout(()=>{}, 2000)
		}
		this.hasAnswered = false;
		this.goodAnswer = false;
		this.subcriptionPlayerProfile.unsubscribe();
		this.subcriptionQuestion.unsubscribe()
		this.ngOnInit()
	}

	giveUp(score? : boolean) {
		if(score){
			this.playService.scoreArray.push(this.score)
		}
		this.playService.reset();
		this.routerExtensions.navigate(['/home'])
	}

	navigateToPlay() {
		this.playService.reset();
		this.routerExtensions.navigate(['/play']);
	}
}