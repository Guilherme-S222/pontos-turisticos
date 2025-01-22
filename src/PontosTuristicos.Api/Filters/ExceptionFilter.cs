using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PontosTuristicos.Communication.Responses;
using PontosTuristicos.Exception;
using PontosTuristicos.Exception.ExceptionsBase;

namespace pontos_turisticos.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if(context.Exception is PontosException)
            {
                var pontosException = (PontosException)context.Exception;

                context.HttpContext.Response.StatusCode = (int)pontosException.GetStatusCode();

                var responseJson = new ResponseErrorsJson(pontosException.GetErrorMessage());

                context.Result = new ObjectResult(responseJson);
            }
            else
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

                var responseJson = new ResponseErrorsJson(new List<string> { ResourceErrorMessages.UNKNOWN_ERROR });

                context.Result = new ObjectResult(responseJson);
            }
        }
    }
}
