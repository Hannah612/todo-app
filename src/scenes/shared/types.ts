export enum SelectedPage {
  Home = "home",
  Tasks = "tasks",
}

export enum SortType {
  Date = "date",
  Priority = "priority_id",
  Completed = "completed",
  None = "none",
}

export enum OrderType {
  ASC = "asc",
  DESC = "desc",
  None = "none",
}

export const motionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {once:true, amount:0.5}, //amount = amount you need to see for animation to trigger 
  transition:{duration:0.2},
  variants: {
      hidden:{opacity:0, x:-50}, //initial state
      visible: {opacity:1, x:0}, //while in view state
  }
}

export interface Task {
  title: string;
  description?: string;
  priority_id: number;
  completed: boolean;
  due_date: Date;
  id: number;
}
