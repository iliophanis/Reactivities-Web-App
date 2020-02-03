import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/navbar/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

interface Istate {
  activities: IActivity[]; //type of an array of iactivity
}
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  ); //double types null or activity
  const [editMode, setEditMode] = useState(false); //by default useState is boolean
  const [loading, setLoading] = useState(true);
  const[submitting,setSubmitting]=useState(false);
  const[target,setTarget]=useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false))
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false))
  };

  const handleDeleteActivity = (event:SyntheticEvent<HTMLButtonElement> ,id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(()=>setSubmitting(false));
  };
  useEffect(() => {
    //three lifecycle methods in one
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      response
        .forEach(activity => {
          activity.date = activity.date.split(".")[0]; //usefull to split and take only the things we want
          activities.push(activity);
        })
      setActivities(activities);
    }).then(() => setLoading(false));
  }, []); //called every time render if []
  // change then call it again not again and again
  // else we will have infinite loop

  if (loading) return <LoadingComponent content='Loading activities...'/>
  return (
    //use fragment because div create a null div no reason
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
