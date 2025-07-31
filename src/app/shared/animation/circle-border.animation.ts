import { animate, animation, keyframes, state, style, transition, trigger } from '@angular/animations';

export const circleBorderAnimation = animation([
    animate('{{ duration }} {{ easing }}', keyframes([
        style({ background: 'conic-gradient(var(--p-green-400) 0deg, transparent 0deg)', offset: 0 }),
        style({ background: 'conic-gradient(var(--p-green-400) 90deg, transparent 180deg)', offset: 0.25 }),
        style({ background: 'conic-gradient(var(--p-green-400) 180deg, transparent 270deg)', offset: 0.5 }),
        style({ background: 'conic-gradient(var(--p-green-400) 270deg, transparent 360deg)', offset: 0.75 }),
        style({ background: 'conic-gradient(var(--p-green-400) 360deg, transparent 360deg)', offset: 1 })
    ]))
], {
    params: {
        duration: '0.6s',
        easing: 'ease-out'
    }
});

export const circleBorderReverseAnimation = animation([
    animate('{{ duration }} {{ easing }}', keyframes([
        style({ background: 'conic-gradient(var(--p-green-400) 360deg, transparent 360deg)', offset: 0 }),
        style({ background: 'conic-gradient(var(--p-green-400) 270deg, transparent 270deg)', offset: 0.25 }),
        style({ background: 'conic-gradient(var(--p-green-400) 180deg, transparent 180deg)', offset: 0.5 }),
        style({ background: 'conic-gradient(var(--p-green-400) 90deg, transparent 90deg)', offset: 0.75 }),
        style({ background: 'conic-gradient(var(--p-green-400) 0deg, transparent 0deg)', offset: 1 })
    ]))
], {
    params: {
        duration: '0.4s',
        easing: 'ease-in'
    }
});

