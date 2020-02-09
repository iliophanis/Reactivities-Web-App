import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/ActivityStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    //three lifecycle methods in one
    activityStore.loadActivities();
  }, [activityStore]); //called every time render if []
  // change then call it again not again and again
  // else we will have infinite loop

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />
    
  return (
    <Grid>
      <Grid.Column width={10}>{<ActivityList />}</Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
