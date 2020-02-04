import { observable, action } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
  @observable activities: IActivity[] = []; //experimentaldecorators:true in tsconfig
  @observable loadingInitial = false;

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0]; //usefull to split and take only the things we want
          this.activities.push(activity);
        });
      })
      .finally(() => this.loadingInitial=false);
  }; //whatever need to motified @action
}

export default createContext(new ActivityStore());
