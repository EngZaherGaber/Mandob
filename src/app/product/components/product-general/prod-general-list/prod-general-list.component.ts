import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { ProdManagementTableItem } from '../../../interfaces/product-management-table-item';
import { ProdGeneralCardComponent } from '../prod-general-card/prod-general-card.component';

@Component({
  selector: 'prod-general-list',
  imports: [PrimeNgSharedModule, ProdGeneralCardComponent],
  templateUrl: './prod-general-list.component.html',
  styleUrl: './prod-general-list.component.scss',
})
export class ProdGeneralListComponent {
  @Input() header: string = '';
  @Input() data: ProdManagementTableItem[] = [];
  @Input() id = 0;
  @Input() getSeverity: (item: any) => any = () => {
    return;
  };
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 2,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor(private router: Router) {}
  ngOnInit() {}
  seeMoreNavigation() {
    this.router.navigate(['client/product/group/category/' + this.header + '/' + this.id]);
  }
}
