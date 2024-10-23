import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerService]
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle client-side error correctly', () => {
    const errorEvent = new ErrorEvent('Client Error', {
      message: 'An unexpected error occurred on the client side.'
    });
    const errorResponse = new HttpErrorResponse({
      error: errorEvent,
      status: 400,
      statusText: 'Bad Request'
    });

    const spy = spyOn(service['errorSubject'], 'next');
    service.handleError(errorResponse);

    expect(spy).toHaveBeenCalledWith('Error: An unexpected error occurred on the client side.');
  });

  it('should handle server-side error with error message from backend', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Internal Server Error' },
      status: 500,
      statusText: 'Server Error'
    });

    const spy = spyOn(service['errorSubject'], 'next');
    service.handleError(errorResponse);

    expect(spy).toHaveBeenCalledWith('Internal Server Error');
  });

  
  it('should handle success message correctly', () => {
    const message = 'Operation completed successfully';
    const spy = spyOn(service['successSubject'], 'next');

    service.handleSuccess(message);

    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should emit success$ observable', (done: DoneFn) => {
    const successMessage = 'Success!';
    service.success$.subscribe((message) => {
      expect(message).toBe(successMessage);
      done();
    });

    service.handleSuccess(successMessage);
  });

  it('should emit error$ observable', (done: DoneFn) => {
    const errorMessage = 'Error occurred!';
    service.error$.subscribe((message) => {
      expect(message).toBe(errorMessage);
      done();
    });

    service.handleError(new HttpErrorResponse({ error: { message: errorMessage }, status: 500 }));
  });
});
