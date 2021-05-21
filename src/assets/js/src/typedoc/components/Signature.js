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
 * Holds a signature and its description.
 */
var SignatureGroup = /** @class */ (function () {
    /**
     * Create a new SignatureGroup instance.
     *
     * @param signature    The target signature.
     * @param description  The description for the signature.
     */
    function SignatureGroup(signature, description) {
        this.signature = signature;
        this.description = description;
    }
    /**
     * Add the given class to all elements of the group.
     *
     * @param className  The class name to add.
     */
    SignatureGroup.prototype.addClass = function (className) {
        this.signature.classList.add(className);
        this.description.classList.add(className);
        return this;
    };
    /**
     * Remove the given class from all elements of the group.
     *
     * @param className  The class name to remove.
     */
    SignatureGroup.prototype.removeClass = function (className) {
        this.signature.classList.remove(className);
        this.description.classList.remove(className);
        return this;
    };
    return SignatureGroup;
}());
/**
 * Controls the tab like behaviour of methods and functions with multiple signatures.
 */
var Signature = /** @class */ (function (_super) {
    __extends(Signature, _super);
    /**
     * Create a new Signature instance.
     *
     * @param options  Backbone view constructor options.
     */
    function Signature(options) {
        var _this = _super.call(this, options) || this;
        /**
         * List of found signature groups.
         */
        _this.groups = [];
        /**
         * The index of the currently displayed signature.
         */
        _this.index = -1;
        _this.createGroups();
        if (_this.container) {
            _this.el.classList.add("active");
            Array.from(_this.el.children).forEach(function (signature) {
                signature.addEventListener("touchstart", function (event) {
                    return _this.onClick(event);
                });
                signature.addEventListener("click", function (event) {
                    return _this.onClick(event);
                });
            });
            _this.container.classList.add("active");
            _this.setIndex(0);
        }
        return _this;
    }
    /**
     * Set the index of the active signature.
     *
     * @param index  The index of the signature to activate.
     */
    Signature.prototype.setIndex = function (index) {
        if (index < 0)
            index = 0;
        if (index > this.groups.length - 1)
            index = this.groups.length - 1;
        if (this.index == index)
            return;
        var to = this.groups[index];
        if (this.index > -1) {
            var from_1 = this.groups[this.index];
            from_1.removeClass("current").addClass("fade-out");
            to.addClass("current");
            to.addClass("fade-in");
            Viewport.instance.triggerResize();
            setTimeout(function () {
                from_1.removeClass("fade-out");
                to.removeClass("fade-in");
            }, 300);
        }
        else {
            to.addClass("current");
            Viewport.instance.triggerResize();
        }
        this.index = index;
    };
    /**
     * Find all signature/description groups.
     */
    Signature.prototype.createGroups = function () {
        var signatures = this.el.children;
        if (signatures.length < 2)
            return;
        this.container = this.el.nextElementSibling;
        var descriptions = this.container.children;
        this.groups = [];
        for (var index = 0; index < signatures.length; index++) {
            this.groups.push(new SignatureGroup(signatures[index], descriptions[index]));
        }
    };
    /**
     * Triggered when the user clicks onto a signature header.
     *
     * @param e  The related event object.
     */
    Signature.prototype.onClick = function (e) {
        var _this = this;
        this.groups.forEach(function (group, index) {
            if (group.signature === e.currentTarget) {
                _this.setIndex(index);
            }
        });
    };
    return Signature;
}(Component));
export { Signature };
