// @ts-nocheck
import { match } from './util';

export default class Router extends HTMLElement {
  /**
   * Router looks for a sc-outlet tag for updating the views on history updates.
   * Example:
   *
   * <sc-router>
   *  <sc-outlet>
   *    <!-- All DOM update will be happening here on route change -->
   *  </sc-outlet>
   * </sc-router>
   */
  get outlet() {
    return this.querySelector("sc-outlet");
  }

  get root() {
    return window.location.pathname;
  }

  /**
   * Get all routes from the direct sc-route child element.
   * The document title can be updated by providing an
   * title attribute to the sc-route tag
   */
  get routes() {
    return Array.from(this.querySelectorAll("sc-route"))
      .filter(node => node.parentNode === this)
      .map(r => ({
        path: r.getAttribute("path"),
        // Optional: document title
        title: r.getAttribute("title"),
        // name of the web component the should be displayed
        component: r.getAttribute("component"),
        // Bundle path if lazy loading the component
        resourceUrl: r.getAttribute("resourceUrl")
      }));
  }

  connectedCallback() {
    this.updateLinks();
    this.navigate(window.location.pathname);

    window.addEventListener("popstate", this._handlePopstate);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._handlePopstate);
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname);
  };

  updateLinks() {
    /**
     * Find all child link elements with route attribute to update the
     * href with route attribute value.
     *
     * Add custom click event handler to prevent the default
     * behaviour and navigate to the registered route onclick.
     */
    this.querySelectorAll("a[route]").forEach(link => {
      const target = link.getAttribute("route");
      link.setAttribute("href", target);
      link.onclick = e => {
        e.preventDefault();
        this.navigate(target);
      };
    });
  }

  navigate(url) {
    const matchedRoute = match(this.routes, url);
    if (matchedRoute !== null) {
      this.activeRoute = matchedRoute;
      window.history.pushState(null, null, url);
      this.update();
    }
  }

  /**
   * Update the DOM under outlet based on the active
   * selected route.
   */
  update() {
    const {
      component,
      title,
      params = {},
      resourceUrl = null
    } = this.activeRoute;

    if (component) {
      // Remove all child nodes under outlet element
      while (this.outlet.firstChild) {
        this.outlet.removeChild(this.outlet.firstChild);
      }

      const updateView = () => {
        const view = document.createElement(component);
        document.title = title || document.title;
        for (let key in params) {
          /**
           * all dynamic param value will be passed
           * as the attribute to the newly created element
           * except * value.
           */
          if (key !== "*") view.setAttribute(key, params[key]);
        }

        this.outlet.appendChild(view);
        // Update the route links once the DOM is updated
        this.updateLinks();
      };

      if (resourceUrl !== null) {
        import(resourceUrl).then(updateView);
      } else {
        updateView();
      }
    }
  }

  go(url) {
    this.navigate(url);
  }

  back() {
    window.history.go(-1);
  }
}

customElements.define("sc-router", Router);
