import { EventDetails } from "../../interface/EventDetails";
import { getUserRole } from "../../utils/jwtUtils";


const URL="http://localhost:3000"
const role=getUserRole()
export const fetchEvents = async () => {
    try {
        const data = await fetch(`${URL}/events` ,
            {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const res= await data.json();
            // console.log(res)
            if(!res){
                throw new Error(`Failed to fetch - `)
            }
            return res;
    } catch (error) {
        console.log(`Error - ${error}`)
        return [];
    }
}

export const delteEvents=async(id:string) => {
    if(role==="admin"){
        try {
                const data = await fetch(`${URL}/events/${id}`,{
                    method:"DELETE",headers:{
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                const res=await data.json();
                console.log(`Delete events - ${res}`);
                if(!res){
                    throw new Error("Err")
                }
                return res;
        } catch (error) {
            console.log(error);
        }
    }
}

export const createEvent=async(eventDetails: EventDetails) => {
    if(role==="admin"){
        try {
            const data = await fetch(`${URL}/events` ,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(eventDetails)
            })
            const res = await data.json();
            console.log("Event Created:", res);
            if (res) {
                return res;  
            } else {
                throw new Error("Event creation failed, no valid response returned.");
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const fetchEventsById = async (id: string) => {
    try {
        const data = await fetch(`${URL}/events/${id}` ,
            {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const res= await data.json();
            console.log(res)
            if(!res){
                throw new Error(`Failed to fetch - `)
            }
            return res;
    } catch (error) {
        console.log(`Error - ${error}`)
        return [];
    }
};