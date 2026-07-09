import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Product_Task_Routing';
  isLoggedIn : boolean = false;

  private _authService = inject(AuthService)

  ngOnInit(): void {
    this._authService.isLogInSub$.subscribe((flag) =>{
      this.isLoggedIn = flag;
    })
    if(this._authService.getToken()){
      this.isLoggedIn = true;
    }
  }
  
}
