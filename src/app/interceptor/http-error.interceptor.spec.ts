import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor'; // Ajusta la ruta según la ubicación del archivo
import { HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;
  let errorHandlerService: jasmine.SpyObj<ErrorHandlerService>;
  let httpHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    errorHandlerService = jasmine.createSpyObj('ErrorHandlerService', ['handleError']);
    httpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    
    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        { provide: ErrorHandlerService, useValue: errorHandlerService },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ]
    });

    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call handleError when an error occurs', () => {
    const req = new HttpRequest('GET', '/test-url');
    const errorResponse = new HttpErrorResponse({ error: 'test error', status: 500 });

    httpHandler.handle.and.returnValue(throwError(errorResponse));

    interceptor.intercept(req, httpHandler).subscribe(
      () => fail('expected an error, not a response'),
      () => {
        expect(errorHandlerService.handleError).toHaveBeenCalledWith(errorResponse);
      }
    );

    expect(httpHandler.handle).toHaveBeenCalledWith(req);
  });

  it('should allow successful requests to pass through', () => {
    const req = new HttpRequest('GET', '/test-url');
    const httpEvent: HttpEvent<any> = {} as any;
    
    httpHandler.handle.and.returnValue(of(httpEvent));

    interceptor.intercept(req, httpHandler).subscribe(response => {
      expect(response).toEqual(httpEvent);
    });

    expect(httpHandler.handle).toHaveBeenCalledWith(req);
    expect(errorHandlerService.handleError).not.toHaveBeenCalled();
  });
});
