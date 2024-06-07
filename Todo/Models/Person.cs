namespace Todo.Models
{
    public class Person : Entity
    {
        public Person()
        {
            Tasks = new List<Task>();
        }
        public string Name { get; set; } = "Хто";
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
