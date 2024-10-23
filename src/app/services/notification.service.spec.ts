import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should have notifications disabled by default', () => {
    service.notificationsEnabled$.subscribe(enabled => {
      expect(enabled).toBeFalse(); 
    });
  });

  it('should enable notifications', () => {
    service.setNotificationsEnabled(true); 

    service.notificationsEnabled$.subscribe(enabled => {
      expect(enabled).toBeTrue();
    });
  });

  it('should disable notifications', () => {
    service.setNotificationsEnabled(true); 
    service.setNotificationsEnabled(false); 

    service.notificationsEnabled$.subscribe(enabled => {
      expect(enabled).toBeFalse(); 
    });
  });
});
