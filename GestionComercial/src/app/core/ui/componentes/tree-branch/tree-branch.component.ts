import { Component, Input, OnInit, Output, ElementRef } from "@angular/core";
import { TreeBranch } from "../../comunes/interfaces/TreeBranch";

@Component({
  selector: "app-tree-branch",
  templateUrl: "./tree-branch.component.html",
  styleUrls: ["./tree-branch.component.scss"],
})
export class TreeBranchComponent implements OnInit {
  @Input() data: TreeBranch;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  selectItem(selectedItem) {
    const event: CustomEvent = new CustomEvent(`ItemSelectedCustomEvent`, {
      bubbles: true,
      detail: selectedItem,
    });
    this.elementRef.nativeElement.dispatchEvent(event);
  }

  toggle(toggledItem) {
    const event: CustomEvent = new CustomEvent("ItemToggledCustomEvent", {
      bubbles: true,
      detail: toggledItem,
    });
    this.elementRef.nativeElement.dispatchEvent(event);
  }
}
