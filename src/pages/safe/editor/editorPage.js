import { JSONService } from '../../../services/utils';
import { TextEditorSetEnums } from '../../../components/plugins/textEditor/sets';
import { textFiles } from './files';

class EditorPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }
  
    connectedCallback() {
      this.render();
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
            <text-editor 
              setsId="${TextEditorSetEnums.textEditorPage}"
              files='${JSONService.set(textFiles)}' 
            >
            </text-editor>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("text-editor-page", EditorPage);
  }
