import React,{useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from '../../features/navbar/navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

interface Istate{
  activities:IActivity[]//type of an array of iactivity
}
const App =()=> {
    const [activities,setActivities]=useState<IActivity[]>([]);


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
          <Navbar/>
          <Container style={{marginTop:'7em'}}>
            <ActivityDashboard activities={activities}/>
          </Container>
      </Fragment>
    );

}

export default App;
