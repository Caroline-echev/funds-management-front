export interface UserResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    initialBalance: number;
    dateOfBirth: string;  // LocalDateTime se maneja como string en JSON
    subscriptions: string[];
  }
  