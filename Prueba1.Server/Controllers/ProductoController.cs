using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Prueba1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductoController : ControllerBase
    {

        private static readonly List<Productos> Productos = new List<Productos>
        {
            new Productos { nombre = "Jersei", precio = 19.29m },
            new Productos { nombre = "Bufanda", precio = 23.63m }
        };

        // obtener todos los productos
        [HttpGet]
        public IActionResult ObtenerProductos()
        {
            return Ok(Productos);
        }

        // obtener los productos por nombre
        [HttpGet("{nombre}")]
        public IActionResult ObtenerProducto(string nombre)
        {
            var producto = Productos.FirstOrDefault(p => p.nombre.Equals(nombre, StringComparison.OrdinalIgnoreCase));
            if (producto == null)
                return NotFound(new { mensaje = "Producto no encontrado." });

            return Ok(producto);
        }

    }

    
}
