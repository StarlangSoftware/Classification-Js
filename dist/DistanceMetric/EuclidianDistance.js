(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Attribute/DiscreteAttribute", "../Attribute/ContinuousAttribute"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EuclidianDistance = void 0;
    const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
    const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
    class EuclidianDistance {
        /**
         * Calculates Euclidian distance between two instances. For continuous features: \sum_{i=1}^d (x_i^(1) - x_i^(2))^2,
         * For discrete features: \sum_{i=1}^d 1(x_i^(1) == x_i^(2))
         *
         * @param instance1 First instance
         * @param instance2 Second instance
         * @return Euclidian distance between two instances.
         */
        distance(instance1, instance2) {
            let result = 0;
            for (let i = 0; i < instance1.attributeSize(); i++) {
                if (instance1.getAttribute(i) instanceof DiscreteAttribute_1.DiscreteAttribute && instance2.getAttribute(i) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                    if (instance1.getAttribute(i).getValue() != null && instance1.getAttribute(i).getValue() != instance2.getAttribute(i).getValue()) {
                        result += 1;
                    }
                }
                else {
                    if (instance1.getAttribute(i) instanceof ContinuousAttribute_1.ContinuousAttribute && instance2.getAttribute(i) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                        result += Math.pow(instance1.getAttribute(i).getValue() - instance2.getAttribute(i).getValue(), 2);
                    }
                }
            }
            return result;
        }
    }
    exports.EuclidianDistance = EuclidianDistance;
});
//# sourceMappingURL=EuclidianDistance.js.map