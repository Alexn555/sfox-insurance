// W3C example (c) W3C 2024
import { CustomWindowEvents } from '../settings';
import { CustomEventService, StyleService } from '../services';
import { MobileService } from '../services/utils';
import { draggableMobileContainer } from './dragMobileContainer';

export const draggableContainer = (el, signal = false, yMove = false) => {
    if (MobileService.isMobileDevice()) {
        draggableMobileContainer(el, signal, yMove);
    } else {
        draggableDesktopContainer(el, signal, yMove);
    }
};

export const draggableDesktopContainer = (el, signal = false, yMove = false) => {
    let mousePos = { x: 0, y: 0 };
    let offset = [0, 0];
    let isDown = false;

    const dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        offset = [
            el.offsetLeft - e.clientX,
            el.offsetTop - e.clientY
        ];
        document.onmouseup = close;
        document.onmousemove = move;
        if (signal) {
            CustomEventService.send(CustomWindowEvents.draggable.moveInit);
        }
        isDown = true;
    };
    
    const move = (e) => {
        e = e || window.event;
        e.preventDefault();
        if (isDown) {
            mousePos = { x : e.clientX, y : e.clientY };
            StyleService.setProperty(el, 'left',  (mousePos.x + offset[0]) + 'px'); 
            if (yMove) {
                StyleService.setProperty(el, 'top',  (mousePos.y + offset[1]) + 'px'); 
            }
        }
    };

    const close = () => {
        isDown = false;
        document.onmouseup = null;
        document.onmousemove = null;
        if (signal) {
            CustomEventService.send(CustomWindowEvents.draggable.moveEnd);
        }
    };

    el.onmousedown = dragMouseDown;
}