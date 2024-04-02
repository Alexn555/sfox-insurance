export const draggableContainer = (el) => {
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
        el.style.top = (el.offsetTop - posY) + "px";
        el.style.left = (el.offsetLeft - initX) + "px"; // posX
    }

    const close = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    el.onmousedown = dragMouseDown;
}