(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Model", "../Instance/CompositeInstance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DummyModel = void 0;
    const Model_1 = require("./Model");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    class DummyModel extends Model_1.Model {
        /**
         * Constructor which sets the distribution using the given {@link InstanceList}.
         *
         * @param trainSet {@link InstanceList} which is used to get the class distribution.
         */
        constructor(trainSet) {
            super();
            this.distribution = trainSet.classDistribution();
        }
        /**
         * The predict method takes an Instance as an input and returns the entry of distribution which has the maximum value.
         *
         * @param instance Instance to make prediction.
         * @return The entry of distribution which has the maximum value.
         */
        predict(instance) {
            if ((instance instanceof CompositeInstance_1.CompositeInstance)) {
                let possibleClassLabels = instance.getPossibleClassLabels();
                return this.distribution.getMaxItem(possibleClassLabels);
            }
            else {
                return this.distribution.getMaxItem();
            }
        }
        predictProbability(instance) {
            return this.distribution.getProbabilityDistribution();
        }
    }
    exports.DummyModel = DummyModel;
});
//# sourceMappingURL=DummyModel.js.map