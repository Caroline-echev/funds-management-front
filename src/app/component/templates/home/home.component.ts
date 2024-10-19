import { Component, OnInit } from '@angular/core';
import { SubscriptionResponse, UserResponse } from 'src/app/interfaces/user';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserResponse | null = null;
  userId = "67101e908a4bffcfb6b59c55"; 
  subscribe: SubscriptionResponse[] | null = null;
  selectedTab: string = 'transactions'; 
  notificationsEnabled: boolean = false; 

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private errorHandler: ErrorHandlerService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.getUserId(); 
    this.getTransactionsByUserId();
  }

  getUserId() {
    this.userService.getUser(this.userId).subscribe(
      (data: UserResponse) => {
        this.user = data; 
      }, 
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  getTransactionsByUserId() {
    this.userService.getTransactionsByUserId(this.userId).subscribe(
      (data: SubscriptionResponse[]) => {
        this.subscribe = data; 
      }, 
      (error: any) => {
        console.error('Error fetching user transactions:', error);
      }
    );
  }

  getSubscriptionsByUserId() {
    this.userService.getSubscriptionsByUserId(this.userId).subscribe(
      (data: SubscriptionResponse[]) => {
        this.subscribe = data; 
      }, 
      (error: any) => {
        console.error('Error fetching user subscriptions:', error);
      }
    );
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    if (tab === 'transactions') {
      this.getTransactionsByUserId(); 
    } else if (tab === 'subscriptions') {
      this.getSubscriptionsByUserId(); 
    }
  }

  unsubscribe(fund: string | undefined, userId: string| undefined, notificationsEnabled: boolean) {
    const isSMS = notificationsEnabled; 
    this.subscriptionService.unsubscribe(this.userId, fund || '', isSMS).subscribe(
      () => {
        this.errorHandler.handleSuccess(`Desuscripción exitosa`);
        this.getSubscriptionsByUserId();
        this.getUserId();
      },
      (error: any) => {
        console.error('Error during unsubscribe:', error);
      }
    );
  }
}
