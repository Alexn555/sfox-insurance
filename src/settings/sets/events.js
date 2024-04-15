export const CommonEvents = {
    click: 'click',
    resize: 'resize'
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
    imageViwer: {
        open: 'image-viewer-open'
    },
    draggable: {
        moveStart: 'move-start',
        moveEnd: 'move-end'
    }
};
