// @ts-nocheck
import WriterService from '../../services/writerService';
import { toggleDisplay } from '../../components/common/utils/toggleButton';

class WriterForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.isGameOpen = false;
      this.writerService = new WriterService();
    }
  
    connectedCallback() {
      this.render();

      this.shadow.getElementById('fetchOpen').addEventListener('click', () => {
        this.featchContent();
      });
    }

    async featchContent() {
      const content = await this.writerService.getContent();
      const el = this.shadow.querySelector('.writeContent');
      toggleDisplay('#fetchOpen', this.shadow, 5000);

      if (content && content?.title) {
        el.innerHTML = content.title;
      }
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .writer-wrapper {
                  display: grid;
                  grid-template-columns: 50% 50%; 

                  & div {
                    padding: 20px;
                  }

                  @media (max-width: 768px) {
                    grid-template-columns: 100%;
                  }
              }
            </style>
            <form>
                <div class="writer-wrapper">
                    <h2>Writer content</h2>
                    <div>
                        <action-button id="fetchOpen" label="Fetch content" type="action" /> 
                    </div>
                    <div class="writeContent"> </div>
                </div>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-form", WriterForm);
  }
  