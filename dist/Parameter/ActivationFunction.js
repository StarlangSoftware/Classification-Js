(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActivationFunction = void 0;
    var ActivationFunction;
    (function (ActivationFunction) {
        ActivationFunction[ActivationFunction["SIGMOID"] = 0] = "SIGMOID";
        ActivationFunction[ActivationFunction["TANH"] = 1] = "TANH";
        ActivationFunction[ActivationFunction["RELU"] = 2] = "RELU";
    })(ActivationFunction = exports.ActivationFunction || (exports.ActivationFunction = {}));
});
//# sourceMappingURL=ActivationFunction.js.map