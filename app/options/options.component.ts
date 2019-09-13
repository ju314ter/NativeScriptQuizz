import { Component, OnInit } from "@angular/core";
import { PlayService } from "~/play.service";

@Component({
	selector: "Options",
	moduleId: module.id,
	templateUrl: "./options.component.html",
	styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

	mode: string;

	constructor(private playService: PlayService) {
	}

	ngOnInit(): void {
		this.mode = this.playService.playerProfile.mode;
	}
}