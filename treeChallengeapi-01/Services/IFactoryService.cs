using System.Collections.Generic;
using System.Threading.Tasks;
using TreeChallengeAPI.Models;
using TreeChallengeAPI.Persistence;

namespace TreeChallengeAPI.Services
{
    public interface IFactoryService
    {
        Task<bool> AddFactory(string factoryName);
        Task<bool> UpdateFactory(int factoryId, string name);
        Task<List<FactoryModel>> GetFactoriesWithChildNodes();
        Task<bool> DeleteFactory(int factoryId);
        Task<bool> DeleteChildNode(int childNodeId);
        Task<bool> GenerateChildNodes(int factoryId, GenerationRequestModel generationRequest);
    }
}
