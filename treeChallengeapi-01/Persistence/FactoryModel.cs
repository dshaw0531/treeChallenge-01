using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TreeChallengeAPI.Persistence
{
    public class FactoryModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<ChildNodeModel> ChildNodes { get; set; }
    }
}
