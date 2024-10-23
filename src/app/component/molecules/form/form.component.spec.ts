import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { of, throwError } from 'rxjs';
import { FundResponse } from 'src/app/interfaces/fund';
import { DEFAULT_USER_ID, SUBSCRIPTION_MESSAGE } from 'src/app/util/constants';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let subscriptionServiceMock: any;
  let notificationServiceMock: any;
  let errorHandlerMock: any;

  beforeEach(async () => {
    subscriptionServiceMock = {
      subscribe: jasmine.createSpy('subscribe').and.returnValue(of(null)),
    };
    notificationServiceMock = {
      notificationsEnabled$: of(false),
    };
    errorHandlerMock = {
      handleSuccess: jasmine.createSpy('handleSuccess'),
    };

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        { provide: SubscriptionService, useValue: subscriptionServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: ErrorHandlerService, useValue: errorHandlerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
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

  it('should call subscribe method and handle success', () => {
    component.selectedItem = { id: '1', name: 'Fund A', minimumAmount: 100, category: 'Category A' } as FundResponse;
    component.amount = 150;
    component.notificationsEnabled = true;
    
    component.subscribe();
    
    expect(subscriptionServiceMock.subscribe).toHaveBeenCalledWith(DEFAULT_USER_ID, '1', true, 150);
    expect(errorHandlerMock.handleSuccess).toHaveBeenCalledWith(SUBSCRIPTION_MESSAGE.SUCCESS_MESSAGE);
    expect(component.selectedItem).toBeUndefined();
    expect(component.amount).toBeNull();
  });

  it('should log an error message when subscription fails', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    subscriptionServiceMock.subscribe.and.returnValue(throwError('Subscription error'));
    
    component.selectedItem = { id: '1', name: 'Fund A', minimumAmount: 100, category: 'Category A' } as FundResponse;
    component.amount = 150;
    
    component.subscribe();
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(SUBSCRIPTION_MESSAGE.ERROR_MESSAGE, 'Subscription error');
  });

  it('should toggle inputEnabled on onClick', () => {
    expect(component.inputEnabled).toBe(false);
    component.onClick();
    expect(component.inputEnabled).toBe(true);
    component.onClick();
    expect(component.inputEnabled).toBe(false);
  });

  it('should set selectedItem and close dropdown on onSelect', () => {
    const item: FundResponse = { id: '1', name: 'Fund A', minimumAmount: 100, category: 'Category A' };
    component.onSelect(item);
    expect(component.selectedItem).toBe(item);
    expect(component.isOpen).toBe(false);
  });
});
