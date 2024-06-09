export type ClientDashboardParams = {
    password: string;
    orders: number;
    last_name: string;
    rating: number;
    first_name: string;
    username: string;
    id: string;
    email: string;
    isVerified: boolean;
    token: string;
  };

  export type ClientDashboardStringParams = {
    [K in keyof ClientDashboardParams]: string;
  };