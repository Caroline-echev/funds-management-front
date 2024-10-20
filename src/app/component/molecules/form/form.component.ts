import { Component, Input, OnInit } from '@angular/core';
import { FundResponse } from 'src/app/interfaces/fund';
import { NotificationService } from 'src/app/services/notification.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service'; 
import { DEFAULT_USER_ID, SUBSCRIPTION_MESSAGE } from 'src/app/util/constants';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  inputEnabled = false;
  isOpen = false;
  selectedItem: FundResponse | undefined;

  @Input() data: FundResponse[] = [];
  amount: number | null = null;
  notificationsEnabled = false;
  userId = DEFAULT_USER_ID; 
  titleButton = SUBSCRIPTION_MESSAGE.TITLE_BUTTON; 
  constructor(
    private subscriptionService: SubscriptionService, 
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService 
  ) { }

  ngOnInit(): void {
    this.notificationService.notificationsEnabled$.subscribe(enabled => {
      this.notificationsEnabled = enabled; 
    });
  }

  subscribe() {
    if (this.selectedItem && this.amount !== null) {
      const isSMS = this.notificationsEnabled; 
      this.subscriptionService.subscribe(this.userId, this.selectedItem.id, isSMS, this.amount).subscribe(
        () => {
          this.errorHandler.handleSuccess(SUBSCRIPTION_MESSAGE.SUCCESS_MESSAGE);
          
          this.selectedItem = undefined;
          this.amount = null;
        },
        (error: any) => {
          console.error(SUBSCRIPTION_MESSAGE.ERROR_MESSAGE, error);
        }
      );
    }
  }

  onClick(): void {
    this.inputEnabled = !this.inputEnabled;
  }

  onSelect(item: FundResponse): void {
    this.selectedItem = item;
    this.isOpen = false;
  }
}
