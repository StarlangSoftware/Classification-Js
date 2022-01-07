(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SubSetSelection", "./FeatureSubSet"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForwardSelection = void 0;
    const SubSetSelection_1 = require("./SubSetSelection");
    const FeatureSubSet_1 = require("./FeatureSubSet");
    class ForwardSelection extends SubSetSelection_1.SubSetSelection {
        /**
         * Constructor that creates a new {@link FeatureSubSet}.
         */
        constructor() {
            super(new FeatureSubSet_1.FeatureSubSet());
        }
        /**
         * The operator method calls forward method which starts with having no feature in the model. In each iteration,
         * it keeps adding the features that are not currently listed.
         *
         * @param current          FeatureSubset that will be added to new ArrayList.
         * @param numberOfFeatures Indicates the indices of indexList.
         * @return ArrayList of FeatureSubSets created from forward.
         */
        operator(current, numberOfFeatures) {
            let result = new Array();
            this.forward(result, current, numberOfFeatures);
            return result;
        }
    }
    exports.ForwardSelection = ForwardSelection;
});
//# sourceMappingURL=ForwardSelection.js.map