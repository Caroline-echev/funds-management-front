import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { of, throwError } from 'rxjs';
import { UserResponse, SubscriptionResponse } from 'src/app/interfaces/user';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userServiceMock: any;
  let subscriptionServiceMock: any;
  let errorHandlerServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getUser: jasmine.createSpy('getUser').and.returnValue(of({} as UserResponse)),
      getTransactionsByUserId: jasmine.createSpy('getTransactionsByUserId').and.returnValue(of([] as SubscriptionResponse[])),
      getSubscriptionsByUserId: jasmine.createSpy('getSubscriptionsByUserId').and.returnValue(of([] as SubscriptionResponse[]))
    };

    subscriptionServiceMock = {
      unsubscribe: jasmine.createSpy('unsubscribe').and.returnValue(of(null))
    };

    errorHandlerServiceMock = {
      handleSuccess: jasmine.createSpy('handleSuccess')
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: SubscriptionService, useValue: subscriptionServiceMock },
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should fetch user on init', () => {
    const mockUser = {
      id: '67101e908a4bffcfb6b59c55',
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      initialBalance: 100,
      dateOfBirth: '1990-01-01',
      subscriptions: []
    };
    userServiceMock.getUser.and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(userServiceMock.getUser).toHaveBeenCalledWith(component.userId);
    expect(component.user).toEqual(mockUser);
  });

  it('should handle error when fetching user', () => {
    userServiceMock.getUser.and.returnValue(throwError('Error fetching user'));
    
    component.getUserId();
    
    expect(userServiceMock.getUser).toHaveBeenCalled();
  });

  it('should fetch transactions on init', () => {
    const mockSubscriptions: SubscriptionResponse[] = [{
      userId: '67101e908a4bffcfb6b59c55',
      fundId: 'fund123',
      fundName: 'Test Fund',
      subscriptionAmount: 100,
      subscriptionType: 'Monthly',
      dateTime: new Date()
    }];
    userServiceMock.getTransactionsByUserId.and.returnValue(of(mockSubscriptions));

    component.ngOnInit();

    expect(userServiceMock.getTransactionsByUserId).toHaveBeenCalledWith(component.userId);
    expect(component.subscribe).toEqual(mockSubscriptions);
  });

  it('should handle error when fetching transactions', () => {
    userServiceMock.getTransactionsByUserId.and.returnValue(throwError('Error fetching transactions'));

    component.getTransactionsByUserId();

    expect(userServiceMock.getTransactionsByUserId).toHaveBeenCalled();
  });

  it('should unsubscribe successfully', () => {
    component.unsubscribe('fund123', component.userId, false);

    expect(subscriptionServiceMock.unsubscribe).toHaveBeenCalledWith(component.userId, 'fund123', false);
    expect(errorHandlerServiceMock.handleSuccess).toHaveBeenCalledWith('Desuscripción exitosa');
  });
});
