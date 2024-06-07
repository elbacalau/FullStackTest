using System.Diagnostics.CodeAnalysis;

namespace Prueba1.Server
{
    public class Libro
    {
        // datos requeridos
        public int Id { get; set; }
        public required string Titulo { get; set; }

        public required string Autor { get; set; }


        // datos adicionales

        public int DataPublicacion { get; set; } 

    }
}