var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EventTarget } from "../EventTarget";
import { throttle } from "../utils/trottle";
/**
 * A global service that monitors the window size and scroll position.
 */
var Viewport = /** @class */ (function (_super) {
    __extends(Viewport, _super);
    /**
     * Create new Viewport instance.
     */
    function Viewport() {
        var _this = _super.call(this) || this;
        /**
         * The current scroll position.
         */
        _this.scrollTop = 0;
        /**
         * The previous scrollTop.
         */
        _this.lastY = 0;
        /**
         * The width of the window.
         */
        _this.width = 0;
        /**
         * The height of the window.
         */
        _this.height = 0;
        /**
         * Boolean indicating whether the toolbar is shown.
         */
        _this.showToolbar = true;
        _this.toolbar = (document.querySelector(".tsd-page-toolbar"));
        _this.secondaryNav = (document.querySelector(".tsd-navigation.secondary"));
        window.addEventListener("scroll", throttle(function () { return _this.onScroll(); }, 10));
        window.addEventListener("resize", throttle(function () { return _this.onResize(); }, 10));
        _this.onResize();
        _this.onScroll();
        return _this;
    }
    /**
     * Trigger a resize event.
     */
    Viewport.prototype.triggerResize = function () {
        var event = new CustomEvent("resize", {
            detail: {
                width: this.width,
                height: this.height,
            },
        });
        this.dispatchEvent(event);
    };
    /**
     * Triggered when the size of the window has changed.
     */
    Viewport.prototype.onResize = function () {
        this.width = window.innerWidth || 0;
        this.height = window.innerHeight || 0;
        var event = new CustomEvent("resize", {
            detail: {
                width: this.width,
                height: this.height,
            },
        });
        this.dispatchEvent(event);
    };
    /**
     * Triggered when the user scrolled the viewport.
     */
    Viewport.prototype.onScroll = function () {
        this.scrollTop = window.scrollY || 0;
        var event = new CustomEvent("scroll", {
            detail: {
                scrollTop: this.scrollTop,
            },
        });
        this.dispatchEvent(event);
        this.hideShowToolbar();
    };
    /**
     * Handle hiding/showing of the toolbar.
     */
    Viewport.prototype.hideShowToolbar = function () {
        var isShown = this.showToolbar;
        this.showToolbar = this.lastY >= this.scrollTop || this.scrollTop <= 0;
        if (isShown !== this.showToolbar) {
            this.toolbar.classList.toggle("tsd-page-toolbar--hide");
            this.secondaryNav.classList.toggle("tsd-navigation--toolbar-hide");
        }
        this.lastY = this.scrollTop;
    };
    Viewport.instance = new Viewport();
    return Viewport;
}(EventTarget));
export { Viewport };
