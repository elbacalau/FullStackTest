using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

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
            new Libro { Id = 6, Titulo = "Orgullo y prejuicio", Autor = "Jane Austen", DataPublicacion = 1813 },
            new Libro { Id = 7, Titulo = "Don Quijote de la Mancha", Autor = "Miguel de Cervantes", DataPublicacion = 1605 },
            new Libro { Id = 8, Titulo = "Hamlet", Autor = "William Shakespeare", DataPublicacion = 1603 }
        };

        // GET: api/Libro
        [HttpGet]
        public IActionResult GetLibros()
        {
            return Ok(_libros);
        }

        // GET: api/Libro/PorAño/{año}
        [HttpGet("PorAño/{año:int}")]
        public IActionResult GetLibrosPorAño(int año)
        {
            var librosPorAño = _libros.Where(l => l.DataPublicacion == año).ToList();
            if (librosPorAño.Count == 0)
                return NotFound(new { msg = "No se encontraron libros publicados en ese año." });

            return Ok(librosPorAño);
        }

        // POST: api/Libro
        [HttpPost]
        public IActionResult AgregarLibro([FromBody] Libro nuevoLibro)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            nuevoLibro.Id = _libros.Count > 0 ? _libros.Max(p => p.Id) + 1 : 1;
            _libros.Add(nuevoLibro);

            return CreatedAtAction(nameof(GetLibros), new { id = nuevoLibro.Id }, nuevoLibro);
        }
    }
}
