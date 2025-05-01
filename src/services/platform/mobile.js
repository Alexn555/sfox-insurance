// @ts-nocheck
import { GlobalSizes } from '../../settings';

export class MobileService {
    static isMobile() {
        return window.innerWidth < GlobalSizes.mobileMax;
    }

    static isPlatform() {
        return /iPhone|iPad|iPod|Android|Blackberry/i.test(navigator.userAgent);
    }

    static isTouchDevice(method = 1) {
        let isTouch = navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;
        if (method === 2) {
            isTouch = window.navigator.maxTouchPoints > 1;
        }
        return isTouch;
    }
    
    static isMobileDevice() {
        let userAgent = navigator.userAgent;
        let isPhone = false;
        if (/windows phone/i.test(userAgent)) {
            isPhone = true;
        } else if (/android/i.test(userAgent)) {
            isPhone = true;
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            isPhone = true;
        }
        return isPhone;
    }
}