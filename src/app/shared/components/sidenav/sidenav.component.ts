import { Component, effect, OnInit, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StateService } from '../../service/state.service';
import { UserStateService } from '../../../general/services/user-state.service';

@Component({
  selector: 'sidenav',
  imports: [MenuModule, RouterModule, ButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(public stateSrv: StateService, userState: UserStateService) {
    effect(() => {
      const strategy = userState.strategy();
      this.items = strategy ? strategy.navMenu : [];
    });
  }
  ngOnInit(): void {}
}
