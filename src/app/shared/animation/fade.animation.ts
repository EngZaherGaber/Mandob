import { animate, animation, style } from '@angular/animations';

export const fadeAnimation = animation([
    style({ opacity: '{{ start }}' }),
    animate('{{ duration }} {{ delay }} {{ easing }}', style({ opacity: '{{ end }}' }))
], {
    params: {
        start: 0,
        end: 1,
        duration: '0.3s',
        delay: '0s',
        easing: 'ease-out',
    }
});

