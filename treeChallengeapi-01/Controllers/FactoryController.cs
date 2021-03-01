using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TreeChallengeAPI.Models;
using TreeChallengeAPI.Services;
using SecuringWebApiUsingApiKey.Attributes;
using TreeChallengeAPI.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace TreeChallengeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [ApiKey]
    public class FactoryController : ControllerBase
    {
        private readonly IFactoryService _factoryService;
        private readonly IHubContext<FactoryHub> _hubContext;

        public FactoryController(IFactoryService factoryService, IHubContext<FactoryHub> hubContext)
        {
            _factoryService = factoryService;
            _hubContext = hubContext;
        }

        [HttpPost]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> AddFactory([FromBody] string factoryName)
        {
            var saveResult = await _factoryService.AddFactory(factoryName);

            if(saveResult)
            {
                await _hubContext.Clients.All.SendAsync("ListChanged", factoryName);
            }

            return StatusCode(200, saveResult);
        }

        [HttpPut("{factoryId}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(200, Type = typeof(bool))]
        public async Task<IActionResult> UpdateFactory(int factoryId, [FromBody] string name)
        {
            var saveResult = await _factoryService.UpdateFactory(factoryId, name);

            if (saveResult)
            {
                await _hubContext.Clients.All.SendAsync("ListChanged", factoryId);
            }

            return StatusCode(200, saveResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFactoriesWithChildNodes()
        {
            var factories = await _factoryService.GetFactoriesWithChildNodes();
            return ObjectOrNotFound(factories);
        }

        [HttpDelete("{factoryId}")]
        public async Task<IActionResult> DeleteFactory(int factoryId)
        {
            var saveResult = await _factoryService.DeleteFactory(factoryId);

            if (saveResult)
            {
                await _hubContext.Clients.All.SendAsync("ListChanged", factoryId);
            }

            return StatusCode(200, saveResult);
        }

        [HttpDelete("child/{childNodeId}")]
        public async Task<IActionResult> DeleteChildNode(int childNodeId)
        {
            var saveResult = await _factoryService.DeleteChildNode(childNodeId);

            if (saveResult)
            {
                await _hubContext.Clients.All.SendAsync("ListChanged", childNodeId);
            }

            return StatusCode(200, saveResult);
        }

        [HttpPost("{factoryId}/generateNodes")]
        public async Task<IActionResult> GenerateChildNodes(int factoryId, [FromBody] GenerationRequestModel generationRequest)
        {
            var saveResult = await _factoryService.GenerateChildNodes(factoryId, generationRequest);

            if (saveResult)
            {
                await _hubContext.Clients.All.SendAsync("ListChanged", factoryId);
            }

            return StatusCode(200, saveResult);
        }

        protected IActionResult ObjectOrNotFound(object data)
        {
            if (data == null)
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(data);
        }
    }
}
