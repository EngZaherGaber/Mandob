import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNgSharedModule } from '../../../../shared/modules/shared/primeng-shared.module';
import { Company } from '../../../interfaces/company';

@Component({
  selector: 'comp-general-list',
  imports: [PrimeNgSharedModule, RouterModule],
  templateUrl: './comp-general-list.component.html',
  styleUrl: './comp-general-list.component.scss',
})
export class CompGeneralListComponent {
  @Input() header: string = '';
  @Input() color: 'primary' | 'secondary' | null = null;
  @Input() data: Company[] = [];

  @Input() getSeverity: (item: any) => any = () => {
    return;
  };
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'CompanyIcon.svg'; // 👈 your fallback image
  }
}
