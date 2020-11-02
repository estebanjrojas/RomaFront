import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navegacion-submenu',
  templateUrl: './navegacion-submenu.component.html',
  styleUrls: ['./navegacion-submenu.component.css']
})
export class NavegacionSubmenuComponent implements OnInit {
  @Input() ObjeMenu: any;
  constructor() { 
  }
  
  ngOnInit() {
  }

}
