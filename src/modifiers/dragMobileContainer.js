// W3C example (c) W3C 2024
import { CustomWindowEvents } from '../settings';
import { CustomEventService, StyleService } from '../services';

export const draggableMobileContainer = (el, signal = false, yMove = false) => {
    let mousePos = { x: 0, y: 0 };
    let offset = [0, 0];
    let isDown = false;

    const dragMouseDown = (e) => {
        offset = [
            el.offsetLeft - e.changedTouches[0].clientX,
            el.offsetTop - e.changedTouches[0].clientY
        ];
        document.ontouchend = close;
        document.ontouchmove = move;
        if (signal) {
            CustomEventService.send(CustomWindowEvents.draggable.moveInit);
        }
        isDown = true;
    };
    
    const move = (e) => {
        if (isDown) {
            mousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            StyleService.setProperty(el, 'left',  (mousePos.x + offset[0]) + 'px'); 
            if (yMove) {
                StyleService.setProperty(el, 'top',  (mousePos.y + offset[1]) + 'px'); 
            }
        }
    };

    const close = () => {
        isDown = false;
        document.ontouchend = null;
        document.ontouchmove = null;
        if (signal) {
            CustomEventService.send(CustomWindowEvents.draggable.moveEnd);
        }
    };

    el.ontouchstart = dragMouseDown;
}