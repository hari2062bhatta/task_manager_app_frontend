export interface Task {
   
    _id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "inprogress" | "completed";
    
}

export interface TaskResponse{
    success:boolean,
    data:Task[]
}

export interface Edit{
  title:string,
  description:string,
  _id:string,
   priority: "high" | "medium" | "low";
  status: "pending" | "inprogress" | "completed";
}
