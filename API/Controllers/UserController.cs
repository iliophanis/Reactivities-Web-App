using System.Threading.Tasks;
using Application.user;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]//overwrite the policy and let us login
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)//query keep the data username and password or and email
        {
            return await Mediator.Send(query);
        }
    }
}