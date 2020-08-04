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
var typedoc;
(function (typedoc) {
    var services = [];
    var components = [];
    function registerService(constructor, name, priority) {
        if (priority === void 0) { priority = 0; }
        services.push({
            constructor: constructor,
            name: name,
            priority: priority,
            instance: null
        });
        services.sort(function (a, b) { return a.priority - b.priority; });
    }
    typedoc.registerService = registerService;
    function registerComponent(constructor, selector, priority, namespace) {
        if (priority === void 0) { priority = 0; }
        if (namespace === void 0) { namespace = '*'; }
        components.push({
            selector: selector,
            constructor: constructor,
            priority: priority,
            namespace: namespace
        });
        components.sort(function (a, b) { return a.priority - b.priority; });
    }
    typedoc.registerComponent = registerComponent;
    var Application = (function () {
        function Application() {
            this.createServices();
            this.createComponents(document.body);
        }
        Application.prototype.createServices = function () {
            services.forEach(function (c) {
                c.instance = new c.constructor();
                typedoc[c.name] = c.instance;
            });
        };
        Application.prototype.createComponents = function (context, namespace) {
            if (namespace === void 0) { namespace = 'default'; }
            components.forEach(function (c) {
                if (c.namespace != namespace && c.namespace != '*') {
                    return;
                }
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
    typedoc.Application = Application;
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var Component = (function () {
        function Component(options) {
            this.el = options.el;
        }
        return Component;
    }());
    typedoc.Component = Component;
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    typedoc.pointerDown = 'mousedown';
    typedoc.pointerMove = 'mousemove';
    typedoc.pointerUp = 'mouseup';
    typedoc.pointerDownPosition = { x: 0, y: 0 };
    typedoc.preventNextClick = false;
    typedoc.isPointerDown = false;
    typedoc.isPointerTouch = false;
    typedoc.hasPointerMoved = false;
    typedoc.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    document.documentElement.classList.add(typedoc.isMobile ? 'is-mobile' : 'not-mobile');
    if (typedoc.isMobile && 'ontouchstart' in document.documentElement) {
        typedoc.isPointerTouch = true;
        typedoc.pointerDown = 'touchstart';
        typedoc.pointerMove = 'touchmove';
        typedoc.pointerUp = 'touchend';
    }
    document.addEventListener(typedoc.pointerDown, function (e) {
        typedoc.isPointerDown = true;
        typedoc.hasPointerMoved = false;
        var t = (typedoc.pointerDown == 'touchstart' ? e.targetTouches[0] : e);
        typedoc.pointerDownPosition.y = t.pageY || 0;
        typedoc.pointerDownPosition.x = t.pageX || 0;
    });
    document.addEventListener(typedoc.pointerMove, function (e) {
        if (!typedoc.isPointerDown)
            return;
        if (!typedoc.hasPointerMoved) {
            var t = (typedoc.pointerDown == 'touchstart' ? e.targetTouches[0] : e);
            var x = typedoc.pointerDownPosition.x - (t.pageX || 0);
            var y = typedoc.pointerDownPosition.y - (t.pageY || 0);
            typedoc.hasPointerMoved = (Math.sqrt(x * x + y * y) > 10);
        }
    });
    document.addEventListener(typedoc.pointerUp, function () {
        typedoc.isPointerDown = false;
    });
    document.addEventListener('click', function (e) {
        if (typedoc.preventNextClick) {
            e.preventDefault();
            e.stopImmediatePropagation();
            typedoc.preventNextClick = false;
        }
    });
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var FilterItem = (function () {
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
    var FilterItemCheckbox = (function (_super) {
        __extends(FilterItemCheckbox, _super);
        function FilterItemCheckbox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FilterItemCheckbox.prototype.initialize = function () {
            var _this = this;
            var checkbox = document.querySelector('#tsd-filter-' + this.key);
            if (!checkbox)
                return;
            this.checkbox = checkbox;
            this.checkbox.addEventListener('change', function () {
                _this.setValue(_this.checkbox.checked);
            });
        };
        FilterItemCheckbox.prototype.handleValueChange = function (oldValue, newValue) {
            if (!this.checkbox)
                return;
            this.checkbox.checked = this.value;
            document.documentElement.classList.toggle('toggle-' + this.key, this.value != this.defaultValue);
        };
        FilterItemCheckbox.prototype.fromLocalStorage = function (value) {
            return value == 'true';
        };
        FilterItemCheckbox.prototype.toLocalStorage = function (value) {
            return value ? 'true' : 'false';
        };
        return FilterItemCheckbox;
    }(FilterItem));
    var FilterItemSelect = (function (_super) {
        __extends(FilterItemSelect, _super);
        function FilterItemSelect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FilterItemSelect.prototype.initialize = function () {
            var _this = this;
            document.documentElement.classList.add('toggle-' + this.key + this.value);
            var select = document.querySelector('#tsd-filter-' + this.key);
            if (!select)
                return;
            this.select = select;
            var onActivate = function () {
                _this.select.classList.add('active');
            };
            var onDeactivate = function () {
                _this.select.classList.remove('active');
            };
            this.select.addEventListener(typedoc.pointerDown, onActivate);
            this.select.addEventListener('mouseover', onActivate);
            this.select.addEventListener('mouseleave', onDeactivate);
            this.select.querySelectorAll('li').forEach(function (el) {
                el.addEventListener(typedoc.pointerUp, function (e) {
                    select.classList.remove('active');
                    _this.setValue(e.target.dataset.value || '');
                });
            });
            document.addEventListener(typedoc.pointerDown, function (e) {
                if (_this.select.contains(e.target))
                    return;
                _this.select.classList.remove('active');
            });
        };
        FilterItemSelect.prototype.handleValueChange = function (oldValue, newValue) {
            this.select.querySelectorAll('li.selected').forEach(function (el) {
                el.classList.remove('selected');
            });
            var selected = this.select.querySelector('li[data-value="' + newValue + '"]');
            var label = this.select.querySelector('.tsd-select-label');
            if (selected && label) {
                selected.classList.add('selected');
                label.textContent = selected.textContent;
            }
            document.documentElement.classList.remove('toggle-' + oldValue);
            document.documentElement.classList.add('toggle-' + newValue);
        };
        FilterItemSelect.prototype.fromLocalStorage = function (value) {
            return value;
        };
        FilterItemSelect.prototype.toLocalStorage = function (value) {
            return value;
        };
        return FilterItemSelect;
    }(FilterItem));
    var Filter = (function (_super) {
        __extends(Filter, _super);
        function Filter(options) {
            var _this = _super.call(this, options) || this;
            _this.optionVisibility = new FilterItemSelect('visibility', 'private');
            _this.optionInherited = new FilterItemCheckbox('inherited', true);
            _this.optionExternals = new FilterItemCheckbox('externals', true);
            _this.optionOnlyExported = new FilterItemCheckbox('only-exported', false);
            return _this;
        }
        Filter.isSupported = function () {
            try {
                return typeof window.localStorage != 'undefined';
            }
            catch (e) {
                return false;
            }
        };
        return Filter;
    }(typedoc.Component));
    if (Filter.isSupported()) {
        typedoc.registerComponent(Filter, '#tsd-filter');
    }
    else {
        document.documentElement.classList.add('no-filter');
    }
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var EventTarget = (function () {
        function EventTarget() {
            this.listeners = {};
        }
        EventTarget.prototype.addEventListener = function (type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        };
        ;
        EventTarget.prototype.removeEventListener = function (type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            var stack = this.listeners[type];
            for (var i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return;
                }
            }
        };
        ;
        EventTarget.prototype.dispatchEvent = function (event) {
            if (!(event.type in this.listeners)) {
                return true;
            }
            var stack = this.listeners[event.type].slice();
            for (var i = 0, l = stack.length; i < l; i++) {
                stack[i].call(this, event);
            }
            return !event.defaultPrevented;
        };
        ;
        return EventTarget;
    }());
    typedoc.EventTarget = EventTarget;
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    typedoc.throttle = function (fn, wait) {
        if (wait === void 0) { wait = 100; }
        var time = Date.now();
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if ((time + wait - Date.now()) < 0) {
                fn.apply(void 0, args);
                time = Date.now();
            }
        };
    };
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var Viewport = (function (_super) {
        __extends(Viewport, _super);
        function Viewport() {
            var _this = _super.call(this) || this;
            _this.scrollTop = 0;
            _this.lastY = 0;
            _this.width = 0;
            _this.height = 0;
            window.addEventListener('scroll', typedoc.throttle(function () { return _this.onScroll(); }, 10));
            window.addEventListener('resize', typedoc.throttle(function () { return _this.onResize(); }, 10));
            _this.onResize();
            _this.onScroll();
            return _this;
        }
        Viewport.prototype.triggerResize = function () {
            var event = new CustomEvent('resize', {
                detail: {
                    width: this.width,
                    height: this.height,
                }
            });
            this.dispatchEvent(event);
        };
        Viewport.prototype.onResize = function () {
            this.width = window.innerWidth || 0;
            this.height = window.innerHeight || 0;
            var event = new CustomEvent('resize', {
                detail: {
                    width: this.width,
                    height: this.height,
                }
            });
            this.dispatchEvent(event);
        };
        Viewport.prototype.onScroll = function () {
            this.scrollTop = window.scrollY || 0;
            var event = new CustomEvent('scroll', {
                detail: {
                    scrollTop: this.scrollTop,
                }
            });
            this.dispatchEvent(event);
        };
        return Viewport;
    }(typedoc.EventTarget));
    typedoc.Viewport = Viewport;
    typedoc.registerService(Viewport, 'viewport');
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var MenuHighlight = (function (_super) {
        __extends(MenuHighlight, _super);
        function MenuHighlight(options) {
            var _this = _super.call(this, options) || this;
            _this.anchors = [];
            _this.index = -1;
            typedoc.viewport.addEventListener('resize', function () { return _this.onResize(); });
            typedoc.viewport.addEventListener('scroll', function (e) { return _this.onScroll(e); });
            _this.createAnchors();
            return _this;
        }
        MenuHighlight.prototype.createAnchors = function () {
            var _this = this;
            var base = window.location.href;
            if (base.indexOf('#') != -1) {
                base = base.substr(0, base.indexOf('#'));
            }
            this.el.querySelectorAll('a').forEach(function (el) {
                var href = el.href;
                if (href.indexOf('#') == -1)
                    return;
                if (href.substr(0, base.length) != base)
                    return;
                var hash = href.substr(href.indexOf('#') + 1);
                var anchor = document.querySelector('a.tsd-anchor[name=' + hash + ']');
                var link = el.parentNode;
                if (!anchor || !link)
                    return;
                _this.anchors.push({
                    link: link,
                    anchor: anchor,
                    position: 0
                });
            });
            this.onResize();
        };
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
            var event = new CustomEvent('scroll', {
                detail: {
                    scrollTop: typedoc.viewport.scrollTop,
                }
            });
            this.onScroll(event);
        };
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
                    this.anchors[this.index].link.classList.remove('focus');
                this.index = index;
                if (this.index > -1)
                    this.anchors[this.index].link.classList.add('focus');
            }
        };
        return MenuHighlight;
    }(typedoc.Component));
    typedoc.MenuHighlight = MenuHighlight;
    typedoc.registerComponent(MenuHighlight, '.menu-highlight');
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var search;
    (function (search) {
        var SearchLoadingState;
        (function (SearchLoadingState) {
            SearchLoadingState[SearchLoadingState["Idle"] = 0] = "Idle";
            SearchLoadingState[SearchLoadingState["Loading"] = 1] = "Loading";
            SearchLoadingState[SearchLoadingState["Ready"] = 2] = "Ready";
            SearchLoadingState[SearchLoadingState["Failure"] = 3] = "Failure";
        })(SearchLoadingState || (SearchLoadingState = {}));
        var Search = (function (_super) {
            __extends(Search, _super);
            function Search(options) {
                var _this = _super.call(this, options) || this;
                _this.query = '';
                _this.loadingState = SearchLoadingState.Idle;
                _this.hasFocus = false;
                _this.preventPress = false;
                _this.data = null;
                _this.index = null;
                _this.resultClicked = false;
                var field = document.querySelector('#tsd-search-field');
                var results = document.querySelector('.results');
                if (!field || !results) {
                    throw new Error('The input field or the result list wrapper are not found');
                }
                _this.field = field;
                _this.results = results;
                _this.base = _this.el.dataset.base + '/';
                _this.bindEvents();
                return _this;
            }
            Search.prototype.loadIndex = function () {
                var _this = this;
                if (this.loadingState != SearchLoadingState.Idle || this.data)
                    return;
                setTimeout(function () {
                    if (_this.loadingState == SearchLoadingState.Idle) {
                        _this.setLoadingState(SearchLoadingState.Loading);
                    }
                }, 500);
                var url = this.el.dataset.index;
                if (!url) {
                    this.setLoadingState(SearchLoadingState.Failure);
                    return;
                }
                fetch(url)
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error('The search index is missing');
                    }
                    return response.json();
                })
                    .then(function (source) {
                    _this.data = source;
                    _this.index = lunr.Index.load(source.index);
                    _this.setLoadingState(SearchLoadingState.Ready);
                })
                    .catch(function (error) {
                    console.error(error);
                    _this.setLoadingState(SearchLoadingState.Failure);
                });
            };
            Search.prototype.updateResults = function () {
                if (this.loadingState != SearchLoadingState.Ready)
                    return;
                this.results.textContent = '';
                if (!this.query || !this.index || !this.data)
                    return;
                var res = this.index.search("*" + this.query + "*");
                if (res.length === 0) {
                    res = this.index.search("*" + this.query + "~1*");
                }
                for (var i = 0, c = Math.min(10, res.length); i < c; i++) {
                    var row = this.data.rows[Number(res[i].ref)];
                    var name = row.name.replace(new RegExp(this.query, 'i'), function (match) { return "<b>" + match + "</b>"; });
                    var parent = row.parent || '';
                    parent = parent.replace(new RegExp(this.query, 'i'), function (match) { return "<b>" + match + "</b>"; });
                    if (parent)
                        name = '<span class="parent">' + parent + '.</span>' + name;
                    var item = document.createElement('li');
                    item.classList.value = row.classes;
                    item.innerHTML = "\n                    <a href=\"" + (this.base + row.url) + "\" class=\"tsd-kind-icon\">" + name + "</a>\n                ";
                    this.results.appendChild(item);
                }
            };
            Search.prototype.setLoadingState = function (value) {
                if (this.loadingState == value)
                    return;
                this.el.classList.remove(SearchLoadingState[this.loadingState].toLowerCase());
                this.loadingState = value;
                this.el.classList.add(SearchLoadingState[this.loadingState].toLowerCase());
                this.updateResults();
            };
            Search.prototype.setHasFocus = function (value) {
                if (this.hasFocus == value)
                    return;
                this.hasFocus = value;
                this.el.classList.toggle('has-focus');
                if (!value) {
                    this.field.value = this.query;
                }
                else {
                    this.setQuery('');
                    this.field.value = '';
                }
            };
            Search.prototype.setQuery = function (value) {
                this.query = value.trim();
                this.updateResults();
            };
            Search.prototype.setCurrentResult = function (dir) {
                var current = this.results.querySelector('.current');
                if (!current) {
                    current = this.results.querySelector(dir == 1 ? 'li:first-child' : 'li:last-child');
                    if (current) {
                        current.classList.add('current');
                    }
                }
                else {
                    var rel = dir == 1 ? current.nextElementSibling : current.previousElementSibling;
                    if (rel) {
                        current.classList.remove('current');
                        rel.classList.add('current');
                    }
                }
            };
            Search.prototype.gotoCurrentResult = function () {
                var current = this.results.querySelector('.current');
                if (!current) {
                    current = this.results.querySelector('li:first-child');
                }
                if (current) {
                    var link = current.querySelector('a');
                    if (link) {
                        window.location.href = link.href;
                    }
                    this.field.blur();
                }
            };
            Search.prototype.bindEvents = function () {
                var _this = this;
                this.results.addEventListener('mousedown', function () {
                    _this.resultClicked = true;
                });
                this.results.addEventListener('mouseup', function () {
                    _this.resultClicked = false;
                    _this.setHasFocus(false);
                });
                this.field.addEventListener('focusin', function () {
                    _this.setHasFocus(true);
                    _this.loadIndex();
                });
                this.field.addEventListener('focusout', function () {
                    if (_this.resultClicked) {
                        _this.resultClicked = false;
                        return;
                    }
                    setTimeout(function () { return _this.setHasFocus(false); }, 100);
                });
                this.field.addEventListener('input', function () {
                    _this.setQuery(_this.field.value);
                });
                this.field.addEventListener('keydown', function (e) {
                    if (e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 38 || e.keyCode == 40) {
                        _this.preventPress = true;
                        e.preventDefault();
                        if (e.keyCode == 13) {
                            _this.gotoCurrentResult();
                        }
                        else if (e.keyCode == 27) {
                            _this.field.blur();
                        }
                        else if (e.keyCode == 38) {
                            _this.setCurrentResult(-1);
                        }
                        else if (e.keyCode == 40) {
                            _this.setCurrentResult(1);
                        }
                    }
                    else {
                        _this.preventPress = false;
                    }
                });
                this.field.addEventListener('keypress', function (e) {
                    if (_this.preventPress)
                        e.preventDefault();
                });
                document.body.addEventListener('keydown', function (e) {
                    if (e.altKey || e.ctrlKey || e.metaKey)
                        return;
                    if (!_this.hasFocus && e.keyCode > 47 && e.keyCode < 112) {
                        _this.field.focus();
                    }
                });
            };
            return Search;
        }(typedoc.Component));
        search.Search = Search;
        typedoc.registerComponent(Search, '#tsd-search');
    })(search = typedoc.search || (typedoc.search = {}));
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var SignatureGroup = (function () {
        function SignatureGroup(signature, description) {
            this.signature = signature;
            this.description = description;
        }
        SignatureGroup.prototype.addClass = function (className) {
            this.signature.classList.add(className);
            this.description.classList.add(className);
            return this;
        };
        SignatureGroup.prototype.removeClass = function (className) {
            this.signature.classList.remove(className);
            this.description.classList.remove(className);
            return this;
        };
        return SignatureGroup;
    }());
    var Signature = (function (_super) {
        __extends(Signature, _super);
        function Signature(options) {
            var _this = _super.call(this, options) || this;
            _this.groups = [];
            _this.index = -1;
            _this.createGroups();
            if (_this.container) {
                _this.el.classList.add('active');
                Array.from(_this.el.children).forEach(function (signature) {
                    signature.addEventListener('touchstart', function (event) { return _this.onClick(event); });
                    signature.addEventListener('click', function (event) { return _this.onClick(event); });
                });
                _this.container.classList.add('active');
                _this.setIndex(0);
            }
            return _this;
        }
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
                from_1.removeClass('current').addClass('fade-out');
                to.addClass('current');
                to.addClass('fade-in');
                typedoc.viewport.triggerResize();
                setTimeout(function () {
                    from_1.removeClass('fade-out');
                    to.removeClass('fade-in');
                }, 300);
            }
            else {
                to.addClass('current');
                typedoc.viewport.triggerResize();
            }
            this.index = index;
        };
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
        Signature.prototype.onClick = function (e) {
            var _this = this;
            this.groups.forEach(function (group, index) {
                if (group.signature === e.currentTarget) {
                    _this.setIndex(index);
                }
            });
        };
        return Signature;
    }(typedoc.Component));
    typedoc.registerComponent(Signature, '.tsd-signatures');
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    var Toggle = (function (_super) {
        __extends(Toggle, _super);
        function Toggle(options) {
            var _this = _super.call(this, options) || this;
            _this.className = _this.el.dataset.toggle || '';
            _this.el.addEventListener(typedoc.pointerUp, function (e) { return _this.onPointerUp(e); });
            _this.el.addEventListener('click', function (e) { return e.preventDefault(); });
            document.addEventListener(typedoc.pointerDown, function (e) { return _this.onDocumentPointerDown(e); });
            document.addEventListener(typedoc.pointerUp, function (e) { return _this.onDocumentPointerUp(e); });
            return _this;
        }
        Toggle.prototype.setActive = function (value) {
            if (this.active == value)
                return;
            this.active = value;
            document.documentElement.classList.toggle('has-' + this.className, value);
            this.el.classList.toggle('active', value);
            var transition = (this.active ? 'to-has-' : 'from-has-') + this.className;
            document.documentElement.classList.add(transition);
            setTimeout(function () { return document.documentElement.classList.remove(transition); }, 500);
        };
        Toggle.prototype.onPointerUp = function (event) {
            if (typedoc.hasPointerMoved)
                return;
            this.setActive(true);
            event.preventDefault();
        };
        Toggle.prototype.onDocumentPointerDown = function (e) {
            if (this.active) {
                if (e.target.closest('.col-menu, .tsd-filter-group')) {
                    return;
                }
                this.setActive(false);
            }
        };
        Toggle.prototype.onDocumentPointerUp = function (e) {
            var _this = this;
            if (typedoc.hasPointerMoved)
                return;
            if (this.active) {
                if (e.target.closest('.col-menu')) {
                    var link = e.target.closest('a');
                    if (link) {
                        var href = window.location.href;
                        if (href.indexOf('#') != -1) {
                            href = href.substr(0, href.indexOf('#'));
                        }
                        if (link.href.substr(0, href.length) == href) {
                            setTimeout(function () { return _this.setActive(false); }, 250);
                        }
                    }
                }
            }
        };
        return Toggle;
    }(typedoc.Component));
    typedoc.registerComponent(Toggle, 'a[data-toggle]');
})(typedoc || (typedoc = {}));
var typedoc;
(function (typedoc) {
    typedoc.app = new typedoc.Application();
})(typedoc || (typedoc = {}));
