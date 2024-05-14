(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../Model/RandomModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomClassifier = void 0;
    const Classifier_1 = require("./Classifier");
    const RandomModel_1 = require("../Model/RandomModel");
    class RandomClassifier extends Classifier_1.Classifier {
        /**
         * Training algorithm for random classifier.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            let result = new Array();
            for (let s of trainSet.classDistribution().keys()) {
                result.push(s);
            }
            this.model = new RandomModel_1.RandomModel(result, parameters.getSeed());
        }
        /**
         * Loads the random classifier model from an input file.
         * @param fileName File name of the random classifier model.
         */
        loadModel(fileName) {
            this.model = new RandomModel_1.RandomModel(fileName);
        }
    }
    exports.RandomClassifier = RandomClassifier;
});
//# sourceMappingURL=RandomClassifier.js.map