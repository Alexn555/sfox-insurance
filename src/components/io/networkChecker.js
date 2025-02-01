import { CustomWindowEvents, NetworkCheckerSet } from "../../settings";
import { CustomEventService, IdService } from "../../services";
import { JSONService } from '../../services/utils';
import { GeneralNoteEnums, GeneralNoteCodes } from "../../enums";

class NetworkChecker extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.connectionLost = "Network connection lost";
    this.connectionON = "Network connection restored";
    this.msg = "Network connection OK";
    this.container = "genericNote";
    this.sizes = JSONService.set({w: 240, wUnits: 'px', h: 100});
    this.lostConnection = false;
  }

  connectedCallback() {
    this.initForm();
  }

  initForm() {
    this.$container = IdService.id(this.container, this.shadow);
    
    if (NetworkCheckerSet.enabled) {
      CustomEventService.windowEvent(CustomWindowEvents.network.online, () => {
        if (this.lostConnection) {
          this.toggleMessage(this.connectionON);
          this.toggleConnection(false);
          CustomEventService.send(CustomWindowEvents.generalNote.open, { 
            size: this.sizes, 
            text: this.msg, 
            status: GeneralNoteEnums.status.success,
            code: GeneralNoteCodes.networkLost,
            recipe: '',
            useBack: GeneralNoteEnums.useBack.close
          }, true);
          setTimeout(() => {
            CustomEventService.send(CustomWindowEvents.generalNote.close);
          }, 2000);
        }
      });

      CustomEventService.windowEvent(CustomWindowEvents.network.offline, () => {
        this.toggleMessage(this.connectionLost);
        this.toggleConnection(true);
        CustomEventService.send(CustomWindowEvents.generalNote.open, { 
          size: this.sizes, 
          text: this.msg, 
          status: GeneralNoteEnums.status.error,
          code: GeneralNoteCodes.networkLost,
          recipe: '',
          useBack: GeneralNoteEnums.useBack.close
        }, true);
      });
    }
  }

  disconnectedCallback() {
    if (NetworkCheckerSet.enabled) {
      CustomEventService.removeList([
        CustomWindowEvents.network.online,
        CustomWindowEvents.network.offline,
      ]);
    }
  }

  toggleMessage(toggle) {
    this.msg = toggle;
  }

  toggleConnection(toggle) {
    this.lostConnection = toggle;
  }
}

if ("customElements" in window) {
  customElements.define("network-checker", NetworkChecker);
}
