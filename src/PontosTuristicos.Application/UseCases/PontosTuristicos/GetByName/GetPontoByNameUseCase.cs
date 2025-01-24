using Microsoft.EntityFrameworkCore;
using PontosTuristicos.Communication.Responses;
using PontosTuristicos.Exception;
using PontosTuristicos.Exception.ExceptionsBase;
using PontosTuristicos.Infrastructure;

namespace PontosTuristicos.Application.UseCases.PontosTuristicos.GetByName
{
    public class GetPontoByNameUseCase
    {
        public ResponsePontosJson Execute(string name)
        {
            var dbContext = new PontosDbContext();

            var pontos = dbContext
                         .Pontos
                         .Where(ponto => EF.Functions.Like(ponto.Name.ToLower(), $"%{name.ToLower()}%") ||
                                         EF.Functions.Like(ponto.Description.ToLower(), $"%{name.ToLower()}%") ||
                                         EF.Functions.Like(ponto.Location.ToLower(), $"%{name.ToLower()}%") ||
                                         EF.Functions.Like(ponto.City.ToLower(), $"%{name.ToLower()}%"))
                         .ToList();

            if (!pontos.Any()) 
            {
                throw new NotFoundException(ResourceErrorMessages.TOURIST_SPOT_NOT_FOUND);
            }

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
                    ImagePath = ponto.ImagePath
                }).ToList(),
            };

        }
    }
}
