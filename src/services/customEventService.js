export default class CustomEventService {
    static sendEvent(name, val) {
        const detailProps = (val && val !== null) ? { value: val } : {}; 
        document.dispatchEvent(new CustomEvent(name, { detail: detailProps, bubbles: true, cancelable: false }));
    }

    static addEventListener(evtName, callback) {
        document.addEventListener(evtName, callback);
    }

    static removeEventListener(evtName, option = null) {
        document.removeEventListener(evtName, option);
    }
}
