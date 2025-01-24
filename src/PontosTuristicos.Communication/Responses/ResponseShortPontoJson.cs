namespace PontosTuristicos.Communication.Responses
{
    public class ResponseShortPontoJson
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string ImagePath { get; set; } = string.Empty;

    }
}
