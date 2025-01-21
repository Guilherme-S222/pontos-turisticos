using PontosTuristicos.Communication.Requests;
using PontosTuristicos.Communication.Responses;
using PontosTuristicos.Exception;
using PontosTuristicos.Exception.ExceptionsBase;
using PontosTuristicos.Infrastructure;
using PontosTuristicos.Infrastructure.Entities;

namespace PontosTuristicos.Application.UseCases.PontosTuristicos.Register
{
    public class RegisterPontoUseCase
    {
        public ResponseShortPontoJson Execute(RequestRegisterPontoJson request)
        {
            Validate(request);

            var dbContext = new PontosDbContext();

            var entity = new Ponto
            {
                Name = request.Name,
                Description = request.Description,
                Location = request.Location,
                City = request.City,
                State = request.State,
            };

            dbContext.Pontos.Add(entity);

            dbContext.SaveChanges();

            return new ResponseShortPontoJson
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Location = entity.Location,
            };
        }

        private void Validate(RequestRegisterPontoJson request)
        {
            if(string.IsNullOrWhiteSpace(request.Name))
            {
                throw new PontosException(ResourceErrorMessages.NAME_EMPTY);
            }       

            if (string.IsNullOrWhiteSpace(request.Location))
            {
                throw new PontosException(ResourceErrorMessages.LOCATION_EMPTY);
            }

            if (string.IsNullOrWhiteSpace(request.City))
            {
                throw new PontosException(ResourceErrorMessages.CITY_EMPTY);
            }

            if (string.IsNullOrWhiteSpace(request.State))
            {
                throw new PontosException(ResourceErrorMessages.STATE_EMPTY);
            }
        }
    }
}
