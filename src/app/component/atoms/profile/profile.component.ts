import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/interfaces/user';
import { PROFILE_LABELS } from 'src/app/util/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {
  @Input() user: UserResponse | null = null;
  
  labels = PROFILE_LABELS; 
}
