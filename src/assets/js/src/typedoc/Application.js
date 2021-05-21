/**
 * List of all known components.
 */
var components = [];
/**
 * Register a new component.
 */
export function registerComponent(constructor, selector) {
    components.push({
        selector: selector,
        constructor: constructor,
    });
}
/**
 * TypeDoc application class.
 */
var Application = /** @class */ (function () {
    /**
     * Create a new Application instance.
     */
    function Application() {
        this.createComponents(document.body);
    }
    /**
     * Create all components beneath the given jQuery element.
     */
    Application.prototype.createComponents = function (context) {
        components.forEach(function (c) {
            context.querySelectorAll(c.selector).forEach(function (el) {
                if (!el.dataset.hasInstance) {
                    new c.constructor({ el: el });
                    el.dataset.hasInstance = String(true);
                }
            });
        });
    };
    return Application;
}());
export { Application };
