using PontosTuristicos.Communication.Responses;
using PontosTuristicos.Exception;
using PontosTuristicos.Exception.ExceptionsBase;
using PontosTuristicos.Infrastructure;

namespace PontosTuristicos.Application.UseCases.PontosTuristicos.GetById
{
    public class GetPontoByIdUseCase
    {
        public ResponsePontoJson Execute(Guid id)
        {
            var dbContext = new PontosDbContext();

            var ponto = dbContext.Pontos.FirstOrDefault(ponto => ponto.Id == id);

            if (ponto is null)
            {
                throw new NotFoundException(ResourceErrorMessages.TOURIST_SPOT_NOT_FOUND);
            }

            return new ResponsePontoJson
            {
                Id = ponto.Id,
                Name = ponto.Name,
                Description = ponto.Description,
                Location = ponto.Location,
                City = ponto.City,
                State = ponto.State,
                CreatedAt = ponto.CreatedAt,
                ImagePath = ponto.ImagePath,

            };
        }
    }
}
