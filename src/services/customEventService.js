export default class CustomEventService {
    static send(name, val) {
        const detailProps = (val && val !== null) ? { value: val } : {}; 
        document.dispatchEvent(new CustomEvent(name, { detail: detailProps, bubbles: true, cancelable: false }));
    }

    static addListener(evtName, callback) {
        document.addEventListener(evtName, callback);
    }

    static removeListener(evtName, option = null) {
        document.removeEventListener(evtName, option);
    }
}
