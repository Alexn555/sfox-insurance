export const CommonEvents = {
  click: "click",
  resize: "resize",
  keypress: "keypress",
  keydown: "keydown",
};

export const MouseEvents = {
  mousedown: "mousedown",
  mouseup: "mouseup",
  mouseover: "mouseover",
  mouseout: "mouseout",
};

export const CustomEvents = {
  settings: {
    moveLayout: "move-layout",
    toggle: "settings-toggle",
    close: "settings-close",
    themeChanged: "settings-theme-changed",
  },
  interaction: {
    flipBoard: "flip-board",
    sliderValueChange: "slider-value-change",
    selectChange: "select-change-",
    textInputChange: "text-input-change",
    textAreaChange: "text-area-change",
    radioChange: "radio-input-change",
    radioGroupChange: "radio-group-change",
    checkboxChange: "checkbox-change",
  },
  header: {
    menuOverlay: "header-menu-overlay",
    menuClick: "header-menu-click",
    changeActivePage: "heeader-menu-change-page",
    menuOverlayRemove: "header-menu-overlay-remove",
  },
};

export const CustomPageEvents = {
  users: {
    account: {
      init: "account-init",
      hide: "account-hide",
    },
    login: {
      user: "logged-user",
    },
    reminder: {
      open: "account-reminder-open",
    },
    logout: {
      button: "account-logout",
    },
  },
  tabs: {
    writer: {
      showArticle: "writer-show-article",
      showImage: "writer-show-image",
      getImage: "writer-get-iamge",
    },
  },
};

export const CustomWindowEvents = {
  network: {
    offline: "offline",
    online: "online",
  },
  imageViewer: {
    init: "image-viewer-init",
    open: "image-viewer-open",
    change: "image-viewer-change",
  },
  contentSw: {
    pageClick: "content-sw-click",
  },
  paginatableContent: {
    pageClick: "paginatable-page-click",
  },
  generalNote: {
    open: "error-note-open",
    close: "error-note-close",
  },
  iconSelect: {
    open: "icon-select-open",
    close: "icon-select-close",
  },
  draggable: {
    moveStart: "move-start",
    moveEnd: "move-end",
  },
};
