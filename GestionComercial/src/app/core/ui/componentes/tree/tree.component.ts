import { Component, Input, OnInit } from '@angular/core';
import { TreeBranch } from '../../comunes/interfaces/TreeBranch';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() data?: TreeBranch[];

  constructor() {
    this.data = this.data != undefined ? this.data : [];
  }

  ngOnInit(): void {}
}
