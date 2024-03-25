export const showComponent = (isEnabled, template) => {
    if (isEnabled) {
        return template;
    }
    return '';
}