import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'sugar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: {
    email: string;
    password: string;
  };

  returnUrl: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.user = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    if (this.authService.isLoggedIn()) {
      if ((this.returnUrl == null || this.returnUrl === '/')) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl(this.returnUrl);
      }
    }

  }

  submit() {
    this.authService.login(this.user.email, this.user.password).subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }

}
