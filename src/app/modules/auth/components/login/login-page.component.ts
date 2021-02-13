import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

class LoginUser extends User {
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  user = new LoginUser();

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    authService.logout();
  }

  login(): void {
    this.authService.login(this.user.username).subscribe(
      () => {
        this.router.navigate(['']);
      },
      error => {
        this.snackBar.open(error, null, {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }
}
