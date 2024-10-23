import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';
import { NotificationService } from 'src/app/services/notification.service';
import { of } from 'rxjs';
import { SubscriptionResponse } from 'src/app/interfaces/user';
import { SELECTED_TAD } from 'src/app/util/constants';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let notificationServiceMock: any;

  beforeEach(async () => {
    notificationServiceMock = {
      notificationsEnabled$: of(false),
    };

    await TestBed.configureTestingModule({
      declarations: [RadioComponent],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to notificationsEnabled on init', () => {
    notificationServiceMock.notificationsEnabled$ = of(true);
    component.ngOnInit();
    expect(component.notificationsEnabled).toBe(true);
  });

  it('should change tab and emit tabChange event', () => {
    spyOn(component.tabChange, 'emit');
    component.onTabChange('New Tab');
    expect(component.selectedTab).toBe('New Tab');
    expect(component.tabChange.emit).toHaveBeenCalledWith('New Tab');
  });

  it('should set isLoading to true on tab change', () => {
    component.onTabChange('New Tab');
    expect(component.isLoading).toBe(true);
  });

  it('should set isLoading to false after delay on tab change', (done) => {
    component.onTabChange('New Tab');
    setTimeout(() => {
      expect(component.isLoading).toBe(false);
      done();
    }, 1500);
  });

  it('should emit buttonClick event on handleButtonClick', () => {
    spyOn(component.buttonClick, 'emit');
    const event = { fund: 'Fund A', user: 'User A' };
    component.notificationsEnabled = true;
    component.handleButtonClick(event);
    expect(component.buttonClick.emit).toHaveBeenCalledWith({
      userId: 'User A',
      fund: 'Fund A',
      notificationsEnabled: true,
    });
  });
});
