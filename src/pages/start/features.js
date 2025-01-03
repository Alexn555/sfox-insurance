import ScreenQuery from '../../styles/query';

class FeaturesPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
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

                    ${ScreenQuery.mobile('padding-left: 10px;')}
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
                            <b>ImageViewer</b> - Huge plugin that decides how Image Viewing looks 
                        </li>
                        <li>
                            <b>GameViewer</b> - Change Game rapidly and get all needed sources from games 
                        </li>
                        <li>
                            <b>Economy forms</b>: Slider, banner, input, select - typical Form items to help build economy sites 
                        </li>
                        <li>
                            <b>Theme feature</b> - You can everytime change theme of page, plugins items
                        </li>
                        <li>
                            <b>Save system</b> - Selected data values are saved after update
                        </li>
                        <li>
                            <b>Settings (sets)</b> - Global, env, pages settings 
                        </li>
                        <li>
                            <b>Game example</b> - Example of Webcomponents game 
                        </li>
                        <li>
                            <b>TextEditor</b> - Text editor with support multiple file save 
                        </li>
                        <li>
                            <b>GalleryViewer</b> - To view and explore Images
                        </li>
                        <li>
                            <b>Simple Login</b> - Login example to authenticate user
                        </li>
                        <li>
                            <b>Account</b> - Account example 
                        </li>
                    </ul>
                </p>
                <p>
                    <b>ImageViewer</b> Instructions (prev, next only in Gallery page)<br />
                    Keyboard: <b>Up, Down</b> - next, previous image <br />
                    <b>O</b> - toggle Original Link <br />
                    <b>M</b> - toggle Arrows visiblity <br />
                    <b>Left, Right</b> - keys that handle zoom
                </p>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('features-page', FeaturesPage);
}