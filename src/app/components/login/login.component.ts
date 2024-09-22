import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { api } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model = signal<UserModel>(new UserModel());

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(){
    this.http.post<string>(`${api}/auth/login`, this.model()).subscribe({
      next: (res) => {
        localStorage.setItem("my-token", res);
        this.router.navigateByUrl("/");
      }
    })
  }
}
