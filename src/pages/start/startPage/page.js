// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { IdService, CustomEventService, HTMLService } from '../../../services';
import ScreenQuery from '../../../styles/query';
import { StringService } from '../../../services/utils';
import { CustomEvents } from '../../../settings';
import { HeaderMenuLinks } from '../../../enums/menuLinks';
import { LinkTypes, LinkVariants } from '../../../components/common/ui';
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
        this.theme = ThemeHelper.get(PackIds.startPage);
    }

    connectedCallback() {
        this.render();
        this.setInfo(this.id)
    }

    setInfo(id) {
        this.info = StartItemInfo[id];
        if (this.info) {
            this.$main = IdService.id('main', this.shadow);
            HTMLService.html(this.$main, `
                <h3>
                    <span class="label">${this.info.label}</span>
                    <action-link 
                        id="link-${id}"
                        label="${this.info.label}" 
                        type="${LinkTypes.transparentButton}"
                        variant="${LinkVariants.thinText}"> 
                    </action-link>
                </h3>
                <p>${this.info.description}</p>
            `);
            this.$image = IdService.id('image', this.shadow);
            this.$image.setAttribute('src', this.info.image);
            this.$link = IdService.id('linkImage', this.shadow);
            this.$link.setAttribute('href', this.info.image);
            this.setHandlers(this.id);
        }
    }

    setHandlers(id) {
        this.$btnLink = IdService.idAndClick(`link-${id}`, this.shadow, () => {
            CustomEventService.send(CustomEvents.header.menuClick, this.getLink(id)); 
            CustomEventService.send(CustomEvents.header.changeActivePage, this.getLink(id));   
        });
    }

    getLink(id) {
        return id === 'performance' ? HeaderMenuLinks.Insurance : HeaderMenuLinks[StringService.capFirstLetter(id)];
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .page {
                    display: grid;
                    grid-template-columns: 30% 70%;
                    border: 1px dashed ${this.theme.startItem.border};

                    ${ScreenQuery.mobile('grid-template-columns: 100%;')}
                }
                #main {
                    width: 100%;
                    height: 100px;

                    .label {
                        color: ${this.theme.startItem.label};
                    }
                }
                .image {
                    & img {
                        width: 200px;
                        height: 100px;
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
