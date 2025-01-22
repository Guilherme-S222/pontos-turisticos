using PontosTuristicos.Communication.Responses;
using PontosTuristicos.Exception.ExceptionsBase;
using PontosTuristicos.Exception;
using PontosTuristicos.Infrastructure;

namespace PontosTuristicos.Application.UseCases.PontosTuristicos.Delete
{
    public class DeletePontoByIdUseCase
    {
        public void Execute(Guid id)
        {
            var dbContext = new PontosDbContext();

            var ponto = dbContext.Pontos.FirstOrDefault(ponto => ponto.Id == id);

            if (ponto is null)
            {
                throw new NotFoundException(ResourceErrorMessages.TOURIST_SPOT_NOT_FOUND);
            }

            dbContext.Pontos.Remove(ponto);
            dbContext.SaveChanges();
        }
    }
}
