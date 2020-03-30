using System;
using System.Collections.Generic;

namespace Application.Activities
{
    public class ActivityDto//return activityDto instead of activity the info need to send to ui
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public ICollection<AttendeeDto> Attendees { get; set; }  //instead of userActivity send this colleciton

    }
}