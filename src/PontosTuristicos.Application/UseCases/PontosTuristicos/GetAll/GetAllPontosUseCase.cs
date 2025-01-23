using PontosTuristicos.Communication.Responses;
using PontosTuristicos.Infrastructure;

namespace PontosTuristicos.Application.UseCases.PontosTuristicos.GetAll
{
    public class GetAllPontosUseCase
    {
        public ResponsePontosJson Execute()
        {
            var dbContext = new PontosDbContext();

            var pontos = dbContext.Pontos.OrderByDescending(ponto => ponto.CreatedAt).ToList();

            return new ResponsePontosJson
            {
                Pontos = pontos.Select(ponto => new ResponsePontoJson
                {
                    Id = ponto.Id,
                    Name = ponto.Name,
                    Description = ponto.Description,
                    Location = ponto.Location,
                    City = ponto.City,
                    State = ponto.State,
                    CreatedAt = ponto.CreatedAt,
                }).ToList(),
            };
        }
    }
}
