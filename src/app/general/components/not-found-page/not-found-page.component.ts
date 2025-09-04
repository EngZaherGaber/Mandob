import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNgSharedModule } from '../../../shared/modules/shared/primeng-shared.module';

@Component({
  selector: 'app-not-found-page',
  imports: [PrimeNgSharedModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  constructor(private router: Router) {}
  goTo() {
    this.router.navigate(['']);
  }
}
