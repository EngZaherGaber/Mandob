import { Component, Input } from '@angular/core';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { Company } from '../../../interfaces/company';

@Component({
  selector: 'comp-general-list',
  imports: [PrimeNgSharedModule],
  templateUrl: './comp-general-list.component.html',
  styleUrl: './comp-general-list.component.scss',
})
export class CompGeneralListComponent {
  @Input() header: string = '';
  @Input() data: Company[] = [];
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
}
