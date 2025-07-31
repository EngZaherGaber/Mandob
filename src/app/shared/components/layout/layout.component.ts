import { Component, effect } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { StateService } from '../../service/state.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  imports: [SidenavComponent, RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ width: '0', overflow: 'hidden' }),
        animate('0.5s ease-in', style({ width: '16.6667%' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({ width: '0', overflow: 'hidden' }))
      ])
    ]),
    trigger('contentAnimation', [
      transition('* <=> *', [
        animate('0.5s ease-in', style({ width: '*' }))
      ])
    ])
  ]
})
export class LayoutComponent {


  constructor(public stateSrv: StateService) {
  }
}
