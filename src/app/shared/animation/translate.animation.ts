import { animate, animation, style } from '@angular/animations';

export const translateAnimation = animation([
    style({ transform: '{{ start }}' }),
    animate('{{ duration }} {{ delay }} {{ easing }}', style({ transform: '{{ end }}' }))
], {
    params: {
        start: 'translateX(-100%)',
        end: 'translateX(0%)',
        duration: '0.3s',
        delay: '0s',
        easing: 'ease-out',
    }
});

