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
import { Component } from "../Component";
import { Viewport } from "../services/Viewport";
/**
 * Manages the sticky state of the navigation and moves the highlight
 * to the current navigation item.
 */
var MenuHighlight = /** @class */ (function (_super) {
    __extends(MenuHighlight, _super);
    /**
     * Create a new MenuHighlight instance.
     *
     * @param options  Backbone view constructor options.
     */
    function MenuHighlight(options) {
        var _this = _super.call(this, options) || this;
        /**
         * List of all discovered anchors.
         */
        _this.anchors = [];
        /**
         * Index of the currently highlighted anchor.
         */
        _this.index = -1;
        Viewport.instance.addEventListener("resize", function () { return _this.onResize(); });
        Viewport.instance.addEventListener("scroll", function (e) { return _this.onScroll(e); });
        _this.createAnchors();
        return _this;
    }
    /**
     * Find all anchors on the current page.
     */
    MenuHighlight.prototype.createAnchors = function () {
        var _this = this;
        var base = window.location.href;
        if (base.indexOf("#") != -1) {
            base = base.substr(0, base.indexOf("#"));
        }
        this.el.querySelectorAll("a").forEach(function (el) {
            var href = el.href;
            if (href.indexOf("#") == -1)
                return;
            if (href.substr(0, base.length) != base)
                return;
            var hash = href.substr(href.indexOf("#") + 1);
            var anchor = document.querySelector("a.tsd-anchor[name=" + hash + "]");
            var link = el.parentNode;
            if (!anchor || !link)
                return;
            _this.anchors.push({
                link: link,
                anchor: anchor,
                position: 0,
            });
        });
        this.onResize();
    };
    /**
     * Triggered after the viewport was resized.
     */
    MenuHighlight.prototype.onResize = function () {
        var anchor;
        for (var index = 0, count = this.anchors.length; index < count; index++) {
            anchor = this.anchors[index];
            var rect = anchor.anchor.getBoundingClientRect();
            anchor.position = rect.top + document.body.scrollTop;
        }
        this.anchors.sort(function (a, b) {
            return a.position - b.position;
        });
        var event = new CustomEvent("scroll", {
            detail: {
                scrollTop: Viewport.instance.scrollTop,
            },
        });
        this.onScroll(event);
    };
    /**
     * Triggered after the viewport was scrolled.
     *
     * @param event  The custom event with the current vertical scroll position.
     */
    MenuHighlight.prototype.onScroll = function (event) {
        var scrollTop = event.detail.scrollTop + 5;
        var anchors = this.anchors;
        var count = anchors.length - 1;
        var index = this.index;
        while (index > -1 && anchors[index].position > scrollTop) {
            index -= 1;
        }
        while (index < count && anchors[index + 1].position < scrollTop) {
            index += 1;
        }
        if (this.index != index) {
            if (this.index > -1)
                this.anchors[this.index].link.classList.remove("focus");
            this.index = index;
            if (this.index > -1)
                this.anchors[this.index].link.classList.add("focus");
        }
    };
    return MenuHighlight;
}(Component));
export { MenuHighlight };
