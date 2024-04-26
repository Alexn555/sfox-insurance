export const CommonEvents = {
    click: 'click',
    resize: 'resize',
    keypress: 'keypress',
    keydown: 'keydown',
};

export const MouseEvents = {
    mouseover: 'mouseover',
    mouseout: 'mouseout'
};

export const CustomEvents = {
    settings: {
        moveLayout: 'move-layout',
        toggle: 'settings-toggle',
        close: 'settings-close',
        themeChanged: 'settings-theme-changed'
    },
    interaction: {
        flipBoard: 'flip-board',
        sliderValueChange: 'slider-value-change',
        selectChange: 'select-change-',
        textInputChange: 'text-input-change'
    },
    header: {
        menuOverlay: 'header-menu-overlay',
        menuClick: 'header-menu-click',
        menuOverlayRemove: 'header-menu-overlay-remove'
    },
};

export const CustomPageEvents = {
    users: {
        account: {
            init: 'account-init',
            hide: 'account-hide'
        },
        login: {
            user: 'logged-user'
        },
        reminder: {
            open: 'account-reminder-open'
        },
        logout: {
            button: 'account-logout'
        }
    },
    tabs: {
        writer: {
            showArticle: 'writer-show-article',
            showImage: 'writer-show-image',
            getImage: 'writer-get-iamge',
        }
    },
};

export const CustomWindowEvents = {
    network: {
        offline: 'offline',
        online: 'online'
    },
    imageViewer: {
        init: 'image-viewer-init',
        open: 'image-viewer-open'
    },
    paginatableContent: {
        pageClick: 'paginatable-page-click'
    },
    generalNote: {
        open: 'error-note-open',
        close: 'error-note-close'
    },
    iconSelect: {
        open: 'icon-select-open',
        close: 'icon-select-close'
    },
    draggable: {
        moveStart: 'move-start',
        moveEnd: 'move-end'
    }
};
