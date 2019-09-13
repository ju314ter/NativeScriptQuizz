import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { PlayComponent } from "./play/play.component";


import { PlayService } from "./play.service"
import { OptionsComponent } from "./options/options.component";
import { RankingComponent } from "./ranking/ranking.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HomeModule
    ],
    declarations: [
        AppComponent, PlayComponent, OptionsComponent, RankingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        PlayService
    ]
})
export class AppModule { }
