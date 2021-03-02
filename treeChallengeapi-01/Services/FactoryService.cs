using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeChallengeAPI.Models;
using TreeChallengeAPI.Persistence;

namespace TreeChallengeAPI.Services
{
    public class FactoryService : IFactoryService
    {
        private readonly TreeChallengeDbContext _treeChallengeDbContext;

        public FactoryService(TreeChallengeDbContext treeChallengeDbContext)
        {
            _treeChallengeDbContext = treeChallengeDbContext;
        }

        public async Task<bool> AddFactory(string factoryName)
        {
            try
            {
                Persistence.FactoryModel factoryModel = new Persistence.FactoryModel();
                factoryModel.Name = factoryName;

                _treeChallengeDbContext.Factory.Add(factoryModel);

                return await _treeChallengeDbContext.SaveChangesAsync() > 0;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateFactory(int factoryId, string name)
        {
            try
            {
                var factory = await _treeChallengeDbContext.Factory.FirstOrDefaultAsync(x => x.Id == factoryId);

                if (factory == null)
                {
                    return false;
                }

                factory.Name = name;

                _treeChallengeDbContext.Factory.Update(factory);

                return await _treeChallengeDbContext.SaveChangesAsync() > 0;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<List<FactoryModel>> GetFactoriesWithChildNodes()
        {
            var factories = await _treeChallengeDbContext.Factory.Include(g => g.ChildNodes.OrderBy(v => int.Parse(v.Name))).ToListAsync();
            return factories;
        }

        public async Task<bool> DeleteFactory(int factoryId)
        {
            try
            {
                var factory = _treeChallengeDbContext.Factory.Where(g => g.Id == factoryId);
                _treeChallengeDbContext.Factory.RemoveRange(factory);
                return await _treeChallengeDbContext.SaveChangesAsync() > 0;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteChildNode(int childNodeId)
        {
            try
            {
                var childNode = _treeChallengeDbContext.ChildNode.Where(g => g.Id == childNodeId);
                _treeChallengeDbContext.ChildNode.RemoveRange(childNode);
                return await _treeChallengeDbContext.SaveChangesAsync() > 0;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> GenerateChildNodes(int factoryId, GenerationRequestModel generationRequest)
        {
            if (generationRequest.NumberOfChildren > 15 || generationRequest.NumberOfChildren <= 0 || generationRequest.UpperLimit < generationRequest.LowerLimit)
            {
                return false;
            }

            var factory = await _treeChallengeDbContext.Factory.Where(g => g.Id == factoryId).FirstOrDefaultAsync();

            if (factory == null)
            {
                return false;
            }

            try
            {
                var children = _treeChallengeDbContext.ChildNode.Where(g => g.FactoryId == factoryId);
                _treeChallengeDbContext.ChildNode.RemoveRange(children);

                for (int i = 0; i < generationRequest.NumberOfChildren; i++)
                {
                    Random rnd = new Random();
                    int num = rnd.Next(generationRequest.LowerLimit, generationRequest.UpperLimit + 1);
                    _treeChallengeDbContext.ChildNode.Add(new ChildNodeModel { FactoryId = factoryId, Name = num.ToString() });
                }

                return await _treeChallengeDbContext.SaveChangesAsync() > 0;
            }
            catch(Exception e)
            {
                return false;
            }
        }
    }
}
