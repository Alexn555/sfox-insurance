let sizes = {
  ds: "70vw",
  md: "80vw",
};

export default class BasePageSizeHandler {
  static desk(w = sizes.ds) {
    return w;
  }
  static medium(w = sizes.md) {
    return w;
  }
}
