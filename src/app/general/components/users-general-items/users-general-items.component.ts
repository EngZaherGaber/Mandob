import { Component, Input } from '@angular/core';
import { Client } from '../../../client/interfaces/client';
import { Company } from '../../../company/interfaces/company';
import { Distributor } from '../../../distributor/interfaces/distributor';

@Component({
  selector: 'users-general-items',
  imports: [],
  templateUrl: './users-general-items.component.html',
  styleUrl: './users-general-items.component.scss',
})
export class UsersGeneralItemsComponent {
  @Input() client: Client | null = null;
  @Input() distributor: Distributor | null = null;
  @Input() company: Company | null = null;
}
