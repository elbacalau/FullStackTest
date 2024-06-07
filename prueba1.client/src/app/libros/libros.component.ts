import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  dataPublicacion: number;
}

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})


export class LibrosComponent implements OnInit{
  libros: Libro[] = [];
  terminoBusqueda = '';
  libroEncontrado: Libro | undefined | null = null;
  libroNoEncontrado: string | null  = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLibro();
  }

  getLibro() {
    this.http.get<Libro[]>('http://localhost:5130/Libro').subscribe(
      (libros: Libro[]) => {
        this.libros = libros;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarLibro() {
    // reiniciar el libro encontrado antes
    this.libroEncontrado = null;
    this.libroNoEncontrado = null;

    if (!this.terminoBusqueda.trim()) {
      return;
    }

    const terminoBusquedaMin = this.terminoBusqueda.toLowerCase();

    this.libroEncontrado = this.libros.find(libro =>
      libro.titulo.toLowerCase() === terminoBusquedaMin
    );

    if (!this.libroEncontrado) {
      this.libroNoEncontrado = 'El libro no se ha encontrado.'
    }
  }
}
