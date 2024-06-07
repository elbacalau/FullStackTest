import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Libro } from '../libros/libros.component';
import { LibrosFormularioService } from './libros-formulario.service';


@Component({
  selector: 'app-libros-formulario',
  templateUrl: './libros-formulario.component.html',
  styleUrls: ['./libros-formulario.component.css']
})
export class LibrosFormularioComponent{

  libroForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
    dataPublicacion: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())])
});


  constructor( private libroService: LibrosFormularioService ) {}

  agregarLibro() {
    if (this.libroForm.valid) {
      const formValue = this.libroForm.value;
      const nuevoLibro: Libro = {
        titulo: formValue.titulo as string,
        autor: formValue.autor as string,
        dataPublicacion: parseInt(formValue.dataPublicacion as string, 10)
      };

      this.libroService.agregarLibro(nuevoLibro).subscribe(
        () => {
          this.libroForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
