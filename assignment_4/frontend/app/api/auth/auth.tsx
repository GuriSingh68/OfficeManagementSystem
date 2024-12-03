"use client"
import {jwtDecode} from 'jwt-decode';

export const isAuthenticated=() =>{
    const token=localStorage.getItem("accessToken")
    return token && token !== '';
}

export const getUserRole =  (): string | null => {
    if (typeof window !== 'undefined') { 
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const decode: any = jwtDecode(token); 
          return decode.role || null; 
        } catch (error) {
          console.log('Failed to decode token:', error);
        }
      }
    }
    return null;
  };

  export const getUserId = () : string | null => {
    const token =localStorage.getItem("accessToken");
    if(token){
      try {
        const decode : any = jwtDecode(token)
        return decode.userId 
      } catch (error) {
        console.log('Failed to decode token:', error);

      }
    }
    return null;
  }