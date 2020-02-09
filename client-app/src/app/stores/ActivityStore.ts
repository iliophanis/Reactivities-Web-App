import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map(); //more functionallity make the
  @observable activity: IActivity | null=null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

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
      runInAction("loading activities", () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0]; //usefull to split and take only the things we want
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };


  @action loadActivity=async(id:string)=>{
    let activity =this.getActivity(id);
    if(activity) {
      this.activity=activity;
    }else{
      this.loadingInitial=true;
      try{
        activity=await agent.Activities.details(id);
        runInAction('getting actiivty',()=>{
          this.activity=activity;
          this.loadingInitial=false;
        })
      }catch(error){
        runInAction('get activity error',()=>{
          this.loadingInitial=false;
        })
        console.log(error);
      }
    }
  }

  @action clearActivity=()=>{
    this.activity=null;
  }

  getActivity=(id:string)=>{
    return this.activityRegistry.get(id);
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("editing activity", () => {
        this.activityRegistry.set(activity.id, activity); //overwrite with updated activity
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editing activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("delete activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}

export default createContext(new ActivityStore());
