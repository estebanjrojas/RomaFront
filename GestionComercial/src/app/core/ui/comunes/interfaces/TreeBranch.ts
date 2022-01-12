export interface TreeBranch {
  id: string;
  label: string;
  helperText?: string; //For tooltips or similar
  expandable: boolean;
  selectable: boolean;
  disabled?: boolean;
  isExpanded: boolean;
  childrens?: TreeBranch[];
  icon?: string;
  onSelect?: any;
  onToggle?: any;
  state: string; //selected, default
}
