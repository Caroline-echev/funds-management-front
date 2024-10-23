import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundComponent } from './fund.component';
import { FundService } from 'src/app/services/fund.service';
import { NotificationService } from 'src/app/services/notification.service';
import { of, throwError } from 'rxjs';
import { FundResponse } from 'src/app/interfaces/fund';
import { EMPTY_STRING, FUND_LABELS } from 'src/app/util/constants';

describe('FundComponent', () => {
  let component: FundComponent;
  let fixture: ComponentFixture<FundComponent>;
  let fundServiceMock: any;
  let notificationServiceMock: any;

  beforeEach(async () => {
    fundServiceMock = {
      getFunds: jasmine.createSpy('getFunds').and.returnValue(of([] as FundResponse[])),
    };

    notificationServiceMock = {
      notificationsEnabled$: of(false),
    };

    await TestBed.configureTestingModule({
      declarations: [FundComponent],
      providers: [
        { provide: FundService, useValue: fundServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch funds on init', () => {
    const mockFunds: FundResponse[] = [
      { id: '1', name: 'Fund A', minimumAmount: 1000, category: 'FPV' },
      { id: '2', name: 'Fund B', minimumAmount: 2000, category: 'FIC' },
    ];
    fundServiceMock.getFunds.and.returnValue(of(mockFunds));

    component.ngOnInit();

    expect(fundServiceMock.getFunds).toHaveBeenCalledWith(component.category, component.orderByName, component.isAsc);
    expect(component.funds).toEqual(mockFunds);
  });

  it('should handle error when fetching funds', () => {
    fundServiceMock.getFunds.and.returnValue(throwError('Error fetching funds'));

    component.fetchFunds();

    expect(fundServiceMock.getFunds).toHaveBeenCalled();
    expect(component.funds).toEqual([]); 
  });

  it('should update notificationsEnabled when notification state changes', () => {
    notificationServiceMock.notificationsEnabled$ = of(true);
    component.ngOnInit();

    expect(component.notificationsEnabled).toBe(true);
  });

  it('should update filterByCategory and category on filter change', () => {
    component.onFilterChange(true);

    expect(component.filterByCategory).toBe(true);
    expect(component.category).toBe(component.labels.TYPE_FPV); 
  });

  it('should call fetchFunds when filter changes', () => {
    spyOn(component, 'fetchFunds');
    component.onFilterChange(true);

    expect(component.fetchFunds).toHaveBeenCalled();
  });

  it('should toggle isChecked and update category on switch change', () => {
    component.onSwitchChange(false);

    expect(component.isChecked).toBe(false);
    expect(component.category).toBe(component.labels.TYPE_FIC); 
   });

  it('should call fetchFunds when switch changes', () => {
    spyOn(component, 'fetchFunds');
    component.onSwitchChange(true);

    expect(component.fetchFunds).toHaveBeenCalled();
  });

  it('should sort by name when sortBy is called with name', () => {
    component.sortBy(component.labels.SORT_BY_NAME);

    expect(component.orderByName).toBe(true);
    expect(fundServiceMock.getFunds).toHaveBeenCalledWith(component.category, true, component.isAsc);
  });

  it('should toggle sort order when toggleSortOrder is called', () => {
    component.toggleSortOrder();

    expect(component.isAsc).toBe(false);
  });
});
