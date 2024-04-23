// types.ts
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    type: 'end-user' | 'tech-support' | 'admin' | null
};
  
  export interface Ticket {
    status: any;
    attachments: any;
    id: any;
    userId: number;
    subject: string;
    description: string;
  }
  