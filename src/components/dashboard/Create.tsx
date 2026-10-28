import { useState } from "react";
import api from "../../config/api"
import swal from "sweetalert2"
const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  const handleSubmit=async(e: React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!title.trim()){
        return 
    }
    try{
            const response=await api.post("/api/task/create",{
                title,
                description,
            })
            if(response.data.success){
                setDescription("")
                setTitle("")
                    swal.fire({
                        title:"success",
                        text:"task created successfully",
                        icon:"success"
                    })
            }
            else{
                swal.fire({
                    title:"error",
                    text:"task creation failed",
                    icon:"error"
                })
            }
    }
    catch(err){
            console.log("error")
    }

  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg">
      <h2 className="text-xl font-semibold mb-5">Create Task</h2>

      <form className="space-y-4"
      onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"

            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>setTitle(e.target.value)}
            value={title}
            placeholder="Enter task title"
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            rows={4}
          onChange={(e)=>setDescription(e.target.value)}
            value={description}
            placeholder="Enter task description"
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"

          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default Create;
