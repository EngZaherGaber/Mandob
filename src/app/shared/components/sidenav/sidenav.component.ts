import { Component, effect, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserStateService } from '../../../general/services/user-state.service';
import { PrimeNgSharedModule } from '../../modules/shared/primeng-shared.module';
import { StateService } from '../../service/state.service';

@Component({
  selector: 'sidenav',
  imports: [RouterModule, PrimeNgSharedModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  items: MenuItem[] = [];
  role: string | null = '';
  constructor(
    public stateSrv: StateService,
    userState: UserStateService,
  ) {
    effect(() => {
      const strategy = userState.strategy();
      this.role = userState.role() ?? null;
      this.items = strategy ? strategy.navMenu : [];
    });
  }
  ngOnInit(): void {}
}
