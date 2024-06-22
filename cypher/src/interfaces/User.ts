export interface User {
    name: {
      first: string;
      last: string;
    };
    email: string;
    username: string;
    role: 'client' | 'wizard';
    id:string;
  }
  