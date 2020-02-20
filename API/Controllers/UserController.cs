using System.Threading.Tasks;
using Application.user;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class UserController : BaseController
    {
        [AllowAnonymous]//overwrite the policy and let us login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)//query keep the data username and password or and email
        {
            return await Mediator.Send(query);
        }
        [AllowAnonymous]//overwrite the policy and let us login
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}