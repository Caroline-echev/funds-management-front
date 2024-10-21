import { Component, OnInit } from '@angular/core';
import { FundResponse } from 'src/app/interfaces/fund';
import { FundService } from 'src/app/services/fund.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EMPTY_STRING, FUND_LABELS } from 'src/app/util/constants';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  funds: FundResponse[] = [];
  isLoading = true;
  orderByName: boolean = true; 
  isAsc: boolean = true;       
  category: string = '';       
  isChecked = true;           
  filterByCategory: boolean = false; 
  notificationsEnabled: boolean = false;
  labels = FUND_LABELS;

  constructor(private fundService: FundService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetchFunds();
    this.notificationService.notificationsEnabled$.subscribe(enabled => {
      this.notificationsEnabled = enabled; 
    });
  }

  onFilterChange(isChecked: boolean): void {
    this.filterByCategory = isChecked;
    this.category = isChecked ? this.labels.TYPE_FPV : EMPTY_STRING;
    this.fetchFunds();
  }

  onSwitchChange(isChecked: boolean): void {
    this.isChecked = isChecked;
    this.category = isChecked ? this.labels.TYPE_FPV : this.labels.TYPE_FIC;
    this.fetchFunds();
  }

  fetchFunds(): void {
    this.isLoading = true;
    this.fundService.getFunds(this.category, this.orderByName, this.isAsc).subscribe({
      next: (data) => {
        this.funds = data;
        setTimeout(() => {
          this.isLoading = false; 
        }, 1500);
      },

      error: (err) => {
        console.error(this.labels.ERROR_GET_FUND, err);
        setTimeout(() => {
          this.isLoading = false; 
        }, 1500);
      }
    });
  }

  sortBy(criteria: string): void {
    this.orderByName = criteria === this.labels.SORT_BY_NAME;
    this.fetchFunds();
  }

  toggleSortOrder(): void {
    this.isAsc = !this.isAsc;
    this.fetchFunds();
  }
}
