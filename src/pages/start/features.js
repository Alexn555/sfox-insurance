// Info icon svg (c) css.gg/info

import { IdService } from '../../services';
import EnvService from '../../services/api/envService';

// @ts-nocheck
class FeaturesPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = IdService.id('base-home', this.shadow);
        el?.setAttribute('active', newValue);
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .features {
                    text-align: left;
                    padding-left: 100px;
                    padding-bottom: 20px;

                    & ul {
                        & li {
                            list-style: none; 
                            padding: 4px;
                        }
                    }

                    @media (max-width: 768px) {
                        padding-left: 10px;
                    }
                }
            </style>
            <div class="features">
                <h3>Features</h3>
                <p>
                    <b>SFox Engine</b> - system's main features
                </p>
                <p>
                    <ul>
                        <li> 
                            Written in <b>Javascript</b> and <b>WebComponents</b> framework. 
                        </li>
                        <li>
                            Uses <b>CSS3</b>, CSS3 variables, transitions, animations
                        </li>
                        <li>
                            <b>Rapid development</b> using Services, HTTP using mainly fetch layer, Utilities
                        </li>
                    </ul>
                </p>
                <p>
                    <b>Some of components</b>
                    <ul>
                        <li>
                            <b>NetworkChecker</b> - Ability to check internet connection 
                        </li>
                        <li>
                            <b>ImageViewer</b> - huge plugin component that desides how Image Viewing looks 
                        </li>
                        <li>
                            <b>GameViewer</b> - Change Game rapidly and get all needed sources from games 
                        </li>
                        <li>
                            <b>Economy forms</b>: Slider, banner, input, select - typical Form items to help build economy sites 
                        </li>
                        <li>
                            <b>Settings (sets)</b> - global, env, pages settings 
                        </li>
                        <li>
                            <b>GalleryViewer</b> - to view and explore Images
                        </li>
                        <li>
                            <b>Simple Login</b> - login example to authenticate user
                        </li>
                        <li>
                            <b>Account</b> - Account example 
                        </li>
                    </ul>
                </p>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('features-page', FeaturesPage);
}