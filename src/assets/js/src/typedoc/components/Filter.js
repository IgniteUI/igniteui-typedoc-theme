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
import { pointerDown, pointerUp } from "../utils/pointer";
var FilterItem = /** @class */ (function () {
    function FilterItem(key, value) {
        this.key = key;
        this.value = value;
        this.defaultValue = value;
        this.initialize();
        if (window.localStorage[this.key]) {
            this.setValue(this.fromLocalStorage(window.localStorage[this.key]));
        }
    }
    FilterItem.prototype.initialize = function () { };
    FilterItem.prototype.setValue = function (value) {
        if (this.value == value)
            return;
        var oldValue = this.value;
        this.value = value;
        window.localStorage[this.key] = this.toLocalStorage(value);
        this.handleValueChange(oldValue, value);
    };
    return FilterItem;
}());
var FilterItemCheckbox = /** @class */ (function (_super) {
    __extends(FilterItemCheckbox, _super);
    function FilterItemCheckbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterItemCheckbox.prototype.initialize = function () {
        var _this = this;
        var checkbox = document.querySelector("#tsd-filter-" + this.key);
        if (!checkbox)
            return;
        this.checkbox = checkbox;
        this.checkbox.addEventListener("change", function () {
            _this.setValue(_this.checkbox.checked);
        });
    };
    FilterItemCheckbox.prototype.handleValueChange = function (oldValue, newValue) {
        if (!this.checkbox)
            return;
        this.checkbox.checked = this.value;
        document.documentElement.classList.toggle("toggle-" + this.key, this.value != this.defaultValue);
    };
    FilterItemCheckbox.prototype.fromLocalStorage = function (value) {
        return value == "true";
    };
    FilterItemCheckbox.prototype.toLocalStorage = function (value) {
        return value ? "true" : "false";
    };
    return FilterItemCheckbox;
}(FilterItem));
var FilterItemSelect = /** @class */ (function (_super) {
    __extends(FilterItemSelect, _super);
    function FilterItemSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterItemSelect.prototype.initialize = function () {
        var _this = this;
        document.documentElement.classList.add("toggle-" + this.key + this.value);
        var select = document.querySelector("#tsd-filter-" + this.key);
        if (!select)
            return;
        this.select = select;
        var onActivate = function () {
            _this.select.classList.add("active");
        };
        var onDeactivate = function () {
            _this.select.classList.remove("active");
        };
        this.select.addEventListener(pointerDown, onActivate);
        this.select.addEventListener("mouseover", onActivate);
        this.select.addEventListener("mouseleave", onDeactivate);
        this.select.querySelectorAll("li").forEach(function (el) {
            el.addEventListener(pointerUp, function (e) {
                select.classList.remove("active");
                _this.setValue(e.target.dataset.value || "");
            });
        });
        document.addEventListener(pointerDown, function (e) {
            if (_this.select.contains(e.target))
                return;
            _this.select.classList.remove("active");
        });
    };
    FilterItemSelect.prototype.handleValueChange = function (oldValue, newValue) {
        this.select.querySelectorAll("li.selected").forEach(function (el) {
            el.classList.remove("selected");
        });
        var selected = this.select.querySelector('li[data-value="' + newValue + '"]');
        var label = this.select.querySelector(".tsd-select-label");
        if (selected && label) {
            selected.classList.add("selected");
            label.textContent = selected.textContent;
        }
        document.documentElement.classList.remove("toggle-" + oldValue);
        document.documentElement.classList.add("toggle-" + newValue);
    };
    FilterItemSelect.prototype.fromLocalStorage = function (value) {
        return value;
    };
    FilterItemSelect.prototype.toLocalStorage = function (value) {
        return value;
    };
    return FilterItemSelect;
}(FilterItem));
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter(options) {
        var _this = _super.call(this, options) || this;
        _this.optionVisibility = new FilterItemSelect("visibility", "private");
        _this.optionInherited = new FilterItemCheckbox("inherited", true);
        _this.optionExternals = new FilterItemCheckbox("externals", true);
        return _this;
    }
    Filter.isSupported = function () {
        try {
            return typeof window.localStorage != "undefined";
        }
        catch (e) {
            return false;
        }
    };
    return Filter;
}(Component));
export { Filter };
