import { HTMLService, LoggerService } from '../../../services';

export class ReviewerStepHelper {
    static showStep(isAllowed, currentPage, pages) {
      let html = '';
      if (isAllowed) {
        html = `
          <div id="stepNotice">Step: ${currentPage} / ${pages} </div>
        `;
      }
      return html;
    }
    
    static updateStep(isAllowed, $step, currentPage, pages) {
      if (isAllowed && $step) {
        HTMLService.text($step, `Step: ${currentPage} / ${pages}`);
      }
    }

    static showRestartButton(isAllowed) {
      let html = '';
      if (isAllowed) {
        html = `
          <div class="restart">
            <action-button id="restart" label="Restart"></action-button>
          </div>
        `;
      }
      return html;
    }

    static submitForm($notice, totalSaveObj, timeout) {
      let msg = `All ok,
          demo message not send width save obj ${JSON.stringify(totalSaveObj)}! :) `;
      LoggerService.log('Reviewer step handler total save obj ', totalSaveObj);
      if ($notice) {
        HTMLService.toggleMsg($notice, msg, timeout);
      }
    }

    static getMoreButton(isAllowed, $content, callback) {
      if (isAllowed) {
        let html = `
          <div class="more">
            <action-button id="reviewer-more" label="More Content"></action-button>
          </div>
        `;
        HTMLService.appendHTML($content, html);
        callback();
      }
    }
}