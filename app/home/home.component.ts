import * as accelerometer from "nativescript-accelerometer";
import { Component, OnInit } from "@angular/core";
import { NativeScriptRouterModule, RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    navigateToPlay(): void {
        this.routerExtensions.navigate(['/play']);
    }
    navigateToAsk(): void {

    }
    navigateToOptions(): void {
        this.routerExtensions.navigate(['/options']);
    }
}
