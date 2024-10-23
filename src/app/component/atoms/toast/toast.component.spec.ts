import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let mockErrorHandler: jasmine.SpyObj<ErrorHandlerService>;

  beforeEach(() => {
    // Crea un espía para el ErrorHandlerService
    mockErrorHandler = jasmine.createSpyObj('ErrorHandlerService', ['error$', 'success$']);
    
    // Configura el valor que devolverán los observables
    mockErrorHandler.error$ = of('This is an error message');
    mockErrorHandler.success$ = of('This is a success message');

    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        { provide: ErrorHandlerService, useValue: mockErrorHandler }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should subscribe to success message and set message and isError', () => {
    component.ngOnInit();

    mockErrorHandler.success$.subscribe();

    expect(component.message).toBe('This is a success message');
    expect(component.isError).toBeFalse();
  });
});
