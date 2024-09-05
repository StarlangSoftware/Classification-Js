(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./DecisionTree", "./DecisionNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DecisionStump = void 0;
    const DecisionTree_1 = require("./DecisionTree");
    const DecisionNode_1 = require("./DecisionNode");
    class DecisionStump extends DecisionTree_1.DecisionTree {
        /**
         * Training algorithm for C4.5 Stump univariate decision tree classifier.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            this.root = new DecisionNode_1.DecisionNode(trainSet, undefined, undefined, true);
        }
        /**
         * Loads the decision tree model from an input file.
         * @param fileName File name of the decision tree model.
         */
        loadModel(fileName) {
            this.constructor2(fileName);
        }
    }
    exports.DecisionStump = DecisionStump;
});
//# sourceMappingURL=DecisionStump.js.map