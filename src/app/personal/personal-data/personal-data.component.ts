import { Component, OnInit  } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent  implements OnInit {
  
  currentUser: User = new User;

  ngOnInit() {
    const storageUserAsStr = localStorage.getItem('currentUser');

    if(storageUserAsStr) {
      let storageUser = JSON.parse(storageUserAsStr);
      this.currentUser = storageUser;
    }
  }

}
