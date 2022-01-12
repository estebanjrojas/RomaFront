import {
  Component,
  Input,
  OnInit,
  HostListener,
  EventEmitter,
  Output,
} from "@angular/core";
import { TreeBranch } from "../../comunes/interfaces/TreeBranch";

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
})
export class TreeComponent implements OnInit {
  @Input() data: any[];
  @Input() allSelectable: boolean;
  @Output() newSelectedItem: EventEmitter<{}> = new EventEmitter<{}>();

  formatedData: TreeBranch[];
  selectedItemId: string;

  constructor() {
    this.formatedData = [];
    this.selectedItemId = "";
    this.data = this.data != undefined ? this.data : [];
  }

  ngOnInit(): void {
    this.formatedData = this.data.map((dataItem) => this.formatData(dataItem));
  }

  private formatData(data: any) {
    return {
      id: data.id,
      label: data.name,
      helperText: "",
      expandable: data.children !== undefined && data.children.length > 0,
      selectable:
        data.children === undefined ||
        data.children === null ||
        data.children.length === 0 ||
        this.allSelectable === true,
      disabled: false,
      isExpanded: false,
      state: data.id === this.selectedItemId ? "selected" : "default",
      childrens:
        data.children !== undefined && data.children.length !== 0
          ? data.children.map((child: any) => {
              return this.formatData(child);
            })
          : [],
    };
  }

  @HostListener("ItemSelectedCustomEvent", ["$event"])
  onSelectionEventCaptured(event: any) {
    if (event.detail.hasOwnProperty("id")) {
      this.updateSelectedItem(event.detail.id);
      this.newSelectedItem.emit(event.detail);
    }
  }

  updateSelectedItem(itemId) {
    this.selectedItemId = itemId;
    this.formatedData = this.formatedData.map((branch) =>
      this.setSelectedState(branch, itemId)
    );
  }

  setSelectedState(branch, selectedId) {
    return {
      id: branch.id,
      label: branch.label,
      helperText: branch.helperText,
      expandable: branch.expandable,
      selectable: branch.selectable,
      disabled: branch.disabled,
      isExpanded: branch.isExpanded,
      state: branch.id === selectedId ? "selected" : "default",
      childrens: branch.childrens.map((child: any) =>
        this.setSelectedState(child, selectedId)
      ),
    };
  }

  @HostListener("ItemToggledCustomEvent", ["$event"])
  onToggleEventCaptured(event: any) {
    if (event.detail.hasOwnProperty("id")) {
      this.toggleItemAll(event.detail.id);
    }
  }

  toggleItemAll(toggleId) {
    this.formatedData = this.formatedData.map((branch) =>
      this.toggleItemFromBranch(branch, toggleId)
    );
  }

  toggleItemFromBranch(branch, toggleId) {
    return {
      id: branch.id,
      label: branch.label,
      helperText: branch.helperText,
      expandable: branch.expandable,
      selectable: branch.selectable,
      disabled: branch.disabled,
      isExpanded:
        branch.id === toggleId ? !branch.isExpanded : branch.isExpanded,
      state: branch.state,
      childrens: branch.childrens.map((child: any) =>
        this.toggleItemFromBranch(child, toggleId)
      ),
    };
  }
}
