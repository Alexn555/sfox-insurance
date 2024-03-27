class HomeBanner extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.title = this.getAttribute('title') || 'Banner';
        this.titleColor = this.getAttribute('title-color') || 'yellow';
    }
    
    connectedCallback() {
        this.render();
    }

    getColor() {
        let color = 'yellow';
        switch(this.titleColor) {
            case 'blue':
                color = '#5b8ad6';
            break;
            case 'yellow':
                color = '#f4ba44';
            break;
            case 'purple':
                color = '#c5569a';
            break;
        }
        return color;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .banner {
                    margin: 10px;
                    overflow-x: hidden;
                    overflow-y: hidden;
                    
                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                        max-width: 100vw;
                    }
                }
                .title {
                    position: relative;
                    background-color: ${this.getColor()};
                    width: 100%;
                    height: 40px;
                    padding-left: 8px;
                    color: white;
                    font-size: 18px;
                    font-weight: bold;
                
                    & div {
                        position: absolute;
                        top: 0;
                        transform: translateY(50%);
                        height: 50%;
                    }
                }
                .title:after {
                    content: '';
                    border-bottom: 1px dashed rgb(177, 177, 177);
                    border-right: 1px dashed rgb(177, 177, 177);
                    background-color: ${this.getColor()};
                    position: absolute;
                    left: 20px;
                    bottom: -10px;
                    width: 20px;
                    height: 20px;
                    transform: rotate(45deg);
                }

                .content {
                    background-color: #fbf2ea;
                    padding: 10px;
                    height: 110px;
                }
            </style>
            <div class="banner">
                <div class="title">
                    <div>
                        ${this.title}
                    </div>      
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('home-banner', HomeBanner);
}
