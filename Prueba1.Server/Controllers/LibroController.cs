using Microsoft.AspNetCore.Mvc;
using System;


namespace Prueba1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class LibroController : ControllerBase
    {
        private static List<Libro> _libros = new List<Libro>
        {
            new Libro { Id = 1, Titulo = "Cien años de soledad", Autor = "Gabriel García Márquez", DataPublicacion = 1967 },
            new Libro { Id = 2, Titulo = "El principito", Autor = "Antoine de Saint-Exupéry", DataPublicacion = 1943 },
            new Libro { Id = 3, Titulo = "1984", Autor = "George Orwell", DataPublicacion = 1949 },
            new Libro { Id = 4, Titulo = "El Gran Gatsby", Autor = "F. Scott Fitzgerald", DataPublicacion = 1925 },
            new Libro { Id = 5, Titulo = "Crimen y castigo", Autor = "Fiódor Dostoyevski", DataPublicacion = 1866 },
            new Libro { Id = 6, Titulo = "Orgullo y prejuicio", Autor = "Jane Austen", DataPublicacion = 1813 }
       
        };


        // metodo para ver todos los libros
        [HttpGet]
        public IActionResult getLibros()
        {
            return Ok(_libros);
        }


        // metodo para ver libros por una data en concreta
        [HttpGet]
        public IActionResult getLibrosData(int data)
        {
            var libro = _libros.FirstOrDefault(l => l.DataPublicacion.Equals(data));
            if (libro == null)
                return NotFound(new { msg = "No se ha encontrado ningun libro." });

            return Ok(libro);
        }


        // metodo para agregar libros
        [HttpPost]
        public IActionResult AgregarLibro([FromBody] Libro nuevoLibro)
        {
            if (ModelState.IsValid)
            {
                nuevoLibro.Id = _libros.Count > 0 ? _libros.Max(p => p.Id) + 1 : 1;
                    
               _libros.Add(nuevoLibro);

               return CreatedAtAction(nameof(getLibros), new { id = nuevoLibro.Id }, nuevoLibro);
            }
            else
            {
                // error de validacion
                return BadRequest(ModelState);
            }
        }

    }
}