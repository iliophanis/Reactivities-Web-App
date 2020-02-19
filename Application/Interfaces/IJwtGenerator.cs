using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);//except string would be our tokeen
    }
}