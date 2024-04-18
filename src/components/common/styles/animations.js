export const fadeInAnimation = `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

export const transitionAnimate = (cssProperty = 'height', time = 1) => {
    return `
        transition: ${cssProperty} ${time}s;
    `;
}