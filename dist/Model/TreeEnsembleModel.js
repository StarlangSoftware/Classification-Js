(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Model", "nlptoolkit-math/dist/DiscreteDistribution"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeEnsembleModel = void 0;
    const Model_1 = require("./Model");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    class TreeEnsembleModel extends Model_1.Model {
        /**
         * A constructor which sets the {@link Array} of {@link DecisionTree} with given input.
         *
         * @param forest An {@link Array} of {@link DecisionTree}.
         */
        constructor(forest) {
            super();
            this.forest = forest;
        }
        /**
         * The predict method takes an {@link Instance} as an input and loops through the {@link ArrayList} of {@link DecisionTree}s.
         * Makes prediction for the items of that ArrayList and returns the maximum item of that ArrayList.
         *
         * @param instance Instance to make prediction.
         * @return The maximum prediction of a given Instance.
         */
        predict(instance) {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            for (let tree of this.forest) {
                distribution.addItem(tree.predict(instance));
            }
            return distribution.getMaxItem();
        }
        predictProbability(instance) {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            for (let tree of this.forest) {
                distribution.addItem(tree.predict(instance));
            }
            return distribution.getProbabilityDistribution();
        }
    }
    exports.TreeEnsembleModel = TreeEnsembleModel;
});
//# sourceMappingURL=TreeEnsembleModel.js.map