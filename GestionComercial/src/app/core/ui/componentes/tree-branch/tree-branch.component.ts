import { Component, Input, OnInit } from '@angular/core';
import { TreeBranch } from '../../comunes/interfaces/TreeBranch';
@Component({
  selector: 'app-tree-branch',
  templateUrl: './tree-branch.component.html',
  styleUrls: ['./tree-branch.component.scss'],
})
export class TreeBranchComponent implements OnInit {
  @Input() data!: TreeBranch;

  constructor() {}

  ngOnInit(): void {}
}
