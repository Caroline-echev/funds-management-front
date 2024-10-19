// src/app/components/fund-list/fund-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FundResponse } from 'src/app/interfaces/fund';
import { FundService } from 'src/app/services/fund.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {
  funds: FundResponse[] = [];
  isLoading = true;
  orderByName: boolean = true; 
  isAsc: boolean = true;       
  category?: string = '';       
  isChecked = true;           
  filterByCategory: boolean = false; 
  notificationsEnabled: boolean = false;

  constructor(private fundService: FundService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetchFunds();
    this.notificationService.notificationsEnabled$.subscribe(enabled => {
      this.notificationsEnabled = enabled; 
    });
  }

  toggleSwitch(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.category = (this.isChecked ? 'FPV' : 'FIC');
    this.fetchFunds();
  }

  toggleFilterByCategory(event: Event) {
    this.filterByCategory = (event.target as HTMLInputElement).checked;
    this.category = this.filterByCategory ? 'FPV' : '';
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
        console.error('Error fetching funds', err);
        setTimeout(() => {
          this.isLoading = false; 
        }, 1500);
      }
    });
  }

  sortBy(criteria: string): void {
    this.orderByName = criteria === 'name';
    this.fetchFunds();
  }

  toggleSortOrder(): void {
    this.isAsc = !this.isAsc;
    this.fetchFunds();
  }
  
}
