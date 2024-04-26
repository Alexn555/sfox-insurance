import { CustomEvents, GallerySet } from '../../../settings';
import { CustomEventService, IdService } from '../../../services';
import DataStorage from '../../../services/storage';

class GallerySearch extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.searchInput = 'searchword';
      this.searchWord = GallerySet.defaultSearch;
      this.storage = new DataStorage();
    }
  
    connectedCallback() {
      this.getSavedSearch();
      this.render();
      this.initForm();
    }

    initForm() {
      this.$searchInput = IdService.id(this.searchInput, this.shadow);
      CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.searchInput}`, (e) => {        
        const input = e.detail?.value || '';

        if (input !== '' && input.length >= GallerySet.minimumSearch) {
          this.searchWord = input;
          this.$searchInput.setAttribute('value', this.searchWord);
          this.saveSearch(this.searchWord);
          CustomEventService.send(GallerySet.searchEvent, this.searchWord);
        }
      }); 
    }

    getSavedSearch() {
      const saved = this.storage.getItem(GallerySet.saveId);
      if (saved && GallerySet.searchSave) {
        this.searchWord = saved;
      }
      CustomEventService.send(GallerySet.searchSavedInit, this.searchWord);
    }

    saveSearch(searchVal) {
      if (GallerySet.searchSave) {
        this.storage.save(GallerySet.saveId, searchVal);
      }
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            #searchbox {
              padding: 8px;
              font-size: smaller;
            }
          </style>
          <div id="searchbox">
            <text-input
                id="${this.searchInput}" 
                label="Search"
                class-name="input-normal"
                value="${this.searchWord}"
                type="text"           
            >
            </text-input>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("gallery-search", GallerySearch);
  }
