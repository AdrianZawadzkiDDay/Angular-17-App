import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ActivationService} from "../../../services/activation.service";

@Component({
  selector: 'app-activate-component',
  templateUrl: './activate-component.component.html',
  styleUrls: ['./activate-component.component.css']
})
export class ActivateAccountComponent  implements OnInit {

  activationMessage: string;
  errorMessage: string = "";

  constructor(private activatedRoute: ActivatedRoute, private activationService: ActivationService) {
    this.activationMessage = 'ACCOUNT ACTIVATION'
  }

  ngOnInit(): void {
    const routeSnapshot = this.activatedRoute.snapshot;
    const token: string = routeSnapshot.queryParams['activationCode'];
    this.activatingAccount(token);
  }


  activatingAccount(token: string) {
    if(token === null || token === undefined || token.length < 3) {
      return;
    }
    this.activationService.activation(token)
    .subscribe(data => {
      this.activationMessage = 'ACCOUNT ACTIVATED SUCCESSFULLY'
    }, err => {
      if (err.status === 401) {
        console.error('Unauthorized error during activating account: ', err);
        this.errorMessage = 'Unauthorized: Invalid or expired token.';
      } else if (err.status === 409) {
        console.error('Conflict error during activating account: ', err);
        this.errorMessage = 'Error occurred during account activation.';
      }
    });
  }
}
