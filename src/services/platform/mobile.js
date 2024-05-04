import { GlobalSizes } from '../../settings';

export class MobileService {
    static isPlatform() {
        return /iPhone|iPad|iPod|Android|Blackberry/i.test(navigator.userAgent);
    }

    static isMobile() {
        return window.innerWidth < GlobalSizes.mobileMax;
     }

    static isTouchDevice(method = 1) {
        let isTouch = navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;
        if (method === 2) {
            isTouch = window.navigator.maxTouchPoints > 1;
        }
        return isTouch;
    }
}