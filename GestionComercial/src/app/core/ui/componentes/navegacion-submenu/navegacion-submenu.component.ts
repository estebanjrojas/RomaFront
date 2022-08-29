import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navegacion-submenu',
  templateUrl: './navegacion-submenu.component.html',
  styleUrls: ['./navegacion-submenu.component.scss']
})
export class NavegacionSubmenuComponent implements OnInit {
  @Input() ObjeMenu: any;
  constructor() { 
  }
  
  ngOnInit() {

  }

  
  opcionMenuTieneRuta(menuOpcion){
    return (menuOpcion.menu_ruta===null 
      || menuOpcion.menu_ruta === undefined
      || menuOpcion.menu_ruta === "" 
      || menuOpcion.menu_ruta === "null"
      ) ? false : true;
  }

  opcionMenuTieneHijos(menuOpcion){
    return (menuOpcion.menu_hijo != null
      && menuOpcion.menu_hijo != undefined
      && menuOpcion.menu_hijo != "null"
      && menuOpcion.menu_hijo != ""
      && menuOpcion.menu_hijo.length > 0
      ) ? true : false;
  }

}
