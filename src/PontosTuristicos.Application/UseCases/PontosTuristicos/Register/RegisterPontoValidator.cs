using FluentValidation;
using PontosTuristicos.Communication.Requests;
using PontosTuristicos.Exception;

namespace PontosTuristicos.Application.UseCases.PontosTuristicos.Register
{
    public class RegisterPontoValidator : AbstractValidator<RequestRegisterPontoJson>
    {
        public RegisterPontoValidator()
        {
            RuleFor(request => request.Name).NotEmpty().WithMessage(ResourceErrorMessages.NAME_EMPTY);

            RuleFor(request => request.Location).NotEmpty().WithMessage(ResourceErrorMessages.LOCATION_EMPTY);

            RuleFor(request => request.City).NotEmpty().WithMessage(ResourceErrorMessages.CITY_EMPTY);

            RuleFor(request => request.State).NotEmpty().WithMessage(ResourceErrorMessages.STATE_EMPTY);

            RuleFor(request => request.ImagePath).NotEmpty().WithMessage(ResourceErrorMessages.IMAGE_PATH_EMPTY);
        }
    }
}
