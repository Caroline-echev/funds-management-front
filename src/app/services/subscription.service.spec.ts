import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubscriptionService } from './subscription.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/subscriptions`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriptionService],
    });
    service = TestBed.inject(SubscriptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to subscribe a user', () => {
    const userId = '123';
    const fundId = '456';
    const isSMS = true;
    const amount = 500;

    service.subscribe(userId, fundId, isSMS, amount).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/subscribe`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    
    expect(req.request.body).toEqual({
      userId: '123',
      fundId: '456',
      isSMS: true,
      amount: 500
    });

    req.flush(null); 
  });

  it('should send a POST request to unsubscribe a user', () => {
    const userId = '123';
    const fundId = '456';
    const isSMS = false;

    service.unsubscribe(userId, fundId, isSMS).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/unsubscribe`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    
    expect(req.request.body).toEqual({
      userId: '123',
      fundId: '456',
      isSMS: false
    });

    req.flush(null); 
  });
});
