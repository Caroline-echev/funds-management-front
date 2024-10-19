import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SubscriptionResponse } from 'src/app/interfaces/user';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() subscribe: SubscriptionResponse[] | null = null; 
  @Input() selectedTab: string = 'transactions'; 
  @Output() tabChange = new EventEmitter<string>(); 
  @Output() buttonClick = new EventEmitter<{ userId: string | undefined; fund: string | undefined; notificationsEnabled: boolean }>(); 
  
  notificationsEnabled: boolean = false; 
  isLoading: boolean = false; 

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notificationsEnabled$.subscribe(enabled => {
      this.notificationsEnabled = enabled; 
    });
  }

  onTabChange(tab: string) {
    this.isLoading = true;  
    this.selectedTab = tab; 
    this.tabChange.emit(tab);

    setTimeout(() => {
      this.isLoading = false; 
    }, 1500);
  }

  handleButtonClick(event: { fund: string | undefined, user: string | undefined }) {
  
    this.buttonClick.emit({ 
      userId: event.user, 
      fund: event.fund, 
      notificationsEnabled: this.notificationsEnabled 
    });
  }
}
