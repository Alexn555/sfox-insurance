// W3C example (c) W3C 2024
import { CustomWindowEvents } from '../settings';
import { CustomEventService, StyleService } from '../services';

export const draggableContainer = (el, signal = false) => {
    let posX = 0, posY = 0, initX = 0, initY = 0;

    const dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        initX = e.clientX;
        initY = e.clientY;
        document.onmouseup = close;
        document.onmousemove = move;
    }
    
    const move = (e) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        posX = initX - e.clientX;
        posY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;
        // set the element's new position:
        StyleService.setProperty(el, 'top', (el.offsetTop - posY) + 'px');
        const newX = (el.offsetLeft - initX);
        const offsetX = newX > 0 ? -Math.abs(newX) : Math.abs(newX);
        StyleService.setProperty(el, 'left',  offsetX + 'px');  // posX
        if (signal) {
            CustomEventService.send(CustomWindowEvents.draggable.moveStart);
        }
    }

    const close = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        if (signal) {
            CustomEventService.send(CustomWindowEvents.draggable.moveEnd);
        }
    }

    el.onmousedown = dragMouseDown;
}