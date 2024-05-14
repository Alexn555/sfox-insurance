import { IdService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { textFiles } from './files';

class EditorPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.viewer = 'safe-game-page';
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$viewer = IdService.id(this.viewer, this.shadow);
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .editor-wrapper {
              padding: 2px 0 20px 0;
              border: 1px dashed #dcdcdc;

              & h3 {
                padding-left: 8px;
              }
            }
          </style>
          <div class="editor-wrapper">
            <h3>Text Editor</h3>
            <text-editor files='${JSONService.set(textFiles)}'></text-editor>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("text-editor-page", EditorPage);
  }