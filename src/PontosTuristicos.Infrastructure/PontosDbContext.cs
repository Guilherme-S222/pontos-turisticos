using PontosTuristicos.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace PontosTuristicos.Infrastructure
{
    public class PontosDbContext : DbContext
    {
        public DbSet<Ponto> Pontos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=INSERIR-O-CAMINHO-DO-BANCO-DE-DADOS-AQUI/PontosDatabase.db");
        }
    }
}
