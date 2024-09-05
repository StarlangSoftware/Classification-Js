(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Model", "../DecisionTree/DecisionTree", "nlptoolkit-math/dist/DiscreteDistribution", "nlptoolkit-util/dist/FileContents", "../DecisionTree/DecisionNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeEnsembleModel = void 0;
    const Model_1 = require("../Model");
    const DecisionTree_1 = require("../DecisionTree/DecisionTree");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const DecisionNode_1 = require("../DecisionTree/DecisionNode");
    class TreeEnsembleModel extends Model_1.Model {
        /**
         * A constructor which sets the {@link Array} of {@link DecisionTree} with given input.
         *
         * @param forest An {@link Array} of {@link DecisionTree}.
         */
        constructor1(forest) {
            this.forest = forest;
        }
        /**
         * Loads a tree ensemble model such as Random Forest model or Bagging model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            let numberOfTrees = parseInt(input.readLine());
            this.forest = new Array();
            for (let i = 0; i < numberOfTrees; i++) {
                this.forest.push(new DecisionTree_1.DecisionTree(new DecisionNode_1.DecisionNode(input)));
            }
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
        /**
         * Calculates the posterior probability distribution for the given instance according to ensemble tree model.
         * @param instance Instance for which posterior probability distribution is calculated.
         * @return Posterior probability distribution for the given instance.
         */
        predictProbability(instance) {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            for (let tree of this.forest) {
                distribution.addItem(tree.predict(instance));
            }
            return distribution.getProbabilityDistribution();
        }
        saveTxt(fileName) {
        }
    }
    exports.TreeEnsembleModel = TreeEnsembleModel;
});
//# sourceMappingURL=TreeEnsembleModel.js.map