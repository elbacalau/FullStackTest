import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Libro } from '../libros/libros.component';

@Injectable({
  providedIn: 'root'
})
export class LibrosFormularioService {
  private apiUrl = 'http://localhost:5130/Libro';
  private librosSubject = new BehaviorSubject<Libro[]>([]);
  libros$ = this.librosSubject.asObservable();

  constructor( private http: HttpClient ) {
    this.cargarLibros();
  }

  cargarLibros() {
    this.http.get<Libro[]>('http://localhost:5130/Libro')
      .subscribe(libros => this.librosSubject.next(libros));
  }

  agregarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>('http://localhost:5130/Libro', libro)
      .pipe(
        tap(nuevoLibro => {
          const librosActualizados = [...this.librosSubject.value, nuevoLibro]
          this.librosSubject.next(librosActualizados);
        })
      );
  }




}
