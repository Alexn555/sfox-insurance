export default class CustomEventService {
    static send(name, val, convertObject = false) {
        let detailProps = {}
        if (val && val !== null) {
            detailProps = { value: convertObject ? JSON.stringify(val) : val };
        } 
        document.dispatchEvent(new CustomEvent(name, { detail: detailProps, bubbles: true, cancelable: false }));
    }

    static event(evt, callback, ctx = document) {
        ctx.addEventListener(evt, callback);
    }

    static eventData(evt, callback, ctx = document, parseData = false) {
        ctx.addEventListener(evt, (e) => {
            let res = e.detail.value;
            callback(parseData ? JSON.parse(res) : res);
        });
    }

    static windowEvent(evt, callback) {
        window.addEventListener(evt, callback);
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
