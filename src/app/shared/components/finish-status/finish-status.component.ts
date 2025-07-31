import { Component, Input } from '@angular/core';
import { fadeAnimation } from '../../animation/fade.animation';
import { scaleAnimation } from '../../animation/scale.animation';
import {
  trigger,
  transition,
  query,
  group,
  sequence,
  useAnimation,
  style,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { translateAnimation } from '../../animation/translate.animation';

@Component({
  selector: 'finish-status',
  imports: [CommonModule],
  templateUrl: './finish-status.component.html',
  styleUrl: './finish-status.component.scss',
  animations: [
    trigger('show', [
      transition(':enter', [
        query('h4', [style({ opacity: 0 })]),
        sequence([
          query('h1', [
            useAnimation(scaleAnimation, {
              params: {
                start: 'scale(0)',
                end: 'scale(1)',
                duration: '1s',
                delay: '0s',
                easing: 'ease-out',
              },
            }),
          ]),
          query('h4', [
            group([
              useAnimation(fadeAnimation, {
                params: {
                  start: 0,
                  end: 1,
                  duration: '1s',
                  delay: '0s',
                  easing: 'ease-out',
                },
              }),
              useAnimation(translateAnimation, {
                params: {
                  start: 'translateY(100%)',
                  end: 'translateY(0)',
                  duration: '1s',
                  delay: '0s',
                  easing: 'ease-out',
                },
              }),
            ]),
          ]),
        ]),
      ]),
      transition(':leave', [
        sequence([
          query(
            'h4',
            [
              group([
                useAnimation(fadeAnimation, {
                  params: {
                    start: 1,
                    end: 0,
                    duration: '1s',
                    delay: '0s',
                    easing: 'ease-out',
                  },
                }),
                useAnimation(translateAnimation, {
                  params: {
                    start: 'translateY(0)',
                    end: 'translateY(100%)',
                    duration: '1s',
                    delay: '0s',
                    easing: 'ease-out',
                  },
                }),
              ]),
            ],
            { optional: true }
          ),
          query(
            'h1',
            [
              useAnimation(scaleAnimation, {
                params: {
                  start: 'scale(1)',
                  end: 'scale(0)',
                  duration: '1s',
                  delay: '0s',
                  easing: 'ease-out',
                },
              }),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class FinishStatusComponent {
  @Input('info') info: { word: string; color: string; icon: string } = {
    word: 'Checked',
    icon: 'pi-check',
    color: 'green',
  };
  visible = false;

  ngOnInit() {
    this.show();
  }
  show() {
    this.visible = true;
    console.log(this.visible);
  }
  onDone(event: any) {
    if (event.toState === 'void') return; // ignore leave-done
    // after enter finishes, wait 2s, then trigger leave
    setTimeout(() => (this.visible = false), 2000);
  }
}
