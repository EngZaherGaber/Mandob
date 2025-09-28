import { Component } from '@angular/core';
import { OfferManagementService } from '../../../services/offer-management.service';

@Component({
  selector: 'app-offer-management-add',
  imports: [],
  templateUrl: './offer-management-add.component.html',
  styleUrl: './offer-management-add.component.scss',
})
export class OfferManagementAddComponent {
  constructor(private offerManagement: OfferManagementService) {
    this.offerManagement.getOfferMetadata().subscribe((res) => {});
  }
}
