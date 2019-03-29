import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categorias } from '../../app/modelos/Categorias';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('roma_acceso')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categorias: Categorias[] = [{id:1, name:'Computacion', children: [{id:2, name:'Accesorios'},{id:3, name:'Computadoras', children: [{id:6, name:'PCs de Escritorio'},{id:7, name:'Notebooks'}]},{id:4, name:'Pantallas'},{id:5, name:'Componentes', children: [{id:8, name:'Placas Madre'},{id:9, name:'Memorias'},{id:10, name:'Procesadores'},{id:11, name:'Placas de Video'},{id:12, name:'Discos Rigidos'},{id:13, name:'Fuentes'},{id:14, name:'Gabinetes'},{id:15, name:'Placas de Sonido'}]}]},{id:16, name:'telefonia', children: [{id:17, name:'Telefonos Celulares'}]}];

  constructor(private http: HttpClient) { }

  setCategorias(json) {
    this.categorias = json;
  }

  obtenerJSONTodasCategorias(){
    return this.http.get(environment.apiEndpoint+'/obtenerJSONTodasCategorias/', httpOptions);
  }

  public getCategorias(): any {
      const categoriasObservable = new Observable(observer => {
            setTimeout(() => {
                observer.next(this.categorias);
            }, 1000);
      });

      return categoriasObservable;
  }


}
