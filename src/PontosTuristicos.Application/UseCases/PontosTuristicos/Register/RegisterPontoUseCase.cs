using Microsoft.AspNetCore.Http;
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
        public async Task<ResponseShortPontoJson> Execute(RequestRegisterPontoJson request)
        {
            Validate(request);

            request.ImagePath = await SaveImage(request.Image);

            var dbContext = new PontosDbContext();

            var entity = new Ponto
            {
                Name = request.Name,
                Description = request.Description,
                Location = request.Location,
                City = request.City,
                State = request.State,
                CreatedAt = DateTime.UtcNow,
                ImagePath = request.ImagePath,
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
                ImagePath = entity.ImagePath,
            };
        }

        private void Validate(RequestRegisterPontoJson request)
        {
            var validator = new RegisterPontoValidator();

            var result = validator.Validate(request);

            if (result.IsValid == false)
            {
                var errorMessages = result.Errors.Select(error => error.ErrorMessage).ToList();

                throw new ErrorOnValidationException(errorMessages);
            }
        }

        private async Task<string> SaveImage(IFormFile? image)
        {
            if (image == null || image.Length == 0)
            {

                return "/img/landscape-placeholder-svgrepo-com.svg";

            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return $"/img/{uniqueFileName}";
        }
    }
}
