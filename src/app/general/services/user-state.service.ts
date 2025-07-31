import { effect, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userState = signal<User>({
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    role: 'company',
  });
  constructor(private router: Router) {
    effect(() => {});
  }
  logout() {
    console.log('hi');
    this.userState.set({
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      role: 'company',
    });
    this.router.navigate(['login']);
  }
  login(user: User) {
    this.userState.set(user);
    this.router.navigate(['']);
  }
}
