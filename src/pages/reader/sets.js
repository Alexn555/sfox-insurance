import { BoolEnums } from '../../enums';
import { ContentSwSides } from '../../components/plugins/contentSw/enums';

export const ReaderPageTabs = {
    tabLinks: {
        contact: 'contact-btn',
        welcome: 'welcome-btn',
        reviewer: 'reviewer-btn',
        reviewerAdv: 'reviewer-adv-btn'
    }
};

export const ReviewerSettings = {
    gamePage: {
        id: 'html5games',
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.right
    },
    safeGamePage: {
        id: 'html5SafeGames',
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.right
    }
};