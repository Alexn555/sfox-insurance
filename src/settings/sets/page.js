export let pageNames = {
  home: "home",
  insurance: "insurance",
  additional: "additional",
  safe: "safe",
  reader: "reader",
};

export let pageIds = [
  pageNames.home,
  pageNames.insurance,
  pageNames.additional,
  pageNames.safe,
  pageNames.reader,
];

export let PageStructure = {
  settings: {
    height: 120,
    layoutOffset: 20,
  },
};

export let Writer = {
  fetchOnce: true,
  queue: {
    amount: 2,
    eachTime: 1000, // ms
  },
};

export let Game = {
  buttons: {
    dialogOpener: false,
  },
};

export let Account = {
  details: {
    showVisited: false,
    randomIcon: true,
  },
};

export let AdditionalPage = {
  tabLinks: {
    game: "game-btn",
    mapLink: "map-btn",
    writer: "writer-btn",
    gallery: "gallery-btn",
    account: "account-btn",
  },
};

export let Banners = {
  Accounts: {
    main: "purple",
  },
};
