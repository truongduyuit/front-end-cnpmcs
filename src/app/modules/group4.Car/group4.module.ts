import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { Group4RoutingModule } from "./group4.routing.module";
import { Group4ServiceProxyModule } from "./group4.service-proxy.module";
import { CarListComponent } from "./car/car-list.component";
import { CarEditComponent } from "./car/car-edit.component";
import { UtilsModule } from "@shared/utils/utils.module";

@NgModule({
    imports: [
        Group4RoutingModule,
        Group4ServiceProxyModule,
        CommonModule,
        FormsModule,
        TableModule,
        UtilsModule
    ],
    declarations: [CarListComponent, CarEditComponent],
    providers: [],
})
export class Group4Module {}
