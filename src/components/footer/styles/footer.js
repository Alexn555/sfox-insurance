// compoanent footer
import { theme } from '../../../theme/theme';
import ScreenQuery from '../../../styles/query';
import BasePageSizeHandler from '../../../styles/base';

export const setStyle = () => {
    return `
        .footer {
            display: grid;
            background-color: ${theme.footer.background};
            align-items: center;
            vertical-align: middle;
            width: 100vw;
        }
        .footer-main {
            display: grid;
            max-width: ${BasePageSizeHandler.desk()};
            min-height: 230px;
            align-self: center;
            justify-self: center;
            padding-top: 10px;

            grid-template-columns: 25% 25% 25% 25%;
            width: 100vw;
            overflow-x: hidden;

            ${ScreenQuery.medium('max-width: '+BasePageSizeHandler.medium())}
            ${ScreenQuery.mobile(`
                grid-template-columns: 100%;
                max-width: 100vw;
            `)}      
        }
    `;
}