import { Component } from '@angular/core';

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
export class LibrosComponent {

}
