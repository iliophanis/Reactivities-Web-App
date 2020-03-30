using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>(); //any item in activity and activityDto 
            //has the same name then do the mapping for us with AutoMapper
            CreateMap<UserActivity, AttendeeDto>();
        }
    }
}