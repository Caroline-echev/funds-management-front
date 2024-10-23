import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FundService } from './fund.service';
import { FundResponse } from '../interfaces/fund';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('FundService', () => {
  let service: FundService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl + '/funds/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FundService],
    });
    service = TestBed.inject(FundService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch funds with default parameters', () => {
    const mockFunds: FundResponse[] = [
      { id: '1', name: 'Fund A', minimumAmount: 1000, category: 'Equity' },
      { id: '2', name: 'Fund B', minimumAmount: 500, category: 'Debt' }
    ];

    service.getFunds().subscribe((funds) => {
      expect(funds.length).toBe(2);
      expect(funds).toEqual(mockFunds);
    });

    const req = httpMock.expectOne((request) => 
      request.url === apiUrl && request.method === 'GET' && 
      request.params.has('orderByName') && request.params.get('orderByName') === 'true' &&
      request.params.has('isAsc') && request.params.get('isAsc') === 'true'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockFunds); 
  });

  it('should fetch funds filtered by category', () => {
    const mockFunds: FundResponse[] = [
      { id: '1', name: 'Fund A', minimumAmount: 1000, category: 'Equity' }
    ];

    service.getFunds('Equity').subscribe((funds) => {
      expect(funds.length).toBe(1);
      expect(funds).toEqual(mockFunds);
    });

    const req = httpMock.expectOne((request) =>
      request.url === apiUrl && request.method === 'GET' &&
      request.params.has('category') && request.params.get('category') === 'Equity'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockFunds); 
  });

  it('should fetch funds with custom order and direction', () => {
    const mockFunds: FundResponse[] = [
      { id: '1', name: 'Fund B', minimumAmount: 500, category: 'Debt' }
    ];

    service.getFunds(undefined, false, false).subscribe((funds) => {
      expect(funds.length).toBe(1);
      expect(funds).toEqual(mockFunds);
    });

    const req = httpMock.expectOne((request) =>
      request.url === apiUrl && request.method === 'GET' &&
      request.params.get('orderByName') === 'false' && 
      request.params.get('isAsc') === 'false'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockFunds); 
  });
});
