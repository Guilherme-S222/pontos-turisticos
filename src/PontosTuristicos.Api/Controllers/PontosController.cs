using Microsoft.AspNetCore.Mvc;
using PontosTuristicos.Application.UseCases.PontosTuristicos.Delete;
using PontosTuristicos.Application.UseCases.PontosTuristicos.GetAll;
using PontosTuristicos.Application.UseCases.PontosTuristicos.GetById;
using PontosTuristicos.Application.UseCases.PontosTuristicos.GetByName;
using PontosTuristicos.Application.UseCases.PontosTuristicos.Register;
using PontosTuristicos.Communication.Requests;
using PontosTuristicos.Communication.Responses;

namespace pontos_turisticos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontosController : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(ResponseShortPontoJson), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] RequestRegisterPontoJson request)
        {
            var useCase = new RegisterPontoUseCase();

            var response = useCase.Execute(request);

            return Created(string.Empty, response);
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponsePontosJson), StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            var useCase = new GetAllPontosUseCase();

            var result = useCase.Execute();

            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(ResponsePontoJson), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var useCase = new GetPontoByIdUseCase();

            var response = useCase.Execute(id);

            return Ok(response);
        }

        [HttpGet]
        [Route("{name}/search")]
        [ProducesResponseType(typeof(ResponsePontoJson), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult GetByName([FromRoute] string name)
        {
            var useCase = new GetPontoByNameUseCase();

            var response = useCase.Execute(name);

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorsJson), StatusCodes.Status404NotFound)]
        public IActionResult Delete([FromRoute] Guid id)
        {
            var useCase = new DeletePontoByIdUseCase();

            useCase.Execute(id);

            return NoContent();
        }
    } 
}
