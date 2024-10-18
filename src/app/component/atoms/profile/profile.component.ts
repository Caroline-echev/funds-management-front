import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: UserResponse | null = null;
  

  constructor() { }

  ngOnInit(): void {
  }

}
