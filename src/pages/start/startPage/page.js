// @ts-nocheck
import { IdService } from '../../../services';
import { StartItemInfo } from './info';

class StartItemPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.id = this.getAttribute('id') || 'item';
        this.info = { 
            image: '',
            label: '', 
            description: '' 
        };
    }

    connectedCallback() {
        this.render();
        this.setInfo(this.id)
    }

    setInfo(id) {
        this.info = StartItemInfo[id];
        if (this.info) {
            this.$main = IdService.id('main', this.shadow);
            this.$main.innerHTML = `
                <h3>${this.info.label}</h3
                <p>${this.info.description}</p>
            `;
            this.$image = IdService.id('image', this.shadow);
            this.$image.setAttribute('src', this.info.image);
            this.$link = IdService.id('linkImage', this.shadow);
            this.$link.setAttribute('href', this.info.image);
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .page {
                    display: grid;
                    grid-template-columns: 30% 70%;
                    border: 1px dashed #dcdcdc;
                }
                #main {
                    width: 100%;
                    height: 100px;
                }
                .image {
                    & img {
                        width: 200px;
                        height: 100px;
                    }
                }

                @media (max-width: 768px) {
                    .page {
                        grid-template-columns: 100%;
                    }
                }
            </style>
            <div class="page">
                <div class="image">
                    <a id="linkImage" href="" target="_blank">
                        <img id="image" src="" alt="start-item" />
                    </a>
                </div>
                <div id="main"> </div> 
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('start-item', StartItemPage);
}
