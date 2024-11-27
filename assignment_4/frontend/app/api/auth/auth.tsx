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
          const decoded: any = jwtDecode(token); 
          return decoded.role || null; 
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      }
    }
    return null;
  };