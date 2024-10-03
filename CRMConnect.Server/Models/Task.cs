namespace CRMConnect.Server.Models
{
    public enum Status
    {
        Pending,
        Completed
    }

    public class Task
    {
        public int TaskId { get; set; }
        public string TaskDescription { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public Status Status { get; set; } = Status.Pending;
        public int? SalesRepId { get; set; }
        public SalesRepresentative? SalesRepresentative { get; set; }
    }
}
