import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string | null = null;
  isError: boolean = false;

  constructor(private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {
    this.errorHandler.error$.subscribe((msg: string) => {
      this.message = msg;
      this.isError = true; 
      this.autoHide();
    });

    this.errorHandler.success$.subscribe((msg: string) => {
      this.message = msg;
      this.isError = false; 
      this.autoHide();
    });
  }

  private autoHide() {
    setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}
