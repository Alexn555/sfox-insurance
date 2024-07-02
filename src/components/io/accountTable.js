import { JSONService } from '../../services/utils';
import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';

class AccountTable extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.title = '';
        this.columnNames = this.getAttribute('column-names') || '["Account", "Received"]';
        this.colSize = this.getAttribute('col-size') || '5';
        this.col1 = this.getAttribute('col1') || '[]';
        this.col2 = this.getAttribute('col2') || '[]';
        this.col3 = this.getAttribute('col3') || '[]';
        this.col4 = this.getAttribute('col4') || '[]';
        this.col5 = this.getAttribute('col5') || '[]';
        this.lastTotal2x = this.getAttribute('last-total-2x') || '';
    }
    
    connectedCallback() {
        this.render();
    }

    constructTable() {
        const names = JSONService.getArray(this.columnNames);
        const column1 = [names[0], ...JSONService.getArray(this.col1)];
        const column2 = [names[1], ...JSONService.getArray(this.col2)];
        const column3 = [names[2], ...JSONService.getArray(this.col3)];
        const column4 = [names[3], ...JSONService.getArray(this.col4)];
        const column5 = [names[4], ...JSONService.getArray(this.col5)];

        const isLastTotal2x = JSON.parse(this.lastTotal2x) !== '';
        const columns = [column1, column2, column3, column4, column5];

        let html = '';
        const maxLength = parseInt(this.colSize, 10);

        for (let i = 0; i < maxLength; i++) {
            html += i === 0 || i === maxLength - 1 ? '<div>' : '<div class="desktop">';
            columns[i].forEach((col, index) => {
                let className = 'row';
                if (index === 0) {
                    className = 'row-head';
                }
                if (index === columns[i].length - 1) {
                    className = isLastTotal2x && i === maxLength - 1 ? 'row-total-2x' : 'row-total';
                }
                const content = col;
                html += `<div class="${className}">${content}</div>`;
            });
            html += '</div>';
        }
        return html;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .tbl-content {
                    display: grid;
                    //grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
                    padding: 10px;

                    ${ScreenQuery.mobile('grid-template-columns: 1fr 1fr;')}
                }
                .row-head {
                    background-color: ${theme.ui.accountTable.head};
                    padding: 8px 0 8px 0;
                }

                .row {
                    padding: 6px 0 6px 0;
                    border-bottom: 1px solid ${theme.ui.accountTable.row};

                    & a {
                        color: ${theme.ui.accountTable.link};
                    }
                }
                
                .row-total {
                    font-weight: bold;
                }
                .row-total, .row-total-2x  {
                    padding: 10px 0 10px 0;
                }
                .row-total-2x {
                    font-size: 20px;
                }

                .desktop {
                    ${ScreenQuery.mobile('display: none;')}
                }
            </style>
            <div class="tbl-content">
                ${this.constructTable()}
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('account-table', AccountTable);
}
