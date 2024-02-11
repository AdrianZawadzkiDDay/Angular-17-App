import { Component, OnInit  } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent  implements OnInit {
  
  currentUser: User = new User;

  constructor() {
   
  }

  ngOnInit() {
    console.log("ABC")
    const storageUserAsStr = localStorage.getItem('currentUser');
    console.log("ABC2", storageUserAsStr)

    if(storageUserAsStr) {
      console.log("ABC", storageUserAsStr)

      let storageUser = JSON.parse(storageUserAsStr);
      this.currentUser = storageUser;
    }
  }

}
