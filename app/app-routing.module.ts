import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { OptionsComponent } from "./options/options.component";

const routes: Routes = [
    { path: "", redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'play', component: PlayComponent },
    { path: 'options', component: OptionsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
