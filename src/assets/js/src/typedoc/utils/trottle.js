export var throttle = function (fn, wait) {
    if (wait === void 0) { wait = 100; }
    var time = Date.now();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (time + wait - Date.now() < 0) {
            fn.apply(void 0, args);
            time = Date.now();
        }
    };
};
