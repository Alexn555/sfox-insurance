import { CustomEvents } from '../../../settings/';
import { GallerySet } from '../../../settings/ui';
import { CustomEventService, IdService, HTMLService } from '../../../services';
import { ValidatorService } from '../../../services/utils';
import { styleErrors } from '../../common/styles/errors';
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
      this.$error = IdService.id('error', this.shadow);

      CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.searchInput}`, (e) => {        
        const input = e.detail?.value || '';

        if (input !== '' && input.length >= GallerySet.minimumSearch) {
          this.searchWord = this.validaterequest(input);
          this.$searchInput.setAttribute('value', this.searchWord);
          this.saveSearch(this.searchWord);
          CustomEventService.send(GallerySet.searchEvent, this.searchWord);
        } else {
          HTMLService.text(this.$error, `Please type minimum ${GallerySet.minimumSearch} chars`);
        }
      }); 
    }

    validaterequest(input) {
      let isError = false;
      if (!ValidatorService.valideAlphaNumeric(input)) {
        const res = this.handleCommonError('Please type only words and numbers, no special chars');
        input = res.input;
        isError = res.isError;
      } 
      if (!ValidatorService.validateWhiteSpaces(input)) {
        const res = this.handleCommonError('Please type word without too many whitespaces');
        input = res.input;
        isError = res.isError;
      }

      if (!isError) {
        HTMLService.text(this.$error, '');
      }
      return input;
    }

    handleCommonError(msg) {
      HTMLService.text(this.$error, msg);
      return { input: GallerySet.defaultSearch, isError: true};
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
            #error {
              ${styleErrors.commonText}
              padding-left: 4px;
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
            <span id="error"> </span>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("gallery-search", GallerySearch);
  }
