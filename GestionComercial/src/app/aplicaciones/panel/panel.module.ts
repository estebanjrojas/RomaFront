import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PanelRoutingModule } from "./panel-routing.module";
import { PanelComponent } from "./panel.component";
import { PanelContainer } from "./panel.container";
import { UiModule } from "src/app/core/ui/ui.module";
import { HomeComponent } from "./flujos-trabajo/home/home.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EstadisticasModule } from "./flujos-trabajo/estadisticas/estadisticas.module";
@NgModule({
  declarations: [PanelContainer, PanelComponent, HomeComponent],
  exports: [PanelContainer, PanelComponent, HomeComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    UiModule,
    FontAwesomeModule,
    EstadisticasModule,
  ],
  schemas: [],
})
export class PanelModule {}
