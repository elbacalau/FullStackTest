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



  letra: string = '';
  palabraAcertar: string = 'hola';
  error2: string = '';
  attempts: number = 0;
  palabraMostrada: string = '_'.repeat(this.palabraAcertar.length);
  msgwin = '';
  errorValidacion = '';
  getChar(): void {
    const long = this.palabraAcertar.length;

    if (long <= 1) {
      this.error2 = 'La palabra tiene que ser mas larga.';
      return;
    }

    let acierto: boolean = false;
    let nuevaPalabraMostrada = '';

    for (let i = 0; i < long; i++) {
      if (this.letra == this.palabraAcertar[i]) {
        acierto = true;
        nuevaPalabraMostrada += this.letra;
    } else {
        nuevaPalabraMostrada += this.palabraMostrada[i];
      }
    }

    if (this.letra.length > 1) {
      this.errorValidacion = 'Solo se puede introducir una letra! :)';
      return;
    }

    this.palabraMostrada = nuevaPalabraMostrada;
    if (!acierto) {
      this.attempts += 1;
    }

    this.letra = '';

    // verificar que la palabra ya esta acertada
    if (this.palabraMostrada === this.palabraAcertar) {
      this.msgwin = 'Felicidades has ganado!';
    }
  }
}
