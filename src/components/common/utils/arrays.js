export const getOptionFromString = (key, index) => {
    if (index === -1) {
        return JSON.parse(key);
    }
    return JSON.parse(key)[index];
}