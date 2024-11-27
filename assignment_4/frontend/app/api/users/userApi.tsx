import { UserInterface } from "@/app/interface/userInterface";
import { getUserRole } from "../auth/auth"

const URL="http://localhost:3000"
const role=getUserRole();
export const fetchUsers = async() => {
    if(role==="admin")
    {try {
            const data = await fetch(`${URL}/user`,{
                method:"GET",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
        const response=await data.json();
        console.log(response)
        if(!response){
            throw new Error(`Failed - ${response.message}`)
        }
        return response;
    } catch (error) {
        return [];
    }}
} 

export const deleteUsers = async(id:string) =>{
    if(role==="admin"){
        try {
            const data = await fetch(`${URL}/user/${id}`,
                {
                    method:"DELETE",
                    headers:{
                         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
        } catch (error) {
            alert(`Error - ${error}`)
        }
    }
}

export const updateUsers = async(id:string,updatedData: Partial<UserInterface>) => {
    if(role==="admin"){
        try {
            const data = await fetch(`${URL}/user/${id}`,{
                method:"PATCH",
                headers:{"Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body:JSON.stringify(updatedData)
            })
            if (!data.ok) {
                const errorData = await data.json();
                throw new Error(errorData.message || "Failed to update user");
              }
        
              const res = await data.json();
              return res;
        } catch (error) {
            alert(`Error - ${error}`)
        }
    }
}