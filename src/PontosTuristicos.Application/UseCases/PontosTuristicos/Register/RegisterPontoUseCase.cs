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
                CreatedAt = DateTime.UtcNow
            };

            dbContext.Pontos.Add(entity);

            dbContext.SaveChanges();

            return new ResponseShortPontoJson
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Location = entity.Location,
                CreatedAt = entity.CreatedAt,
            };
        }

        private void Validate(RequestRegisterPontoJson request)
        {
            var validator = new RegisterPontoValidator();

            var result = validator.Validate(request);

            if(result.IsValid == false)
            {
                var errorMessages = result.Errors.Select(error => error.ErrorMessage).ToList();

                throw new ErrorOnValidationException(errorMessages);
            }
        }
    }
}
