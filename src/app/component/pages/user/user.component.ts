import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/interfaces/user';
import { UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: UserResponse | null = null;
  userId = "67101e908a4bffcfb6b59c55"; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserId(); 
  }

  getUserId() {
    this.userService.getUser(this.userId).subscribe(
      (data: UserResponse) => {
        this.user = data; // Asigna la respuesta a la variable user
      }, 
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
