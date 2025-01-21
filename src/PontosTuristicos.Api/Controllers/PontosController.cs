using Microsoft.AspNetCore.Mvc;
using PontosTuristicos.Communication.Requests;

namespace pontos_turisticos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontosController : ControllerBase
    {
        [HttpPost]
        public IActionResult Register([FromBody] RequestRegisterPontoJson request)
        {
            return Created();
        }
    }
}
