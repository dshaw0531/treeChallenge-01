using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreeChallengeAPI.Models
{
    public class GenerationRequestModel
    {
        public int NumberOfChildren { get; set; }
        public int UpperLimit { get; set; }
        public int LowerLimit { get; set; }
    }
}
