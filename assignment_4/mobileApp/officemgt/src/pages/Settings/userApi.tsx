import { getUserRole } from "../../utils/jwtUtils";


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
        if(!response){
            throw new Error(`Failed - ${response.message}`)
        }
        return response;
    } catch (error) {
        return [];
    }}
} 

export const deleteUsers=async(id:string) => {
    if(role==="admin"){
        try {
                const data = await fetch(`${URL}/user/${id}`,{
                    method:"DELETE",headers:{
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                const res=await data.json();
                console.log(`Delete user - ${res}`);
                if(!res){
                    throw new Error("Err")
                }
                return res;
        } catch (error) {
            console.log(error);
        }
    }
}