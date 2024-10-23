import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { UserResponse, SubscriptionResponse } from '../interfaces/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a user by ID', () => {
    const mockUser: UserResponse = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      initialBalance: 100,
      dateOfBirth: '1990-01-01',
      subscriptions: ['sub1', 'sub2'],
    };

    service.getUser('1').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should retrieve subscriptions by user ID', () => {
    const mockSubscriptions: SubscriptionResponse[] = [
      {
        userId: '1',
        fundId: 'f1',
        fundName: 'Fund One',
        subscriptionAmount: 500,
        subscriptionType: 'Monthly',
        dateTime: new Date('2023-01-01T10:00:00Z'),
      },
    ];

    service.getSubscriptionsByUserId('1').subscribe(subscriptions => {
      expect(subscriptions).toEqual(mockSubscriptions);
    });

    const req = httpMock.expectOne(`${apiUrl}/subscriptions?userId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubscriptions);
  });

  it('should retrieve transactions by user ID', () => {
    const mockTransactions: SubscriptionResponse[] = [
      {
        userId: '1',
        fundId: 'f1',
        fundName: 'Fund One',
        subscriptionAmount: 200,
        subscriptionType: 'One-Time',
        dateTime: new Date('2023-01-01T12:00:00Z'),
      },
    ];

    service.getTransactionsByUserId('1').subscribe(transactions => {
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne(`${apiUrl}/transactions?userId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });
});
