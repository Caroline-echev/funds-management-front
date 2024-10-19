import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new Subject<string>();
  private successSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();
  success$ = this.successSubject.asObservable();

  constructor() {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message; 
      } else {
        errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
      }
    }

    this.errorSubject.next(errorMessage);
  }

  handleSuccess(message: string) {
    this.successSubject.next(message);
  }
}
