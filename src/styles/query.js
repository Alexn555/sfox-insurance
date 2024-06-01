export default class ScreenQuery {
    static mobile(ct, w = 768) {
        return `@media (max-width: ${w}px) { ${ct} } `;
    }
    static desk(ct, w = 768) {
        return `@media (min-width: ${w}px) { ${ct} } `;
    }
    static medium(ct, w = 1220) {
        return `@media (max-width: ${w}px) { ${ct} } `;
    }
    static combo(ctMob, ctDesk, ctMedium) {
        return `  
            @media (max-width: 768px) {
                ${ctMob}
            }
            @media (min-width: 768px) {
                ${ctDesk}
            }
            @media (min-width: 1220px) {
                ${ctMedium}
            }
        `;
    }
}