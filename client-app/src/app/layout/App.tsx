import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/navbar/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/ActivityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    //three lifecycle methods in one
    activityStore.loadActivities();
  }, [activityStore]); //called every time render if []
  // change then call it again not again and again
  // else we will have infinite loop

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;
  return (
    //use fragment because div create a null div no reason
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App); //must be observer  to work
