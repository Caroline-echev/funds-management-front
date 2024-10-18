export interface UserResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    initialBalance: number;
    dateOfBirth: string;  
    subscriptions: string[];
  }
  export interface SubscriptionResponse {
    userId: string;
    fundId: string;
    fundName: string;
    subscriptionAmount: number;
    subscriptionType: string;
    dateTime: Date;
  }
  