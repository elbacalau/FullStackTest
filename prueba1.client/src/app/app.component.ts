import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Producto {
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public productos: Producto[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    this.getProducts();
    this.palabraAcertar = this.obtenerPalabraAleatoria();
    this.palabraMostrada = '_'.repeat(this.palabraAcertar.length);
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getProducts() {
    this.http.get<Producto[]>('http://localhost:5130/Producto').subscribe(
      (result) => {
        this.productos = result;
      },
      (error) => {
        console.error(error);

      }
    );
  }

  nombreProducto: string = '';
  productoEncontrado: Producto | null = null;
  error: string | null = null;

  getProduct(nombre: string) {
    this.http.get<Producto>(`http://localhost:5130/Producto/${nombre}`).subscribe(
      (producto) => {
        this.productoEncontrado = producto;
        this.error = null;
      },
      (error) => {
        this.productoEncontrado = null;
        this.error = 'Producto no encontrado';
      }
    );
  }



  // encontrar una palabra

  // crearemos una lista de palabras para cada vez que recargue sea un diferente
  palabras: string[] = ['hola', 'capullo', 'mundo', 'angular'];

  // inicializacion de variables
  palabraAcertar: string = '';
  letra: string = '';
  error2: string = '';
  attempts: number = 0;
  palabraMostrada: string = '';
  msgwin: string = '';
  errorValidacion: string = '';
  mostrarMensajeError: boolean = false;
  limiteIntentos: number = 15;
  msgLimiteAtt = 'Has superado el limite de intentos';

  obtenerPalabraAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indiceAleatorio].toLowerCase();
  }

  // metodo para la entrada del usuario
  getChar(): void {
    const long = this.palabraAcertar.length;
    let acierto = false;
    let nuevaPalabraMostrada = '';

    for (let i = 0; i < long; i++) {
      if (this.letra.toLowerCase() === this.palabraAcertar[i]) {
        acierto = true;
        nuevaPalabraMostrada += this.letra;
      } else {
        nuevaPalabraMostrada += this.palabraMostrada[i]; // Corrección aquí
      }
    }

    if (this.letra.length > 1) {
      this.errorValidacion = 'Solo se puede introducir una letra! :)';
      return;
    }

    this.palabraMostrada = nuevaPalabraMostrada;
    this.attempts += !acierto ? 1 : 0;
    this.letra = '';

    if (this.palabraMostrada === this.palabraAcertar) {
      this.msgwin = 'Felicidades has ganado!';
    }

    this.mostrarMensajeError = this.isDisabled();
  }

  // metodo para desabilitar el boton en caso que se pase de intentos
  isDisabled(): boolean {
    return this.limiteIntentos <= this.attempts;
  }



}
