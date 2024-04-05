export const toggleButton = (id, context, timeout = 2000) => {
    const el = context.getElementById(id);
    el.setAttribute('disabled', '');
    setTimeout(() => {  el.removeAttribute('disabled'); }, timeout);
}

export const toggleDisplay = (id, context, timeout = 2000) => {
    const el = context.getElementById(id);
    el.style.display = 'none';
    setTimeout(() => {  el.style.display = 'block'; }, timeout);
}
