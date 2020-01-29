export interface IActivity{ //use to make strict and for type checking
    //like propTypes
    id:string;
    title:string;
    description:string;
    date:Date;
    city:string;
    venue:string;
}