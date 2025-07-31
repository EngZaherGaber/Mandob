import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StateService } from '../../service/state.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { UserStateService } from '../../../general/services/user-state.service';

@Component({
  selector: 'header',
  imports: [ButtonModule, CommonModule, TooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('typewriter', [
      transition('* => *', [
        style({ width: '0', opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1, width: '*' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  currentState = signal('');
  displayText = signal('');
  isChanging = signal(false);
  isTyping = signal(false); // New signal to track typing state
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    public stateSrv: StateService,
    private userStateSrv: UserStateService
  ) {
    // Only run effects on browser
    if (this.isBrowser) {
      effect(() => {
        const newValue = this.stateSrv.page();
        if (newValue !== this.currentState()) {
          this.changeStateWithAnimation(newValue);
        }
      });
    } else {
      // SSR fallback - show full text immediately
      effect(() => {
        this.currentState.set(this.stateSrv.page());
        this.displayText.set(this.stateSrv.page());
      });
    }
  }

  private async changeStateWithAnimation(newValue: string) {
    this.isChanging.set(true);

    // Wait for fade out animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    this.currentState.set(newValue);
    this.isChanging.set(false);
    // Typewriter effect
    this.isTyping.set(true);

    // Typewriter effect
    this.displayText.set('');
    for (let i = 0; i < newValue.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Typing speed
      this.displayText.update((text: string) => text + newValue[i]);
    }
    this.isTyping.set(false); // Hide cursor after typing completes
  }

  logout() {
    console.log('hi');
    this.userStateSrv.logout();
  }
}
