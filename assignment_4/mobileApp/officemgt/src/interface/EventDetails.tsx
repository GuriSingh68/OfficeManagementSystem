export interface EventDetails {
    _id:string,
    title: string;
    startDate: string; 
    endDate: string;   
    attendeesEmails: string[]; 
    description: string;      
    isOnline: boolean;         
    eventLink?: string;    
  }
  