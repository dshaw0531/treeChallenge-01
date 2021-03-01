using Microsoft.EntityFrameworkCore;

namespace TreeChallengeAPI.Persistence
{
    public class TreeChallengeDbContext : DbContext
    {
        public TreeChallengeDbContext(DbContextOptions<TreeChallengeDbContext> options) : base(options)
        {

        }

        public virtual DbSet<FactoryModel> Factory { get; set; }
        public virtual DbSet<ChildNodeModel> ChildNode { get; set; }
    }
}
