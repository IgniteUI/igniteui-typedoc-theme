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
import { hasPointerMoved, pointerDown, pointerUp } from "../utils/pointer";
var Toggle = /** @class */ (function (_super) {
    __extends(Toggle, _super);
    function Toggle(options) {
        var _this = _super.call(this, options) || this;
        _this.className = _this.el.dataset.toggle || "";
        _this.el.addEventListener(pointerUp, function (e) { return _this.onPointerUp(e); });
        _this.el.addEventListener("click", function (e) { return e.preventDefault(); });
        document.addEventListener(pointerDown, function (e) {
            return _this.onDocumentPointerDown(e);
        });
        document.addEventListener(pointerUp, function (e) {
            return _this.onDocumentPointerUp(e);
        });
        return _this;
    }
    Toggle.prototype.setActive = function (value) {
        if (this.active == value)
            return;
        this.active = value;
        document.documentElement.classList.toggle("has-" + this.className, value);
        this.el.classList.toggle("active", value);
        var transition = (this.active ? "to-has-" : "from-has-") + this.className;
        document.documentElement.classList.add(transition);
        setTimeout(function () { return document.documentElement.classList.remove(transition); }, 500);
    };
    Toggle.prototype.onPointerUp = function (event) {
        if (hasPointerMoved)
            return;
        this.setActive(true);
        event.preventDefault();
    };
    Toggle.prototype.onDocumentPointerDown = function (e) {
        if (this.active) {
            if (e.target.closest(".col-menu, .tsd-filter-group")) {
                return;
            }
            this.setActive(false);
        }
    };
    Toggle.prototype.onDocumentPointerUp = function (e) {
        var _this = this;
        if (hasPointerMoved)
            return;
        if (this.active) {
            if (e.target.closest(".col-menu")) {
                var link = e.target.closest("a");
                if (link) {
                    var href = window.location.href;
                    if (href.indexOf("#") != -1) {
                        href = href.substr(0, href.indexOf("#"));
                    }
                    if (link.href.substr(0, href.length) == href) {
                        setTimeout(function () { return _this.setActive(false); }, 250);
                    }
                }
            }
        }
    };
    return Toggle;
}(Component));
export { Toggle };
