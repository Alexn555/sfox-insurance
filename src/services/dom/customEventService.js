export default class CustomEventService {
    static send(name, val) {
        const detailProps = (val && val !== null) ? { value: val } : {}; 
        document.dispatchEvent(new CustomEvent(name, { detail: detailProps, bubbles: true, cancelable: false }));
    }

    static event(evt, callback, ctx = document) {
        ctx.addEventListener(evt, callback);
    }

    static removeListener(evtName, option = null) {
        document.removeEventListener(evtName, option);
    }
    
    static removeList(evts, ctx = document) {
        if (evts && evts.length > 0) {
            evts.forEach(() => {
                this.removeListener(evts, ctx);
            }); 
        }
    }
    
    static removeFromContext(evt, ctx) {
        ctx.removeEventListener(evt, null);
    }
}
