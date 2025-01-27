using Microsoft.AspNetCore.Http;

namespace PontosTuristicos.Communication.Requests
{
    public class RequestRegisterPontoJson
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
        public string ImagePath { get; set; } = string.Empty;
    }
}
