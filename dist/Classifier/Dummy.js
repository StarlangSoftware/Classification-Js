(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../Model/DummyModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dummy = void 0;
    const Classifier_1 = require("./Classifier");
    const DummyModel_1 = require("../Model/DummyModel");
    class Dummy extends Classifier_1.Classifier {
        /**
         * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
         * the training data, there is no training.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            this.model = new DummyModel_1.DummyModel(trainSet);
        }
    }
    exports.Dummy = Dummy;
});
//# sourceMappingURL=Dummy.js.map