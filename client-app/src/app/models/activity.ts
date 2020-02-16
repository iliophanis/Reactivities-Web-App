export interface IActivity {
  category: any; //use to make strict and for type checking
  id: string;
  title: string;
  description: string;
  date: Date;
  city: string;
  venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}
