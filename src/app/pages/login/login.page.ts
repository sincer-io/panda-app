import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private authenticationUrl: string = '';
  private codePresent: boolean = false;

  constructor(private authSvc: AuthenticationService, private apiSvc: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params && params.code){
        this.codePresent = true;
        const code = this.authSvc.getAuthorizationEndpoint(params.code);
        this.apiSvc.authenticate(code).then(res => {
          this.authSvc.saveTokenDetail(res);
          this.router.navigate(['/home']);
        });
      }
    });

    this.authenticationUrl = this.authSvc.getAuthenticationUrl();
  }

}
