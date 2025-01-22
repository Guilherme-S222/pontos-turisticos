using System.Net;

namespace PontosTuristicos.Exception.ExceptionsBase
{
    public class NotFoundException : PontosException
    {
        public NotFoundException(string message) : base(message)
        {
            
        }

        public override IList<string> GetErrorMessage()
        {
            return [ Message ];
        }

        public override HttpStatusCode GetStatusCode()
        {
            return HttpStatusCode.NotFound;
        }
    }
}
