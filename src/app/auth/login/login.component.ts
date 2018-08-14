import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sugar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: {
    email: string;
    password: string;
  };

  returnUrl: string;

  subscription: Subscription;

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
    this.subscription = this.authService.login(this.user.email, this.user.password).subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
