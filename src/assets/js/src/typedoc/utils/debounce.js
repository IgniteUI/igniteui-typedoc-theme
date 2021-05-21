export var debounce = function (fn, wait) {
    if (wait === void 0) { wait = 100; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return fn(args); }, wait);
    };
};
