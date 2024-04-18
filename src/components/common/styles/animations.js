export const fadeInAnimation = `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

export const transitionHeight = (time = 1) => {
    return `
        transition: height ${time}s;
    `;
}