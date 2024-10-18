import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  checked: boolean = false;

  constructor(private notificationService: NotificationService) { }


  onCheckboxChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.notificationService.setNotificationsEnabled(this.checked); 
  }
}
