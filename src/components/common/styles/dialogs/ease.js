export const easeOpacity = (time = 0.7) => {
    return `
        opacity ${time}s ease-out,
        transform ${time}s ease-out,
        overlay ${time}s ease-out allow-discrete,
        display ${time}s ease-out allow-discrete;
    `;
};