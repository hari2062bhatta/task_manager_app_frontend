export interface Task {   
    _id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  duration:number,
  status: "pending" | "inprogress" | "completed";
  createdAt:Date  
}

export interface TaskResponse{
    success:boolean,
    data:Task[]
}

export interface Edit{
  title:string,
  description:string,
  _id:string,
  duration:number,
   priority: "high" | "medium" | "low";
  status: "pending" | "inprogress" | "completed";
}

