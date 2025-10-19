import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-review-management-submit',
  imports: [],
  templateUrl: './client-review-management-submit.component.html',
  styleUrl: './client-review-management-submit.component.scss',
})
export class ClientReviewManagementSubmitComponent {
  requestID: number | null = 0;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
      this.requestID = param['id'];
    });
  }
}
