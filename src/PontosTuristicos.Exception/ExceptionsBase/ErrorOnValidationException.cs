using System.Net;

namespace PontosTuristicos.Exception.ExceptionsBase
{
    public class ErrorOnValidationException : PontosException
    {
        private readonly IList<string> _errors;

        public ErrorOnValidationException(IList<string> messages) : base(string.Empty)
        {
            _errors = messages;
        }

        public override IList<string> GetErrorMessage()
        {
            return _errors;
        }

        public override HttpStatusCode GetStatusCode()
        {
            return HttpStatusCode.BadRequest;
        }
    }
}
