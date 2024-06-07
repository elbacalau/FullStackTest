import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Subject } from 'rxjs';

interface Libro {
  id: number;
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
  libroEncontrado: Libro | null = null;
  libroNoEncontrado: string = '';

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

    if (!this.terminoBusqueda.trim()) {
      return;
    }

    const terminoBusquedaMin = this.terminoBusqueda.toLowerCase();
    let encontrado: boolean = false;

    this.libros.forEach(libro => {
      if (libro.titulo.toLowerCase() === terminoBusquedaMin) {
        this.libroEncontrado = libro;
        return;
      }
    });

    if (!encontrado) {
      this.libroNoEncontrado = 'El libro no se ha encontrado.'
    }
  }
}
