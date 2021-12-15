import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-panel",
  templateUrl: "panel.container.html",
})
export class PanelContainer {
  public constructor(private router: Router, private route: ActivatedRoute) {}
}
