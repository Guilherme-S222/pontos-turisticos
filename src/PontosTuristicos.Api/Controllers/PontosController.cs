using Microsoft.AspNetCore.Mvc;
using PontosTuristicos.Application.UseCases.PontosTuristicos.GetAll;
using PontosTuristicos.Application.UseCases.PontosTuristicos.Register;
using PontosTuristicos.Communication.Requests;
using PontosTuristicos.Exception.ExceptionsBase;

namespace pontos_turisticos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontosController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register([FromBody] RequestRegisterPontoJson request)
        {
            try
            {
                var useCase = new RegisterPontoUseCase();

                var response = useCase.Execute(request);

                return Created(string.Empty, response);
            } 
            catch (PontosException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro desconhecido");
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var useCase = new GetAllPontosUseCase();

            var result = useCase.Execute();

            return Ok(result);
        }
    } 
}
