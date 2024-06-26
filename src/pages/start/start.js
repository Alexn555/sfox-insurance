// @ts-nocheck
class StartPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .welcome {
                    text-align: center;
                }
                .pages {
                    & div {
                        margin-bottom: 10px;
                    }
                }
            </style>
            <div class="welcome">
                <h3>Start Portal Page</h3>
                <div class="pages">
                    <div>
                        <start-item id="home"></start-item>
                    </div>
                    <div>
                        <start-item id="performance"></start-item>
                    </div>
                    <div>
                        <start-item id="additional"></start-item>
                    </div>
                    <div>
                        <start-item id="safe"></start-item>
                    </div>
                     <div>
                        <start-item id="reader"></start-item>
                    </div>
                </div>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('start-page', StartPage);
}
