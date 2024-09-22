import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { api } from '../../constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model = signal<UserModel>(new UserModel());

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  register(){
    this.http.post<string>(`${api}/auth/register`, this.model()).subscribe({
      next: (res) => {
        // Toast eklenecek
        this.router.navigateByUrl("/login");
      }
    })
  }
}
