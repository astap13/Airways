import { Component } from '@angular/core';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(public authService: AuthService) {}
}
