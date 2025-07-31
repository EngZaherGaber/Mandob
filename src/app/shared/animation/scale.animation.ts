import { animate, animation, keyframes, state, style, transition, trigger } from '@angular/animations';

export const scaleAnimation = animation([
    style({ transform: '{{ start }}' }),
    animate('{{ duration }} {{ delay }} {{ easing }}', style({ transform: '{{ end }}' }))
], {
    params: {
        start: 'scale(0)',
        end: 'scale(1)',
        duration: '0.3s',
        delay: '0s',
        easing: 'ease-out',
    }
});


