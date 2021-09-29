import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categorias } from '../../app/modelos/Categorias';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('roma_acceso')
    }
  )
};


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categorias: Categorias[] = [];

  constructor(private http: HttpClient) { }

  setCategorias(json) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    this.categorias = json;
  }


  //GET's


  obtenerJSONTodasCategorias() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/obtenerJSONTodasCategorias/', httpOptions);
  }

  public getCategorias(): any {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    const categoriasObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.categorias);
      }, 1000);
    });

    return categoriasObservable;
  }


  getCategoriasBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getCategoriasBusqueda/' + texto_busqueda, httpOptions);
  }

  getCategoriasTodas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getCategoriasTodas/', httpOptions);
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasCategorias(buscar_nombre, buscar_descripcion, buscar_catpadre, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint +
      '/getCantidadPaginasCategorias/' +
      buscar_nombre + '/' +
      buscar_descripcion + '/' +
      buscar_catpadre + '/' +
      txt,
      httpOptions);
  }

  getCategoria(pagina_actual, cantidad_paginas, buscar_nombre, buscar_descripcion, buscar_catpadre, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint +
      '/getCategorias/' +
      pagina_actual + '/' +
      cantidad_paginas + '/' +
      buscar_nombre + '/' +
      buscar_descripcion + '/' +
      buscar_catpadre + '/' +
      txt,
      httpOptions);
  }
  //PAGINACION FIN <------------


  getDatosCategorias(categorias_id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + `/getDatosCategorias/${categorias_id}`, httpOptions);
  }



  //POST's

  guardarCategoria(categoria: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    const json = JSON.stringify(categoria);
    return this.http.post(environment.apiEndpoint + '/categorias/insert', json, httpOptions);
  }


  //PUT's

  updateCategoria(categoria: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    const json = JSON.stringify(categoria);
    return this.http.put(environment.apiEndpoint + '/categorias/update', json, httpOptions);
  }


  //DELETE's



}
