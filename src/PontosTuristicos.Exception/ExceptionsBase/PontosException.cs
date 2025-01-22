using System.Net;

namespace PontosTuristicos.Exception.ExceptionsBase
{
    public abstract class PontosException : SystemException
    {
        public PontosException(string message) : base(message)
        {
            
        }

        public abstract HttpStatusCode GetStatusCode();
        public abstract IList<string> GetErrorMessage();
    }
}
