namespace Todo.Models
{
    public class Task : Entity
    {
        public string Title { get; set; } = "Draft";
        public string Description { get; set; } = "TODO: Add a description";
        public int PersonId { get; set; }
        public virtual Person? Person { get; set; }
    }
}
