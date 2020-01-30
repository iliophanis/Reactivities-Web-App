import React,{useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/navbar/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

interface Istate{
  activities:IActivity[]//type of an array of iactivity
}
const App =()=> {
    const [activities,setActivities]=useState<IActivity[]>([]);
    const [selectedActivity,setSelectedActivity]=useState<IActivity | null>(null);//double types null or activity
    const[editMode,setEditMode]=useState(false);//by default useState is boolean

    const handleSelectActivity=(id:string)=>{
        setSelectedActivity(activities.filter(a=>a.id===id)[0]);
    };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

const handleCreateActivity=(activity: IActivity)=>
{
  setActivities([...activities,activity]);
}

const handleEditActivity=(activity: IActivity)=>{
  setActivities([...activities.filter(a=>a.id !==activity.id),activity])
}
  useEffect(() => {//three lifecycle methods in one
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response=>{
      setActivities(response.data);
    }))
  },[]);//called every time render if []
       // change then call it again not again and again
        // else we will have infinite loop
    return (//use fragment because div create a null div no reason 
      <Fragment>
          <NavBar openCreateForm={handleOpenCreateForm} />
          <Container style={{marginTop:'7em'}}>
            <ActivityDashboard 
            activities={activities}
            selectActivity={handleSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}/>
          </Container>
      </Fragment>
    );

}

export default App;
