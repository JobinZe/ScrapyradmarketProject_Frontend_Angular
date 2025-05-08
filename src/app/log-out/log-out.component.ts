import {Component, OnInit} from '@angular/core';
import {UserRegistrationService} from '../login/services/user-reg.services';

@Component({
  selector: 'app-log-out',
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit{
  constructor(private authService :UserRegistrationService) {

  }
    ngOnInit(): void {

    }
}
