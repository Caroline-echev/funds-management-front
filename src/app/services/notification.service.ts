import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsEnabledSubject = new BehaviorSubject<boolean>(false); 
  notificationsEnabled$ = this.notificationsEnabledSubject.asObservable(); 

  setNotificationsEnabled(enabled: boolean): void {
    this.notificationsEnabledSubject.next(enabled); 
  }
}
