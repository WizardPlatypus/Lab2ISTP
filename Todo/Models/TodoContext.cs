using Microsoft.EntityFrameworkCore;

namespace Todo.Models
{
    public class TodoContext : DbContext
    {
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) {
            Console.WriteLine("BOOOP");
            Database.EnsureCreated();
        }
    }
}
