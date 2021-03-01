using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TreeChallengeAPI.Persistence
{
    public partial class ChildNodeModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int FactoryId { get; set; }
        public virtual FactoryModel Factory { get; set; }
    }
}
