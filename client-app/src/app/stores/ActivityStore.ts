import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore {
  @observable activityRegistry = new Map(); //more functionallity make the
  @observable activities: IActivity[] = []; //experimentaldecorators:true in tsconfig
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submmiting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  } //derived from the existing state or other computed values.
  //help you to make your actual modifiable state as small as possible

  @action loadActivities = async () => {
    //async method instead of remain a promise
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list(); //run this and then below change the format of date
      activities.forEach(activity => {
        activity.date = activity.date.split(".")[0]; //usefull to split and take only the things we want
        this.activityRegistry.set(activity.id, activity);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submmiting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submmiting = false;
    } catch (error) {
      this.submmiting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id); //find method the first element that find
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
